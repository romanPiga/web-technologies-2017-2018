import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Followers from './components/Folowers';
import Repos from './components/Repos';
import {createStore, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {Router, Route} from 'react-router';
import {history} from 'react-router-hash-history';

const store = createStore (reducer, applyMiddleware(thunk));
   
ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <div>
                    <Route exact path="/" component={App}/>
                    <Route path="/followers" component={Followers}/>
                    <Route path="/repos" component={Repos}/>
                </div>
            </Router>
        </Provider>,
document.getElementById('root')
);