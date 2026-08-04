import type { ViewMode, PresentationState, SlideDescriptor, SlideSubscriber } from './types';
import { getStoredViewMode, setStoredViewMode } from './mode';
import { segmentDomContainer } from './segmentation';
import { getKeyboardAction, shouldIgnoreKeyboardEvent } from './keyboard';
import { isCurrentlyFullscreen, requestFullscreenElement, exitFullscreenDocument } from './fullscreen';
import { getSavedSlideIndex, saveSlideIndex } from './persistence';
import { SLIDE_CHANGED_EVENT, VIEW_MODE_CHANGED_EVENT } from './constants';

export function calculateSlideNavigation(
  current: number,
  total: number,
  action: 'next' | 'prev' | 'first' | 'last' | number,
): number {
  if (total <= 0) return 0;
  if (typeof action === 'number') {
    return Math.max(0, Math.min(action, total - 1));
  }
  switch (action) {
    case 'next':
      return Math.min(current + 1, total - 1);
    case 'prev':
      return Math.max(current - 1, 0);
    case 'first':
      return 0;
    case 'last':
      return Math.max(0, total - 1);
    default:
      return current;
  }
}

class PresentationController {
  private mode: ViewMode = 'reading';
  private slides: SlideDescriptor[] = [];
  private currentSlideIndex = 0;
  private currentSlug = '';
  private containerEl: HTMLElement | null = null;
  private subscribers: Set<SlideSubscriber> = new Set();
  private isListeningKeyboard = false;

  public init(slug: string, container: HTMLElement | null) {
    this.currentSlug = slug;
    this.containerEl = container;
    this.mode = getStoredViewMode();

    if (this.containerEl && typeof window !== 'undefined') {
      this.slides = segmentDomContainer(this.containerEl);
      if (this.slides.length > 0) {
        this.currentSlideIndex = getSavedSlideIndex(slug, this.slides.length);
      }
    }

    this.applyModeToDom();
  }

  public getMode(): ViewMode {
    return this.mode;
  }

  public setMode(newMode: ViewMode) {
    this.mode = setStoredViewMode(newMode);
    this.applyModeToDom();
    this.notifySubscribers();

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(VIEW_MODE_CHANGED_EVENT, { detail: { mode: this.mode } }),
      );
    }
  }

  public getState(): PresentationState {
    const currentSlideObj = this.slides[this.currentSlideIndex];
    return {
      mode: this.mode,
      currentSlide: this.currentSlideIndex,
      totalSlides: this.slides.length,
      isFullscreen: isCurrentlyFullscreen(),
      slideTitle: currentSlideObj?.title || 'Diapositiva',
    };
  }

  public goToSlide(index: number) {
    if (this.slides.length === 0) return;
    const nextIndex = calculateSlideNavigation(this.currentSlideIndex, this.slides.length, index);
    if (nextIndex !== this.currentSlideIndex) {
      this.currentSlideIndex = nextIndex;
      saveSlideIndex(this.currentSlug, this.currentSlideIndex);
      this.updateActiveSlideInDom();
      this.notifySubscribers();
    }
  }

  public nextSlide() {
    this.goToSlide(calculateSlideNavigation(this.currentSlideIndex, this.slides.length, 'next'));
  }

  public previousSlide() {
    this.goToSlide(calculateSlideNavigation(this.currentSlideIndex, this.slides.length, 'prev'));
  }

  public firstSlide() {
    this.goToSlide(0);
  }

  public lastSlide() {
    this.goToSlide(this.slides.length - 1);
  }

  public async toggleFullscreen() {
    if (isCurrentlyFullscreen()) {
      await exitFullscreenDocument();
    } else if (this.containerEl) {
      await requestFullscreenElement(document.documentElement);
    }
    this.notifySubscribers();
  }

  public subscribe(fn: SlideSubscriber): () => void {
    this.subscribers.add(fn);
    fn(this.getState());
    return () => {
      this.subscribers.delete(fn);
    };
  }

  private notifySubscribers() {
    const state = this.getState();
    this.subscribers.forEach((fn) => {
      try {
        fn(state);
      } catch {}
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(SLIDE_CHANGED_EVENT, { detail: state }),
      );
    }
  }

  private applyModeToDom() {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.classList.remove('reading-mode', 'presentation-mode', 'presentation-scroll-mode', 'presentation-slides-mode');

    if (this.mode === 'presentation-slides') {
      root.classList.add('presentation-mode', 'presentation-slides-mode');
      this.enableKeyboardListeners();
      this.updateActiveSlideInDom();
    } else if (this.mode === 'presentation-scroll') {
      root.classList.add('presentation-mode', 'presentation-scroll-mode');
      this.disableKeyboardListeners();
      this.resetDomFromSlides();
    } else {
      root.classList.add('reading-mode');
      this.disableKeyboardListeners();
      this.resetDomFromSlides();
    }
  }

  private updateActiveSlideInDom() {
    if (!this.containerEl) return;

    const wrappers = this.containerEl.querySelectorAll<HTMLElement>('.slide-section');
    wrappers.forEach((wrapper, idx) => {
      if (idx === this.currentSlideIndex) {
        wrapper.classList.remove('hidden');
        wrapper.setAttribute('aria-hidden', 'false');
      } else {
        wrapper.classList.add('hidden');
        wrapper.setAttribute('aria-hidden', 'true');
      }
    });

    // Update URL hash without scroll reset if section has an ID
    const activeSlide = this.slides[this.currentSlideIndex];
    if (activeSlide && activeSlide.id && typeof history !== 'undefined') {
      history.replaceState(null, '', `#${activeSlide.id}`);
    }
  }

  private resetDomFromSlides() {
    if (!this.containerEl) return;
    const wrappers = this.containerEl.querySelectorAll<HTMLElement>('.slide-section');
    wrappers.forEach((wrapper) => {
      wrapper.classList.remove('hidden');
      wrapper.removeAttribute('aria-hidden');
    });
  }

  private enableKeyboardListeners() {
    if (this.isListeningKeyboard || typeof window === 'undefined') return;
    window.addEventListener('keydown', this.handleKeyDown);
    this.isListeningKeyboard = true;
  }

  private disableKeyboardListeners() {
    if (!this.isListeningKeyboard || typeof window === 'undefined') return;
    window.removeEventListener('keydown', this.handleKeyDown);
    this.isListeningKeyboard = false;
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.mode !== 'presentation-slides') return;
    if (shouldIgnoreKeyboardEvent(e.target)) return;

    const action = getKeyboardAction(e.key, e.code);
    if (!action) return;

    switch (action) {
      case 'next':
        e.preventDefault();
        this.nextSlide();
        break;
      case 'prev':
        e.preventDefault();
        this.previousSlide();
        break;
      case 'first':
        e.preventDefault();
        this.firstSlide();
        break;
      case 'last':
        e.preventDefault();
        this.lastSlide();
        break;
      case 'fullscreen':
        e.preventDefault();
        this.toggleFullscreen();
        break;
      case 'exit':
        e.preventDefault();
        if (isCurrentlyFullscreen()) {
          this.toggleFullscreen();
        } else {
          this.setMode('reading');
        }
        break;
    }
  };
}

export const presentationStore = new PresentationController();
