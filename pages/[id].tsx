import ResultDetails from '@/components/Results/ResultDetails/ResultDetails';
import Results from '@/components/Results/Results';
import Search from '@/components/Search/Search';
import {
  getPeople,
  getPerson,
  getRunningQueriesThunk,
} from '@/store/api/peopleApi';
import type { Data, Person } from '@/interfaces/SWApi';
import { wrapper } from '@/store/store';
import { encode } from 'querystring';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const searchParams = new URLSearchParams(encode(context.query));
    store.dispatch(getPeople.initiate(searchParams.toString()));

    const id = context.params?.id;
    if (typeof id === 'string') {
      store.dispatch(getPerson.initiate(id));
    }

    const [people, person] = await Promise.all(
      store.dispatch(getRunningQueriesThunk()),
    );

    return {
      props: {
        people: people?.data || null,
        person: person?.data || null,
      },
    };
  },
);

type Props = {
  people: Data<Person>;
  person: Person;
};

export default function Details({ people, person }: Props) {
  return (
    <main>
      <Search />
      <Results people={people}>
        <ResultDetails person={person} />
      </Results>
    </main>
  );
}
