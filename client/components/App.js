import React from 'react';
import ToolBarContainer from "./ToolBarContainer"
import VisualizerContainer from "./VisualizerContainer"

class App extends React.Component{
    constructor(){
      super()
    }

    render(){
      return(
        <div id='wrapper'> 
          <ToolBarContainer /> 
          <VisualizerContainer /> 
        </div>
      )
    }
}

export default App



