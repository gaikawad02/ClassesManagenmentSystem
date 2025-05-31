import { ThemeProvider, CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import theme from './styles/theme';
import AppRouter from './Router';

function App1() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={AppRouter} />
    </ThemeProvider>
  );
}

export default App1;