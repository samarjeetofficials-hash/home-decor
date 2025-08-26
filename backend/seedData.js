const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');

const sampleProducts = [
  {
    name: "Premium Kitchen Knife Set",
    description: "Professional-grade stainless steel knives for all your cooking needs. Includes chef's knife, paring knife, and utility knife.",
    price: 129.99,
    image: "https://images.pexels.com/photos/4226803/pexels-photo-4226803.jpeg",
    category: "kitchen",
    stock: 25,
    isFeatured: true
  },
  {
    name: "Ceramic Dinnerware Set",
    description: "Elegant 16-piece ceramic dinnerware set perfect for everyday dining or special occasions. Dishwasher and microwave safe.",
    price: 89.99,
    image: "https://images.pexels.com/photos/6508868/pexels-photo-6508868.jpeg",
    category: "kitchen",
    stock: 15,
    isFeatured: true
  },
  {
    name: "Luxury Bath Towel Set",
    description: "Ultra-soft 100% cotton towels that provide exceptional absorbency and comfort. Set includes 4 bath towels and 4 hand towels.",
    price: 79.99,
    image: "https://images.pexels.com/photos/7795121/pexels-photo-7795121.jpeg",
    category: "bathroom",
    stock: 30,
    isFeatured: true
  },
  {
    name: "Modern Table Lamp",
    description: "Contemporary LED table lamp with adjustable brightness and sleek metal design. Perfect for bedside or office use.",
    price: 59.99,
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
    category: "bedroom",
    stock: 20,
    isFeatured: false
  },
  {
    name: "Storage Ottoman",
    description: "Multi-functional storage ottoman that serves as seating and hidden storage. Premium faux leather upholstery.",
    price: 149.99,
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    category: "living-room",
    stock: 12,
    isFeatured: true
  },
  {
    name: "Microfiber Cleaning Cloths",
    description: "Pack of 12 premium microfiber cloths for streak-free cleaning. Perfect for windows, cars, and household surfaces.",
    price: 19.99,
    image: "https://images.pexels.com/photos/4239123/pexels-photo-4239123.jpeg",
    category: "cleaning",
    stock: 50,
    isFeatured: false
  },
  {
    name: "Bamboo Cutting Board Set",
    description: "Eco-friendly bamboo cutting boards in three sizes. Natural antimicrobial properties and knife-friendly surface.",
    price: 39.99,
    image: "https://images.pexels.com/photos/4198790/pexels-photo-4198790.jpeg",
    category: "kitchen",
    stock: 18,
    isFeatured: false
  },
  {
    name: "Glass Storage Containers",
    description: "Set of 6 borosilicate glass containers with airtight lids. Perfect for food storage and meal prep.",
    price: 49.99,
    image: "https://images.pexels.com/photos/4198562/pexels-photo-4198562.jpeg",
    category: "storage",
    stock: 22,
    isFeatured: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ecommerce');
    
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    
    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    
    // Create regular user
    const regularUser = new User({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'user123',
      role: 'user'
    });
    await regularUser.save();
    
    console.log('Database seeded successfully!');
    console.log('Admin Login: admin@example.com / admin123');
    console.log('User Login: user@example.com / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();