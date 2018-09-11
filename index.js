import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PSF from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PSF />, document.getElementById('root'));

registerServiceWorker();
