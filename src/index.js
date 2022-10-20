import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {applyMiddleware,createStore,compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers';
import './index.css';

const store = createStore(reducers,compose(applyMiddleware(thunk)));

ReactDom.render(
    <Provider store = {store}>
        <App/>
    </Provider>,
    document.getElementById("root"));

