import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import CloseIcon from '@mui/icons-material/Close'
import {
  addTodo,
  toggleTodo,
  removeTodo,
  editTodo,
  clearCompleted,
  setFilter,
} from './store/todosSlice'
import ThemeSwitcher from './ThemeSwitcher'
import { useTranslation } from 'react-i18next'

const selectFilteredTodos = (state) => {
  const { items, filter } = state.todos
  if (filter === 'active') return items.filter((t) => !t.completed)
  if (filter === 'completed') return items.filter((t) => t.completed)
  return items
}

const selectCounts = (state) => {
  const total = state.todos.items.length
  const completed = state.todos.items.filter((t) => t.completed).length
  return { total, completed, active: total - completed }
}

function TodoList() {
  const [draft, setDraft] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const dispatch = useDispatch()
  const todos = useSelector(selectFilteredTodos)
  const filter = useSelector((state) => state.todos.filter)
  const { total, completed, active } = useSelector(selectCounts)

  const { t } = useTranslation()

  const handleAdd = (e) => {
    e?.preventDefault?.()
    const text = draft.trim()
    if (!text) return
    dispatch(addTodo(text))
    setDraft('')
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditingText(todo.text)
  }

  const commitEdit = () => {
    const text = editingText.trim()
    if (text && editingId) {
      dispatch(editTodo({ id: editingId, text }))
    }
    setEditingId(null)
    setEditingText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText('')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }} id="todo-title">
            {t('title')}
          </Typography>
          <ThemeSwitcher />
          <Tooltip title={t('status_template', { active, total })}>
            <Typography variant="body2" sx={{ opacity: 0.8, ml: 1 }}>
              {active} / {total}
            </Typography>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleAdd}>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                size="small"
                placeholder={t('input_placeholder')}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                slotProps={{
                  input: { 'aria-label': t('checkbox_label', { text: draft || '', status: '' }) },
                }}
              />
              <Button type="submit" variant="contained" disabled={!draft.trim()}>
                {t('button_add')}
              </Button>
            </Stack>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            <ToggleButtonGroup
              size="small"
              exclusive
              value={filter}
              onChange={(_e, next) => {
                if (next) dispatch(setFilter(next))
              }}
              aria-label={t('filter_button', 'Filter')}
            >
              <ToggleButton value="all">{t('filter.all')}</ToggleButton>
              <ToggleButton value="active">
                {t('filter.active')}
              </ToggleButton>
              <ToggleButton value="completed">
                {t('filter.completed')}
              </ToggleButton>
            </ToggleButtonGroup>
            <Tooltip
              title={
                completed === 0
                  ? t('clear_completed.tooltip_empty')
                  : t('clear_completed.tooltip_count', { count: completed })
              }
            >
              <span>
                <Button
                  size="small"
                  color="inherit"
                  disabled={completed === 0}
                  onClick={() => dispatch(clearCompleted())}
                >
                  {t('clear_completed.button')}
                </Button>
              </span>
            </Tooltip>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {todos.length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ py: 4 }}
            >
              {total === 0
                ? t('lists.empty_new')
                : t('lists.empty_filter')}
            </Typography>
          ) : (
            <List disablePadding>
              {todos.map((todo) => {
                const isEditing = editingId === todo.id
                return (
                  <ListItem
                    key={todo.id}
                    disableGutters
                    divider
                    secondaryAction={
                      isEditing ? (
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title={t('actions.save')}>
                            <IconButton
                              size="small"
                              edge="end"
                              onClick={commitEdit}
                              disabled={!editingText.trim()}
                            >
                              <SaveOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('actions.cancel')}>
                            <IconButton size="small" edge="end" onClick={cancelEdit}>
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      ) : (
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title={t('actions.edit')}>
                            <IconButton size="small" edge="end" onClick={() => startEdit(todo)}>
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('actions.delete')}>
                            <IconButton
                              size="small"
                              edge="end"
                              onClick={() => dispatch(removeTodo(todo.id))}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      )
                    }
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={() => !isEditing && dispatch(toggleTodo(todo.id))}
                      dense
                      sx={{ borderRadius: 1 }}
                    >
                      <Checkbox
                        edge="start"
                        checked={todo.completed}
                        tabIndex={-1}
                        disableRipple
                        slotProps={{
                          input: {
                            'aria-label': t('checkbox_label', { text: todo.text, status: todo.completed ? 'completed' : 'active' }),
                          },
                        }}
                      />
                      {isEditing ? (
                        <TextField
                          fullWidth
                          size="small"
                          autoFocus
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              commitEdit()
                            } else if (e.key === 'Escape') {
                              cancelEdit()
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <ListItemText
                          primary={todo.text}
                          sx={{
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            color: todo.completed ? 'text.disabled' : 'text.primary',
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default TodoList
