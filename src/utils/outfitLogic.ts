export interface OutfitItem {
  category: 'top' | 'bottom' | 'shoes' | 'accessory';
  name: string;
  description: string;
  icon: string;
  warmth?: string;
  colors: string[];
}

interface ClothingDatabase {
  tops: {
    cold: OutfitItem[];
    mild: OutfitItem[];
    warm: OutfitItem[];
  };
  bottoms: {
    cold: OutfitItem[];
    mild: OutfitItem[];
    warm: OutfitItem[];
  };
  shoes: {
    cold: OutfitItem[];
    mild: OutfitItem[];
    warm: OutfitItem[];
    rainy: OutfitItem[];
  };
  accessories: {
    cold: OutfitItem[];
    rainy: OutfitItem[];
  };
}

const clothingDatabase: ClothingDatabase = {
  tops: {
    cold: [
      {
        category: 'top',
        name: 'Cozy Bomber Jacket',
        description: 'Warm bomber jacket with scarf',
        icon: '🧥',
        warmth: 'Very Warm',
        colors: ['#2c5f7f', '#d4a574', '#f5f5dc'],
      },
      {
        category: 'top',
        name: 'Winter Parka',
        description: 'Insulated parka for cold days',
        icon: '🧥',
        warmth: 'Very Warm',
        colors: ['#1a4d2e', '#2c3e50', '#8b7355'],
      },
      {
        category: 'top',
        name: 'Thick Sweater',
        description: 'Chunky knit sweater',
        icon: '👕',
        warmth: 'Warm',
        colors: ['#d2691e', '#8b4513', '#f5deb3'],
      },
    ],
    mild: [
      {
        category: 'top',
        name: 'Light Jacket',
        description: 'Perfect layering piece',
        icon: '🧥',
        warmth: 'Moderate',
        colors: ['#5f7c8a', '#8b7355', '#2c3e50'],
      },
      {
        category: 'top',
        name: 'Long Sleeve Tee',
        description: 'Casual and comfortable',
        icon: '👕',
        warmth: 'Light',
        colors: ['#f5f5dc', '#d2691e', '#556b2f'],
      },
      {
        category: 'top',
        name: 'Cardigan',
        description: 'Cozy button-up sweater',
        icon: '🧥',
        warmth: 'Moderate',
        colors: ['#cd853f', '#8b7355', '#d2b48c'],
      },
    ],
    warm: [
      {
        category: 'top',
        name: 'Cotton T-Shirt',
        description: 'Breathable and light',
        icon: '👕',
        warmth: 'Light',
        colors: ['#f5f5dc', '#fffacd', '#faf0e6'],
      },
      {
        category: 'top',
        name: 'Linen Shirt',
        description: 'Airy summer shirt',
        icon: '👔',
        warmth: 'Very Light',
        colors: ['#f5deb3', '#fffacd', '#faebd7'],
      },
      {
        category: 'top',
        name: 'Tank Top',
        description: 'Stay cool in the heat',
        icon: '👕',
        warmth: 'Very Light',
        colors: ['#f0e68c', '#ffe4b5', '#f5f5dc'],
      },
    ],
  },
  bottoms: {
    cold: [
      {
        category: 'bottom',
        name: 'Warm Jeans',
        description: 'Thick denim for cold weather',
        icon: '👖',
        colors: ['#36454f', '#2c5f7f', '#1c3d5a'],
      },
      {
        category: 'bottom',
        name: 'Corduroy Pants',
        description: 'Textured and warm',
        icon: '👖',
        colors: ['#8b7355', '#654321', '#a0826d'],
      },
      {
        category: 'bottom',
        name: 'Wool Trousers',
        description: 'Classic and cozy',
        icon: '👖',
        colors: ['#3d3d3d', '#556b2f', '#2f4f4f'],
      },
    ],
    mild: [
      {
        category: 'bottom',
        name: 'Casual Jeans',
        description: 'Your go-to denim',
        icon: '👖',
        colors: ['#4682b4', '#36454f', '#5f7c8a'],
      },
      {
        category: 'bottom',
        name: 'Chino Pants',
        description: 'Smart casual staple',
        icon: '👖',
        colors: ['#d2b48c', '#8b7355', '#556b2f'],
      },
      {
        category: 'bottom',
        name: 'Midi Skirt',
        description: 'Flowy and comfortable',
        icon: '👗',
        colors: ['#cd853f', '#daa520', '#d2691e'],
      },
    ],
    warm: [
      {
        category: 'bottom',
        name: 'Denim Shorts',
        description: 'Perfect for sunny days',
        icon: '🩳',
        colors: ['#5f7c8a', '#4682b4', '#6495ed'],
      },
      {
        category: 'bottom',
        name: 'Light Skirt',
        description: 'Breezy summer skirt',
        icon: '👗',
        colors: ['#fffacd', '#ffd700', '#f0e68c'],
      },
      {
        category: 'bottom',
        name: 'Linen Shorts',
        description: 'Stay cool and stylish',
        icon: '🩳',
        colors: ['#d2b48c', '#deb887', '#f5deb3'],
      },
    ],
  },
  shoes: {
    cold: [
      {
        category: 'shoes',
        name: 'Winter Boots',
        description: 'Warm and sturdy',
        icon: '🥾',
        colors: ['#654321', '#8b4513', '#3d2817'],
      },
      {
        category: 'shoes',
        name: 'Chelsea Boots',
        description: 'Stylish ankle boots',
        icon: '👢',
        colors: ['#8b7355', '#a0826d', '#6b4423'],
      },
      {
        category: 'shoes',
        name: 'Lace-up Boots',
        description: 'Classic work boots',
        icon: '🥾',
        colors: ['#654321', '#8b6914', '#a0826d'],
      },
    ],
    mild: [
      {
        category: 'shoes',
        name: 'Sneakers',
        description: 'Comfortable everyday shoes',
        icon: '👟',
        colors: ['#f5deb3', '#cd853f', '#d2b48c'],
      },
      {
        category: 'shoes',
        name: 'Loafers',
        description: 'Smart casual footwear',
        icon: '👞',
        colors: ['#5f7c8a', '#8b7355', '#6b8e23'],
      },
      {
        category: 'shoes',
        name: 'Low Heels',
        description: 'Elegant and comfy',
        icon: '👠',
        colors: ['#cd853f', '#d2691e', '#a0826d'],
      },
    ],
    warm: [
      {
        category: 'shoes',
        name: 'Canvas Sneakers',
        description: 'Light and breathable',
        icon: '👟',
        colors: ['#f5f5dc', '#fffacd', '#faebd7'],
      },
      {
        category: 'shoes',
        name: 'Sandals',
        description: 'Open-toe comfort',
        icon: '👡',
        colors: ['#d2b48c', '#deb887', '#f5deb3'],
      },
      {
        category: 'shoes',
        name: 'Flats',
        description: 'Easy slip-on shoes',
        icon: '🥿',
        colors: ['#daa520', '#cd853f', '#b8860b'],
      },
    ],
    rainy: [
      {
        category: 'shoes',
        name: 'Rain Boots',
        description: 'Keep your feet dry',
        icon: '🥾',
        colors: ['#654321', '#8b4513', '#3d2817'],
      },
      {
        category: 'shoes',
        name: 'Waterproof Boots',
        description: 'Weather-resistant footwear',
        icon: '🥾',
        colors: ['#2f4f4f', '#3d3d3d', '#556b2f'],
      },
    ],
  },
  accessories: {
    cold: [
      {
        category: 'accessory',
        name: 'Knit Beanie',
        description: 'Keep your head warm',
        icon: '🧢',
        colors: ['#cd853f', '#d2691e', '#8b4513'],
      },
      {
        category: 'accessory',
        name: 'Scarf',
        description: 'Cozy neck warmer',
        icon: '🧣',
        colors: ['#d4a574', '#deb887', '#f5deb3'],
      },
      {
        category: 'accessory',
        name: 'Gloves',
        description: 'Warm your hands',
        icon: '🧤',
        colors: ['#5f7c8a', '#4682b4', '#6495ed'],
      },
    ],
    rainy: [
      {
        category: 'accessory',
        name: 'Umbrella',
        description: 'Stay dry in the rain',
        icon: '☂️',
        colors: ['#2c3e50', '#34495e', '#5f7c8a'],
      },
      {
        category: 'accessory',
        name: 'Rain Jacket',
        description: 'Waterproof layer',
        icon: '🧥',
        colors: ['#1c3d5a', '#2c5f7f', '#36454f'],
      },
    ],
  },
};

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getOutfitRecommendation(
  temperature: number,
  condition: string,
  precipitation: number
): OutfitItem[] {
  const outfit: OutfitItem[] = [];
  const isRainy = precipitation > 50 || condition.toLowerCase().includes('rain');
  
  // Determine temperature category
  let tempCategory: 'cold' | 'mild' | 'warm';
  if (temperature < 10) {
    tempCategory = 'cold';
  } else if (temperature < 20) {
    tempCategory = 'mild';
  } else {
    tempCategory = 'warm';
  }

  // Select top
  outfit.push(getRandomItem(clothingDatabase.tops[tempCategory]));

  // Select bottom
  outfit.push(getRandomItem(clothingDatabase.bottoms[tempCategory]));

  // Select shoes
  if (isRainy) {
    outfit.push(getRandomItem(clothingDatabase.shoes.rainy));
  } else {
    outfit.push(getRandomItem(clothingDatabase.shoes[tempCategory]));
  }

  // Add accessories for cold or rainy weather
  if (tempCategory === 'cold') {
    outfit.push(getRandomItem(clothingDatabase.accessories.cold));
  }
  
  if (isRainy && tempCategory !== 'warm') {
    outfit.push(getRandomItem(clothingDatabase.accessories.rainy));
  }

  return outfit;
}
