/**
 * Units of Measurement Constants
 * Centralized management of all measurement units used in the application
 * 
 * Benefits:
 * - Single source of truth for all units
 * - Easy to add, update, or remove units
 * - Type-safe across the entire application
 * - Reusable in seller and buyer pages
 * - Prevents bugs from inconsistent unit definitions
 */
/**
 * Unit configuration interface
 */
export interface UnitConfig {
  value: string;
  label: string;
  category: 'weight' | 'volume' | 'count' | 'other';
  description?: string;
}

/**
 * All available units with metadata
 */
export const UNIT_CONFIGS: UnitConfig[] = [
  // Weight measurements
  {
    value: 'kg',
    label: 'Kilogram (kg)',
    category: 'weight',
    description: 'Used for solid items - grains, dals, flour, etc.'
  },
  {
    value: 'quintal',
    label: 'Quintal',
    category: 'weight',
    description: 'Bulk measurement - 100 kg'
  },
  {
    value: 'ton',
    label: 'Ton',
    category: 'weight',
    description: 'Large bulk measurement - 1000 kg'
  },
  {
    value: 'bag',
    label: 'Bag',
    category: 'weight',
    description: 'Standard bag - typically 50 kg'
  },
  
  // Volume measurements (for liquids)
  {
    value: 'liter',
    label: 'Liter',
    category: 'volume',
    description: 'Used for liquids - oil, honey, milk, etc.'
  },
  
  // Count measurements
  {
    value: 'piece',
    label: 'Piece',
    category: 'count',
    description: 'Individual items or packages'
  }
];

/**
 * Type definition for all unit values
 * Automatically derives from UNIT_CONFIGS to stay in sync
 */
export type UnitType = typeof UNIT_CONFIGS[number]['value'];

/**
 * Simple array of unit values for select dropdowns
 */
export const UNIT_VALUES: UnitType[] = UNIT_CONFIGS.map(u => u.value) as UnitType[];

/**
 * Units grouped by category for advanced UI
 */
export const UNITS_BY_CATEGORY = {
  weight: UNIT_CONFIGS.filter(u => u.category === 'weight'),
  volume: UNIT_CONFIGS.filter(u => u.category === 'volume'),
  count: UNIT_CONFIGS.filter(u => u.category === 'count'),
  other: UNIT_CONFIGS.filter(u => u.category === 'other')
};

/**
 * Get unit label by value
 */
export function getUnitLabel(value: string): string {
  const unit = UNIT_CONFIGS.find(u => u.value === value);
  return unit ? unit.label : value;
}

/**
 * Get unit category by value
 */
export function getUnitCategory(value: string): string {
  const unit = UNIT_CONFIGS.find(u => u.value === value);
  return unit ? unit.category : 'other';
}

/**
 * Check if a unit is for liquid/volume
 */
export function isVolumeUnit(value: string): boolean {
  return getUnitCategory(value) === 'volume';
}

/**
 * Check if a unit is for weight
 */
export function isWeightUnit(value: string): boolean {
  return getUnitCategory(value) === 'weight';
}

/**
 * HOW TO ADD A NEW UNIT:
 * 
 * 1. Add new entry to UNIT_CONFIGS array above
 * 2. That's it! The type system and all components will automatically update
 * 
 * Example:
 * {
 *   value: 'dozen',
 *   label: 'Dozen',
 *   category: 'count',
 *   description: 'Pack of 12 items'
 * }
 */
