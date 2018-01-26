import React from 'react';
import { string } from 'prop-types';

/**
 * Generic error handling component.
 */

const Error = ({ message, trace }) => (
  <details>
    <summary>Something went wrong</summary>
    <p>{ message }<hr/>{ trace }</p>
  </details>
);

Error.propTypes = {
  message: string,
  trace: string
}; 

export default Error;