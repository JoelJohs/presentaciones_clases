import type { SlideDescriptor } from './types';

export interface NodeDescriptor {
  type: 'h2' | 'content';
  text: string;
  id?: string;
}

export function segmentNodeList(nodes: NodeDescriptor[]): SlideDescriptor[] {
  if (!nodes || nodes.length === 0) {
    return [
      {
        id: 'slide-0',
        index: 0,
        title: 'Introducción',
        elementCount: 0,
      },
    ];
  }

  const slides: SlideDescriptor[] = [];
  let currentTitle = 'Introducción';
  let currentCount = 0;
  let currentId = 'slide-0';
  let hasStarted = false;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type === 'h2') {
      if (hasStarted || currentCount > 0) {
        slides.push({
          id: currentId,
          index: slides.length,
          title: currentTitle,
          elementCount: currentCount,
        });
      }
      hasStarted = true;
      currentTitle = node.text.trim() || `Sección ${slides.length + 1}`;
      currentId = node.id || `section-${slides.length + 1}`;
      currentCount = 1;
    } else {
      currentCount++;
    }
  }

  slides.push({
    id: currentId,
    index: slides.length,
    title: currentTitle,
    elementCount: currentCount,
  });

  return slides;
}

export function segmentDomContainer(container: HTMLElement): SlideDescriptor[] {
  if (!container) return [];

  // Remove existing slide wrappers if re-segmenting
  const existingWrappers = container.querySelectorAll('.slide-section');
  if (existingWrappers.length > 0) {
    existingWrappers.forEach((wrapper) => {
      while (wrapper.firstChild) {
        container.insertBefore(wrapper.firstChild, wrapper);
      }
      wrapper.remove();
    });
  }

  const children = Array.from(container.children);
  if (children.length === 0) return [];

  const slideWrappers: HTMLElement[] = [];
  let currentWrapper: HTMLElement | null = null;
  let slideIndex = 0;
  let currentTitle = 'Introducción';
  let currentId = 'slide-0';

  function createSlideWrapper(id: string, index: number, title: string): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'slide-section hidden transition-opacity duration-300';
    wrapper.setAttribute('data-slide-index', String(index));
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.setAttribute('data-slide-id', id);
    wrapper.setAttribute('data-slide-title', title);
    container.appendChild(wrapper);
    return wrapper;
  }

  children.forEach((child) => {
    if (child.tagName === 'H2') {
      currentTitle = child.textContent?.trim() || `Sección ${slideIndex + 1}`;
      currentId = child.id || `section-${slideIndex + 1}`;
      currentWrapper = createSlideWrapper(currentId, slideIndex, currentTitle);
      slideWrappers.push(currentWrapper);
      slideIndex++;
      currentWrapper.appendChild(child);
    } else {
      if (!currentWrapper) {
        currentWrapper = createSlideWrapper('slide-0', 0, 'Introducción');
        slideWrappers.push(currentWrapper);
        slideIndex++;
      }
      currentWrapper.appendChild(child);
    }
  });

  return slideWrappers.map((wrapper, idx) => ({
    id: wrapper.getAttribute('data-slide-id') || `slide-${idx}`,
    index: idx,
    title: wrapper.getAttribute('data-slide-title') || `Diapositiva ${idx + 1}`,
    elementCount: wrapper.children.length,
  }));
}
