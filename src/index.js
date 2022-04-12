import store from './redux/Store';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom'

import App from "./App";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

