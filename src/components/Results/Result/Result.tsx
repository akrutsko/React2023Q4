import { getSearchParams } from '@/src/utils/search-params';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  name: string;
  birth_year: string;
  url: string;
};

export default function Result({ name, birth_year, url }: Props) {
  const router = useRouter();
  const { search, limit, page } = getSearchParams(router.query);

  const id = url.split('/').filter(Boolean).at(-1);

  return (
    <li>
      <Link
        href={{
          pathname: `/${id}`,
          query: { search, page, limit },
        }}
      >
        <p>
          <i>Name:</i> {name}
        </p>
        <p>
          <i>Birth year:</i> {birth_year}
        </p>
      </Link>
    </li>
  );
}
