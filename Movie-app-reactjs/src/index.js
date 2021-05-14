import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import "./styles/main.scss"
import store from "./store/home"
import {BrowserRouter as Router} from "react-router-dom"

ReactDOM.render(
    <Router>
        <HomePage store={store} />
    </Router>
    , document.getElementById('root'));
