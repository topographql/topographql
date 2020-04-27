import { getIntrospectionQuery } from 'graphql';

// eslint-disable-next-line import/prefer-default-export
export const introspect = async (endpoint) => {
  try {
    const schema = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"query": getIntrospectionQuery()})
    });
    return await schema.json().data;
  } catch (e) {
    console.log(e);
  }
};