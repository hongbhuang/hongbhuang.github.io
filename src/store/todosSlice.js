import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  filter: 'all', // 'all' | 'active' | 'completed'
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.push(action.payload)
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text: text.trim(),
            completed: false,
            createdAt: Date.now(),
          },
        }
      },
    },
    toggleTodo(state, action) {
      const todo = state.items.find((t) => t.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    editTodo(state, action) {
      const { id, text } = action.payload
      const todo = state.items.find((t) => t.id === id)
      if (todo) todo.text = text.trim()
    },
    removeTodo(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
    clearCompleted(state) {
      state.items = state.items.filter((t) => !t.completed)
    },
    setFilter(state, action) {
      state.filter = action.payload
    },
  },
})

export const {
  addTodo,
  toggleTodo,
  editTodo,
  removeTodo,
  clearCompleted,
  setFilter,
} = todosSlice.actions

export default todosSlice.reducer
