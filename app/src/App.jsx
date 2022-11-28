import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from 'src/theme';
import routes from 'src/Routes';
import { Provider } from 'react-redux';
import store from './store';
import AlertSnackbars from './components/alerts/AlertSnackbars';
import LoadingCircularProgress from './components/loading/LoadingCircularProgress';

const App = () => {
  const routing = useRoutes(routes());
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlertSnackbars />
        <LoadingCircularProgress />
        {routing}
      </ThemeProvider>
    </Provider>
  );
};

export default App;
