import React from 'react';
import { Button } from 'antd';

function SettingsBar(props) {
  return (
    <div id="settings-bar">
        <Button type="default" size='small' onClick={props.handleReset}>Reset Data</Button>
        <Button type="default" size='small' onClick={props.handleShowResults}>{props.showResults ? 'Hide Results' : 'Show Results'}</Button>
        {/* <Button type="default" size='small'>Show Health</Button> */}
    </div>
  );
}

export default SettingsBar;
