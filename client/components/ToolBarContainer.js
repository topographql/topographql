import React from 'react';
import LoadServer from "./LoadServer"
import SubmitQuery from "./SubmitQuery"

function ToolBarContainer() {
  return (
      <div id="toolbar-container">
         <LoadServer />
         <SubmitQuery />
      </div>
  )
}

export default ToolBarContainer