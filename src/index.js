import { hot } from "react-hot-loader/root";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { createStore, compose, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './store/reducers/auth';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhances(
    applyMiddleware(thunk)
));

const app = () => {
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}

const render = (Component) => ReactDOM.render(<Component />, document.getElementById("root"));

render(hot(app));
