const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Exercise = require('../models/Exercise');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const exercises = [
  {
    name: 'Jumping Jacks',
    category: 'Cardio',
    duration: 5,
    equipment: 'None',
    imageUrl: '/images/jumping-jacks.jpeg',
    description: 'A full-body warm-up exercise that increases heart rate.',
    benefits: ['Improves circulation', 'Boosts stamina'],
    level: 'Beginner'
  },
  {
    name: 'Push-Ups',
    category: 'Strength',
    duration: 10,
    equipment: 'None',
    imageUrl: '/images/push-ups.jpeg',
    description: 'Upper body strength exercise targeting chest and triceps.',
    benefits: ['Builds upper body strength', 'Improves posture'],
    level: 'Intermediate'
  },
  {
    name: 'Plank',
    category: 'Core',
    duration: 3,
    equipment: 'None',
    imageUrl: '/images/plank.jpeg',
    description: 'Core stability exercise that strengthens abs and back.',
    benefits: ['Improves core strength', 'Enhances balance'],
    level: 'Beginner'
  }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Exercise.deleteMany({});
    const inserted = await Exercise.insertMany(exercises);
    console.log(' Seeded exercises:', inserted.map(e => e.name));
    await mongoose.disconnect();
  } catch (err) {
    console.error(' Seeding Error:', err);
  }
})();
