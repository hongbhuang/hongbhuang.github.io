import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Paper,
  Box,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
      setInputValue('');
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h3" align="center" gutterBottom color="primary">
          My Todo List
        </Typography>

        <Paper elevation={3} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button variant="contained" onClick={addTodo}>
              Add
            </Button>
          </Box>

          <Divider />

          <List>
            {todos.length === 0 ? (
              <Typography variant="body1" align="center" color="textSecondary" sx={{ py: 2 }}>
                No tasks yet. Add one above!
              </Typography>
            ) : (
              todos.map((todo) => (
                <ListItem
                  key={todo.id}
                  disablePadding
                  divider
                >
                  <ListItemAvatar>
                    <Checkbox
                      edge="start"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                    <ListItemText
                      primary={todo.text}
                      sx={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? 'text.secondary' : 'text.primary',
                      }}
                    />
                  </ListItemAvatar>
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="delete"
                      edge="end"
                      onClick={() => deleteTodo(todo.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>

          {todos.length > 0 && (
            <Typography variant="caption" display="block" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
              {todos.filter(t => !t.completed).length} items left uncompleted
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
