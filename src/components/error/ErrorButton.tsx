import { Component } from 'react';

export class ErrorButton extends Component {
  state = {
    throwError: false,
  };

  handleClick = () => this.setState({ throwError: true });

  render() {
    const { throwError } = this.state;
    if (throwError) {
      throw new Error('Crashed!');
    }

    return <button onClick={this.handleClick}>Throw an error</button>;
  }
}
