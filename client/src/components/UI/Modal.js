import React from 'react';
import Modal from '@material-ui/core/Modal';

class SimpleModal extends React.Component {

  render() {
    return (
      <div>
        <Modal
          open={this.props.open}
          onClose={this.props.handleCloseModal}
          className='book-card-container'
        >
          <div 
            className={this.props.className}
            style={{
              backgroundColor: 'white',
            }} >
            <div className='modal-content'>
              {this.props.children}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}


export default SimpleModal;