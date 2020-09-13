import React, { Component } from 'react';
import { Button, ModalHeader, Modal, ModalBody, ModalFooter } from 'reactstrap';

class CheckoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({ modal: !prevState.modal }));
  }

  completeOrder = (event) => {
    event.preventDefault();

    const completedOrder = {
      order: {
        is_complete: true
      }
    }

    this.props.updateOrder(completedOrder);
    this.toggle();
  }

  // Make user confirm that they really want to check out
  render() {
    return (
      <>
        <Button onClick={this.toggle} color="primary">Check Out</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Complete Order</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to complete this order?</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.completeOrder} color="primary">Yes, Complete Order</Button>
            <Button onClick={this.toggle} color="danger">Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }

}

export default CheckoutModal;