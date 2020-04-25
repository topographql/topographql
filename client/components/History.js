import React from 'react';
import { Modal, Button } from 'antd';

class History extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    console.log(this.props);
    const savesArray = this.props.querySaves;
    const saveButtons = savesArray.map((el) => {
      const text = `${el[0]} Time: ${el[1]}`;
      return <Button type="default">{text}</Button>;
    });
    return (
      <div>
        <Button type="default" size='small' onClick={this.showModal}>
          History
        </Button>
        <Modal
          title="History"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <div id='history-wrap'>
            {saveButtons}
        </div>
        </Modal>
      </div>
    );
  }
}

export default History;
