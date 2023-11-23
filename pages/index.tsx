import Results from '@/src/components/Results/Results';
import Search from '@/src/components/Search/Search';
import {
  getPeople,
  getRunningQueriesThunk,
} from '@/src/features/api/peopleApi';
import type { Data, Person } from '@/src/interfaces/SWApi';
import { wrapper } from '@/src/store/store';
import { encode } from 'querystring';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const searchParams = new URLSearchParams(encode(context.query));
    store.dispatch(getPeople.initiate(searchParams.toString()));
    const [res] = await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        data: res.data,
      },
    };
  },
);

type Props = {
  data: Data<Person>;
};

export default function Home({ data }: Props) {
  return (
    <main>
      <Search />
      <Results data={data} />
    </main>
  );
}
