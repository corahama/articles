import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Icon, Grid, Header, Menu, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/auth';

const Layout = (props) => {
  const activeItem = props.location.pathname;
  const isAuthenticated = props.isAuthenticated;

  return (
    <div>
      <Segment inverted style={{ marginBottom: '50px'}}>
        <Menu inverted pointing secondary>
          <Link to="/">
            <Menu.Item
              name='home'
              active={activeItem === '/'}
            />
          </Link>
          <Link to="/create-article/">
            <Menu.Item
              name='create'
              active={activeItem === '/create-article/'}
            />
          </Link>
          {isAuthenticated ?
            <Menu.Menu position='right'>
              <Button color="red" onClick={() => {props.logout(); props.history.push('/')}}>Logout</Button>
            </Menu.Menu>
            :
            <Menu.Menu position='right'>
              <Menu.Item style={{padding: '0px 10px'}}>
                <Link to="/login/">
                  <Button color="grey" active={activeItem === '/login/'}>Log in</Button>
                </Link>
              </Menu.Item>
              <Menu.Item style={{padding: '0'}}>
                <Link to="/signup/">
                  <Button primary active={activeItem === '/signup/'}>Sign Up</Button>
                </Link>
              </Menu.Item>
            </Menu.Menu>
          }
        </Menu>
      </Segment>

      <Container>
        {props.children}
      </Container>

      <Segment inverted style={{ padding: '5em 0em', marginTop: '50px' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={7}>
                <Header as='h4' inverted>
                  Footer Header
                </Header>
                <p>
                  Articles App made with <Icon name="heart" color="red" /> by Corahama
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token != null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
