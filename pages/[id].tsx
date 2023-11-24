import ResultDetails from '@/src/components/Results/ResultDetails/ResultDetails';
import Results from '@/src/components/Results/Results';
import Search from '@/src/components/Search/Search';
import {
  getPeople,
  getPerson,
  getRunningQueriesThunk,
} from '@/src/features/api/peopleApi';
import type { Data, Person } from '@/src/interfaces/SWApi';
import { wrapper } from '@/src/store/store';
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
        people: people.data,
        person: person?.data || null,
      },
    };
  },
);

type Props = {
  people: Data<Person>;
  person: Person;
};

export default function Home({ people, person }: Props) {
  return (
    <main>
      <Search />
      <Results people={people}>
        <ResultDetails person={person} />
      </Results>
    </main>
  );
}
