/**
 * Product images from local assets folder
 * All images stored in src/assets/images/products/
 * Perfect for static applications - 100% offline, no external dependencies
 */

const ASSETS_PATH = 'assets/images/products';

export const PRODUCT_IMAGES = {
  // Grains & Flours
  'wheat-flour': `${ASSETS_PATH}/wheat-flour.jpg`,
  'jowar-flour': `${ASSETS_PATH}/jowar-flour.jpeg`,
  
  // Rice varieties
  'basmati-rice': `${ASSETS_PATH}/basmati-rice.jpeg`,
  'white-rice': `${ASSETS_PATH}/white-rice.jpeg`,
  'sona-masoori': `${ASSETS_PATH}/sona-masoori-rice.jpeg`,
  
  // Lentils/Dals
  'toor-dal': `${ASSETS_PATH}/toor-dal.jpeg`,
  'moong-dal': `${ASSETS_PATH}/moong-dal.jpeg`,
  'chana-dal': `${ASSETS_PATH}/chana-dal.jpeg`,
  'urad-dal': `${ASSETS_PATH}/urad-dal.jpeg`,
  'masoor-dal': `${ASSETS_PATH}/masoor-dal.jpeg`,
  'rajma': `${ASSETS_PATH}/rajma.jpeg`,
  
  // Sweeteners
  'sugar': `${ASSETS_PATH}/sugar.jpeg`,
  'organic-sugar': `${ASSETS_PATH}/organic-sugar.jpeg`,
  'jaggery': `${ASSETS_PATH}/jaggery.jpeg`,
  
  // Salt
  'salt': `${ASSETS_PATH}/salt.jpeg`,
  
  // Oils
  'cooking-oil': `${ASSETS_PATH}/cooking-oil.jpeg`,
  
  // Spices & Others
  'honey': `${ASSETS_PATH}/honey.jpeg`,
  'turmeric': `${ASSETS_PATH}/turmeric.jpeg`,
  
  // Default fallback
  'default': `${ASSETS_PATH}/default.jpeg`
};

/**Returns local asset path from assets/images/products/
 * Works 100% offline with localStorage data
 * Get product image URL based on product name
 * Works with localStorage data - provides consistent placeholder images
 */
export function getProductImageUrl(productName: string): string {
  const normalized = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Try exact match first
  if (PRODUCT_IMAGES[normalized as keyof typeof PRODUCT_IMAGES]) {
    return PRODUCT_IMAGES[normalized as keyof typeof PRODUCT_IMAGES];
  }
  
  // Try partial matches
  if (normalized.includes('wheat')) return PRODUCT_IMAGES['wheat-flour'];
  if (normalized.includes('jowar') || normalized.includes('sorghum')) return PRODUCT_IMAGES['jowar-flour'];
  if (normalized.includes('basmati')) return PRODUCT_IMAGES['basmati-rice'];
  if (normalized.includes('white-rice')) return PRODUCT_IMAGES['white-rice'];
  if (normalized.includes('sona') || normalized.includes('masoori')) return PRODUCT_IMAGES['sona-masoori'];
  if (normalized.includes('toor') || normalized.includes('pigeon')) return PRODUCT_IMAGES['toor-dal'];
  if (normalized.includes('moong') || normalized.includes('green-gram')) return PRODUCT_IMAGES['moong-dal'];
  if (normalized.includes('chana') || normalized.includes('bengal')) return PRODUCT_IMAGES['chana-dal'];
  if (normalized.includes('urad') || normalized.includes('black-gram')) return PRODUCT_IMAGES['urad-dal'];
  if (normalized.includes('masoor') || normalized.includes('red-lentil')) return PRODUCT_IMAGES['masoor-dal'];
  if (normalized.includes('rajma') || normalized.includes('kidney')) return PRODUCT_IMAGES['rajma'];
  if (normalized.includes('organic') && normalized.includes('sugar')) return PRODUCT_IMAGES['organic-sugar'];
  if (normalized.includes('sugar')) return PRODUCT_IMAGES['sugar'];
  if (normalized.includes('jaggery') || normalized.includes('gur')) return PRODUCT_IMAGES['jaggery'];
  if (normalized.includes('salt')) return PRODUCT_IMAGES['salt'];
  if (normalized.includes('oil')) return PRODUCT_IMAGES['cooking-oil'];
  if (normalized.includes('honey')) return PRODUCT_IMAGES['honey'];
  if (normalized.includes('turmeric') || normalized.includes('haldi')) return PRODUCT_IMAGES['turmeric'];
  
  // Default fallback
  return PRODUCT_IMAGES['default'];
}
