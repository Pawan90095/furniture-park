const products = [
    // --- LIVING ROOM ---
    {
        name: "Haven Modular Sectional Sofa",
        category: "Living Room",
        price: 45999,
        rating: 4.8,
        colors: ["#A9A9A9", "#F5F5DC", "#2F4F4F"], // Grey, Beige, Dark Slate
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Upholstered in durable linen, this modular sofa adapts to any living space. Deep seating for ultimate comfort.",
        isBestseller: true
    },
    {
        name: "Oslo Mid-Century Armchair",
        category: "Living Room",
        price: 12499,
        rating: 4.5,
        colors: ["#D2691E", "#FFD700"], // Chocolate, Gold
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Classic mid-century design with a solid oak frame and comfortable foam cushioning.",
        badge: '-20%'
    },
    {
        name: "Noguchi Style Glass Coffee Table",
        category: "Living Room",
        price: 18999,
        rating: 4.9,
        colors: ["#000000", "#8B4513"], // Black Base, Walnut Base
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A sculptural masterpiece balancing a thick glass top on two interlocking wood base pieces."
    },

    // --- BEDROOM ---
    {
        name: "Malmo Platform Bed Frame (Queen)",
        category: "Bedroom",
        price: 28500,
        rating: 4.7,
        colors: ["#F5F5DC", "#708090"], // Beige, Slate Grey
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Minimalist platform bed with an upholstered headboard and sturdy wooden slats. No box spring needed.",
        badge: 'Bestseller',
        isBestseller: true
    },
    {
        name: "Hemnes Style 6-Drawer Dresser",
        category: "Bedroom",
        price: 21000,
        rating: 4.6,
        colors: ["#FFFFFF", "#000000"], // White, Black
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Classic design with smooth-running drawers. A versatile storage solution for any bedroom."
    },

    // --- DINING & OFFICE ---
    {
        name: "Eames Style Dining Set (4 Chairs)",
        category: "Dining",
        price: 32999,
        rating: 4.8,
        colors: ["#FFFFFF"], // White Table/Chairs
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Iconic modern design. Includes one round white table and four matching shell chairs with wood legs.",
        badge: 'New',
        isBestseller: true
    },
    {
        name: "Ergo-Pro Office Chair",
        category: "Office",
        price: 15999,
        rating: 4.4,
        colors: ["#000000", "#808080"], // Black, Grey
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "High-back ergonomic chair with breathable mesh, lumbar support, and adjustable height."
    },
    {
        name: "Minimalist Floor Lamp",
        category: "Living Room",
        price: 2499,
        rating: 4.2,
        colors: ["#000000", "#FFD700"],
        image: "https://images.unsplash.com/photo-1507473888900-52e1adad5481?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Sleek floor lamp providing warm, ambient lighting."
    }
];

export default products;
