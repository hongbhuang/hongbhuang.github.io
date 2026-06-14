import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import {
  addTodo,
  toggleTodo,
  editTodo,
  removeTodo,
  clearCompleted,
} from './todosSlice'

const STORAGE_KEY = 'hongbhuang.todos.v1'

// Loads persisted todos. Returns [] on any failure (corrupt JSON, no window,
// SSR, quota errors, etc.) — the user's blank-slate experience should never
// be blocked by a bad read.
export function loadTodos() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveTodos(items) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Storage full / private mode / disabled — silently ignore so the UI
    // keeps working in-memory.
  }
}

// Note: `setFilter` is intentionally NOT persisted — filter state resets to
// 'all' on each page load, which is the standard expectation for session
// filters.
export const todosListenerMiddleware = createListenerMiddleware()

todosListenerMiddleware.startListening({
  matcher: isAnyOf(addTodo, toggleTodo, editTodo, removeTodo, clearCompleted),
  effect: (_action, api) => {
    saveTodos(api.getState().todos.items)
  },
})
