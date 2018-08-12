import React from 'react';
import Modal from '@material-ui/core/Modal';

class SimpleModal extends React.Component {

  render() {
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleCloseModal}
        >
          <div className='add-modal'>
            <form className='add-modal-form'>
              {this.props.children}
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}


export default SimpleModal;