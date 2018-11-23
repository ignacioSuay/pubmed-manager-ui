import React from 'react';
import AppContainer from './src/components/AppContainer'
import reducer from './src/reducers/reducer';
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux';
// import Amplify from 'aws-amplify';
// import aws_exports from './aws-exports';
import thunk from 'redux-thunk';


// Amplify.configure(aws_exports);
const store = createStore(reducer, applyMiddleware(thunk));

const app = () => (

    <Provider store={store}>
        <AppContainer/>
    </Provider>
);

export default app;
