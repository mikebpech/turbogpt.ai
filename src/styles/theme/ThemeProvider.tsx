import * as React from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { useThemeSlice } from './slice';
import { selectTheme, selectThemeKey } from './slice/selectors';
import { MantineProvider } from '@mantine/core';

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  useThemeSlice();

  const theme = useSelector(selectTheme);
  const themeKey = useSelector(selectThemeKey);

  return (
    <MantineProvider
      theme={{ colorScheme: themeKey === 'dark' ? 'dark' : 'light' }}
    >
      <OriginalThemeProvider theme={theme}>
        {React.Children.only(props.children)}
      </OriginalThemeProvider>
    </MantineProvider>
  );
};
