import qs, { StringifiableRecord } from 'query-string';

//
export const createLocationSearch = (query: StringifiableRecord) => {
  return qs.stringify(query);
};

//
export const parseLocationSearch = (search: string) => {
  return qs.parse(search);
};
