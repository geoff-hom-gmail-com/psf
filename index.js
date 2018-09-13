import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import PSF from './App';
import registerServiceWorker from './registerServiceWorker';

// const modalRoot = document.createElement('div');
// modalRoot.id = 'modal-root';
// document.body.appendChild(modalRoot);
// console.log('test3');

// const modalRoot2 = document.getElementById('modal-root');
// console.log(`test2: ${modalRoot2}`);


ReactDOM.render(<PSF />, document.getElementById('root'));
// ReactDOM.render(<div id="modal-root" />, document.body);
// ReactDOM.render(<PSF />, document.getElementById('root'));

// ReactDOM.render([
//   <div id="modal-root" />,
//   <PSF />,
// ], document.getElementById('root'));

registerServiceWorker();
