import React, { Component } from 'react';
import { node } from 'prop-types';
import Error from './error';

class ErrorBoundary extends Component {
  static propTypes = {
    children: node
  }

  state = {
    error: null,
    errorInfo: null
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { children } = this.props;
    const { error, errorInfo } = this.state;
    if (error)
      return <Error message={error.toString()} trace={errorInfo.componentStack} />;
    return children;
  }
}

export default ErrorBoundary;