import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import BrightModeIcon from '@mui/icons-material/BrightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { toggleTheme } from './store/themeSlice';

function ThemeSwitcher() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <Tooltip title={mode === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}>
      <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
        {mode === 'light' ? <DarkModeIcon /> : <BrightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeSwitcher;
