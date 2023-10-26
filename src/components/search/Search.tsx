import { Component, createRef } from 'react';

type SearchProps = {
  onClick: (searchTerm: string) => void;
  searchTerm: string;
};

export class Search extends Component<SearchProps> {
  textInput = createRef<HTMLInputElement>();

  handleClick = () => {
    const { onClick } = this.props;

    const value = this.textInput.current?.value || '';
    onClick(value);
  };

  render() {
    const { searchTerm } = this.props;

    return (
      <section>
        <input ref={this.textInput} defaultValue={searchTerm} />
        <button onClick={this.handleClick}>Search</button>
      </section>
    );
  }
}
