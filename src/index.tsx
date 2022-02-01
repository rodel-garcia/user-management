import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/+state/store';
import App from './app/app';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
