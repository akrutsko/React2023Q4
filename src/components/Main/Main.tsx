import { Component } from 'react';
import { Search } from '../Search/Search';
import { Result } from '../Result/Result';
import { Person } from '../../interfaces/SWApi';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import { fetchPeople } from '../../services/api';

type MainState = {
  searchTerm: string;
  isLoading: boolean;
  data: Person[];
};

export class Main extends Component<unknown, MainState> {
  state = {
    searchTerm: localStorage.getItem('ak-react-search-term') || '',
    isLoading: true,
    data: [],
  };

  handleClick = async (searchTerm: string) => {
    this.setState({ searchTerm, isLoading: true });
    localStorage.setItem('ak-react-search-term', searchTerm);

    try {
      const data = await fetchPeople(searchTerm);
      this.setState({ data: data.results, isLoading: false });
    } catch {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.handleClick(searchTerm);
  }

  render() {
    const { searchTerm, isLoading, data } = this.state;

    return (
      <main>
        <Search onClick={this.handleClick} searchTerm={searchTerm} />
        <Result isLoading={isLoading} data={data} />
        <ErrorButton />
      </main>
    );
  }
}
