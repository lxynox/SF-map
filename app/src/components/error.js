import React from 'react';
import { string } from 'prop-types';

const Error = ({ message, trace }) => (
  <details>
    <summary>Something went wrong</summary>
    <p>{ message }<hr/>{ trace }</p>
  </details>
);

Error.propTypes = {
  message: string
}; 

export default Error;