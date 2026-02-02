// Mock data for demonstration purposes

export const vlogs = [
    {
        id: 1,
        title: "Organic Rice Farming Techniques",
        farmer: "Ramesh Kumar",
        thumbnail: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=450&fit=crop",
        cropType: "Rice",
        location: "Punjab",
        duration: "12:45",
        views: 15420,
        likes: 892,
        description: "Learn traditional and modern organic rice farming methods that increase yield while maintaining soil health.",
        tips: ["Use vermicompost for better soil nutrition", "Maintain proper water levels", "Practice crop rotation"],
        language: "Hindi"
    },
    {
        id: 2,
        title: "Wheat Harvesting Best Practices",
        farmer: "Suresh Patel",
        thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=450&fit=crop",
        cropType: "Wheat",
        location: "Haryana",
        duration: "15:30",
        views: 23100,
        likes: 1245,
        description: "Complete guide to wheat harvesting including timing, equipment usage, and post-harvest handling.",
        tips: ["Harvest at optimal moisture content", "Clean equipment regularly", "Store in dry conditions"],
        language: "Hindi"
    },
    {
        id: 3,
        title: "Tomato Farming in Greenhouse",
        farmer: "Lakshmi Devi",
        thumbnail: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&h=450&fit=crop",
        cropType: "Vegetables",
        location: "Karnataka",
        duration: "18:20",
        views: 31500,
        likes: 2134,
        description: "Modern greenhouse techniques for year-round tomato production with disease management strategies.",
        tips: ["Control temperature and humidity", "Use drip irrigation", "Monitor for pests daily"],
        language: "Kannada"
    },
    {
        id: 4,
        title: "Sustainable Cotton Farming",
        farmer: "Vijay Singh",
        thumbnail: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&h=450&fit=crop",
        cropType: "Cotton",
        location: "Gujarat",
        duration: "14:15",
        views: 18900,
        likes: 967,
        description: "Eco-friendly cotton farming practices that reduce water usage and chemical dependency.",
        tips: ["Use BT cotton varieties", "Implement integrated pest management", "Conserve water with efficient irrigation"],
        language: "Gujarati"
    },
    {
        id: 5,
        title: "Mango Orchard Management",
        farmer: "Arjun Reddy",
        thumbnail: "https://images.unsplash.com/photo-1605027990121-cbae9d3ce6ea?w=800&h=450&fit=crop",
        cropType: "Fruits",
        location: "Andhra Pradesh",
        duration: "20:10",
        views: 42300,
        likes: 3456,
        description: "Complete mango orchard care from flowering to harvest, including pruning and fertilization schedules.",
        tips: ["Prune during winter months", "Apply organic fertilizers", "Protect from fruit flies"],
        language: "Telugu"
    },
    {
        id: 6,
        title: "Dairy Farming Basics",
        farmer: "Mohan Sharma",
        thumbnail: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=450&fit=crop",
        cropType: "Livestock",
        location: "Rajasthan",
        duration: "16:45",
        views: 28700,
        likes: 1876,
        description: "Essential dairy farming practices including cattle care, milking techniques, and hygiene management.",
        tips: ["Maintain clean cattle shed", "Provide balanced nutrition", "Regular veterinary checkups"],
        language: "Hindi"
    }
];

export const products = [
    {
        id: 1,
        name: "Organic Wheat Seeds (HI-1544)",
        category: "Seeds",
        price: 850,
        rating: 4.5,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop",
        inStock: true,
        description: "High-yielding organic wheat variety suitable for all soil types"
    },
    {
        id: 2,
        name: "Vermicompost Fertilizer (50kg)",
        category: "Fertilizers",
        price: 450,
        rating: 4.8,
        reviews: 567,
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
        inStock: true,
        description: "100% organic vermicompost rich in nutrients"
    },
    {
        id: 3,
        name: "Drip Irrigation Kit",
        category: "Tools",
        price: 3500,
        rating: 4.6,
        reviews: 189,
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=400&fit=crop",
        inStock: true,
        description: "Complete drip irrigation system for 1 acre"
    },
    {
        id: 4,
        name: "Hybrid Tomato Seeds",
        category: "Seeds",
        price: 320,
        rating: 4.7,
        reviews: 445,
        image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=400&fit=crop",
        inStock: true,
        description: "Disease-resistant hybrid tomato variety"
    },
    {
        id: 5,
        name: "Neem Oil Pesticide (1L)",
        category: "Organic Inputs",
        price: 280,
        rating: 4.4,
        reviews: 312,
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop",
        inStock: true,
        description: "Natural pest control solution"
    },
    {
        id: 6,
        name: "Garden Tiller Machine",
        category: "Tools",
        price: 12500,
        rating: 4.5,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=400&fit=crop",
        inStock: false,
        description: "Powerful rotary tiller for soil preparation"
    },
    {
        id: 7,
        name: "Bio NPK Fertilizer (25kg)",
        category: "Fertilizers",
        price: 680,
        rating: 4.6,
        reviews: 423,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
        inStock: true,
        description: "Balanced organic NPK for all crops"
    },
    {
        id: 8,
        name: "Sprinkler System Set",
        category: "Tools",
        price: 2800,
        rating: 4.3,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=400&fit=crop",
        inStock: true,
        description: "Automated sprinkler irrigation system"
    }
];

export const articles = [
    {
        id: 1,
        title: "Modern Precision Farming Techniques",
        category: "Modern Farming",
        excerpt: "Discover how GPS, drones, and sensors are revolutionizing agriculture with data-driven decisions.",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=450&fit=crop",
        author: "Dr. Priya Sharma",
        date: "2024-01-15",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Benefits of Organic Farming",
        category: "Organic Farming",
        excerpt: "Learn why organic farming is better for soil health, environment, and long-term sustainability.",
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=450&fit=crop",
        author: "Rajesh Kumar",
        date: "2024-01-12",
        readTime: "7 min read"
    },
    {
        id: 3,
        title: "Weather Patterns and Crop Planning",
        category: "Weather Tips",
        excerpt: "Understanding monsoon patterns and climate data to optimize your planting schedule.",
        image: "https://images.unsplash.com/photo-1601134991665-a020399422e3?w=800&h=450&fit=crop",
        author: "Meteorologist Anita Desai",
        date: "2024-01-10",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "Drip Irrigation: Save Water, Increase Yield",
        category: "Modern Farming",
        excerpt: "How drip irrigation can reduce water usage by 50% while improving crop productivity.",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=450&fit=crop",
        author: "Sunil Patel",
        date: "2024-01-08",
        readTime: "8 min read"
    },
    {
        id: 5,
        title: "Composting for Healthy Soil",
        category: "Organic Farming",
        excerpt: "Step-by-step guide to creating nutrient-rich compost from farm waste.",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=450&fit=crop",
        author: "Lakshmi Iyer",
        date: "2024-01-05",
        readTime: "5 min read"
    },
    {
        id: 6,
        title: "Preparing for Extreme Weather Events",
        category: "Weather Tips",
        excerpt: "Protect your crops from floods, droughts, and unexpected climate challenges.",
        image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&h=450&fit=crop",
        author: "Dr. Vikram Singh",
        date: "2024-01-03",
        readTime: "6 min read"
    }
];

export const categories = {
    seeds: ["Wheat", "Rice", "Vegetables", "Fruits", "Pulses"],
    fertilizers: ["Organic", "Bio-fertilizers", "NPK", "Micronutrients"],
    tools: ["Irrigation", "Harvesting", "Soil Preparation", "Sprayers"],
    organicInputs: ["Pesticides", "Growth Promoters", "Soil Conditioners"]
};

export const filters = {
    cropTypes: ["Rice", "Wheat", "Vegetables", "Fruits", "Cotton", "Pulses", "Livestock"],
    seasons: ["Kharif", "Rabi", "Zaid", "Year-round"],
    languages: ["Hindi", "English", "Tamil", "Telugu", "Kannada", "Gujarati", "Marathi", "Bengali"]
};
