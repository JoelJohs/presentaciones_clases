/**
 * API pública explícita del motor de presentación por diapositivas (Fase 4C).
 */

export type {
  ViewMode,
  SlideDescriptor,
  PresentationState,
  ViewModeSubscriber,
  SlideSubscriber,
} from './types';

export {
  VIEW_MODE_STORAGE_KEY,
  SLIDE_INDEX_STORAGE_PREFIX,
  DEFAULT_VIEW_MODE,
  VIEW_MODE_CHANGED_EVENT,
  SLIDE_CHANGED_EVENT,
} from './constants';

export {
  parseViewMode,
  getStoredViewMode,
  setStoredViewMode,
} from './mode';

export {
  segmentNodeList,
  segmentDomContainer,
} from './segmentation';

export {
  shouldIgnoreKeyboardEvent,
  getKeyboardAction,
} from './keyboard';

export {
  isFullscreenSupported,
  isCurrentlyFullscreen,
  requestFullscreenElement,
  exitFullscreenDocument,
} from './fullscreen';

export {
  getSavedSlideIndex,
  saveSlideIndex,
} from './persistence';

export {
  calculateSlideNavigation,
  presentationStore,
} from './controller';
