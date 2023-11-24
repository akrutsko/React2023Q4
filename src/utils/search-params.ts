import { ParsedUrlQuery, encode } from 'querystring';
import { INIT_PAGE, LIMIT_PER_PAGE } from '../constants/constants';

export const getSearchParams = (query: ParsedUrlQuery) => {
  const searchParams = new URLSearchParams(encode(query));
  const limit = Number(searchParams.get('limit')) || LIMIT_PER_PAGE;
  const page = Number(searchParams.get('page')) || INIT_PAGE;
  const search = Number(searchParams.get('search')) || '';

  return { limit, page, search };
};
