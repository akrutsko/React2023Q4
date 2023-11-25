import Results from '@/components/Results/Results';
import Search from '@/components/Search/Search';
import { getPeople, getRunningQueriesThunk } from '@/store/api/peopleApi';
import type { Data, Person } from '@/interfaces/SWApi';
import { wrapper } from '@/store/store';
import { encode } from 'querystring';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const searchParams = new URLSearchParams(encode(context.query));
    store.dispatch(getPeople.initiate(searchParams.toString()));

    const [people] = await Promise.all(
      store.dispatch(getRunningQueriesThunk()),
    );

    return {
      props: {
        people: people?.data || null,
      },
    };
  },
);

type Props = {
  people: Data<Person>;
};

export default function Home({ people }: Props) {
  return (
    <main>
      <Search />
      <Results people={people} />
    </main>
  );
}
