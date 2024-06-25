import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

const useGetParams = () => {
  const { search } = useLocation();
  const queryObj = queryString.parse(search);
  const { id } = queryObj;
  if (id !== '' && id !== undefined && id !== null) {
    return queryObj;
  } else {
    const params = useParams();
    return { ...params, ...queryObj };
  }
};

export default useGetParams;
