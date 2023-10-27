import React, { Component } from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error) {
    console.log('componentDidCatch:', error);
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;

    return hasError ? (
      <p>Something went wrong! Try later.</p>
    ) : (
      this.props.children
    );
  }
}
