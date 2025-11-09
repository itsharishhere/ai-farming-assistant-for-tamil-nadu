export interface KnowledgeDocument {
  id: string;
  title: string;
  content: string;
  category: "crop_cultivation" | "pest_management" | "weather" | "government_schemes" | "irrigation" | "fertilizer";
  crops?: string[];
  region?: string[];
}

export const knowledgeBase: KnowledgeDocument[] = [
  // Rice Cultivation
  {
    id: "rice-cultivation-1",
    title: "Rice Cultivation Guide for Tamil Nadu",
    content: "Rice (நெல்) is the primary crop in Tamil Nadu, especially in Cauvery Delta Zone. For cultivation: Prepare field by puddling and leveling. Sow seeds in nursery 25-30 days before transplanting. Transplant seedlings at 15x15 cm spacing. Apply basal fertilizer: 25kg urea, 50kg DAP, 25kg MOP per acre. Maintain 2-3 inches water level throughout growing period. First top dressing at 20-25 days, second at 40-45 days. Harvest when 80% grains turn golden yellow, typically 120-140 days after transplanting.",
    category: "crop_cultivation",
    crops: ["Rice (நெல்)"],
    region: ["Cauvery Delta Zone", "North Eastern Zone"]
  },
  {
    id: "rice-pest-1",
    title: "Rice Pest Management - Stem Borer",
    content: "Stem borer is a major pest in Tamil Nadu rice fields. Symptoms: Dead hearts in vegetative stage, white ears in reproductive stage. Prevention: Use light traps, release egg parasitoid Trichogramma japonicum @ 50,000/acre at weekly intervals. Chemical control: Apply Cartap hydrochloride 50% SP @ 400g/acre or Chlorantraniliprole 18.5% SC @ 60ml/acre. Apply at early infestation stage for best results.",
    category: "pest_management",
    crops: ["Rice (நெல்)"]
  },
  {
    id: "rice-irrigation-1",
    title: "Rice Irrigation Schedule",
    content: "Rice requires continuous submergence during growing period. Maintain 2-3 inches standing water from transplanting to 10 days before harvest. In clay soil, irrigate every 3-4 days. In sandy loam soil, irrigate every 2-3 days. Drain field completely 10 days before harvest to facilitate harvesting and improve grain quality. Total water requirement: 4-5 feet throughout season.",
    category: "irrigation",
    crops: ["Rice (நெல்)"]
  },

  // Sugarcane Cultivation
  {
    id: "sugarcane-cultivation-1",
    title: "Sugarcane Cultivation in Tamil Nadu",
    content: "Sugarcane (கரும்பு) thrives in Western and Southern zones. Planting: Use 3-budded setts, plant in furrows 30-45cm deep at 90cm row spacing. Apply farmyard manure 12.5 tons per acre. Fertilizer application: Basal - 75kg urea, 125kg SSP, 50kg MOP. First top dressing at 30 days - 75kg urea. Second at 60 days - 75kg urea. Third at 90 days - 75kg urea, 50kg MOP. Earthing up at 90-120 days. Harvest at 10-12 months when Brix reaches 18-20.",
    category: "crop_cultivation",
    crops: ["Sugarcane (கரும்பு)"],
    region: ["Western Zone", "Southern Zone", "Cauvery Delta Zone"]
  },
  {
    id: "sugarcane-pest-1",
    title: "Sugarcane Early Shoot Borer Management",
    content: "Early shoot borer attacks young sugarcane causing dead hearts. Prevention: Remove and destroy affected shoots. Use resistant varieties like Co 86032. Biological control: Release Trichogramma chilonis egg parasitoid @ 50,000/acre. Chemical control: Spray Chlorantraniliprole 0.4% GR @ 4kg/acre in leaf whorl at 30 and 60 days after planting.",
    category: "pest_management",
    crops: ["Sugarcane (கரும்பு)"]
  },
  {
    id: "sugarcane-irrigation-1",
    title: "Sugarcane Water Management",
    content: "Sugarcane requires regular irrigation throughout growth. Critical stages: Germination, tillering, and grand growth phase. In black soil, irrigate at 7-8 day intervals. In red soil, every 5-6 days. Provide 8-10 irrigations during formative phase (first 120 days), 10-12 during grand growth phase (120-270 days). Stop irrigation 15 days before harvest. Drip irrigation saves 40% water and increases yield by 20%.",
    category: "irrigation",
    crops: ["Sugarcane (கரும்பு)"]
  },

  // Cotton Cultivation
  {
    id: "cotton-cultivation-1",
    title: "Cotton Cultivation Guide",
    content: "Cotton (பருத்தி) is grown in Southern, Western, and North Western zones. Sowing: May-June for rainfed, September-October for irrigated. Spacing: 90x60cm for desi, 120x60cm for Bt cotton. Apply basal fertilizer: 25kg N, 50kg P2O5, 25kg K2O per acre. Top dress with 25kg N at 30 and 60 days. Spray NAA 40ppm at 60 and 90 days to reduce flower drop. Pick cotton when bolls open fully, conduct 4-5 pickings.",
    category: "crop_cultivation",
    crops: ["Cotton (பருத்தி)"],
    region: ["Southern Zone", "Western Zone", "North Western Zone"]
  },
  {
    id: "cotton-pest-1",
    title: "Cotton Bollworm Management",
    content: "Bollworm complex (Helicoverpa, Spodoptera) is major pest in Tamil Nadu cotton. Monitoring: Install pheromone traps @ 5/acre. Threshold: 2 larvae per plant. Biological control: Release Chrysoperla carnea @ 50,000/acre. Spray NSKE 5% or neem oil 2%. Chemical control if needed: Spray Emamectin benzoate 5% SG @ 80g/acre or Spinosad 45% SC @ 75ml/acre. Alternate sprays to prevent resistance.",
    category: "pest_management",
    crops: ["Cotton (பருத்தி)"]
  },

  // Groundnut Cultivation
  {
    id: "groundnut-cultivation-1",
    title: "Groundnut Cultivation in Tamil Nadu",
    content: "Groundnut (நிலக்கடலை) is cultivated in all zones of Tamil Nadu. Seasons: June-July (rainy), September-October (post-rainy), January-February (summer). Seed rate: 40kg/acre for spreading type, 60kg/acre for bunch type. Spacing: 30x10cm. Apply gypsum 200kg/acre at flowering stage. Fertilizer: 10kg N, 20kg P2O5, 30kg K2O per acre as basal. Harvest when leaves turn yellow and pods show dark inner shell markings, typically at 110-120 days.",
    category: "crop_cultivation",
    crops: ["Groundnut (நிலக்கடலை)"]
  },
  {
    id: "groundnut-pest-1",
    title: "Groundnut Leaf Miner Management",
    content: "Leaf miner causes serpentine mines on leaves reducing photosynthesis. Cultural control: Deep summer ploughing destroys pupae. Remove alternate hosts. Biological control: Conserve parasitoids Neochrysocharis formosa. Chemical control at economic threshold: Spray Profenophos 50% EC @ 400ml/acre or Triazophos 40% EC @ 400ml/acre.",
    category: "pest_management",
    crops: ["Groundnut (நிலக்கடலை)"]
  },

  // Weather-based Recommendations
  {
    id: "weather-monsoon-1",
    title: "Southwest Monsoon Farming Tips",
    content: "During Southwest Monsoon (June-September) in Tamil Nadu: Plant rainfed crops like cotton, groundnut, pulses, millets. Ensure field drainage to prevent waterlogging. Delay fertilizer application if heavy rains expected. Monitor for blast in rice during cloudy humid weather. Apply prophylactic sprays for fungal diseases. Store harvested produce properly as humidity increases pest attack.",
    category: "weather",
    region: ["All zones"]
  },
  {
    id: "weather-northeast-1",
    title: "Northeast Monsoon Farming Guidelines",
    content: "Northeast Monsoon (October-December) is crucial for Tamil Nadu agriculture. 50% of annual rainfall occurs now. Ideal for: Rice cultivation in delta areas, vegetable cultivation, rabi crops. Prepare fields before monsoon onset. Ensure seed treatment to prevent seed-borne diseases. Create drainage channels to manage excess water. Monitor weather forecasts for cyclone warnings and harvest crops preemptively if cyclone expected.",
    category: "weather",
    region: ["All zones"]
  },
  {
    id: "weather-summer-1",
    title: "Summer Season Crop Management",
    content: "Tamil Nadu summer (March-May) requires careful water management. Suitable crops: Groundnut, sunflower, green gram, black gram, vegetables. Practice mulching to conserve soil moisture. Irrigate during cooler hours (early morning/evening). Use micro-irrigation for water efficiency. Apply light irrigation frequently rather than heavy irrigation at long intervals. Monitor for sucking pests which increase in hot weather.",
    category: "weather"
  },

  // Government Schemes
  {
    id: "scheme-pmksy-1",
    title: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
    content: "PMKSY provides financial assistance for micro-irrigation systems. Benefits: 60% subsidy for small/marginal farmers, 50% for other farmers on drip and sprinkler irrigation. Assistance for farm ponds, check dams. Apply through Agricultural Department district offices. Documents needed: Land records, Aadhaar, bank account details. Scheme improves water use efficiency and increases crop yield by 40-50%.",
    category: "government_schemes"
  },
  {
    id: "scheme-soil-health-1",
    title: "Soil Health Card Scheme",
    content: "Free soil testing every 2 years under Soil Health Card Scheme in Tamil Nadu. Tests soil for NPK, micronutrients, pH, organic carbon. Provides crop-wise fertilizer recommendations. Collect samples and submit at nearest Soil Testing Laboratory or through Agricultural Extension Officer. Results provided in 15 days. Follow recommendations to reduce fertilizer cost by 20% and increase yield by 15%.",
    category: "government_schemes"
  },
  {
    id: "scheme-crop-insurance-1",
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    content: "Crop insurance scheme covering yield loss due to natural calamities, pests, diseases. Premium: 2% for kharif crops, 1.5% for rabi crops. Covers all food crops, oilseeds, commercial crops. Enrollment through banks, cooperative societies, or online portal. Claim settlement within 2 months. Mandatory for farmers with institutional credit, voluntary for others. Protects farmers from financial loss.",
    category: "government_schemes"
  },
  {
    id: "scheme-kisan-credit-1",
    title: "Kisan Credit Card (KCC) Scheme",
    content: "KCC provides credit for agricultural needs at subsidized interest rates. Benefits: Credit limit based on land holding and crops grown. Interest rate: 7% per annum. Additional 3% interest subvention for timely repayment, effectively 4% interest. Covers crop production, post-harvest expenses, household needs. Apply through commercial banks, RRBs, cooperative banks. Documents: Land records, Aadhaar, address proof.",
    category: "government_schemes"
  },

  // Fertilizer Management
  {
    id: "fertilizer-organic-1",
    title: "Organic Fertilizer and Manure Application",
    content: "Organic matter improves soil health and reduces chemical fertilizer dependency. Apply farmyard manure (FYM) 10-12.5 tons per acre as basal. Vermicompost 5 tons per acre enriches soil microbes. Green manuring with Dhaincha, Sunhemp 25kg seed per acre, incorporate at 40-45 days. Composting: Mix crop residues, cow dung 1:1 ratio, turn every 15 days, ready in 90 days. Biofertilizers: Azospirillum, Phosphobacteria 2kg each per acre, mix with FYM and apply.",
    category: "fertilizer"
  },
  {
    id: "fertilizer-micro-1",
    title: "Micronutrient Management in Tamil Nadu Soils",
    content: "Tamil Nadu soils commonly deficient in zinc, boron, iron. Zinc deficiency: Apply ZnSO4 12.5kg/acre basally or spray 0.5% ZnSO4 solution. Boron deficiency causes hollow stem in groundnut, bud necrosis in vegetables: Spray borax 0.2% at flowering. Iron chlorosis in groundnut, citrus: Spray FeSO4 0.5% + citric acid 0.1%. Soil application of micronutrient mixture 12.5kg/acre every 3 years improves crop health.",
    category: "fertilizer"
  },

  // Banana Cultivation
  {
    id: "banana-cultivation-1",
    title: "Banana Cultivation in Tamil Nadu",
    content: "Banana (வாழை) is grown extensively in Tamil Nadu. Popular varieties: Robusta, Rasthali, Poovan, Red Banana, Karpuravalli. Planting: Prepare pits 45x45x45cm, plant suckers at 1.8x1.8m spacing. Apply FYM 10kg per pit. Fertilizer schedule: Apply 200g N, 60g P, 300g K per plant in 8 split doses monthly. Desuckering: Retain one follower sucker. Propping at shooting stage. Harvest when fingers are full and rounded, typically 12-13 months after planting.",
    category: "crop_cultivation",
    crops: ["Banana (வாழை)"],
    region: ["All zones"]
  },
  {
    id: "banana-pest-1",
    title: "Banana Pseudostem Weevil Management",
    content: "Pseudostem weevil causes tunneling in pseudostem, plant toppling. Prevention: Use healthy suckers. Apply neem cake 250g per plant. Place pseudostem traps: Cut plant after harvest, split and keep in field to attract weevils, destroy after 15 days. Chemical control: Inject Chlorpyriphos 20% EC 2ml in 2ml water into pseudostem at 2, 4, 6 months after planting. Apply Carbofuran 3% CG 40g per plant around base.",
    category: "pest_management",
    crops: ["Banana (வாழை)"]
  },

  // Coconut Cultivation
  {
    id: "coconut-cultivation-1",
    title: "Coconut Farming in Tamil Nadu",
    content: "Coconut (தென்னை) is cultivated across Tamil Nadu coastal and interior regions. Varieties: East Coast Tall, West Coast Tall, Chowghat Orange Dwarf, Hybrid coconuts. Planting: 7.5m x 7.5m spacing, 177 palms per hectare. Apply 50kg FYM, 500g urea, 1kg SSP, 2kg MOP per palm per year in 2-3 splits. Irrigate in summer at 7-10 day intervals. Mulch with coconut leaves. Harvest mature nuts every 45 days. Yields start from 5th year, full bearing from 10th year.",
    category: "crop_cultivation",
    crops: ["Coconut (தென்னை)"],
    region: ["Southern Zone", "Cauvery Delta Zone", "High Rainfall Zone"]
  },
  {
    id: "coconut-pest-1",
    title: "Rhinoceros Beetle Management in Coconut",
    content: "Rhinoceros beetle damages growing point causing V-shaped cuts on fronds. Cultural control: Remove and destroy decaying organic matter, breeding sites. Use pheromone traps. Biological control: Apply Metarhizium anisopliae @ 5g in 50ml water in crown, repeat every 45 days. Fill up breeding holes with sand and Sevin dust 5%. Chemical control: Apply naphthalene balls in crown during summer.",
    category: "pest_management",
    crops: ["Coconut (தென்னை)"]
  },

  // Turmeric Cultivation
  {
    id: "turmeric-cultivation-1",
    title: "Turmeric Cultivation Guide",
    content: "Turmeric (மஞ்சள்) is grown in Western and Hill zones of Tamil Nadu. Planting: May-June for rainfed, August-September for irrigated. Use 1250kg quality rhizomes per acre. Spacing 30x20cm. Apply FYM 10 tons per acre. Fertilizer: 40kg N, 20kg P, 80kg K per acre in 3 splits (basal, 45 days, 90 days). Earthing up at 60 and 120 days. Irrigate at 7-10 day intervals. Harvest when leaves turn yellow, 7-9 months for fresh turmeric, 10 months for dry turmeric.",
    category: "crop_cultivation",
    crops: ["Turmeric (மஞ்சள்)"],
    region: ["Western Zone", "Hill Zone"]
  },

  // General Pest Management
  {
    id: "ipm-general-1",
    title: "Integrated Pest Management (IPM) for Tamil Nadu Farmers",
    content: "IPM reduces pesticide use and cost while maintaining crop health. Steps: 1) Monitor fields regularly, identify pests correctly. 2) Use pest-resistant varieties. 3) Practice crop rotation. 4) Maintain field sanitation, remove crop residues. 5) Use biological control: Trichogramma, Chrysoperla, NPV. 6) Install yellow sticky traps, light traps, pheromone traps. 7) Use botanical pesticides: Neem, NSKE. 8) Chemical pesticides only at economic threshold level. 9) Alternate pesticides to prevent resistance. IPM reduces pesticide cost by 40% and increases farmer income by 25%.",
    category: "pest_management"
  },

  // Water Conservation
  {
    id: "water-conservation-1",
    title: "Water Conservation Techniques for Tamil Nadu",
    content: "Tamil Nadu faces water scarcity, efficient water management crucial. Techniques: 1) Drip irrigation: Saves 60% water, increases yield 30-40%. 2) Mulching: Reduces evaporation, maintains soil moisture. 3) Laser land leveling: Uniform water distribution, saves 20-25% water. 4) Farm ponds: Harvest rainwater for supplemental irrigation. 5) System of Rice Intensification (SRI): Saves 40% water in rice. 6) Alternate wetting and drying in rice. 7) Use short duration varieties. 8) Timely irrigation based on crop critical stages. Adopt drip/sprinkler for horticultural crops.",
    category: "irrigation"
  }
];
