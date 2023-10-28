import './App.css';

import { Component } from 'react';
import { Search } from './components/search/Search';
import { Result } from './components/result/Result';
import { Data, Person, ResourcesType } from './interfaces/SWApi';
import { ErrorButton } from './components/error/ErrorButton';

const URL = `https://swapi.dev/api/${ResourcesType.People}/`;

type AppState = {
  searchTerm: string;
  isLoading: boolean;
  data: Person[];
};

class App extends Component<unknown, AppState> {
  state = {
    searchTerm: localStorage.getItem('ak-react-search-term') || '',
    isLoading: true,
    data: [],
  };

  fetchData = (searchTerm: string = '') => {
    this.setState({ isLoading: true });

    const searchParam = searchTerm && `?search=${searchTerm}`;

    fetch(URL + searchParam)
      .then((res) => res.json())
      .then((data: Data<Person>) =>
        this.setState({ data: data.results, isLoading: false }),
      )
      .catch(() => this.setState({ isLoading: false }));
  };

  handleClick = (searchTerm: string) => {
    this.setState({ searchTerm });
    localStorage.setItem('ak-react-search-term', searchTerm);
    this.fetchData(searchTerm);
  };

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchData(searchTerm);
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

export default App;
