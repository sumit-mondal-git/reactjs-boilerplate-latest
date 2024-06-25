import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
const useQueryParams = () => {
  const { search } = useLocation();

  const queryObj = queryString.parse(search);

  return queryObj;
};

export default useQueryParams;

