/* ============================================================
   Soltani Art — Artwork dataset
   Single source of truth. Edit here to add / update works.
   ============================================================ */

const works = [
  {
    id: 1, slug: 'infinity', featured: true,
    category: 'original', title_en: 'Infinity', title_de: 'Unendlichkeit',
    medium_en: 'Oil on canvas', medium_de: 'Öl auf Leinwand',
    size: '60 × 50 cm', year: '2024', inProgress: false,
    media: [
      { type: 'image', src: 'images/original/infinity.jpg', alt: 'Infinity — View 1' },
      { type: 'image', src: 'images/original/infinity-closeup1.jpg', alt: 'Infinity — View 2' },
      { type: 'image', src: 'images/original/infinity-closeup2.jpg', alt: 'Infinity — View 2' }
    ],
    desc_en: 'The central theme is love as the guiding force of existence — inspired by the verse "The heavens have no sanctuary but love."',
    desc_de: 'Das zentrale Thema ist die Liebe als lenkende Kraft des Daseins – inspiriert vom Vers „Der Himmel hat keine Zuflucht außer der Liebe."',
    concept_en: 'Infinity began as a meditation on the inward motion of devotion. Rather than depicting a distant or external universe, the work turns the gaze inward, toward an unseen centre where love, consciousness, and existence converge.\n\nThe composition appears to orbit a hidden centre, creating a sense of continuous movement without a defined beginning or end. Warm earth tones ground the work in the human experience, while a restrained veil of cadmium gold introduces a subtle sense of the sacred. The light does not illuminate a physical object; it suggests a horizon that exists only within the canvas—and ultimately within the viewer.\n\nThe work is rooted in the Persian mystical idea that the universe has no sanctuary but love. In this sense, <em>Infinity</em> is not an image of the cosmos, but a reflection on the inner universe: the place where devotion becomes self-discovery, and where the search for something beyond ourselves ultimately turns inward.\n\nCreated in oil on canvas, the painting relies on layered color, subtle transitions, and controlled luminosity rather than excessive detail. Its intention is to leave space for contemplation—to allow each viewer to encounter their own centre within the infinite.',
    concept_de: 'Infinity begann als eine Meditation über die nach innen gerichtete Bewegung der Hingabe. Anstatt ein fernes oder äußeres Universum darzustellen, lenkt das Werk den Blick nach innen – zu einem unsichtbaren Zentrum, in dem Liebe, Bewusstsein und Existenz zusammenkommen.\n\nDie Komposition scheint um ein verborgenes Zentrum zu kreisen und erzeugt ein Gefühl kontinuierlicher Bewegung, ohne einen definierten Anfang oder ein Ende. Warme Erdtöne verankern das Werk in der menschlichen Erfahrung, während ein zurückhaltender Schleier aus Kadmiumgold eine subtile Atmosphäre des Sakralen erzeugt. Das Licht erhellt kein konkretes Objekt; vielmehr deutet es auf einen Horizont hin, der nur innerhalb der Leinwand – und letztlich im Inneren des Betrachters – existiert.\n\nDas Werk ist in der persischen mystischen Vorstellung verwurzelt, dass das Universum außer der Liebe kein Heiligtum kennt. In diesem Sinne ist <em>Infinity</em> kein Abbild des Kosmos, sondern eine Reflexion über das innere Universum: jenen Ort, an dem Hingabe zur Selbsterkenntnis wird und die Suche nach etwas jenseits von uns selbst letztlich nach innen führt.\n\nDas in Öl auf Leinwand ausgeführte Werk basiert auf geschichteten Farbebenen, subtilen Übergängen und kontrollierter Leuchtkraft anstelle übermäßiger Detailfülle. Es möchte Raum für Kontemplation lassen – und jedem Betrachter ermöglichen, sein eigenes Zentrum innerhalb des Unendlichen zu entdecken.',
    updated: '2026-09-17'
  },
  {
    id: 2, slug: 'calligraphic-field', category: 'original', title_en: 'Calligraphic Field', title_de: 'Kalligrafisches Feld',
    medium_en: 'Mixed media, acrylic, ink, printed matter and burlap and masking tape on paper', medium_de: 'Mischtechnik, Acryl, Tinte, Drucksachen, Jute und Klebeband auf Papier',
    size: '30 × 40 cm', year: '2018', inProgress: false,
    media: [
      { type: 'image', src: 'images/original/Mixed_Media-Calligraphic_Field.jpg', alt: 'Calligraphic Field — View 1' },
      { type: 'image', src: 'images/original/Mixed_Media-Calligraphic_Field-closeup1.jpg', alt: 'Calligraphic Field — View 2' },
      { type: 'image', src: 'images/original/Mixed_Media-Calligraphic_Field-closeup2.jpg', alt: 'Calligraphic Field — View 3' }
    ],
    desc_en: '',
    desc_de: '',
    concept_en: 'In this mixed-media work, Persian Nastaliq calligraphy moves beyond language to become gesture, rhythm and visual structure. Fragments of printed text, raw burlap and layered marks create a tension between the refined movement of the script and the physical roughness of the materials. The work anticipates the calligraphic and material vocabulary developed further in the current Infinity series.',
    concept_de: 'In diesem Mixed-Media-Werk geht die persische Nastaliq-Kalligrafie über die Sprache hinaus und wird zu Geste, Rhythmus und visueller Struktur. Fragmente gedruckter Texte, rohes Jutegewebe und geschichtete Markierungen erzeugen eine Spannung zwischen der feinen Bewegung der Schrift und der physischen Rauheit der Materialien. Das Werk antizipiert das kalligrafische und materielle Vokabular, das in der aktuellen Infinity-Serie weiterentwickelt wird.',
    updated: '2026-09-17'
  },
  {
    id: 3, slug: 'reversed-garden', category: 'original', title_en: 'Reversed Garden', title_de: 'Reversierter Garten',
    medium_en: 'Oil transfer and printed text on glass ', medium_de: 'Öltransfer und gedruckter Text auf Glas',
    size: '30 × 40 cm', year: '2019', inProgress: false,
    media: [
      { type: 'image', src: 'images/original/Mixed_Media_oil_on_glass.jpg', alt: 'Reversed Garden — View 1' },
      { type: 'image', src: 'images/original/Mixed_Media_oil_on_glass-closeup1.jpg', alt: 'Reversed Garden — View 2' },
    ],
    desc_en: '',
    desc_de: '',
    concept_en: 'Created through an experimental transfer process, this work developed from wet oil paint, floral forms and fragments of printed text pressed against glass. The reversed lettering and partially transferred marks preserve traces of pressure, contact and chance. The work reflects an early interest in unstable surfaces and in the transformation of an image as it moves from one material support to another.',
    concept_de: 'Durch einen experimentellen Transferprozess entstanden, entwickelte sich dieses Werk aus nasser Ölfarbe, floralen Formen und Fragmenten gedruckten Textes, die gegen Glas gepresst wurden. Die umgekehrten Buchstaben und teilweise übertragenen Markierungen bewahren Spuren von Druck, Kontakt und Zufall. Das Werk spiegelt ein frühes Interesse an instabilen Oberflächen und an der Transformation eines Bildes wider, wenn es von einem Materialträger auf einen anderen übergeht.',
    updated: '2026-09-17'
  },
  {
    id: 4, slug: 'fragments-of-memory',
    category: 'original', title_en: 'Fragments of Memory', title_de: 'Fragmente der Erinnerung',
    medium_en: 'Acrylic, printed photograph, newspaper and mixed media on paper', medium_de: 'Acryl, fotografischer Druck, Zeitung und Mischtechnik auf Papier',
    size: '30 × 40 cm', year: '2019', inProgress: false,
    media: [
      { type: 'image', src: 'images/original/Mixed_Media-Fragments-of-Memory.jpg', alt: 'New Work' },
      { type: 'image', src: 'images/original/Mixed_Media-Fragments-of-Memory-closeup1.jpg', alt: 'New Work — Close-up 1' },
      { type: 'image', src: 'images/original/Mixed_Media-Fragments-of-Memory-closeup2.jpg', alt: 'New Work — Close-up 2' },
      { type: 'image', src: 'images/original/Mixed_Media-Fragments-of-Memory-closeup3.jpg', alt: 'New Work — Close-up 3' },
    ],
    desc_en: '',
    desc_de: '',
    concept_en: 'This work combines an indistinct human figure with fragments of newspaper, printed imagery and gestural layers of acrylic paint. Rolling, rubbing and partial covering interrupt the legibility of both the figure and the text. The image approaches memory as something assembled from incomplete traces—simultaneously personal and collective, visible and continually at risk of disappearance.',
    concept_de: 'Dieses Werk kombiniert eine unscharfe menschliche Figur mit Fragmenten von Zeitungen, gedruckten Bildern und gestischen Schichten aus Acrylfarbe. Rollen, Reiben und teilweise Abdecken unterbrechen die Lesbarkeit sowohl der Figur als auch des Textes. Das Bild nähert sich dem Gedächtnis als etwas, das aus unvollständigen Spuren zusammengesetzt ist – gleichzeitig persönlich und kollektiv, sichtbar und ständig vom Verschwinden bedroht.',
    updated: '2026-09-17'
  },
  {
    id: 5, slug: 'literary-reverie',
    category: 'original', title_en: 'Literary Reverie', title_de: 'Literarische Träumerei',
    medium_en: 'Mixed media on cardboard', medium_de: 'Mischtechnik auf Karton',
    size: 'A3', year: '2019', inProgress: false,
    media: [{ type: 'image', src: 'images/original/Literary-Reverie.jpg', alt: 'Literary Reverie' }],
    desc_en: 'Female figure with Persian calligraphy, collage and torn text — themes of literature and memory.',
    desc_de: 'Weibliche Figur mit persischer Kalligrafie, Collage und zerrissenem Text — Themen von Literatur und Erinnerung.',
    concept_en: 'A portrait built from fragments: poetry torn from old volumes, layered ink, and pigment held together by gesso. The figure emerges where language fails — a quiet argument for the image as the final reader of every text.',
    concept_de: 'Ein Porträt aus Fragmenten: aus alten Bänden gerissene Poesie, geschichtete Tinte und Pigment, gehalten von Gesso. Die Figur erscheint dort, wo die Sprache versagt – ein stilles Plädoyer für das Bild als letzten Leser jedes Textes.',
    updated: '2026-09-17'
  },
  {
    id: 6, slug: 'forest-reverie',
    category: 'original', title_en: 'Forest Reverie', title_de: 'Waldträumerei',
    medium_en: 'Oil on canvas', medium_de: 'Öl auf Leinwand',
    size: 'Approx. A4', year: '2018', inProgress: false,
    media: [{ type: 'image', src: 'images/original/Forest-Reverie.jpg', alt: 'Forest Reverie' }],
    desc_en: 'Expressive imaginary landscape with dynamic brushwork and atmospheric woodland scene.',
    desc_de: 'Ausdrucksstarke imaginäre Landschaft mit dynamischer Pinselführung und atmosphärischer Waldszene.',
    concept_en: 'Painted from imagination, Forest Reverie treats landscape as an internal state rather than a specific place. Rapid, gestural marks dissolve trees, ground and reflected light into a shifting field between recognition and memory.',
    concept_de: 'Aus der Vorstellung gemalt, versteht Forest Reverie die Landschaft als inneren Zustand und nicht als konkreten Ort. Schnelle, gestische Spuren lösen Bäume, Boden und reflektiertes Licht in ein bewegliches Feld zwischen Wiedererkennen und Erinnerung auf.',
    updated: '2026-09-17'
  },
  {
    id: 7, slug: 'decay',
    category: 'original', title_en: 'Decay', title_de: 'Verfall',
    medium_en: 'Oil on paper', medium_de: 'Öl auf Papier',
    size: 'A3', year: '2019', inProgress: false,
    media: [{ type: 'image', src: 'images/original/Decay.jpg', alt: 'Decay' }],
    desc_en: 'Contemporary gestural abstract expressionism exploring the inevitable process of decay and dissolution of identity.',
    desc_de: 'Zeitgenössischer gestischer abstrakter Expressionismus, der den unvermeidlichen Prozess des Verfalls und der Auflösung der Identität erforscht.',
    concept_en: 'Form refuses to settle. Pigment is scraped, restated and partially erased — the painting becomes a residue of its own making, mirroring how identity wears under time.',
    concept_de: 'Form weigert sich zu erstarren. Pigment wird abgekratzt, neu gesetzt und teilweise gelöscht – das Bild wird zum Rückstand seines eigenen Entstehens und spiegelt, wie Identität unter der Zeit abnutzt.',
    updated: '2026-09-17'
  },
  {
    id: 8, slug: 'last-bullet-1918',
    category: 'original', title_en: 'The Last Bullet — 1918', title_de: 'Die letzte Kugel — 1918',
    medium_en: 'Oil on canvas', medium_de: 'Öl auf Leinwand',
    size: '50 × 70 cm', year: '2018', inProgress: false,
    media: [{ type: 'image', src: 'images/original/The-Last-Bullet–1918.jpg', alt: 'The Last Bullet — 1918' }],
    desc_en: 'A young US Army soldier on the final day of the First World War — exhaustion, relief and the weight of survival.',
    desc_de: 'Ein junger US-Soldat am letzten Tag des Ersten Weltkriegs — Erschöpfung, Erleichterung und das Gewicht des Überlebens.',
    concept_en: 'A history painting in a contemporary key. The figure is centred but unheroic; the palette is mud, brass and bone. The bullet referenced in the title is the one that never had to be fired.',
    concept_de: 'Ein Historienbild in zeitgenössischer Tonlage. Die Figur steht zentral, doch unheroisch; die Palette: Schlamm, Messing, Knochen. Die im Titel genannte Kugel ist jene, die nie abgefeuert werden musste.',
    updated: '2026-09-17'
  },

  /* ---- Museum Reproductions ---- */
  {
    id: 9, slug: 'cabbies-at-market',
    category: 'reproduction', title_en: 'Cabbies at Market', title_de: 'Kutschen am Markt',
    subtitle_en: 'After G. Harvey', subtitle_de: 'Nach G. Harvey',
    medium_en: 'Oil on canvas', medium_de: 'Öl auf Leinwand',
    size: '70 × 50 cm', year: '2018', inProgress: false,
    media: [{ type: 'image', src: 'images/reproduction/G-HARVEY-CABBIES-AT-MARKET-70_50.jpg', alt: 'Cabbies at Market' }],
    desc_en: 'A faithful, hand-painted reproduction of Harvey\u2019s nostalgic gas-lit European market at dusk.',
    desc_de: 'Eine getreue, handgemalte Reproduktion von Harveys nostalgischem, gasbeleuchtetem europäischem Markt in der Dämmerung.',
    concept_en: 'Reproduced from high-resolution reference using the same indirect oil technique as the original: a warm imprimatura, monochrome underpainting, then colour glazes built up over weeks.',
    concept_de: 'Aus hochauflösenden Referenzen reproduziert mit derselben indirekten Öltechnik wie das Original: warme Imprimatur, monochrome Untermalung, dann über Wochen aufgebaute Farblasuren.',
    updated: '2026-09-17'
  },
  {
    id: 10, slug: 'starry-night',
    category: 'reproduction', title_en: 'The Starry Night', title_de: 'Die Sternennacht',
    subtitle_en: 'After Vincent Van Gogh · A Study in Brushwork, Light and Movement',
    subtitle_de: 'Nach Vincent Van Gogh · Eine Studie in Pinselführung, Licht und Bewegung',
    medium_en: 'Oil on linen', medium_de: 'Öl auf Leinen',
    size: '90 × 70 × 4 cm', year: '2026', inProgress: false,
    media: [
      { type: 'image', src: 'images/reproduction/Van_Gogh-Starry_Night.jpg', alt: 'The Starry Night reproduction' },
      { type: 'image', src: 'images/reproduction/Van_Gogh-Starry_Night-detail1.jpg', alt: 'The Starry Night reproduction — Detail' },
      { type: 'image', src: 'images/reproduction/Van_Gogh-Starry_Night-detail2.jpg', alt: 'The Starry Night reproduction — Detail' },
      { type: 'image', src: 'images/reproduction/Van_Gogh-Starry_Night-detail3.jpg', alt: 'The Starry Night reproduction — Detail' },
      { type: 'image', src: 'images/reproduction/Van_Gogh-Starry_Night-edge.jpg', alt: 'The Starry Night reproduction — Edge' },
      { type: 'image', src: 'images/reproduction/Van_Gogh-Starry_Night-edge2.jpg', alt: 'The Starry Night reproduction — Edge' },
      { type: 'image', src: 'images/reproduction/Van_Gogh-Starry_Night-decoration.jpg', alt: 'The Starry Night reproduction — Decoration' }
    ],
    desc_en: 'Hand-painted reproduction faithful to Van Gogh\u2019s impasto rhythm, on premium linen with archival oils.',
    desc_de: 'Handgemalte Reproduktion, treu dem Impasto-Rhythmus Van Goghs, auf Premium-Leinen mit archivfesten Ölfarben.',
    concept_en: 'Vincent van Gogh’s <em>The Starry Night</em>, painted in 1889, is one of the most recognizable works in the history of Western art. Yet beyond its familiar imagery lies an extraordinary study of movement, rhythm, colour and the physical language of paint. \n This hand-painted reproduction is an attempt to engage with that language through the act of painting itself. Rather than reproducing the image as a flat visual copy, I focused on studying and reconstructing the character of Van Gogh’s brushwork — the direction and rhythm of each stroke, the interaction of complementary colours, the layering of paint, and the variations in surface texture that give the original its distinctive sense of movement. \n The work was developed over approximately two months, from the preparation of the canvas and initial layers through to the final refinement. Particular attention was given to the relationship between colour and impasto, allowing the surface to retain a physical quality that can be experienced not only from a distance, but also at close range. \n The painting is executed in oil on linen canvas, using professional-grade materials, with the painted composition continuing around the edges of the deep canvas. This allows the work to be presented without a traditional frame, while maintaining a continuous visual presence from every angle. \n This piece is conceived not simply as a reproduction of a famous image, but as a personal study of one of the most remarkable examples of painterly expression in modern art — an exploration of how colour, gesture and layers of paint can transform a familiar landscape into something almost alive.',
    concept_de: 'Vincent van Goghs <em>Die Sternennacht</em>, entstanden im Jahr 1889, gehört zu den bekanntesten Werken der westlichen Kunstgeschichte. Hinter der vertrauten Bildwelt verbirgt sich jedoch eine außergewöhnliche Auseinandersetzung mit Bewegung, Rhythmus, Farbe und der körperlichen Sprache der Malerei. \n Diese handgemalte Reproduktion entstand aus dem Versuch, diese Sprache durch den eigentlichen Malprozess zu erforschen. Dabei ging es nicht darum, das Gemälde lediglich als flaches Abbild wiederzugeben. Im Mittelpunkt standen vielmehr die Untersuchung und Rekonstruktion von van Goghs charakteristischem Pinselduktus – die Richtung und der Rhythmus der einzelnen Pinselstriche, das Zusammenspiel komplementärer Farben, der Aufbau der Farbschichten sowie die unterschiedlichen Strukturen der Oberfläche, die dem Original seine unverwechselbare Dynamik verleihen. \n Die Arbeit entstand über einen Zeitraum von etwa zwei Monaten – von der Vorbereitung der Leinwand und den ersten Farbschichten bis hin zur abschließenden Verfeinerung. Besonderes Augenmerk lag auf dem Zusammenspiel von Farbe und pastosem Farbauftrag, sodass die Oberfläche nicht nur aus der Distanz, sondern auch aus nächster Nähe eine spürbare physische Qualität bewahrt. \n Das Gemälde wurde in Öl auf Leinwand ausgeführt und mit hochwertigen Künstlerfarben gearbeitet. Die Komposition wurde zudem über die Kanten der tiefen Leinwand weitergeführt. Dadurch kann das Werk auch ohne einen klassischen Rahmen präsentiert werden und behält aus verschiedenen Blickwinkeln eine zusammenhängende visuelle Wirkung. \n Dieses Werk versteht sich daher nicht lediglich als Reproduktion eines berühmten Bildes, sondern als persönliche Studie eines der eindrucksvollsten Beispiele malerischer Ausdruckskraft der modernen Kunst – eine Auseinandersetzung damit, wie Farbe, Bewegung und aufgetragene Farbschichten eine vertraute Landschaft in etwas nahezu Lebendiges verwandeln können.',
    process: [
      { type: 'video', src: 'https://youtu.be/lahQ7y0ft6c', alt: 'The Starry Night reproduction — Process 1' },
      { type: 'image', src: 'images/reproduction/Van_Gogh-Starry_Night_process.jpg', alt: 'The Starry Night reproduction — Process 2' },
      { type: 'image', src: 'images/reproduction/Van_Gogh-Starry_Night-process_signature.jpg', alt: 'The Starry Night reproduction — Process 2' },
      { type: 'image', src: 'images/reproduction/Van_Gogh-Starry_Night-process_signature2.jpg', alt: 'The Starry Night reproduction — Process 2' },
    ],
    updated: '2026-09-17'
  },
  {
    id: 11, slug: 'girl-with-pearl-earring',
    category: 'reproduction', title_en: 'Girl with a Pearl Earring', title_de: 'Mädchen mit dem Perlenohrgehänge',
    subtitle_en: 'After Vermeer', subtitle_de: 'Nach Vermeer',
    medium_en: 'Oil on linen', medium_de: 'Öl auf Leinen',
    size: '40 × 45 cm', year: '2026', inProgress: true,
    media: [{ type: 'image', src: 'images/reproduction/Girl_with_a_Pearl_Earring.jpg', alt: 'Girl with a Pearl Earring' }],
    desc_en: 'Museum-quality reproduction in progress on premium linen with Winsor & Newton and Gamblin oils.',
    desc_de: 'Museumqualitäts-Reproduktion in Arbeit auf Premium-Leinen mit Winsor & Newton und Gamblin Ölfarben.',
    concept_en: 'Vermeer\u2019s pearl is built from only three values of lead white. The reproduction follows his original layering sequence — ultramarine veil over a warm flesh ground — to recreate the optical depth that gives the work its quiet life.',
    concept_de: 'Vermeers Perle ist aus nur drei Werten Bleiweiß aufgebaut. Die Reproduktion folgt seiner ursprünglichen Schichtfolge – Ultramarinschleier über warmem Inkarnatgrund – um die optische Tiefe wiederherzustellen, die dem Werk sein stilles Leben gibt.',
    updated: '2026-09-17'
  },
  {
    id: 12, slug: 'mona-lisa',
    category: 'reproduction', title_en: 'Mona Lisa', title_de: 'Mona Lisa',
    subtitle_en: 'After Leonardo da Vinci — A Study in Sfumato, Light and Transition',
    subtitle_de: 'Nach Leonardo da Vinci — Eine Studie zu Sfumato, Licht und Übergängen',
    medium_en: 'Oil on linen', medium_de: 'Öl auf Leinen',
    size: '60 × 80 cm', year: '2026', inProgress: true,
    media: [{ type: 'image', src: 'images/reproduction/Mona-lisa.jpg', alt: 'Mona Lisa' }],
    desc_en: 'An oil-painting study in progress examining Leonardo da Vinci’s sfumato: soft transitions of tone and atmosphere without abrupt contours.',
    desc_de: 'Eine Ölmalereistudie in Arbeit, die Leonardo da Vincis Sfumato untersucht: weiche Übergänge von Ton und Atmosphäre ohne abrupte Konturen.',
    concept_en: 'Rather than reproducing a single present-day photograph, this study takes Leonardo da Vinci’s Mona Lisa in the Louvre as its primary reference and uses the Prado workshop version as a comparative source. The Louvre painting’s present appearance has been shaped by age, varnish, and its conservation history; the Prado version, created in Leonardo’s workshop in close relation to the original composition, offers additional evidence for colour relationships and details that are now less clearly legible. The aim is neither to copy the Prado version nor to invent a hypothetical restoration, but to interpret the Louvre composition through sustained observation, material research, and practical study of sfumato.',
    concept_de: 'Diese Studie orientiert sich nicht an einer einzigen heutigen Fotografie. Hauptreferenz ist Leonardo da Vincis Mona Lisa im Louvre; die Werkstattfassung im Prado dient als vergleichende Quelle. Das heutige Erscheinungsbild des Louvre-Gemäldes ist durch Alterung, Firnis und seine konservatorische Geschichte geprägt. Die Prado-Fassung, die in Leonardos Werkstatt in enger Verbindung mit der ursprünglichen Komposition entstand, liefert ergänzende Hinweise auf Farbbeziehungen und heute weniger deutlich lesbare Details. Ziel ist weder eine Kopie der Prado-Fassung noch die Erfindung einer hypothetischen Restaurierung, sondern eine malerische Interpretation der Louvre-Komposition durch genaue Beobachtung, Materialrecherche und die praktische Untersuchung des Sfumato.',
    updated: '2026-09-17'
  }
];

/* Expose dataset to Node build scripts without affecting the browser global */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = works;
}
