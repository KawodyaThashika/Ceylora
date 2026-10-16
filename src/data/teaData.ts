import { TeaProduct, JourneyStage, Testimonial, FAQItem } from '../types';

export const PRODUCTS: TeaProduct[] = [
  {
    id: 'nuwara-eliya-pekoe',
    name: 'Nuwara Eliya Imperial Pekoe',
    sinhalaName: 'නුවරඑළිය පීකෝ',
    subtitle: 'High-Grown Single Estate Black Tea',
    category: 'black',
    categoryLabel: 'Black Tea',
    price: 38,
    weight: '100g (3.5 oz) Tin',
    rating: 4.9,
    reviewCount: 128,
    elevation: '6,240 ft (1,902m)',
    estate: 'Pedro Cloud Garden, Nuwara Eliya',
    region: 'Central Highlands, Sri Lanka',
    harvestSeason: 'February Peak Flush',
    grade: 'Flowery Orange Pekoe (FOP)',
    caffeine: 'Medium',
    tastingNotes: ['Crisp Muscatel', 'Wild Eucalyptus', 'Golden Apricot', 'Morning Mist'],
    description: 'Revered as the Champagne of Ceylon teas, harvested exclusively at daybreak when the dew clings to the highest peaks of Nuwara Eliya. Produces a luminous pale-amber liquor with exquisite floral lightness.',
    story: 'High above the cloudline where temperatures drop to near freezing at night, tea bushes develop slowly, concentrating natural sugars and volatile aromatic linalool compounds that cannot be replicated in warmer lowlands.',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85',
    accentColor: '#c5a059',
    flavorProfile: {
      aroma: 9.6,
      body: 7.8,
      sweetness: 8.9,
      astringency: 4.2,
      finish: 9.4
    },
    brewing: {
      temperatureC: 95,
      temperatureF: 203,
      steepTimeSec: 180,
      ratioGrams: 2.5,
      ratioWaterMl: 220,
      infusionCount: 2,
      sommelierTip: 'Pour water just off the boil over unbroken leaves. Serve in thin porcelain to appreciate the luminescent golden ring at the cup edge.'
    },
    isBestseller: true,
    organicCertified: true
  },
  {
    id: 'imperial-silver-needle',
    name: 'Imperial Ceylon Silver Needle',
    sinhalaName: 'රජත ඉඳිකටු තේ',
    subtitle: 'Rarest Virgin Sun-Dried White Tea',
    category: 'white',
    categoryLabel: 'White Tea',
    price: 64,
    weight: '50g (1.76 oz) Hand-Numbered Tin',
    rating: 5.0,
    reviewCount: 74,
    elevation: '5,800 ft (1,768m)',
    estate: 'Adam’s Peak Sacred Foothills',
    region: 'Nuwara Eliya & Dimbula Ridge',
    harvestSeason: 'Equinox Dawn Flush',
    grade: 'Silver Tips Supreme (Virgin)',
    caffeine: 'Low',
    tastingNotes: ['Wild White Honeysuckle', 'Silken Melon', 'Alpine Pine', 'Vanilla Blossom'],
    description: 'The pinnacle of Ceylon tea artistry. Composed strictly of unopened terminal buds harvested with golden silk gloves at sunrise and dried purely under the equatorial sun without mechanical heat.',
    story: 'Legend has it that in ancient Ceylon, virgin white tea was gathered exclusively for royal courtiers. Each batch requires over 4,000 individually plucked unopened buds per hundred grams.',
    imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1000&q=85',
    accentColor: '#b2c2ad',
    flavorProfile: {
      aroma: 9.9,
      body: 6.2,
      sweetness: 9.7,
      astringency: 1.5,
      finish: 9.8
    },
    brewing: {
      temperatureC: 80,
      temperatureF: 176,
      steepTimeSec: 270,
      ratioGrams: 3.0,
      ratioWaterMl: 200,
      infusionCount: 4,
      sommelierTip: 'Do not scald these delicate virgin buds. Use spring water cooled to 80°C. Notice how the velvety hairs float upward like silver spears in your glass.'
    },
    isLimited: true,
    organicCertified: true
  },
  {
    id: 'emerald-mist-green',
    name: 'Emerald Mist Ceylon Green',
    sinhalaName: 'මරකත හරිත තේ',
    subtitle: 'Artisanal Steamed Organic Green Tea',
    category: 'green',
    categoryLabel: 'Green Tea',
    price: 34,
    weight: '80g (2.8 oz) Tin',
    rating: 4.8,
    reviewCount: 96,
    elevation: '4,800 ft (1,463m)',
    estate: 'Kandy Mist Valley Estate',
    region: 'Central Province, Sri Lanka',
    harvestSeason: 'Monsoon Spring Flush',
    grade: 'Special Rolled Emerald Leaf',
    caffeine: 'Medium',
    tastingNotes: ['Sweet Bamboo', 'Toasted Pine Nut', 'Fresh Orchid', 'Spring Raindew'],
    description: 'Unlike standard bitter greens, Ceylon green tea grown in mineral-rich volcanic highland soils boasts exceptional smoothness with no astringency, bursting with antioxidant EGCG catechins.',
    story: 'Pan-fired gently within two hours of sunrise to immediately halt enzymatic oxidation, locking in the vivid chlorophyll and ethereal vegetal sweetness.',
    imageUrl: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=1000&q=85',
    accentColor: '#64835b',
    flavorProfile: {
      aroma: 8.8,
      body: 7.0,
      sweetness: 8.6,
      astringency: 3.0,
      finish: 8.9
    },
    brewing: {
      temperatureC: 75,
      temperatureF: 167,
      steepTimeSec: 150,
      ratioGrams: 2.0,
      ratioWaterMl: 200,
      infusionCount: 3,
      sommelierTip: 'Savor the second infusion; the gentle sweet chestnut notes unlock further after the initial leaf opening.'
    },
    organicCertified: true
  },
  {
    id: 'royal-ceylon-earl-grey',
    name: 'Royal Ceylon Earl Grey',
    sinhalaName: 'රාජකීය අර්ල් ග්‍රේ',
    subtitle: 'Single Estate Black with Cold-Pressed Bergamot',
    category: 'black',
    categoryLabel: 'Flavored Black',
    price: 36,
    weight: '100g (3.5 oz) Tin',
    rating: 4.9,
    reviewCount: 162,
    elevation: '4,200 ft (1,280m)',
    estate: 'Dimbula Crest Estate',
    region: 'Dimbula Valley, Sri Lanka',
    harvestSeason: 'Southwest Monsoon Clean Flush',
    grade: 'Orange Broken Pekoe with Blue Cornflowers',
    caffeine: 'High',
    tastingNotes: ['Calabrian Bergamot', 'Ceylon Orange Blossom', 'Dark Amber Malt', 'Blue Cornflower Petals'],
    description: 'An elevated interpretation of the British classic. We blend bold, copper-red Dimbula orthodox leaf with first-press Italian bergamot essential oil and vibrant cornflower blossoms.',
    story: 'Dimbula teas are legendary for their lively reddish-amber body and distinct citrus character, forming the ultimate harmonious foundation for citrus essential oils.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85',
    accentColor: '#327253',
    flavorProfile: {
      aroma: 9.8,
      body: 8.7,
      sweetness: 8.1,
      astringency: 5.2,
      finish: 9.1
    },
    brewing: {
      temperatureC: 98,
      temperatureF: 208,
      steepTimeSec: 210,
      ratioGrams: 2.5,
      ratioWaterMl: 230,
      infusionCount: 2,
      sommelierTip: 'Remarkable on its own or elevated with a touch of raw highland acacia honey. Pairs beautifully with afternoon shortbread or citrus tarts.'
    },
    isBestseller: true
  },
  {
    id: 'botanical-cinnamon-lemongrass',
    name: 'Highland Lemongrass & Ceylon Cinnamon',
    sinhalaName: 'කුරුඳු සහ සේර ඖෂධීය තේ',
    subtitle: 'Ayurvedic Botanical Highland Infusion',
    category: 'herbal',
    categoryLabel: 'Herbal Wellness',
    price: 32,
    weight: '80g (2.8 oz) Tin',
    rating: 4.8,
    reviewCount: 88,
    elevation: '2,400 ft (731m)',
    estate: 'Matale Spice & Herbal Terraces',
    region: 'Matale Foothills, Sri Lanka',
    harvestSeason: 'Year-Round Sustainable Cut',
    grade: 'Cut Botanical Leaf & Quills',
    caffeine: 'None',
    tastingNotes: ['True Ceylon Cinnamon (Alba Grade)', 'Fresh Lemongrass Oil', 'Sweet Ginger', 'Golden Turmeric'],
    description: 'Caffeine-free botanical sanctuary. Crafted from authentic Ceylon "True" Cinnamon (Cinnamomum verum) and sun-dried organic lemongrass stalks harvested by local family cooperatives.',
    story: 'Sri Lanka supplies over 85% of the world’s rare true cinnamon, celebrated for its delicate, non-pungent sweetness and natural calming properties.',
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1000&q=85',
    accentColor: '#b85d39',
    flavorProfile: {
      aroma: 9.4,
      body: 7.2,
      sweetness: 9.1,
      astringency: 1.0,
      finish: 9.3
    },
    brewing: {
      temperatureC: 100,
      temperatureF: 212,
      steepTimeSec: 360,
      ratioGrams: 3.5,
      ratioWaterMl: 250,
      infusionCount: 2,
      sommelierTip: 'Allow full 6 minutes of steeping to release the therapeutic essential oils from the cinnamon quills. Perfect evening unwinding elixir.'
    },
    organicCertified: true
  },
  {
    id: 'single-origin-golden-tip-reserve',
    name: 'Single-Origin Golden Tip Reserve',
    sinhalaName: 'ස්වර්ණ ඉඟි විශේෂ සංචිතය',
    subtitle: 'Rare Micro-Lot Vintage 1892',
    category: 'reserve',
    categoryLabel: 'Rare Reserve',
    price: 78,
    weight: '50g (1.76 oz) Lacquered Wooden Caddy',
    rating: 5.0,
    reviewCount: 42,
    elevation: '6,450 ft (1,966m)',
    estate: 'Single Lot No. 4, Pedro Vintage Block',
    region: 'Highest Highlands of Nuwara Eliya',
    harvestSeason: 'Full Moon August Flush',
    grade: 'Imperial Golden Flowery Pekoe',
    caffeine: 'High',
    tastingNotes: ['Leather & Cedarwood', 'Wild Highland Honey', 'Roasted Cacao Nibs', 'Dried Fig'],
    description: 'An extraordinary vintage tea cultivated on century-old bushes planted in 1892. Each batch yields less than 20kg per harvest season, encased in an individually numbered airtight canister.',
    story: 'Only the young golden-tipped shoots which absorb the intense UV sunlight of the equatorial altitude are selected. The liquor glows like polished liquid topaz.',
    imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1000&q=85',
    accentColor: '#dfba73',
    flavorProfile: {
      aroma: 9.9,
      body: 9.5,
      sweetness: 9.0,
      astringency: 3.8,
      finish: 9.9
    },
    brewing: {
      temperatureC: 96,
      temperatureF: 205,
      steepTimeSec: 240,
      ratioGrams: 2.5,
      ratioWaterMl: 200,
      infusionCount: 3,
      sommelierTip: 'Notice the lingering sweetness that remains on the palate for up to 30 minutes after your final sip. A true meditative tea experience.'
    },
    isLimited: true
  }
];

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    step: 1,
    title: 'The Highland Terroir',
    subtitle: '6,200 Feet Above The Indian Ocean',
    elevation: '6,200 ft',
    timeOfDay: '05:30 AM',
    description: 'High in the mist-shrouded central cordillera of Sri Lanka, the unique convergence of tropical equatorial sun and chilly highland nights creates the microclimate known as the Ceylon highland blessing.',
    sensoryNote: 'Aromatic cool mist carrying notes of wild eucalyptus and damp red soil.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    quote: 'The mountain mist is not merely weather; it is the natural shade that shelters our fragile leaf buds before sunrise.',
    quoteAuthor: 'P. Senanayake — 4th Generation Estate Master'
  },
  {
    step: 2,
    title: 'The Imperial Pluck',
    subtitle: 'Two Leaves and a Bud',
    elevation: '5,800 ft',
    timeOfDay: '06:15 AM',
    description: 'Before the sun burns away the morning dew, master pluckers select only the topmost tender unopened bud and two flanking leaves. Machine harvesting is strictly forbidden at CEYLORA.',
    sensoryNote: 'Crisp snap of the tender green stalk, releasing fresh chlorophyll oils.',
    imageUrl: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1600&q=85',
    quote: 'We pluck with intuition cultivated over lifetimes. If a leaf is even one day too mature, it loses its floral crown.',
    quoteAuthor: 'Anusha Kumari — Chief Plucker, Pedro Valley'
  },
  {
    step: 3,
    title: 'Artisanal Withering & Rolling',
    subtitle: 'Patience & Cedarwood Tables',
    elevation: '5,200 ft',
    timeOfDay: '11:00 AM',
    description: 'Harvested leaves rest on open-air jute troughs where mountain breezes gently reduce moisture. Master craftsmen roll the leaf on traditional brass-sheathed tables to rupture cellular walls without tearing.',
    sensoryNote: 'Warm herbal sweetness turning slowly into ripe stone fruit and clover honey.',
    imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1600&q=85',
    quote: 'Rolling is the heartbeat of orthodox tea. Too much pressure burns the juice; too little leaves the leaf asleep.',
    quoteAuthor: 'M. Dharmapala — Factory Superintendent'
  },
  {
    step: 4,
    title: 'The Golden Alchemy',
    subtitle: 'The Sacred First Pour',
    elevation: 'At Your Table',
    timeOfDay: 'Anytime of Serenity',
    description: 'When soft water kisses the curled leaves, they gently unfurl in a slow, hypnotic waltz. The water transforms into luminous amber gold, releasing centuries of botanical memories.',
    sensoryNote: 'Steam fragrant with apricot bloom, toasted malt, and lingering highland sweetness.',
    imageUrl: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=1600&q=85',
    quote: 'Tea does not merely quench thirst. It creates an island of stillness in an impatient world.',
    quoteAuthor: 'CEYLORA Sommelier Creed'
  },
  {
    step: 5,
    title: 'The Sovereign Vessel',
    subtitle: 'Preserved in Gold & Matte Midnight',
    elevation: 'Protected for Eternity',
    timeOfDay: 'Day 1 of Sealed Freshness',
    description: 'Each harvest is hermetically nitrogen-sealed in double-walled, UV-shielded matte black metal canisters adorned with genuine gold leaf stamping. A sacred talisman of Sri Lanka delivered to your door.',
    sensoryNote: 'The crisp vacuum hiss as you break the artisanal paper seal.',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1600&q=85',
    quote: 'A vessel worthy of the high country, safeguarding volatile botanical oils for twenty-four months.',
    quoteAuthor: 'CEYLORA Design Atelier'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'The Nuwara Eliya Imperial Pekoe possesses a clarity and mineral salinity that rivals Grand Cru Burgundies. It has redefined our afternoon pairing salon at our three-star restaurant.',
    author: 'Jean-Luc Moreau',
    title: 'Chef Sommelier, L’Ambroisie',
    location: 'Paris, France',
    teaFav: 'Nuwara Eliya Imperial Pekoe',
    rating: 5
  },
  {
    id: '2',
    quote: 'Opening a CEYLORA tin is a multi-sensory journey. The Silver Needle leaves are so pristine you can see the velvety silvery trichomes under the light. Truly the benchmark of Sri Lankan tea.',
    author: 'Elena Rostova',
    title: 'Master of Tea & Author of The Golden Sip',
    location: 'London & Colombo',
    teaFav: 'Imperial Ceylon Silver Needle',
    rating: 5
  },
  {
    id: '3',
    quote: 'In twenty years of tasting world teas, few single-estates deliver the balance of floral brightness and resonant amber finish found in CEYLORA’s Pedro Harvest. Flawless presentation.',
    author: 'Kenji Takahashi',
    title: 'Founder, Cha-No-Michi Tea Academy',
    location: 'Kyoto, Japan',
    teaFav: 'Single-Origin Golden Tip Reserve',
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'What makes Ceylon tea from Sri Lanka internationally revered?',
    answer: 'Sri Lanka’s central mountain terrain features unique microclimates separated by mere mountain ridges. The combination of dual monsoons (Yala and Maha), elevation exceeding 6,000 feet, and volcanic soils produces tea with an unmatched balance of crisp citrus notes, bright liquor, and natural sweetness.',
    category: 'Origin & Terroir'
  },
  {
    question: 'How do I know my tea is authentic Single-Estate Ceylon tea?',
    answer: 'Every CEYLORA tin carries the prestigious government-certified "Ceylon Lion Logo with 17 Leaves", which guarantees 100% pure Ceylon tea grown, manufactured, and packaged in Sri Lanka without blending foreign commodity teas. In addition, every tin features a batch QR code tracing to the exact estate GPS coordinates.',
    category: 'Origin & Terroir'
  },
  {
    question: 'What is the optimal water and temperature for brewing Ceylon tea?',
    answer: 'We advocate for soft, mineral-balanced spring water (TDS 30–80 ppm). For delicate white and green teas, steep at 75°C–80°C to avoid scorching amino acids. For our high-grown black teas and reserves, use water just off the boil at 95°C–98°C for 3 to 4 minutes.',
    category: 'Brewing & Storage'
  },
  {
    question: 'How should I store loose-leaf tea to preserve freshness?',
    answer: 'Keep the tea in our UV-shielded, double-seal matte metal canisters. Store away from direct sunlight, moisture, spice cabinets, and strong aromas. When kept airtight, high-grade orthodox Ceylon black teas mature gracefully for up to 3 years.',
    category: 'Brewing & Storage'
  },
  {
    question: 'What are CEYLORA’s sustainability and community pledges?',
    answer: 'We practice regenerative agriculture, soil enrichment without chemical pesticides, and 100% plastic-free recyclable tin packaging. Furthermore, 5% of all CEYLORA proceeds fund education and healthcare clinics for our plucking communities in the Nuwara Eliya highlands.',
    category: 'Orders & Sustainability'
  },
  {
    question: 'Do you offer worldwide express shipping?',
    answer: 'Yes. We ship worldwide via DHL Carbon Neutral Express. Orders to North America, Europe, East Asia, and the Middle East typically arrive within 3 to 5 business days, packaged in protective climate-sealed luxury cartons with tracking provided upon dispatch.',
    category: 'Orders & Sustainability'
  }
];

export const CELEBRATED_ESTATES = [
  {
    name: 'Pedro Estate',
    elevation: '6,240 ft',
    region: 'Nuwara Eliya',
    character: 'Crisp, floral, light golden cup, notes of wild eucalyptus',
    climate: 'Chilly misty mornings, high UV intensity'
  },
  {
    name: 'Dimbula Crest',
    elevation: '4,500 ft',
    region: 'Dimbula Valley',
    character: 'Bold amber liquor, brisk citrus brightness, velvety body',
    climate: 'Southwest monsoon winds and dry clean winters'
  },
  {
    name: 'Adam’s Peak Sacred Foothills',
    elevation: '5,800 ft',
    region: 'Maskeliya Sanctuary',
    character: 'Silver tips, floral nectar, whisper-light honeysuckle',
    climate: 'Protected highland sanctuary fed by natural glacial streams'
  },
  {
    name: 'Uva Highland Ridge',
    elevation: '4,100 ft',
    region: 'Eastern Highlands',
    character: 'Exotic wintergreen, menthol finish, rich copper color',
    climate: 'Dry Cachan winds blowing through mid-summer'
  }
];
