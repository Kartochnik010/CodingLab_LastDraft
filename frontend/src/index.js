import React from 'react';
//adding React dependency

import ReactDOM from 'react-dom';
//another React dependency for interacting with DOM

import './index.css';
import App from './App';

//rendering the single root element
ReactDOM.render(<App />, document.getElementById('root'));
//
//main feature of React is that it constantly renders an entire page inside that root element
//letting users interact with the page without refreshing it
//
