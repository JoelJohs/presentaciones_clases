export function isFullscreenSupported(): boolean {
  if (typeof document === 'undefined') return false;
  return Boolean(
    document.fullscreenEnabled ||
      (document as unknown as { webkitFullscreenEnabled?: boolean }).webkitFullscreenEnabled,
  );
}

export function isCurrentlyFullscreen(): boolean {
  if (typeof document === 'undefined') return false;
  return Boolean(
    document.fullscreenElement ||
      (document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement,
  );
}

export async function requestFullscreenElement(element: HTMLElement): Promise<boolean> {
  if (!element || !isFullscreenSupported()) return false;
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
      return true;
    }
    const webkitElement = element as unknown as { webkitRequestFullscreen?: () => Promise<void> };
    if (webkitElement.webkitRequestFullscreen) {
      await webkitElement.webkitRequestFullscreen();
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function exitFullscreenDocument(): Promise<boolean> {
  if (typeof document === 'undefined' || !isCurrentlyFullscreen()) return false;
  try {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
      return true;
    }
    const webkitDoc = document as unknown as { webkitExitFullscreen?: () => Promise<void> };
    if (webkitDoc.webkitExitFullscreen) {
      await webkitDoc.webkitExitFullscreen();
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
