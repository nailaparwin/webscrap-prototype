import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';

//comment from code push
//new commit
export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);


