import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './todosSlice'
import themeReducer, { setTheme } from './themeSlice' // Added this
import { todosListenerMiddleware, loadTodos } from './localStorage'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    theme: themeReducer, // Added this
  },
  preloadedState: {
    todos: { items: loadTodos(), filter: 'all' },
    // Initial state for theme is handled in the slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(todosListenerMiddleware.middleware),
})

export default store
