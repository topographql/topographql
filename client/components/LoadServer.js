import React from 'react';
import { Input, Button } from 'antd';

function LoadServer(props) {

  return (
      <div id="loadserver">
        <form>
          <Input onChange={props.onChange} id = 'endpoint' type='text' name="endpoint" placeholder= "Enter your GraphQL endpoint" />
          <Button type="primary" onClick={props.onSubmitEndpoint}>Submit</Button>
        </form>
      </div>
  );
}

export default LoadServer;
