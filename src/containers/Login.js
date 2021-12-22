import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Segment, Header, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux';

import Layout from './Layout';
import * as actions from '../store/actions/auth';


const Login = (props) => {
  if (props.isAuthenticated) {
    return <Redirect to="/" />
  }

  let errorMessage = {};
  if (props.error !== null) {
    errorMessage = props.error;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let username = document.getElementById('usernameInput').value;
    let password = document.getElementById('passwordInput').value;

    props.onAuth(username, password);  
  }
  
  useEffect(() => {
    return () => {
      props.clearErrors();
    }
  }, [])

  return (
    <Layout {...props} >
      <Grid centered columns={2} style={{margin: '50px auto'}}>
        <Grid.Row>
          <Grid.Column>
            <Segment style={{padding: '40px 25px'}}>
              <Header as='h2' textAlign="center">Inicio de Sesión</Header>
              <Divider clearing style={{margin: '20px'}}/>
              {errorMessage.non_field_errors ? <p style={{textAlign:'center', color:'red'}}>{errorMessage.non_field_errors}</p> : null}
              <Form size="small">
                <Form.Field>
                  <label>Username</label>
                  <input placeholder='Username' id='usernameInput' type='text'/>
                  {errorMessage.username !== null ? <p style={{textAlign:'center', color:'red'}}>{errorMessage.username}</p> : null}
                </Form.Field>
                <Form.Field>
                  <label>Contraseña</label>
                  <input placeholder='Contraseña' id='passwordInput' type='password'/>
                  {errorMessage.password !== null ? <p style={{textAlign:'center', color:'red'}}>{errorMessage.password}</p> : null}
                </Form.Field>
                <p style={{textAlign:"center"}}>¿No tienes cuenta? Crea una <Link to="/signup/">aquí.</Link></p>
                <Form.Field  style={{textAlign: 'center'}}> {/* TODO: loading */}
                  <Button type='submit' onClick = {(e) => handleSubmit(e)} secondary>Entrar</Button>
                </Form.Field>
              </Form>
              </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token != null,
    loading: state.loading,
    error: state.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
    clearErrors: () => dispatch(actions.authStart()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
