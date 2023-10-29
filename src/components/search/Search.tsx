import styles from './Search.module.css';
import logo from '../../assets/images/star-wars.png';

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
    onClick(value.trim());
  };

  render() {
    const { searchTerm } = this.props;

    return (
      <section className={styles.wrapper}>
        <div>
          <img src={logo} alt="Star Wars" width={100} height={100} />
        </div>
        <div>
          <input ref={this.textInput} defaultValue={searchTerm} />
          <button onClick={this.handleClick}>Search</button>
        </div>
      </section>
    );
  }
}
