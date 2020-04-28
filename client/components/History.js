/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';

const History = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [saveButtons, setSaveButtons] = useState(null);

  useEffect(() => {
    const array = props.querySaves;
    const buttons = array.map((el, i) => {
      const text = `${el.query_name} Time: ${el.created_at}`;
      return <Button key={i} type="default">{text}</Button>;
    });
    setSaveButtons(buttons);
  }, [props.querySaves]);

  return (
      <div>
        <Button type="default" size='small' onClick={() => setIsVisible(true)}>
          History
        </Button>
        <Modal
          title="History"
          visible={isVisible}
          onOk={() => setIsVisible(false)}
          onCancel={() => setIsVisible(false)}
        >
          <div id='history-wrap'>
            {saveButtons}
          </div>
        </Modal>
      </div>
  );
};

export default History;
