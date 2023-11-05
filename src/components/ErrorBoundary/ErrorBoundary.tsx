import styles from './ErrorBoundary.module.css';

import { Component } from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
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
