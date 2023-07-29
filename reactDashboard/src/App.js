import { useEffect } from 'react'
// react-router components
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//React themes
import theme from 'assets/theme';
// React Dark Mode themes
import themeDark from 'assets/theme-dark';
//React routes
import routes from 'routes';

//React contexts
import { useMaterialUIController } from 'context';


export default function App() {
  const [controller] = useMaterialUIController();
  const {
    direction,
    darkMode,
  } = controller;

  const { pathname } = useLocation();

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
     
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
