import React from 'react';

function LoadServer(props) {
  return (
      <div id="loadserver">
        <form onSubmit={props.onSubmitEndpoint} >
          <label>Enter your GraphQL endpoint</label>
          <br/>
          <input onChange={props.onChange} type='text' name="endpoint"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
  );
}

export default LoadServer;
