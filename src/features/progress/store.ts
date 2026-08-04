/**
 * Store reactivo ligero de progreso canónico con gestión segura del ciclo de vida.
 *
 * Utiliza EventTarget y eventos del navegador (storage event, CustomEvent)
 * para sincronizar lecciones principales en la misma pestaña y entre pestañas.
 */

import {
  parseCompletedLessons,
  serializeCompletedLessons,
} from './storage';
import type { CompletedLessonSlugs, ProgressSubscriber } from './types';
import { runProgressMigration } from './migration';
import { getStudyPlanIdsForLessonSlug, getRelationByStudyPlanId } from './mapping';
import { PROGRESS_STORAGE_KEY, PROGRESS_CHANGED_EVENT } from './constants';

class ProgressStoreTarget extends EventTarget {}
const target = new ProgressStoreTarget();

let isInitialized = false;
let isStorageListenerRegistered = false;
let currentCache: CompletedLessonSlugs = [];

function handleStorageEvent(event: StorageEvent) {
  if (event.key === PROGRESS_STORAGE_KEY) {
    const newCompleted = parseCompletedLessons(event.newValue);
    if (JSON.stringify(newCompleted) !== JSON.stringify(currentCache)) {
      currentCache = newCompleted;
      notifySubscribers();
    }
  }
}

/**
 * Valida si un slug corresponde a una lección canónica ('lesson') válida.
 */
export function isValidCanonicalLessonSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false;
  const studyPlanIds = getStudyPlanIdsForLessonSlug(slug);
  if (studyPlanIds.length === 0) return false;

  return studyPlanIds.some((id) => {
    const rel = getRelationByStudyPlanId(id);
    return rel?.kind === 'lesson';
  });
}

/**
 * Carga e inicializa el estado de progreso canónico con SSR guard.
 * Ejecuta la migración idempotente de datos heredados.
 */
export function initializeProgress(): CompletedLessonSlugs {
  if (typeof localStorage === 'undefined') {
    return [];
  }

  if (!isInitialized) {
    // 1. Ejecutar migración idempotente de datos heredados si existen
    currentCache = runProgressMigration();

    // 2. Registrar el listener de almacenamiento una sola vez si window está disponible
    if (!isStorageListenerRegistered && typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageEvent);
      isStorageListenerRegistered = true;
    }

    isInitialized = true;
  }

  return [...currentCache];
}

/** Devuelve la lista inmutable de lecciones completadas actuales */
export function getCompletedLessons(): CompletedLessonSlugs {
  if (!isInitialized && typeof localStorage !== 'undefined') {
    initializeProgress();
  }
  return [...currentCache];
}

/** Consulta si una lección específica está completada */
export function isLessonCompleted(slug: string): boolean {
  return getCompletedLessons().includes(slug);
}

/**
 * Marca o desmarca una lección canónica principal.
 * Rechaza slugs que no correspondan a una lección principal.
 */
export function setLessonCompleted(slug: string, completed: boolean): CompletedLessonSlugs {
  if (!isValidCanonicalLessonSlug(slug)) {
    return getCompletedLessons();
  }

  const current = getCompletedLessons();
  const exists = current.includes(slug);

  if (completed === exists) {
    return current; // Sin cambios, no notificar
  }

  let next: CompletedLessonSlugs;
  if (completed) {
    next = [...current, slug];
  } else {
    next = current.filter((s) => s !== slug);
  }

  currentCache = next;
  persistAndNotify(next);
  return [...next];
}

/** Alterna el estado completado de una lección canónica principal */
export function toggleLessonCompleted(slug: string): CompletedLessonSlugs {
  const isDone = isLessonCompleted(slug);
  return setLessonCompleted(slug, !isDone);
}

/**
 * Suscribe un listener a los cambios de progreso.
 * Retorna una función de desuscripción idempotente y segura.
 */
export function subscribeToProgress(listener: ProgressSubscriber): () => void {
  let isSubscribed = true;

  const handler = (event: Event) => {
    if (!isSubscribed) return;
    try {
      const customEv = event as CustomEvent<CompletedLessonSlugs>;
      listener(customEv.detail);
    } catch {
      // Proteger otros suscriptores de excepciones en callbacks del usuario
    }
  };

  target.addEventListener(PROGRESS_CHANGED_EVENT, handler);

  return () => {
    if (isSubscribed) {
      isSubscribed = false;
      target.removeEventListener(PROGRESS_CHANGED_EVENT, handler);
    }
  };
}

function persistAndNotify(state: CompletedLessonSlugs) {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, serializeCompletedLessons(state));
    } catch {
      // Ignorar cuotas excedidas o errores de almacenamiento
    }
  }
  notifySubscribers();
}

function notifySubscribers() {
  const customEvent = new CustomEvent<CompletedLessonSlugs>(PROGRESS_CHANGED_EVENT, {
    detail: [...currentCache],
  });
  target.dispatchEvent(customEvent);
}

/** Reinicia el estado interno del store (útil exclusivamente para pruebas) */
export function resetStoreForTesting() {
  if (typeof window !== 'undefined' && isStorageListenerRegistered) {
    try {
      window.removeEventListener('storage', handleStorageEvent);
    } catch {
      // Guard
    }
  }
  isInitialized = false;
  isStorageListenerRegistered = false;
  currentCache = [];
}
