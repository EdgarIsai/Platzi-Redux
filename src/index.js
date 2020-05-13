import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import reducers from './reducers/index'
import './css/iconos.css'
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

const store = createStore(
    reducers, // All reducers
    {}, // initial State
    applyMiddleware(reduxThunk),
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


