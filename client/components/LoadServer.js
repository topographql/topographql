import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { getIntrospectionQuery } from 'graphql';

function LoadServer(props) {
  // const [endpoint, setEndpoint] = useState('');
  // const submit = () => {
  //   fetch(endpoint, {
  //     method: 'POST',
  //     headers: { 
  //       'Content-Type': 'application/json',
  //      },
  //     body: JSON.stringify({"query": getIntrospectionQuery()})
  //   }).then((res) => res.json())
  // }
  return (
      <div id="loadserver">
        <form>
          {/* <Input onChange={(e) => setEndpoint(e.target.value)} id = 'endpoint' type='text' name="endpoint" placeholder= "Enter your GraphQL endpoint" />
          <Button type="primary" onClick={() => submit()}>Submit</Button> */}
          <Input onChange={props.onChange} id = 'endpoint' type='text' name="endpoint" placeholder= "Enter your GraphQL endpoint" />
          <Button type="primary" onClick={props.onSubmitEndpoint}>Submit</Button>
        </form>
      </div>
  );
}

export default LoadServer;
