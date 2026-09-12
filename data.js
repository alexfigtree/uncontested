// ROUGH / APPROXIMATE historical extent data for prototype purposes.
// These polygons are simplified sketches of well-known historical empires,
// not precise cartographic borders. Good enough to test the interaction
// model; would be replaced with researched/sourced GeoJSON in a full build.
//
// METHODOLOGY (as of this revision):
// - Each entry uses the "identity attribution" framing: the largest
//   territory a country would attribute to its own historical identity.
// - Default is now the MODEST reading: the largest extent with reasonably
//   strong historical/archaeological/administrative evidence of actual
//   governance (documented states, verified conquest and administration),
//   NOT legendary/religious/textual promises or 19th-20th century
//   irredentist political programs that exceed verified historical control.
// - Where a MAXIMALIST alternative exists (a bigger claim based on legend,
//   scripture, or nationalist political programs), it is documented in
//   that entry's `note` field with its own sources, but not used as the
//   entry's drawn shape.
// - Every entry's shape must be at least a superset of that country's
//   current internationally-recognized borders (see the coverage-check
//   script used during development).

const COUNTRIES = [
  {
    id: "mongolia",
    name: "Mongolia",
    era: "Mongol Empire, c. 1279",
    note: "Peak extent under Kublai Khan / the united Mongol Empire before its division into khanates.",
    sources: [
      { title: "Mongol Empire \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Mongol_Empire" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [127, 38], [120, 46], [110, 50], [100, 50], [90, 55], [70, 58],
        [60, 60], [55, 52], [45, 50], [35, 48], [25, 50],
        [20, 47], [25, 44], [30, 45], [37, 42], [40, 40],
        [35, 38], [36, 33], [44, 33], [50, 29], [52, 27],
        [58, 27], [65, 32], [68, 30], [70, 30], [78, 32],
        [85, 32], [95, 30], [105, 25], [112, 24], [120, 30],
        [124, 34], [127, 38]
      ]]
    }
  },
  {
    id: "turkey",
    name: "Turkey",
    era: "Ottoman Empire, c. 1683",
    note: "Peak territorial extent, shortly before the Siege of Vienna and subsequent contraction. This is the full verified empire, not a legendary claim, so no bigger maximalist alternative applies \u2014 if anything it exceeds Misak-\u0131 Mill\u00ee (the 1920 \"National Pact\"), a smaller, more recent Turkish nationalist claim (Anatolia plus Mosul, Kirkuk, Aleppo) still actively referenced in Turkish politics today.",
    sources: [
      { title: "Ottoman Empire \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Ottoman_Empire" },
      { title: "Ottoman Empire Map: Expansion, Greatest Extent \u2014 Mappr", url: "https://www.mappr.co/historical-maps/ottoman-empire-map/" },
      { title: "(context) Misak-\u0131 Mill\u00ee \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Misak-%C4%B1_Mill%C3%AE" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [19, 46], [23, 45], [29, 45], [34, 45], [38, 43],
        [40, 41], [45, 41], [48, 38], [50, 30], [48, 25],
        [42, 16], [38, 18], [35, 20], [32, 22], [25, 22],
        [18, 25], [10, 32], [2, 35], [6, 37], [10, 37],
        [15, 38], [18, 40], [20, 40], [22, 42], [19, 46]
      ]]
    }
  },
  {
    id: "uk",
    name: "United Kingdom",
    era: "British Empire, c. 1920",
    note: "Approximate combined extent at maximum territorial reach after WWI. Simplified to major landmasses only \u2014 many smaller island territories omitted. Shapes are hand-sketched gestures at real coastlines, not traced borders.",
    sources: [
      { title: "British Empire \u2014 Britannica", url: "https://www.britannica.com/place/British-Empire" }
    ],
    geometry: {
      type: "MultiPolygon",
      coordinates: [
        [[
          [-10.5, 51.3], [-9.8, 53.8], [-6.2, 55.2], [-5.0, 56.5],
          [-3.0, 58.6], [-1.0, 57.5], [-2.0, 54.0], [1.5, 52.8],
          [1.2, 51.0], [-1.5, 50.5], [-5.5, 50.0], [-8.0, 51.5],
          [-10.5, 51.3]
        ]],
        [[
          [-141, 60], [-130, 55], [-125, 49], [-95, 49], [-83, 42],
          [-75, 45], [-65, 47], [-55, 47], [-65, 60], [-85, 65],
          [-95, 68], [-110, 70], [-130, 70], [-141, 69], [-141, 60]
        ]],
        [[
          [61, 24], [70, 24], [75, 34], [88, 27], [92, 22],
          [98, 10], [95, 16], [90, 22], [80, 8], [72, 21], [61, 24]
        ]],
        [[
          [113, -22], [114, -26], [118, -33], [126, -32], [131, -32],
          [136, -35], [140, -38], [145, -38], [150, -37], [153, -28],
          [150, -22], [145, -16], [142, -11], [137, -12], [132, -12],
          [128, -14], [122, -17], [113, -22]
        ]],
        [[
          [166, -46], [168, -44], [172, -41], [175, -37], [178, -38],
          [175, -41], [171, -44], [166, -46]
        ]],
        [[
          [36, 22], [41, 12], [42, 2], [40, -10], [38, -20],
          [33, -28], [27, -34], [18, -34], [16, -24], [20, -12],
          [25, -2], [30, 10], [33, 18], [36, 22]
        ]],
        [[
          [-5, 11], [-3, 6], [1, 6], [5, 7], [8, 10],
          [7, 13], [3, 14], [-2, 13], [-5, 11]
        ]]
      ]
    }
  },
  {
    id: "russia",
    name: "Russia",
    era: "Russian Empire, c. 1895",
    note: "Contiguous Eurasian extent shortly before 1900. Excludes Alaska (sold 1867) to keep the prototype's geometry simple.",
    sources: [
      { title: "Russian Empire \u2014 Britannica", url: "https://www.britannica.com/place/Russian-Empire" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [20, 60], [19, 54], [23, 49], [30, 46], [40, 45],
        [48, 40], [55, 38], [65, 37], [75, 38], [80, 42],
        [95, 45], [120, 50], [125, 44], [133, 42], [138, 48],
        [140, 60], [170, 65],
        [180, 66], [160, 70], [100, 75], [60, 70], [40, 68],
        [33, 70], [30, 65], [20, 60]
      ]]
    }
  },
  {
    id: "greece",
    name: "Greece",
    era: "Greek colonial world at its height, c. 500-400 BC",
    note: "Modest reading: the territory actually settled and governed by Greek city-states \u2014 mainland Greece, the Aegean, Ionia (western Anatolia), and colonies in Magna Graecia (south Italy/Sicily), Cyrenaica, the Black Sea, and Massalia (Marseille). Excludes Alexander the Great's empire (334-323 BC), which reached Egypt, Mesopotamia, Persia, and northwest India but was conquered militarily and held only briefly, without lasting Greek settlement \u2014 that is the maximalist alternative some might attribute to Greek identity.",
    sources: [
      { title: "Greek colonisation \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Greek_colonisation" },
      { title: "(maximalist alternative) Alexander the Great \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Alexander_the_Great" }
    ],
    geometry: {
      type: "MultiPolygon",
      coordinates: [
        [[
          [19, 40], [19, 36], [26, 34], [29, 37], [36, 37],
          [35, 39], [27, 41], [23, 42], [19, 40]
        ]],
        [[
          [14.3, 38.1], [16.6, 38.2], [17.2, 40.5], [15.9, 41.2],
          [14, 40.8], [13.7, 39], [14.3, 38.1]
        ]],
        [[[20.5, 31.5], [24, 32.7], [23.5, 30.5], [20, 31], [20.5, 31.5]]],
        [[[27, 41], [30, 41], [33, 44], [36, 45], [34, 46], [30, 43], [27, 41]]],
        [[[4.3, 43.0], [5.7, 43.5], [5.2, 43.7], [4.3, 43.4], [4.3, 43.0]]]
      ]
    }
  },
  {
    id: "china",
    name: "China",
    era: "Qing dynasty, c. 1760",
    note: "Peak extent under the Qianlong Emperor, following the conquest of the Dzungar Khanate and incorporation of Xinjiang, Mongolia, and Tibet. Worth flagging: Qing control over Tibet and Outer Mongolia was often closer to suzerainty (tribute, garrison oversight) than direct provincial rule, so a stricter \"directly-administered core\" reading would be somewhat smaller than what's shown here.",
    sources: [
      { title: "Qing dynasty \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Qing_dynasty" },
      { title: "Qing dynasty \u2014 Britannica", url: "https://www.britannica.com/topic/Qing-dynasty" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [125, 53], [135, 48], [130, 42], [124, 40], [120, 35],
        [122, 28], [118, 22], [110, 18], [102, 22], [98, 28],
        [90, 28], [80, 35], [75, 40], [80, 45], [90, 50],
        [100, 52], [110, 53], [120, 53], [125, 53]
      ]]
    }
  },
  {
    id: "france",
    name: "France",
    era: "French colonial empire, c. 1920s-30s",
    note: "Combined extent of the second French colonial empire at its interwar peak, plus mainland France. Approximate \u2014 many smaller possessions omitted. Note that the Saharan interior was often a nominal claim with thin effective administration compared to the coastal/urban colonial network.",
    sources: [
      { title: "French colonial empire \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/French_colonial_empire" },
      { title: "Evolution of the French colonial empire \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Evolution_of_the_French_colonial_empire" }
    ],
    geometry: {
      type: "MultiPolygon",
      coordinates: [
        [[[-5, 41.3], [-5, 51.1], [9.6, 51.1], [9.6, 41.3], [-5, 41.3]]],
        [[
          [-17, 33], [-5, 37], [10, 37], [15, 30], [24, 20],
          [15, 5], [-10, 5], [-17, 15], [-17, 33]
        ]],
        [[[102, 10], [107, 10], [109, 16], [105, 23], [100, 20], [98, 14], [102, 10]]],
        [[[44, -25], [47, -25], [50, -16], [49, -12], [45, -13], [43, -20], [44, -25]]]
      ]
    }
  },
  {
    id: "spain",
    name: "Spain",
    era: "Spanish Empire, c. 1790",
    note: "Peak territorial reach across the Americas, the Philippines, and Iberia. The South American shape is roughly carved to exclude Portuguese Brazil. Much of the claimed American interior was nominal viceroyalty territory rather than areas under effective Spanish administration.",
    sources: [
      { title: "Map: Spanish Empire at Its Peak \u2014 TheCollector", url: "https://www.thecollector.com/maps-resources/spanish-empire-peak-map/" },
      { title: "10 Facts About the Spanish Empire at Its Peak \u2014 History Collection", url: "https://historycollection.com/spanish-empire-at-its-peak-facts/" }
    ],
    geometry: {
      type: "MultiPolygon",
      coordinates: [
        [[[-9, 36], [-9, 44], [3, 44], [3, 36], [-9, 36]]],
        [[[-125, 49], [-95, 49], [-95, 29], [-105, 20], [-117, 32], [-125, 42], [-125, 49]]],
        [[
          [-90, 20], [-84, 10], [-77, 8], [-70, 10], [-65, -5],
          [-58, -20], [-65, -35], [-73, -40], [-75, -20], [-80, 0], [-90, 20]
        ]],
        [[[118, 6], [126, 7], [126, 18], [121, 19], [117, 14], [118, 6]]]
      ]
    }
  },
  {
    id: "portugal",
    name: "Portugal",
    era: "Portuguese Empire, 17th century combined with Brazil",
    note: "Combines the 17th-century Asian/African trading-post network with Brazil (lost 1822) \u2014 these were never all held simultaneously at this size, so this is a maximal composite rather than a single-year snapshot.",
    sources: [
      { title: "The Portuguese Empire at its maximum extent \u2014 Vivid Maps", url: "https://vividmaps.com/portuguese-empire-maximum-extent/" },
      { title: "Map: Portuguese Empire at Its Peak \u2014 TheCollector", url: "https://www.thecollector.com/maps-resources/portuguese-empire-map/" }
    ],
    geometry: {
      type: "MultiPolygon",
      coordinates: [
        [[[-9.5, 37], [-9.5, 42], [-6, 42], [-6, 37], [-9.5, 37]]],
        [[[-51, 5], [-35, -5], [-38, -15], [-48, -25], [-57, -30], [-58, -10], [-51, 5]]],
        [[[11, -6], [14, -5], [16, -12], [13, -18], [11, -12], [11, -6]]],
        [[[35, -11], [40, -13], [40, -20], [35, -26], [32, -22], [33, -15], [35, -11]]],
        [[[73.7, 14.9], [74.3, 15.6], [73.9, 15.8], [73.5, 15.2], [73.7, 14.9]]]
      ]
    }
  },
  {
    id: "italy",
    name: "Italy",
    era: "Roman Empire, 117 AD (under Trajan)",
    note: "The maximal Roman interpretation \u2014 like Greece/Alexander, a genuinely contestable predecessor-state choice, since the Roman Empire wasn't an Italian nation-state.",
    sources: [
      { title: "Roman Empire \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Roman_Empire" },
      { title: "Roman Empire Map: Greatest Extent in 117 AD \u2014 Mappr", url: "https://www.mappr.co/historical-maps/roman-empire-map/" }
    ],
    geometry: {
      type: "MultiPolygon",
      coordinates: [
        [[
          [-9, 43], [-6, 36], [0, 35], [10, 33], [20, 32],
          [31, 24], [33, 31], [40, 30], [45, 33], [42, 37],
          [36, 37], [26, 40], [20, 40], [10, 40], [5, 44],
          [-1, 44], [-9, 43]
        ]],
        [[[-5, 50], [-4, 53.5], [0, 53.8], [1.7, 52], [0.5, 50.2], [-5, 50]]],
        [[
          [7, 44], [7, 47], [13.9, 46.5], [13.5, 42], [16, 38.5],
          [14.3, 37.4], [12.4, 41.9], [9.2, 44.2], [7, 44]
        ]]
      ]
    }
  },
  {
    id: "iran",
    name: "Iran",
    era: "Achaemenid Empire, c. 500 BC (under Darius I)",
    note: "Peak extent of the first Persian Empire, spanning three continents from Thrace to the Indus.",
    sources: [
      { title: "Achaemenid Empire \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Achaemenid_Empire" },
      { title: "Map of Achaemenid Empire at Its Peak \u2014 TheCollector", url: "https://www.thecollector.com/maps-resources/map-achaemenid-empire-peak-darius-i/" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [23, 41], [27, 40], [36, 37], [33, 31], [31, 24],
        [33, 22], [45, 30], [50, 27], [56, 26], [61, 25],
        [67, 24], [70, 28], [72, 32], [70, 36], [65, 38],
        [58, 40], [50, 40], [45, 38], [40, 39], [23, 41]
      ]]
    }
  },
  {
    id: "india",
    name: "India",
    era: "Mughal Empire, c. 1700 (under Aurangzeb)",
    note: "Peak extent shortly before Aurangzeb's death, covering nearly the entire subcontinent.",
    sources: [
      { title: "Mughal Empire \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Mughal_Empire" },
      { title: "Map of the Mughal Empire at Its Greatest Extent \u2014 World History Encyclopedia", url: "https://www.worldhistory.org/image/16429/map-of-the-mughal-empire-at-its-greatest-extent-c/" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [61, 25], [67, 24], [70, 24], [75, 35], [78, 35],
        [88, 26], [92, 24], [88, 22], [82, 16], [80, 8],
        [73, 15], [68, 24], [61, 25]
      ]]
    }
  },
  {
    id: "austria",
    name: "Austria",
    era: "Austria-Hungary, c. 1914",
    note: "The Dual Monarchy just before WWI, stretching from northern Italy to western Ukraine \u2014 no overseas colonies, so this stays a single contiguous block unlike the UK/France/Spain/Portugal entries. The maximalist alternative would be the full Habsburg dynastic union under Charles V (16th century), which also personally encompassed Spain, the Netherlands, much of Italy, and the Spanish Americas \u2014 not used here since that was a personal union across separate crowns, not a single administered Austrian state.",
    sources: [
      { title: "Austria-Hungary \u2014 Britannica", url: "https://www.britannica.com/place/Austria-Hungary" },
      { title: "Austria-Hungary \u2014 a major European power? \u2014 Der Erste Weltkrieg", url: "https://ww1.habsburger.net/en/chapters/austria-hungary-major-european-power" },
      { title: "(context) Charles V, Holy Roman Emperor \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Charles_V,_Holy_Roman_Emperor" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [10, 45], [10, 47], [12, 49], [15, 51], [19, 50],
        [26, 49], [27, 47], [24, 45], [21, 43], [17, 42.5],
        [13, 45], [10, 45]
      ]]
    }
  },
  {
    id: "japan",
    name: "Japan",
    era: "Empire of Japan, 1942 (wartime peak)",
    note: "Maximum wartime occupation extent, May\u2013August 1942, before Allied counteroffensives began reversing it. Presented here purely as a historical territorial fact, not an endorsement. This is already the modest/verified reading (actual military occupation); the wartime \"Greater East Asia Co-Prosperity Sphere\" propaganda concept was vaguer and included aspirational areas (India, Australia) beyond what was ever actually occupied \u2014 that maximalist framing is not used here.",
    sources: [
      { title: "Map: Empire of Japan at Its Peak \u2014 TheCollector", url: "https://www.thecollector.com/maps-resources/empire-japan-peak-map/" },
      { title: "Empire of Japan at its greatest extent, 1942 \u2014 Vivid Maps", url: "https://vividmaps.com/empire-of-japan-at-its-greatest-exten/" }
    ],
    geometry: {
      type: "MultiPolygon",
      coordinates: [
        [[
          [122, 50], [135, 50], [145, 45], [145, 35], [130, 31],
          [126, 33], [124, 40], [118, 40], [110, 45], [115, 50], [122, 50]
        ]],
        [[
          [105, 21], [110, 18], [118, 22], [122, 30], [120, 35],
          [110, 35], [105, 28], [105, 21]
        ]],
        [[
          [92, 28], [100, 28], [105, 22], [110, 20], [117, 20],
          [122, 24], [126, 19], [124, 10], [120, 5], [113, -3],
          [105, -7], [95, 5], [92, 15], [92, 28]
        ]],
        [[[131, -1], [150, -2], [148, -9], [132, -8], [131, -1]]],
        [[[138, 4], [165, 6], [163, 13], [140, 11], [138, 4]]]
      ]
    }
  },
  {
    id: "serbia",
    name: "Serbia",
    era: "Serbian Empire under Stefan Du\u0161an, c. 1355",
    note: "Peak extent covering roughly half the Balkans \u2014 more territory than either the Byzantine Empire or the Second Bulgarian Empire held at the time. This entry itself is a real, administered historical state (coinage, legal code, church records), not a legendary claim, so it's used as the modest reading. The maximalist alternative is the 19th-century \"Na\u010dertanije\" (1844) program by Ilija Gara\u0161anin, which claimed Bosnia, Montenegro, Kosovo, parts of Albania, Croatia, and Macedonia on ethnic-Serb grounds rather than historical governance \u2014 not used here.",
    sources: [
      { title: "Serbian Empire \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Serbian_Empire" },
      { title: "(maximalist alternative) Ilija Gara\u0161anin \u2014 Britannica", url: "https://www.britannica.com/biography/Ilija-Garasanin" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [20, 45], [23, 44], [26, 42], [24, 40], [22, 39],
        [20, 40], [19, 43], [20, 45]
      ]]
    }
  },
  {
    id: "bulgaria",
    name: "Bulgaria",
    era: "First Bulgarian Empire under Simeon I, c. 917-927",
    note: "Traditionally cited as Bulgaria's greatest territorial expansion, reaching the Aegean and the Pannonian Plain \u2014 though some historians place the empire's largest raw area slightly earlier, under Simeon's predecessors. The maximalist alternative some Bulgarian nationalists invoke is the short-lived Treaty of San Stefano (1878) borders, reversed within months by the Congress of Berlin \u2014 not used here since it was never a stable governed state.",
    sources: [
      { title: "First Bulgarian Empire \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/First_Bulgarian_Empire" },
      { title: "Simeon I of Bulgaria \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Simeon_I_of_Bulgaria" },
      { title: "(context) Treaty of San Stefano \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Treaty_of_San_Stefano" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [22, 46], [27, 46], [29, 44], [28, 42], [26, 41],
        [23, 40], [21, 41], [20, 43], [22, 46]
      ]]
    }
  },
  {
    id: "hungary",
    name: "Hungary",
    era: "Kingdom of Hungary under Louis I \"the Great\", c. 1350s",
    note: "Peak territorial control extending to the Adriatic (Dalmatia), with Serbia, Wallachia, Moldavia, and Bulgaria as vassals. Unlike most other entries, there isn't a bigger legendary claim beyond this \u2014 this real medieval extent is itself the same territory modern Hungarian revisionist politics still references (pre-Trianon \"Greater Hungary\"), which is worth being transparent about even though the underlying medieval kingdom was genuinely governed, not mythical.",
    sources: [
      { title: "Louis I of Hungary \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Louis_I_of_Hungary" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [14, 46], [19, 49], [24, 48], [26, 47], [23, 45],
        [19, 44], [16, 43], [14, 45], [14, 46]
      ]]
    }
  },
  {
    id: "poland",
    name: "Poland",
    era: "Polish-Lithuanian Commonwealth, 1619",
    note: "Peak extent after the Truce of Deulino \u2014 roughly modern Poland and Ukraine plus all of Belarus, Lithuania, and Latvia.",
    sources: [
      { title: "Polish-Lithuanian Commonwealth \u2014 Britannica", url: "https://www.britannica.com/place/Polish-Lithuanian-Commonwealth" },
      { title: "Poland-Lithuania at its Greatest Extent, 1619 \u2014 World History Encyclopedia", url: "https://www.worldhistory.org/image/20669/poland-lithuania-at-its-greatest-extent-1619/" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [14, 54], [19, 56], [24, 58], [30, 55], [32, 50],
        [34, 47], [30, 45], [26, 45], [22, 49], [17, 50], [14, 54]
      ]]
    }
  },
  {
    id: "sweden",
    name: "Sweden",
    era: "Swedish Empire, 1658 (after the Treaty of Roskilde)",
    note: "Third-largest European realm by area at its peak, behind only Russia and Spain \u2014 spanning Scandinavia, the eastern Baltic coast, and parts of northern Germany.",
    sources: [
      { title: "Swedish Empire \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Swedish_Empire" },
      { title: "Map of the Swedish Empire at its height in 1658 \u2014 Vivid Maps", url: "https://vividmaps.com/swedish-empire/" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [11, 58], [12, 63], [15, 68], [21, 68], [24, 66],
        [30, 60], [28, 55], [24, 54], [18, 53], [12, 54], [8, 58], [11, 58]
      ]]
    }
  },
  {
    id: "egypt",
    name: "Egypt",
    era: "New Kingdom under Thutmose III, c. 1450 BC",
    note: "Brought the Egyptian empire to its greatest extent \u2014 south to the 4th cataract of the Nile in Sudan, north through the Levant to Carchemish on the Euphrates.",
    sources: [
      { title: "Thutmose III \u2014 Britannica", url: "https://www.britannica.com/biography/Thutmose-III" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [30, 32], [35, 36], [38, 36], [36, 33], [34, 29],
        [33.5, 23], [30, 18], [28, 22], [25, 31], [30, 32]
      ]]
    }
  },
  {
    id: "morocco",
    name: "Morocco",
    era: "Almohad Caliphate, c. 1180-1212",
    note: "Peak extent of the Berber Almohad Caliphate, spanning the Maghreb and Muslim Iberia (Al-Andalus) before the defeat at Las Navas de Tolosa in 1212. The maximalist alternative is \"Greater Morocco,\" a mid-20th-century territorial claim by Istiqlal Party leader Allal al-Fassi covering all of Mauritania, Western Sahara, parts of western Algeria, and northern Mali \u2014 a modern political program, not a historically governed extent, so not used here.",
    sources: [
      { title: "Almohad Caliphate \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Almohad_Caliphate" },
      { title: "(context) Greater Morocco \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Greater_Morocco" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-9, 36], [-9, 40], [-1, 40], [3, 39], [11, 37],
        [10, 33], [1, 30], [-11, 21], [-17, 24], [-13, 30], [-9, 36]
      ]]
    }
  },
  {
    id: "mexico",
    name: "Mexico",
    era: "Mexico at its largest verified extent, 1821-1836/1848",
    note: "The Aztec Triple Alliance's actual military/tributary reach (centered on the Valley of Mexico) did not cover all of modern Mexico \u2014 Baja California, the northern deserts, and parts of the Yucat\u00e1n were outside Aztec control or held by independent peoples (Maya, Tarascans) \u2014 so that alone would be an under-count. Audit correction: independent Mexico's own verified sovereign territory (1821-1848) was actually larger than its current borders, including Texas (lost 1836) and the Mexican Cession \u2014 California, Nevada, Utah, most of Arizona/New Mexico, and parts of Colorado/Wyoming (ceded 1848 per the Treaty of Guadalupe Hidalgo). That's real, documented, verified 19th-century governance, not a legendary claim, so per this project's own modest/verified-extent rule it belongs in the shape rather than just current-day Mexico.",
    sources: [
      { title: "Aztec Empire \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Aztec_Empire" },
      { title: "Mexican Cession \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Mexican_Cession" },
      { title: "Treaty of Guadalupe Hidalgo \u2014 Britannica", url: "https://www.britannica.com/event/Treaty-of-Guadalupe-Hidalgo" }
    ],
    geometry: {
      type: "MultiPolygon",
      coordinates: [
        [[
          [-106, 31.5], [-97, 26], [-97, 21], [-90, 21], [-86.5, 21.5],
          [-88, 18], [-92, 15], [-93, 16], [-99, 16], [-105, 20],
          [-107, 24], [-105, 27], [-106, 31.5]
        ]],
        [[
          [-114.7, 32.8], [-113, 31], [-111, 27], [-110, 24],
          [-112, 23], [-114, 27], [-115, 29], [-117.2, 32.7], [-114.7, 32.8]
        ]],
        [[
          [-124.4, 42], [-120, 42], [-114, 42], [-109, 42], [-106, 37],
          [-103, 37], [-100, 34], [-94, 33.5], [-93.8, 29.7], [-97.2, 26.2],
          [-99, 29], [-106.5, 31.8], [-108.2, 31.3], [-114.7, 32.5],
          [-117.3, 32.6], [-120, 34], [-122, 37], [-124.4, 42]
        ]]
      ]
    }
  },
  {
    id: "peru",
    name: "Peru",
    era: "Inca Empire (Tawantinsuyu) under Huayna Capac, 1527",
    note: "The largest empire in pre-Columbian America, running the length of the Andes from southern Colombia to central Chile and northwest Argentina.",
    sources: [
      { title: "Inca Empire \u2014 Wikipedia", url: "https://en.wikipedia.org/wiki/Inca_Empire" },
      { title: "The Inca Empire \u2014 Discover Peru", url: "http://www.discover-peru.org/inca-empire/" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-77, 2], [-79, -2], [-81, -6], [-77, -14], [-71, -18],
        [-70, -34], [-65, -30], [-65, -20], [-68, -16],
        [-72, -13], [-75, -8], [-77, 2]
      ]]
    }
  },
  {
    id: "usa",
    name: "United States",
    era: "Continental United States + Alaska, 20th century",
    note: "Unlike most entries here, this is essentially the country's current extent \u2014 the US never lost territory the way most historical empires did. Overseas insular holdings (the Philippines, etc.) are excluded as those belong to those places' own identity, not American identity. Some 19th-century Manifest Destiny rhetoric aspired further (the \"All Mexico\" movement of 1847-48, \"Fifty-Four Forty or Fight\" for all of Oregon Country including British Columbia) \u2014 aspirational political rhetoric that was never actually annexed, so not used here.",
    sources: [
      { title: "Mapped: The Territorial Evolution of the United States \u2014 Visual Capitalist", url: "https://www.visualcapitalist.com/us-territorial-expansion/" }
    ],
    geometry: {
      type: "MultiPolygon",
      coordinates: [
        [[
          [-125, 49], [-95, 49], [-80, 42], [-67, 45], [-80, 25],
          [-97, 26], [-117, 32], [-125, 42], [-125, 49]
        ]],
        [[[-141, 60], [-168, 60], [-168, 71], [-141, 70], [-141, 60]]],
        [[[-160, 19], [-154, 19], [-154, 23], [-160, 23], [-160, 19]]]
      ]
    }
  },
  {
    id: "israel",
    name: "Israel",
    era: "United Monarchy under David/Solomon, c. 1000-930 BC (modest reading)",
    note: "Mainstream archaeology places the 10th-century BCE Davidic/Solomonic state's core in the Judean highlands, Jerusalem, and the Shephelah; some scholars (\"maximalists\") argue for a somewhat larger administered kingdom, others (\"minimalists\") for a smaller tribal chiefdom. This entry uses the biblical description \"from Dan to Beersheba\" (1 Kings 4:25) as a defensible upper bound consistent with the more generous end of that scholarly range, extended to match modern Israel's borders per this project's standing rule. This is deliberately smaller than the maximalist covenant description in Genesis 15:18 (\"from the river of Egypt to the great river, the river Euphrates,\" echoed in Exodus 23:31, Deuteronomy 1:7 and 11:24, and Joshua 1:4), which spans modern Israel/Palestine, all of Lebanon, most of Syria, part of Iraq, the Sinai, and much of Jordan \u2014 a real textual claim, cited by some today for present-day territorial arguments, but not one the administrative/archaeological record supports as a historical governed extent, so it is not used as this entry's shape.",
    sources: [
      { title: "1 Kings 4:25 \u2014 Bible Gateway (NIV)", url: "https://www.biblegateway.com/passage/?search=1%20Kings%204%3A25" },
      { title: "The United Monarchy Under David and Solomon \u2014 Associates for Biblical Research", url: "https://www.biblearchaeology.org/research/judges-united-monarchy/3457-the-united-monarchy-under-david-and-solomon" },
      { title: "(maximalist alternative) Genesis 15:18 \u2014 Bible Gateway (NIV)", url: "https://www.biblegateway.com/passage/?search=Genesis%2015%3A18" }
    ],
    geometry: {
      type: "Polygon",
      coordinates: [[
        [34.9, 33.3], [35.1, 33.3], [35.55, 32.9], [35.5, 32.0],
        [35.4, 31.5], [35.2, 30.6], [34.98, 29.52], [34.9, 29.48], [34.55, 30.9],
        [34.5, 31.8], [34.75, 32.3], [34.9, 33.05], [34.9, 33.3]
      ]]
    }
  }
];
