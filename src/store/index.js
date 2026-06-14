import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './todosSlice'
import { todosListenerMiddleware, loadTodos } from './localStorage'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: {
    todos: { items: loadTodos(), filter: 'all' },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(todosListenerMiddleware.middleware),
})

export default store
