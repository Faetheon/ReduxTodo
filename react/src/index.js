import React from 'react';
import ReactDOM from 'react-dom';
import {defaultState} from './redux/reducers';
import configureStore from "./redux/store";
import {Provider as ReduxProvider} from 'react-redux';

import App from './components/App';

const initialStore = configureStore(defaultState);

ReactDOM.render(<ReduxProvider store={initialStore}><App /></ReduxProvider>, document.getElementById('root'));