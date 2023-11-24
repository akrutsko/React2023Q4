import styles from './ErrorBoundary.module.css';

import { Component, ErrorInfo, PropsWithChildren } from 'react';

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<PropsWithChildren, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo });
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
