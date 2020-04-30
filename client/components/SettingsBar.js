import React from 'react';
import { Button } from 'antd';
import History from './History';

function SettingsBar(props) {
  return (
    <div id="settings-bar">
        <History 
          querySaves={props.querySaves}
          handleSelectSave={props.handleSelectSave}
          globalPopupError={props.globalPopupError}
          user={props.user}
          />
        <Button type="default" size='small' onClick={props.handleReset}>Reset Data</Button>
        <Button type="default" size='small' onClick={props.handleShowResults}>{props.showResults ? 'Hide Results' : 'Show Results'}</Button>
    </div>
  );
}

export default SettingsBar;
