import styles from './error.module.css';

import { Component } from 'react';

type ErrorButtonState = {
  throwError: boolean;
};

export class ErrorButton extends Component<unknown, ErrorButtonState> {
  state = {
    throwError: false,
  };

  handleClick = () => this.setState({ throwError: true });

  render() {
    const { throwError } = this.state;
    if (throwError) {
      throw new Error('Crashed!');
    }

    return (
      <button className={styles.errorbtn} onClick={this.handleClick}>
        throw Error
      </button>
    );
  }
}
