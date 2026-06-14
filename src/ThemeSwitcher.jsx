import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { toggleTheme } from './store/themeSlice';

function ThemeSwitcher() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <Tooltip title={mode === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}>
      <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeSwitcher;
