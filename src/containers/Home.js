import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid } from 'semantic-ui-react';
import axios from 'axios';

import Layout from './Layout';


const Home = (props) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(SERVICE_URL + '/api-articles/')
    .then((res) => {
      setArticles(res.data);
    })
  }, []);

  return (
    <Layout {...props} >
      <Grid columns={3}>
        <Grid.Row>
          {articles.map((article, id) => (
            <Grid.Column key={id} style={{ marginBottom: '30px' }}>
              <Card>
                <Card.Content header={article.title} style={{background:"#bdbdbd"}}/>
                <Card.Content description={article.content} />
                <Card.Description textAlign='right' style={{ margin: '10px 0' }}>
                  <Link to={`article/${article.id}/`} style={{ paddingRight: '20px' }}>Ir</Link>
                </Card.Description>
              </Card>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default Home;
