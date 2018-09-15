import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import ModalWindow from './ModalWindow';

// For accessibility, try react-modal.

// https://assortment.io/posts/accessible-modal-component-react-portals-part-1
// class Modal extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }
//
//   render() {
//     return (
//       // is this really where I want the trigger button to open? or up?
//       <button>This is a button to trigger the Modal</button>
//     );
//   }
// }

// https://reactjs.org/docs/portals.html

const modalPropTypes = {
  children: PropTypes.array.isRequired,
};

// These two containers are siblings in the DOM
// 'root', 'modal-root'

class Modal extends Component {
  constructor(props) {
    super(props);
    this.modalRoot = document.getElementById('modal-root');
    if (!this.modalRoot) {
      this.modalRoot = document.createElement('div');
      this.modalRoot.id = 'modal-root';
      document.body.appendChild(this.modalRoot);
    }
    this.element = document.createElement('div');
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    this.modalRoot.appendChild(this.element);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.element);
  }

  render() {
    // return ReactDOM.createPortal(
    //   this.props.children,
    //   this.element,
    // );
    return ReactDOM.createPortal(
      <ModalWindow>
        {this.props.children}
      </ModalWindow>,
      this.element,
    );
  }
}

Modal.propTypes = modalPropTypes;

export default Modal;
