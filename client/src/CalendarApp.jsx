import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { store } from './store';
import { Provider } from 'react-redux';

export default function CalendarApp() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}
