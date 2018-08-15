import React from 'react';
import {Modal, Slide} from '@material-ui/core';

class SimpleModal extends React.Component {

  render() {
    return (
      <div>
        <Modal
          open={this.props.open}
          onClose={this.props.handleCloseModal}
          style={this.props.style}
        >
          <Slide
            in={this.props.open}
            direction='up'
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
          </Slide>
        </Modal>
      </div>
    );
  }
}


export default SimpleModal;