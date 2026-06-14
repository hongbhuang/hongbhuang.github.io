import React from 'react';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TodoList from './TodoList';

function App() {
  const mode = useSelector((state) => state.theme.mode);
  
  const theme = React.useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
    },
    shape: { borderRadius: 8 },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoList />
    </ThemeProvider>
  );
}

export default App;
