export type ViewMode =
  | 'reading'
  | 'presentation-scroll'
  | 'presentation-slides';

export interface SlideDescriptor {
  id: string;
  index: number;
  title: string;
  elementCount: number;
}

export interface PresentationState {
  mode: ViewMode;
  currentSlide: number;
  totalSlides: number;
  isFullscreen: boolean;
  slideTitle: string;
}

export type ViewModeSubscriber = (mode: ViewMode) => void;
export type SlideSubscriber = (state: PresentationState) => void;
