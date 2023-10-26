import { Component } from 'react';
import { Person } from '../../interfaces/SWApi';

type ResultProps = {
  isLoading: boolean;
  data: Person[];
};

export class Result extends Component<ResultProps> {
  render() {
    const { isLoading, data } = this.props;

    return isLoading ? (
      <p>Loading...</p>
    ) : (
      <>
        <h1>Search Results</h1>
        <ul>
          {data.length > 0 &&
            data.map((person: Person) => {
              const { name, birth_year, gender } = person;
              return (
                <li key={person.created.toString()}>
                  <p>
                    <i>Name:</i> {name}
                  </p>
                  <p>
                    <i>Description:</i> {gender} {birth_year}
                  </p>
                </li>
              );
            })}
        </ul>
      </>
    );
  }
}
