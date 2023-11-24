import { INIT_PAGE, LIMIT_PER_PAGE } from '@/src/constants/constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { encode } from 'querystring';

type Props = {
  name: string;
  birth_year: string;
  url: string;
};

export default function Result({ name, birth_year, url }: Props) {
  const router = useRouter();
  const searchParams = new URLSearchParams(encode(router.query));
  const limit = Number(searchParams.get('limit')) || LIMIT_PER_PAGE;
  const page = Number(searchParams.get('page')) || INIT_PAGE;
  const search = Number(searchParams.get('search')) || '';

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
