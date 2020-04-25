import React from 'react';
import { Modal, Button } from 'antd';

class History extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="default" onClick={this.showModal}>
          History
        </Button>
        <Modal
          title="History"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <div id='history-wrap'>
            <div id='left'>
                left div
            </div>
            <div id="right">
                right div
            </div>
        </div>
        </Modal>
      </div>
    );
  }
}

export default History;
