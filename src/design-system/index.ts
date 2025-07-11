// Design System exports - Only what you provided
export * from './colors';
export * from './typography';
export * from './spacing';

// Import values for design system configuration
import { 
  colors, 
  getColor, 
  colorAccessibility 
} from './colors';

import { 
  typography, 
  typographyClasses
} from './typography';

import { spacing } from './spacing';

// Re-export only what you provided
export { 
  colors, 
  getColor, 
  colorAccessibility 
} from './colors';

export { 
  typography, 
  typographyClasses
} from './typography';

export { spacing } from './spacing';

// Design system configuration - Only your specifications
export const designSystem = {
  colors,
  typography,
  spacing,
  colorAccessibility,
} as const; 