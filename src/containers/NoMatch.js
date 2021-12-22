import React from 'react';
import { Icon } from 'semantic-ui-react';

import Layout from './Layout';


const NoMatch = (props) => {
  return (
    <Layout {...props} >
      <Icon name="minus circle" size="big" />
      <strong>Page not found!</strong>
    </Layout>
  );
};

export default NoMatch;