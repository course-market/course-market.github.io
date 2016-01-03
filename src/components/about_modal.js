import React from 'react';
import Modal from 'react-modal';

const style = {
  content: {
    top: '20%',
    bottom: '20%',
    left: '20%',
    right: '20%'
  }
};

export default class AboutModal extends React.Component {

  render() {
    return (
        <div>
        <Modal
          isOpen={this.props.isOpen}
          closeTimeoutMS={150}
          onRequestClose={this.props.onRequestClose}
          style={style}>
          <div className='fa fa-times top-left modal-close-icon' onClick={this.props.onRequestClose}></div>
          <div className='medium light mb3 border-bottom-gray'>About</div>
          <div>Tired of not getting the classes you need semester after semester?</div>
          <div>W&M Classified provides a way for students to connect and swap courses.</div>
          <div>You can request a class or post one that you are registered for but are willing to give up.</div>
        </Modal>
        </div>
    );
  }
}
