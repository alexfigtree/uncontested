(async function () {
  const DEFAULT_FILL_OPACITY = 0.35;
  const DEFAULT_WEIGHT = 1;
  const ACTIVE_FILL_OPACITY = 0.85;
  const ACTIVE_WEIGHT = 2;

  // --- Real-border enhancement ---
  // Our hand-sketched polygons average ~10 vertices each, which is why they
  // looked jagged and didn't precisely match real coastlines - real borders
  // need 50-300+ points to look right at this scale. Rather than hand-adding
  // hundreds of points, we fetch real current-day country borders at runtime
  // and union them with our hand-sketched "historical extension beyond
  // current borders" shape. Result: the current-country portion is real,
  // accurate data; only the historical extension beyond it stays hand-sketched.
  // Falls back gracefully to the original hand-sketched geometry if the
  // fetch, library, or union fails for any reason - never breaks the map.
  const ISO_NUMERIC = {
    mongolia: "496", turkey: "792", uk: "826", russia: "643", greece: "300",
    china: "156", france: "250", spain: "724", portugal: "620", italy: "380",
    iran: "364", india: "356", austria: "40", japan: "392", serbia: "688",
    bulgaria: "100", hungary: "348", poland: "616", sweden: "752", egypt: "818",
    morocco: "504", mexico: "484", peru: "604", usa: "840", israel: "376",
  };

  async function loadRealBorders() {
    try {
      const resp = await fetch("https://unpkg.com/world-atlas@2/countries-110m.json");
      if (!resp.ok) throw new Error("fetch failed: " + resp.status);
      const topology = await resp.json();
      const geo = topojson.feature(topology, topology.objects.countries);
      const byId = {};
      geo.features.forEach((f) => { byId[String(f.id)] = f; });
      return byId;
    } catch (err) {
      console.warn("Real-border data unavailable, using hand-sketched geometry only.", err);
      return null;
    }
  }

  async function enhanceWithRealBorders() {
    const status = { enhanced: 0, failed: 0, skipped: 0, reason: null };
    if (typeof turf === "undefined" || typeof topojson === "undefined") {
      status.reason = "Turf.js/topojson-client failed to load";
      status.skipped = COUNTRIES.length;
      return status;
    }
    const realBorders = await loadRealBorders();
    if (!realBorders) {
      status.reason = "world-atlas border data fetch failed";
      status.skipped = COUNTRIES.length;
      return status;
    }
    COUNTRIES.forEach((country) => {
      const code = ISO_NUMERIC[country.id];
      const realFeature = code && realBorders[code];
      if (!realFeature) {
        status.skipped++;
        console.warn("No real-border match for", country.id, "(tried ISO numeric code:", code, ") - keeping hand-sketched shape.");
        return;
      }
      try {
        const historical = turf.feature(country.geometry);
        // Key fix: union(historical, real) silently discards the real
        // shape's detail whenever historical already contains real (which
        // is true almost everywhere by our own superset rule) - the real
        // boundary ends up entirely interior and never reaches the outer
        // edge. Instead: subtract real from historical to get ONLY the
        // genuine historical excess, then union that back with real - now
        // the two pieces are non-overlapping, so both boundaries survive.
        const extension = turf.difference(historical, realFeature);
        const final = extension ? turf.union(realFeature, extension) : realFeature;
        if (final && final.geometry) {
          country.geometry = final.geometry;
          status.enhanced++;
        } else {
          status.failed++;
          console.warn("Union produced no geometry for", country.id, "- keeping hand-sketched shape.");
        }
      } catch (err) {
        console.warn("Union failed for", country.id, "- keeping hand-sketched shape.", err);
        status.failed++;
      }
    });
    return status;
  }

  const borderStatus = await enhanceWithRealBorders();
  const statusEl = document.getElementById("border-status");
  if (statusEl) {
    if (borderStatus.reason) {
      statusEl.textContent = "Real border data unavailable (" + borderStatus.reason + ") \u2014 showing hand-sketched approximations only.";
    } else {
      statusEl.textContent = "Real border data: " + borderStatus.enhanced + "/" + COUNTRIES.length + " countries enhanced" +
        (borderStatus.failed ? ", " + borderStatus.failed + " failed" : "") + ". Historical extension beyond current borders is still hand-sketched.";
    }
  }
  // --- end real-border enhancement ---

  // --- Algorithmic color palette ---
  // Replaces manual hex-picking, which stops scaling well somewhere around
  // 15-20 categories. Golden-angle hue stepping (~137.5 deg) spreads hues
  // around the wheel without clustering, and cycling through a few
  // saturation/lightness bands adds extra separation for hues that land
  // close together once there are many countries.
  const GOLDEN_ANGLE = 137.508;
  const SATURATION_BANDS = [70, 55, 85, 45];
  const LIGHTNESS_BANDS = [45, 62, 35, 55];

  function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const toHex = (x) => Math.round(255 * x).toString(16).padStart(2, "0");
    return "#" + toHex(f(0)) + toHex(f(8)) + toHex(f(4));
  }

  function generatePalette(n) {
    const colors = [];
    for (let i = 0; i < n; i++) {
      const hue = (i * GOLDEN_ANGLE) % 360;
      const s = SATURATION_BANDS[i % SATURATION_BANDS.length];
      const l = LIGHTNESS_BANDS[i % LIGHTNESS_BANDS.length];
      colors.push(hslToHex(hue, s, l));
    }
    return colors;
  }

  const palette = generatePalette(COUNTRIES.length);
  COUNTRIES.forEach((country, i) => {
    country.color = palette[i];
  });
  // --- end palette setup ---

  const map = L.map("map", {
    worldCopyJump: true,
    minZoom: 2,
    maxZoom: 7,
  }).setView([35, 40], 3);

  L.tileLayer("https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri",
    maxZoom: 16,
  }).addTo(map);

  const layersById = {};
  let lockedId = null;

  function defaultStyle(country) {
    return {
      color: country.color,
      weight: DEFAULT_WEIGHT,
      fillColor: country.color,
      fillOpacity: DEFAULT_FILL_OPACITY,
    };
  }

  function activeStyle(country) {
    return {
      color: country.color,
      weight: ACTIVE_WEIGHT,
      fillColor: country.color,
      fillOpacity: ACTIVE_FILL_OPACITY,
    };
  }

  function setActive(id, opts) {
    Object.keys(layersById).forEach((otherId) => {
      const entry = layersById[otherId];
      if (otherId === id) {
        entry.layer.setStyle(activeStyle(entry.country));
        entry.layer.bringToFront();
      } else {
        entry.layer.setStyle(defaultStyle(entry.country));
      }
    });
    updateLegendActive(id);
    updateDetailPanel(id);
    if (opts && opts.scrollLegend) {
      scrollLegendIntoView(id);
    }
  }

  function scrollLegendIntoView(id) {
    const el = document.querySelector('.legend-item[data-id="' + id + '"]');
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function clearActive() {
    Object.keys(layersById).forEach((id) => {
      const entry = layersById[id];
      entry.layer.setStyle(defaultStyle(entry.country));
    });
    updateLegendActive(null);
    updateDetailPanel(null);
  }

  function updateLegendActive(id) {
    document.querySelectorAll(".legend-item").forEach((el) => {
      el.classList.toggle("active", el.dataset.id === id);
    });
  }

  function updateDetailPanel(id) {
    const panel = document.getElementById("detail-panel");
    if (!id) {
      panel.classList.add("detail-hidden");
      return;
    }
    const country = layersById[id].country;
    document.getElementById("detail-name").textContent = country.name;
    document.getElementById("detail-era").textContent = country.era;
    document.getElementById("detail-note").textContent = country.note;
    panel.classList.remove("detail-hidden");
  }

  COUNTRIES.forEach((country) => {
    const feature = {
      type: "Feature",
      properties: { id: country.id, name: country.name },
      geometry: country.geometry,
    };

    const layer = L.geoJSON(feature, {
      style: defaultStyle(country),
    });

    layer.on("mouseover", () => {
      if (lockedId) return;
      setActive(country.id, { scrollLegend: true });
    });

    layer.on("mouseout", () => {
      if (lockedId) return;
      clearActive();
    });

    layer.addTo(map);
    layersById[country.id] = { layer, country };
  });

  // Click handling is centralized on the map (not per-layer) because
  // overlapping shapes mean the browser's hit-testing only ever reaches
  // the topmost one - a smaller country buried underneath a bigger claim
  // can be genuinely unreachable by hovering/clicking its own layer,
  // however careful the cursor is. Instead, every click is tested against
  // every country's actual geometry (turf.booleanPointInPolygon), and if
  // more than one truly contains that point, we show a small picker
  // rather than silently only ever selecting whichever is drawn on top.
  function countriesAtPoint(latlng) {
    if (typeof turf === "undefined") return [];
    const pt = turf.point([latlng.lng, latlng.lat]);
    return COUNTRIES.filter((c) => {
      try {
        return turf.booleanPointInPolygon(pt, c.geometry);
      } catch (err) {
        return false;
      }
    });
  }

  // If a country's shape is bigger than what's currently on screen, the
  // user can't see enough of it to be confident they're clicking inside
  // it - it's probably not the target. A country whose whole shape fits
  // in the visible viewport is a much more likely match, so when zoomed
  // in on a small country like Israel, a huge overlapping claim (Iran,
  // Turkey, etc.) that extends off-screen gets deprioritized in favor of
  // the small one that's fully visible.
  function isFullyVisible(country, bounds) {
    try {
      const bbox = turf.bbox(country.geometry); // [minLng, minLat, maxLng, maxLat]
      return (
        bbox[0] >= bounds.getWest() &&
        bbox[2] <= bounds.getEast() &&
        bbox[1] >= bounds.getSouth() &&
        bbox[3] <= bounds.getNorth()
      );
    } catch (err) {
      return false;
    }
  }

  function showDisambiguationPopup(latlng, matches) {
    const container = document.createElement("div");
    container.className = "disambig-popup";
    const title = document.createElement("div");
    title.className = "disambig-title";
    title.textContent = matches.length + " overlapping regions here \u2014 pick one:";
    container.appendChild(title);
    matches.forEach((c) => {
      const btn = document.createElement("button");
      btn.className = "disambig-btn";
      btn.style.borderLeftColor = c.color;
      btn.textContent = c.name;
      btn.addEventListener("mouseenter", () => setActive(c.id));
      btn.addEventListener("mouseleave", () => { if (!lockedId) clearActive(); });
      btn.addEventListener("click", () => {
        lockedId = c.id;
        setActive(c.id, { scrollLegend: true });
        map.closePopup();
      });
      container.appendChild(btn);
    });
    L.popup({ closeButton: true, maxWidth: 220 })
      .setLatLng(latlng)
      .setContent(container)
      .openOn(map);
  }

  map.on("click", (e) => {
    const matches = countriesAtPoint(e.latlng);
    if (matches.length === 0) {
      lockedId = null;
      clearActive();
      return;
    }
    if (matches.length === 1) {
      lockedId = matches[0].id;
      setActive(matches[0].id, { scrollLegend: true });
      return;
    }
    const bounds = map.getBounds();
    const fullyVisible = matches.filter((c) => isFullyVisible(c, bounds));
    const candidates = fullyVisible.length > 0 ? fullyVisible : matches;
    if (candidates.length === 1) {
      lockedId = candidates[0].id;
      setActive(candidates[0].id, { scrollLegend: true });
    } else {
      showDisambiguationPopup(e.latlng, candidates);
    }
  });

  const legendList = document.getElementById("legend-list");
  const alphabetical = COUNTRIES.slice().sort((a, b) => a.name.localeCompare(b.name));
  alphabetical.forEach((country) => {
    const li = document.createElement("li");
    li.className = "legend-item";
    li.dataset.id = country.id;
    li.dataset.name = country.name.toLowerCase();
    li.innerHTML =
      '<span class="legend-swatch" style="background:' + country.color + '"></span>' +
      '<span><span class="legend-name">' + country.name + '</span>' +
      '<span class="legend-era">' + country.era + '</span></span>';

    li.addEventListener("mouseenter", () => {
      if (lockedId) return;
      setActive(country.id);
    });
    li.addEventListener("mouseleave", () => {
      if (lockedId) return;
      clearActive();
    });
    li.addEventListener("click", () => {
      if (lockedId === country.id) {
        lockedId = null;
        clearActive();
      } else {
        lockedId = country.id;
        setActive(country.id);
      }
    });

    legendList.appendChild(li);
  });

  const legendSearch = document.getElementById("legend-search");
  if (legendSearch) {
    legendSearch.addEventListener("input", () => {
      const q = legendSearch.value.trim().toLowerCase();
      document.querySelectorAll(".legend-item").forEach((el) => {
        const matches = !q || el.dataset.name.includes(q);
        el.style.display = matches ? "" : "none";
      });
    });
  }

  const sourcesList = document.getElementById("sources-list");
  alphabetical.forEach((country) => {
    const li = document.createElement("li");
    li.className = "source-item";

    const links = (country.sources || [])
      .map((s) => '<a href="' + s.url + '" target="_blank" rel="noopener">' + s.title + "</a>")
      .join("");

    li.innerHTML =
      '<span class="source-swatch" style="background:' + country.color + '"></span>' +
      "<span>" +
      '<span class="source-name">' + country.name + "</span>" +
      '<p class="source-era">' + country.era + "</p>" +
      (country.note ? '<p class="source-note">' + country.note + "</p>" : "") +
      '<div class="source-links">' + (links || "No source recorded yet") + "</div>" +
      "</span>";

    sourcesList.appendChild(li);
  });
})();
