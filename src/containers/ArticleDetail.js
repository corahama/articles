import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Header, Icon, Modal } from 'semantic-ui-react';

import Layout from './Layout';


const ArticleDetail = (props) => {
  const [article, setArticle] = useState({});
  const [open, setOpen] = useState(false)

  useEffect(() => {
    axios.get(SERVICE_URL + `/api-articles/${props.match.params.id}/`)
    .then((res) => {
        setArticle(res.data);
    })
  }, [])

  function handleDelete() {
    axios.delete(SERVICE_URL + `/api-articles/${article.id}/`)
    .then((res) => {
      window.location = `/`;
    }).catch((res) => {
      console.error(`${res.name}: ${res.response.data.detail}`);
    })
  }

  return (
    <Layout {...props} >
      <Container style={{paddingBottom: '40px'}}>
        <Header textAlign='right'>
          <Link to={`/article/${article.id}/update/`}><Button primary>Update</Button></Link>
          <Modal
            basic
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            size='large'
            trigger={<Button color="red">Delete</Button>}
          >
            <Header icon>
              <Icon name='archive' />
              Delete this article
            </Header>
            <Modal.Content>
              <p style={{textAlign:'center'}}>
                Are you sure you want to delete this article?
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color='blue' inverted onClick={() => setOpen(false)}>
                <Icon name='remove' /> No
              </Button>
              <Button color='red' inverted onClick={() => {handleDelete();setOpen(false)}}>
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </Header>
        <Header as='h2' textAlign='left' dividing>{article.title}</Header>
        <p>
          {article.content}
        </p>
      </Container>
    </Layout>
  );
};

export default ArticleDetail;