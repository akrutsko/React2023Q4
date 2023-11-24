import styles from './ErrorBoundary.module.css';

import { Component, PropsWithChildren } from 'react';

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<PropsWithChildren, State> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error) {
    console.log('An error has been thrown:', error.message);
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;

    if (hasError)
      return (
        <p className={styles.errorpage}>Something went wrong! Try later.</p>
      );

    return this.props.children;
  }
}
