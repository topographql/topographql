import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';

const History = (props) => {

  const [isVisible, setIsVisible] = useState(false);
  const [saveButtons, setSaveButtons] = useState(null);

  console.log('saves', props.querySaves);

  useEffect(() => {
    const savesArray = props.querySaves
    const buttons = Object.values(savesArray).map((el, i) => {
      const text = `${el.username} Time: ${el.created_at}`;
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
  // }
};

export default History;
