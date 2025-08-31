// server/seeds/seedProducts.js
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

// 1. Load .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 2. Debug logs
console.log('Working Dir:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Using MONGO_URI:', process.env.MONGO_URI);

// 3. Product data with ObjectId casting
const products = [
  {
    _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a120'),
    name: 'Organic Rolled Oats',
    price: 200,
    category: 'Grains',
    imageUrl: '/images/ots.jpeg',
    description: '100% whole grain oats, rich in beta-glucan fiber to support heart health and digestion.',
    nutrition: {
      calories: 307,
      protein: '10.7g',
      fiber: '8.1g',
      carbs: '54.8g',
      fat: '5.3g'
    },
    ingredients: ['Organic rolled oats'],
    benefits: [
      'Lowers LDL cholesterol',
      'Improves insulin sensitivity',
      'Keeps you full longer'
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a121'),
    name: 'Quinoa 500g',
    price: 300,
    category: 'Grains',
    imageUrl: '/images/quinoa.webp',
    description: 'A complete plant-based protein source, quinoa is gluten-free and packed with fiber and minerals.',
    nutrition: {
      calories: 368,
      protein: '14g',
      fiber: '7g',
      carbs: '64g',
      fat: '6g'
    },
    ingredients: ['100% whole grain quinoa'],
    benefits: [
      'Supports muscle repair',
      'Improves gut health',
      'Rich in magnesium and iron'
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a122'),
    name: 'Brown Rice 1kg',
    price: 180,
    category: 'Grains',
    imageUrl: '/images/brown-rice.jpeg',
    description: 'Unpolished whole grain rice with bran intact, offering slow-digesting carbs and essential nutrients.',
    nutrition: {
      calories: 216,
      protein: '5g',
      fiber: '3.5g',
      carbs: '45g',
      fat: '1.8g'
    },
    ingredients: ['Whole grain brown rice'],
    benefits: [
      'Supports sustained energy',
      'Helps regulate blood sugar',
      'Good source of manganese'
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a123'),
    name: 'Millet Mix 500g',
    price: 220,
    category: 'Grains',
    imageUrl: '/images/millet-mix.jpeg',
    description: 'A blend of nutrient-dense millets including ragi, bajra, and jowar—ideal for gluten-free diets.',
    nutrition: {
      calories: 350,
      protein: '11g',
      fiber: '9g',
      carbs: '65g',
      fat: '4g'
    },
    ingredients: ['Finger millet', 'Pearl millet', 'Sorghum'],
    benefits: [
      'Boosts bone strength',
      'Improves digestion',
      'Naturally gluten-free'
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a124'),
    name: 'Whole Wheat Flour 1kg',
    price: 90,
    category: 'Grains',
    imageUrl: '/images/wheat-flour.jpeg',
    description: 'Stone-ground whole wheat flour with bran and germ intact—perfect for fiber-rich rotis and breads.',
    nutrition: {
      calories: 340,
      protein: '13g',
      fiber: '10g',
      carbs: '72g',
      fat: '2g'
    },
    ingredients: ['Whole wheat grain'],
    benefits: [
      'Supports digestive health',
      'Improves satiety',
      'Rich in B vitamins'
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a125'),
    name: 'Buckwheat 500g',
    price: 260,
    category: 'Grains',
    imageUrl: '/images/buckwheat.jpeg',
    description: 'A pseudo-grain rich in antioxidants and rutin, buckwheat is great for heart and blood pressure support.',
    nutrition: {
      calories: 343,
      protein: '13g',
      fiber: '10g',
      carbs: '71g',
      fat: '3.4g'
    },
    ingredients: ['Whole buckwheat groats'],
    benefits: [
      'Improves circulation',
      'Supports heart health',
      'Gluten-free and high in fiber'
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a126'),
    name: 'Mixed Nuts (200g)',
    price: 350,
    category: 'Snacks',
    imageUrl: '/images/mixed-nuts.jpeg',
    description: 'A crunchy blend of almonds, cashews, walnuts, and pistachios—perfect for snacking or adding to meals.',
    nutrition: {
      calories: 583,
      protein: '20g',
      fiber: '7g',
      carbs: '21g',
      fat: '50g'
    },
    ingredients: ['Almonds', 'Cashews', 'Walnuts', 'Pistachios'],
    benefits: [
      'Supports brain health',
      'Rich in healthy fats',
      'Boosts energy levels'
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a127'),
    name: 'Keto Protein Bars (Box of 6)',
    price: 250,
    category: 'Snacks',
    imageUrl: '/images/keto-bars.jpeg',
    description: 'Low-carb, high-protein bars designed to fuel your workouts and keep you in ketosis.',
    nutrition: {
      calories: 180,
      protein: '12g',
      fiber: '5g',
      carbs: '8g',
      fat: '10g'
    },
    ingredients: ['Whey protein isolate', 'Almond flour', 'Cocoa', 'Stevia'],
    benefits: [
      'Supports muscle recovery',
      'Keeps you full longer',
      'Ideal for keto diets'
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a128'),
    name: 'Roasted Chickpeas',
    price: 150,
    category: 'Snacks',
    imageUrl: '/images/roasted-chickpeas.webp',
    description: 'Crispy roasted chickpeas seasoned with herbs—high in plant protein and fiber.',
    nutrition: {
      calories: 119,
      protein: '6g',
      fiber: '5g',
      carbs: '18g',
      fat: '2g'
    },
    ingredients: ['Chickpeas', 'Olive oil', 'Sea salt', 'Spices'],
    benefits: [
      'Improves digestion',
      'Supports weight management',
      'Great source of plant protein'
    ]
  },
  {
    _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a129'),
    name: 'Trail Mix (150g)',
    price: 200,
    category: 'Snacks',
    imageUrl: '/images/trail-mix.jpeg',
    description: 'A balanced mix of dried fruits, seeds, and nuts—perfect for on-the-go nutrition.',
    nutrition: {
      calories: 450,
      protein: '12g',
      fiber: '6g',
      carbs: '35g',
      fat: '30g'
    },
    ingredients: ['Raisins', 'Pumpkin seeds', 'Almonds', 'Cranberries'],
    benefits: [
      'Boosts stamina',
      'Provides quick energy',
      'Rich in antioxidants'
    ]
  },
  
{
_id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a130'),
  name: 'Baked Veggie Chips',
  price: 180,
  category: 'Snacks',
  imageUrl: '/images/veggie-chips.jpeg',
  description: 'Thinly sliced vegetables baked to perfection—low in oil, high in crunch.',
  nutrition: {
    calories: 130,
    protein: '2g',
    fiber: '3g',
    carbs: '18g',
    fat: '6g'
  },
  ingredients: ['Sweet potato', 'Beetroot', 'Carrot', 'Olive oil'],
  benefits: [
    'Low in saturated fat',
    'Supports eye health',
    'Better alternative to fried chips'
  ]
},
{
    _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a131'),
      name: 'Granola Clusters',
  price: 220,
  category: 'Snacks',
  imageUrl: '/images/granola-clusters.jpeg',
  description: 'Crunchy oat-based clusters with nuts and seeds—ideal for breakfast or snacking.',
  nutrition: {
    calories: 210,
    protein: '5g',
    fiber: '4g',
    carbs: '28g',
    fat: '9g'
  },
  ingredients: ['Rolled oats', 'Honey', 'Sunflower seeds', 'Almonds'],
  benefits: [
    'Supports heart health',
    'Provides sustained energy',
    'Rich in dietary fiber'
  ]
},


  //  Beverages
 {
    _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a132'),
      name: 'Green Tea Pack (25 bags)',
  price: 200,
  category: 'Beverages',
  imageUrl: '/images/green-tea.jpeg',
  description: 'A soothing blend of antioxidant-rich green tea leaves to refresh and detox your body.',
  nutrition: {
    calories: 2,
    protein: '0g',
    fiber: '0g',
    carbs: '0g',
    fat: '0g'
  },
  ingredients: ['Green tea leaves'],
  benefits: [
    'Boosts metabolism',
    'Supports fat burning',
    'Rich in antioxidants'
  ]
},
{
_id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a133'),
  name: 'Lemon Detox Tea (20 bags)',
  price: 250,
  category: 'Beverages',
  imageUrl: '/images/lemon-detox-tea.jpeg',
  description: 'A zesty herbal infusion with lemon peel and ginger—perfect for cleansing and hydration.',
  nutrition: {
    calories: 5,
    protein: '0g',
    fiber: '0g',
    carbs: '1g',
    fat: '0g'
  },
  ingredients: ['Lemon peel', 'Ginger root', 'Green tea'],
  benefits: [
    'Flushes out toxins',
    'Improves digestion',
    'Hydrates and energizes'
  ]
},
{
_id: new mongoose.Types.ObjectId ('64f7a1c9e2b3a8c1d4f9a134'),
  name: 'Herbal Coffee (200g)',
  price: 350,
  category: 'Beverages',
  imageUrl: '/images/herbal-coffee.jpeg',
  description: 'A caffeine-free coffee alternative made from roasted herbs and roots—smooth and gut-friendly.',
  nutrition: {
    calories: 20,
    protein: '0g',
    fiber: '1g',
    carbs: '4g',
    fat: '0g'
  },
  ingredients: ['Chicory root', 'Barley', 'Dandelion root'],
  benefits: [
    'Supports liver health',
    'Improves gut flora',
    'No caffeine crash'
  ]
},
{
      _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a135'),
  name: 'Cold Brew Coffee Concentrate',
  price: 320,
  category: 'Beverages',
  imageUrl: '/images/cold-brew.jpeg',
  description: 'Smooth, low-acid cold brew made from premium Arabica beans—perfect for iced coffee lovers.',
  nutrition: {
    calories: 5,
    protein: '0g',
    fiber: '0g',
    carbs: '1g',
    fat: '0g'
  },
  ingredients: ['Arabica coffee beans', 'Filtered water'],
  benefits: [
    'Gentle on stomach',
    'Boosts alertness',
    'Rich in antioxidants'
  ]
},
{
_id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a136'),
  name: 'Coconut Water (500ml)',
  price: 120,
  category: 'Beverages',
  imageUrl: '/images/coconut-water.jpeg',
  description: 'Naturally hydrating coconut water packed with electrolytes—ideal for post-workout recovery.',
  nutrition: {
    calories: 45,
    protein: '0g',
    fiber: '0g',
    carbs: '11g',
    fat: '0g'
  },
  ingredients: ['100% tender coconut water'],
  benefits: [
    'Restores hydration',
    'Balances electrolytes',
    'Low in calories'
  ]
},
{
_id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a137'),
  name: 'Detox Juice (Spinach + Apple)',
  price: 180,
  category: 'Beverages',
  imageUrl: '/images/detox-juice.jpeg',
  description: 'A refreshing blend of spinach, apple, and lemon—designed to cleanse and energize your system.',
  nutrition: {
    calories: 60,
    protein: '1g',
    fiber: '2g',
    carbs: '14g',
    fat: '0g'
  },
  ingredients: ['Spinach', 'Apple', 'Lemon juice'],
  benefits: [
    'Supports liver detox',
    'Boosts immunity',
    'Rich in vitamin C and iron'
  ]
},


  // Dairy
 {
  _id: new mongoose.Types.ObjectId ('64f7a1c9e2b3a8c1d4f9a138'),
  name: 'Greek Yogurt 500g',
  price: 120,
  category: 'Dairy',
  imageUrl: '/images/greek-yogurt.jpeg',
  description: 'Thick and creamy Greek yogurt with double the protein of regular yogurt—perfect for breakfast or smoothies.',
  nutrition: {
    calories: 100,
    protein: '10g',
    fiber: '0g',
    carbs: '6g',
    fat: '5g'
  },
  ingredients: ['Pasteurized milk', 'Live active cultures'],
  benefits: [
    'Supports gut health',
    'High in calcium and protein',
    'Improves digestion'
  ]
},
{
_id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a139'),
  name: 'Almond Milk (Unsweetened)',
  price: 180,
  category: 'Dairy',
  imageUrl: '/images/almond-milk.jpeg',
  description: 'Plant-based milk alternative made from almonds—low in calories and naturally lactose-free.',
  nutrition: {
    calories: 30,
    protein: '1g',
    fiber: '0g',
    carbs: '1g',
    fat: '2.5g'
  },
  ingredients: ['Almonds', 'Filtered water', 'Sea salt'],
  benefits: [
    'Good for lactose intolerance',
    'Low in sugar',
    'Rich in vitamin E'
  ]
},
{
 _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a140'),
  name: 'Low-Fat Paneer 200g',
  price: 90,
  category: 'Dairy',
  imageUrl: '/images/paneer.jpeg',
  description: 'Soft, low-fat Indian cottage cheese—great source of vegetarian protein for curries and snacks.',
  nutrition: {
    calories: 150,
    protein: '18g',
    fiber: '0g',
    carbs: '2g',
    fat: '8g'
  },
  ingredients: ['Pasteurized milk', 'Citric acid'],
  benefits: [
    'Supports muscle growth',
    'High in calcium',
    'Low in carbs'
  ]
},
{
  _id: new mongoose.Types.ObjectId ('64f7a1c9e2b3a8c1d4f9a141'),
  name: 'Probiotic Curd 500g',
  price: 70,
  category: 'Dairy',
  imageUrl: '/images/probiotic-curd.jpeg',
  description: 'Traditional curd enriched with probiotics—helps maintain gut flora and improve digestion.',
  nutrition: {
    calories: 90,
    protein: '4g',
    fiber: '0g',
    carbs: '6g',
    fat: '5g'
  },
  ingredients: ['Milk', 'Probiotic cultures'],
  benefits: [
    'Boosts immunity',
    'Improves gut health',
    'Helps nutrient absorption'
  ]
},
{
_id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a142'),
  name: 'Cottage Cheese Cubes',
  price: 140,
  category: 'Dairy',
  imageUrl: '/images/cottage-cheese.jpeg',
  description: 'Fresh cottage cheese cubes—mild flavor and soft texture, ideal for salads and wraps.',
  nutrition: {
    calories: 98,
    protein: '11g',
    fiber: '0g',
    carbs: '3g',
    fat: '4g'
  },
  ingredients: ['Milk', 'Salt', 'Rennet'],
  benefits: [
    'Supports bone health',
    'Low in fat',
    'High in protein'
  ]
},
{
    _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a143'),
  name: 'Soy Milk (Vanilla)',
  price: 160,
  category: 'Dairy',
  imageUrl: '/images/soy-milk.jpeg',
  description: 'Vanilla-flavored soy milk—rich in plant protein and fortified with calcium and vitamin D.',
  nutrition: {
    calories: 80,
    protein: '7g',
    fiber: '1g',
    carbs: '4g',
    fat: '4g'
  },
  ingredients: ['Soybeans', 'Filtered water', 'Natural vanilla flavor'],
  benefits: [
    'Supports heart health',
    'Lowers cholesterol',
    'Great dairy alternative'
  ]
},


  // Supplements
  {
     _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a144'),
  name: 'Whey Protein Powder',
  price: 1500,
  category: 'Supplements',
  imageUrl: '/images/whey-protein.jpeg',
  description: 'High-quality whey protein isolate with 24g protein per scoop—ideal for muscle recovery and lean gains.',
  nutrition: {
    calories: 120,
    protein: '24g',
    fiber: '0g',
    carbs: '2g',
    fat: '1g'
  },
  ingredients: ['Whey protein isolate', 'Natural flavor', 'Stevia'],
  benefits: [
    'Supports muscle growth',
    'Speeds up recovery',
    'Low in carbs and fat'
  ]
},
{
     _id: new mongoose.Types.ObjectId ('64f7a1c9e2b3a8c1d4f9a145'),
  name: 'Multivitamin Gummies',
  price: 600,
  category: 'Supplements',
  imageUrl: '/images/multivitamin.jpeg',
  description: 'Delicious fruit-flavored gummies packed with essential vitamins and minerals for daily wellness.',
  nutrition: {
    calories: 15,
    protein: '0g',
    fiber: '0g',
    carbs: '4g',
    fat: '0g'
  },
  ingredients: ['Vitamin A, C, D, E, B-complex', 'Pectin', 'Natural flavors'],
  benefits: [
    'Boosts immunity',
    'Fills nutritional gaps',
    'Easy to consume daily'
  ]
},
{
     _id: new mongoose.Types.ObjectId ('64f7a1c9e2b3a8c1d4f9a146'),
  name: 'Omega-3 Capsules (60 count)',
  price: 850,
  category: 'Supplements',
  imageUrl: '/images/omega3.jpeg',
  description: 'Pure fish oil capsules rich in EPA and DHA—supports heart, brain, and joint health.',
  nutrition: {
    calories: 10,
    protein: '0g',
    fiber: '0g',
    carbs: '0g',
    fat: '1g'
  },
  ingredients: ['Fish oil', 'Gelatin capsule', 'Vitamin E'],
  benefits: [
    'Reduces inflammation',
    'Improves brain function',
    'Supports cardiovascular health'
  ]
},
{
      _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a147'),
  name: 'Vitamin D3 Drops',
  price: 300,
  category: 'Supplements',
  imageUrl: '/images/vitamin-d3.jpeg',
  description: 'Liquid vitamin D3 for better absorption—supports bone strength and immune function.',
  nutrition: {
    calories: 0,
    protein: '0g',
    fiber: '0g',
    carbs: '0g',
    fat: '0g'
  },
  ingredients: ['Vitamin D3 (cholecalciferol)', 'MCT oil'],
  benefits: [
    'Strengthens bones',
    'Boosts immunity',
    'Improves calcium absorption'
  ]
},
{
     _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a148'),
  name: 'Electrolyte Hydration Mix',
  price: 220,
  category: 'Supplements',
  imageUrl: '/images/electrolyte-mix.jpeg',
  description: 'Fast-acting hydration formula with sodium, potassium, and magnesium—perfect for workouts and recovery.',
  nutrition: {
    calories: 25,
    protein: '0g',
    fiber: '0g',
    carbs: '6g',
    fat: '0g'
  },
  ingredients: ['Sodium citrate', 'Potassium chloride', 'Magnesium sulfate', 'Natural flavor'],
  benefits: [
    'Prevents dehydration',
    'Replenishes electrolytes',
    'Improves endurance'
  ]
},
{
      _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a149'),
  name: 'Collagen Peptides Powder',
  price: 950,
  category: 'Supplements',
  imageUrl: '/images/collagen.jpeg',
  description: 'Unflavored collagen peptides to support skin elasticity, joint health, and hair strength.',
  nutrition: {
    calories: 70,
    protein: '18g',
    fiber: '0g',
    carbs: '0g',
    fat: '0g'
  },
  ingredients: ['Hydrolyzed collagen peptides'],
  benefits: [
    'Improves skin texture',
    'Supports joint mobility',
    'Strengthens hair and nails'
  ]
},

  // Spreads & Sweeteners
  {
     _id: new mongoose.Types.ObjectId ('64f7a1c9e2b3a8c1d4f9a150'),
  name: 'Almond Butter 250g',
  price: 500,
  category: 'Spreads',
  imageUrl: '/images/almond-butter.jpeg',
  description: 'Creamy almond butter made from slow-roasted almonds—rich in healthy fats and protein.',
  nutrition: {
    calories: 190,
    protein: '7g',
    fiber: '3g',
    carbs: '6g',
    fat: '16g'
  },
  ingredients: ['Roasted almonds'],
  benefits: [
    'Supports heart health',
    'Boosts energy',
    'Good source of vitamin E'
  ]
},
{
      _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a151'),
  name: 'Peanut Butter (No Sugar)',
  price: 280,
  category: 'Spreads',
  imageUrl: '/images/peanut-butter.jpeg',
  description: 'Natural peanut butter with no added sugar—perfect for smoothies, toast, or post-workout snacks.',
  nutrition: {
    calories: 180,
    protein: '8g',
    fiber: '2g',
    carbs: '5g',
    fat: '15g'
  },
  ingredients: ['Roasted peanuts'],
  benefits: [
    'High in protein',
    'Supports muscle recovery',
    'Low glycemic index'
  ]
},
{
     _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a152'),
  name: 'Organic Honey 250g',
  price: 250,
  category: 'Sweeteners',
  imageUrl: '/images/honey.jpeg',
  description: 'Raw, unfiltered honey sourced from organic farms—rich in antioxidants and natural enzymes.',
  nutrition: {
    calories: 64,
    protein: '0g',
    fiber: '0g',
    carbs: '17g',
    fat: '0g'
  },
  ingredients: ['100% organic honey'],
  benefits: [
    'Natural energy booster',
    'Soothes sore throat',
    'Supports immunity'
  ]
},
{
      _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a153'),
  name: 'Stevia Natural Sweetener',
  price: 150,
  category: 'Sweeteners',
  imageUrl: '/images/stevia.jpeg',
  description: 'Zero-calorie sweetener derived from stevia leaves—ideal for diabetics and low-carb diets.',
  nutrition: {
    calories: 0,
    protein: '0g',
    fiber: '0g',
    carbs: '0g',
    fat: '0g'
  },
  ingredients: ['Stevia leaf extract'],
  benefits: [
    'No impact on blood sugar',
    'Safe for diabetics',
    'Zero calories'
  ]
},
{
      _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a154'),
  name: 'Date Syrup 300ml',
  price: 320,
  category: 'Sweeteners',
  imageUrl: '/images/date-syrup.jpeg',
  description: 'Thick, caramel-like syrup made from pure dates—rich in potassium and iron.',
  nutrition: {
    calories: 60,
    protein: '0g',
    fiber: '1g',
    carbs: '16g',
    fat: '0g'
  },
  ingredients: ['100% dates'],
  benefits: [
    'Natural sweetener',
    'Supports digestion',
    'Rich in minerals'
  ]
},
{
      _id: new mongoose.Types.ObjectId('64f7a1c9e2b3a8c1d4f9a155'),
  name: 'Maple Syrup (Pure)',
  price: 450,
  category: 'Sweeteners',
  imageUrl: '/images/maple-syrup.jpeg',
  description: 'Grade A pure maple syrup tapped from Canadian trees—rich in manganese and antioxidants.',
  nutrition: {
    calories: 52,
    protein: '0g',
    fiber: '0g',
    carbs: '13g',
    fat: '0g'
  },
  ingredients: ['100% pure maple syrup'],
  benefits: [
    'Natural alternative to sugar',
    'Contains antioxidants',
    'Supports bone health'
  ]
}];

(async () => {
  try {
    // 3. Connect (with fallback)
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/aifitdb';
    await mongoose.connect(uri, {
      useNewUrlParser:    true,
      useUnifiedTopology: true
    });

    console.log(' MongoDB Connected:', uri);

    await Product.deleteMany({});
    console.log(' Cleared products');

    const inserted = await Product.insertMany(products);
    console.log(' Seeded products:', inserted.map(p => p.name));
  } catch (err) {
    console.error('Seeding Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log(' Disconnected');
    process.exit();
  }
})();
