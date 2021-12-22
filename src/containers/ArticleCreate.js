import React, { Component } from 'react';
import axios from 'axios';
import { 
  Button, 
  Container,
  Form,
  Input,
  TextArea,
 } from 'semantic-ui-react';

import Layout from './Layout';


class ArticleCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    axios.post(SERVICE_URL + `/api-articles/`, {
      title: this.state.title,
      content: this.state.content,
    })
    .then((res) => {
      window.location = '/';
    }).catch((res) => {
      console.error(`${res.name}: ${res.response.data.detail}`);
    })
  }

  render () {
    return (
      <Layout {...this.props} >
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field
              control={Input}
              name='title'
              label='Title'
              placeholder='Title'
              onChange={this.handleChange}
              value={this.state.title}
            />
            <Form.Field
              control={TextArea}
              name='content'
              label='Content'
              placeholder='The body of the article...'
              onChange={this.handleChange}
              value={this.state.content}
            />
            <Form.Field control={Button} color="green">Submit</Form.Field>
          </Form>
        </Container>
      </Layout>
    );
  }
};

export default ArticleCreate;