import React from 'react';
import { Layout, ModuleDetail, QueryResult } from '../components/';
import { gql, useQuery } from '@apollo/client';

const MODULES_BY_ID = gql`
  query getTrackById($trackId: ID!, $moduleId: ID!) {
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
    module(id: $moduleId) {
      id
      title
      content
      videoUrl
    }
  }
`;

export default function Module({ moduleId, trackId }) {
  const { loading, error, data } = useQuery(MODULES_BY_ID, {
    variables: {
      moduleId,
      trackId,
    },
  });

  return (
    <Layout fullWidth>
      <QueryResult error={error} loading={loading} data={data}>
        <ModuleDetail track={data?.track} module={data?.module} />
      </QueryResult>
    </Layout>
  );
}
