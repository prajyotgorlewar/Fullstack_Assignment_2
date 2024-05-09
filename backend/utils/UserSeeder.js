import 'dotenv/config';
import mongoose from 'mongoose';
import User from "../src/models/user-model.js";
import bcrypt from "bcryptjs";
import Post from '../src/models/post-model.js';

const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME } = process.env;

if (!DATABASE_USERNAME || !DATABASE_PASSWORD || !DATABASE_HOST || !DATABASE_NAME) {
  throw new Error('Missing required environment variables!');
}


// Function to generate a random sentence
const generateRandomSentence = () => {
  const subjects = ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet'];
  const verbs = ['is', 'was', 'will be', 'can be'];
  const objects = ['great', 'awesome', 'amazing', 'wonderful', 'fantastic', 'excellent', 'perfect'];

  const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

  const subject = getRandomItem(subjects);
  const verb = getRandomItem(verbs);
  const object = getRandomItem(objects);

  return `${subject} ${verb} ${object}.`;
};

// Function to generate random post descriptions
const generateRandomDescriptions = (count) => {
  const descriptions = [];
  for (let i = 0; i < count; i++) {
      descriptions.push(generateRandomSentence());
  }
  return descriptions;
};



const url = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/?retryWrites=true&w=majority`;
const options = {
  dbName: DATABASE_NAME,
};

const seedUsers = async () => {
  try {
    await mongoose.connect(url, options);

    const userId1 = new mongoose.Types.ObjectId();
    const userId2 = new mongoose.Types.ObjectId();

    let users = [
      {
        _id: userId1,
        name: 'Utkarsh',
        email: 'utkarsh@123',
        password: '123',
        gender: 'Male',
        role: 'Admin',
      },
      {
        _id: userId2,
        name: 'My_Utkarsh',
        email: 'myutkarsh@123',
        password: '456',
        gender: 'Male',
        role: 'Admin',
      }
    ];
    for (let i = 0; i < 20; i++) {
      const user = {
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: 'password123', 
        gender: i % 2 === 0 ? 'Male' : 'Female', 
        role: i %4 === 0 ? 'Admin' : 'User',
      }
      users.push(user);
    }
    
    const hashedUsers = await Promise.all(users.map(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
      return user;
    }));

    // Save users to the database
    await User.deleteMany({});
    await User.insertMany(hashedUsers);

    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    // Disconnect from the database after seeding
    await mongoose.disconnect();
  }
};

const seedPosts = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(url, options);

    const users = await User.find({}, '_id name');

    const posts = [];

    for (let i = 0; i < 25; i++) {
      const user = i % 2 === 0 ? users[0] : users[1];
      const post = {
        userId: user._id.toString(),
        author: user.name,
        title: `Post ${i + 1}`,
        detail: `${ generateRandomDescriptions(18)}`,
      };
      posts.push(post);
    }



    await Post.deleteMany({});
    await Post.insertMany(posts);

    console.log('Posts seeded successfully!');
  } catch (error) {
    console.error('Error seeding posts:', error);
  } finally {
    console.log("Disconnecting from database...");
    await mongoose.disconnect();
  }
};

(async () => {
  await seedUsers();
  await seedPosts();
})();
