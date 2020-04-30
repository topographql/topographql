/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';

const History = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [saveButtons, setSaveButtons] = useState(null);

  useEffect(() => {
    const array = props.querySaves;
    const buttons = array.map((el) => {
      const text = `${el.query_name} Time: ${el.created_at}`;
      return <Button key={el.id} type="default" onClick={() => props.handleSelectSave(el.query_str)}>{text}</Button>;
    });
    setSaveButtons(buttons);
  }, [props.querySaves]);

  const handleHistory = () => {
    if (props.user) setIsVisible(true);
    else props.globalPopupError('signin-history');
  };

  return (
      <div>
        <Button type="default" size='small' onClick={handleHistory}>
          History
        </Button>
        <Modal
          title="History"
          visible={isVisible}
          onOk={() => setIsVisible(false)}
          onCancel={() => setIsVisible(false)}
        >
          <div id='history-wrap'>
            { props.querySaves.length ? saveButtons : 'Your history is empty. Save a query to store it here.' }
          </div>
          <div id='query-prev'>
            <h3></h3>
          </div>
        </Modal>
      </div>
  );
};

export default History;
