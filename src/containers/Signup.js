import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Checkbox, Form, Grid, Segment, Header, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux';

import Layout from './Layout';
import * as actions from '../store/actions/auth';


const Signup = (props) => {
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
    let email = document.getElementById('emailInput').value;
    let password1 = document.getElementById('password1Input').value;
    let password2 = document.getElementById('password2Input').value;

    props.onAuth(username, email, password1, password2);  
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
              <Header as='h2' textAlign="center">Registrarse</Header>
              <Divider clearing style={{margin: '20px'}}/>
                <Form size="small">
                  {errorMessage.non_field_errors ? <p style={{textAlign:'center', color:'red'}}>{errorMessage.non_field_errors}</p> : null}
                  <Form.Field>
                    <label>Username</label>
                    <input placeholder='Username' id='usernameInput' type='text'/>
                    {errorMessage.username !== null ? <p style={{textAlign:'center', color:'red'}}>{errorMessage.username}</p> : null}
                  </Form.Field>
                  <Form.Field>
                    <label>Email</label>
                    <input placeholder='Correo electronico' id='emailInput' type='email'/>
                    {errorMessage.email !== null ? <p style={{textAlign:'center', color:'red'}}>{errorMessage.email}</p> : null}
                  </Form.Field>
                  <Form.Field>
                    <label>Contraseña</label>
                    <input placeholder='Contraseña' id='password1Input' type='password'/>
                    {errorMessage.password1 !== null ? <p style={{textAlign:'center', color:'red'}}>{errorMessage.password1}</p> : null}
                  </Form.Field>
                  <Form.Field>
                    <label>Repite la contraseña</label>
                    <input placeholder='Repite la contraseña' id='password2Input' type='password'/>
                    {errorMessage.password2 !== null ? <p style={{textAlign:'center', color:'red'}}>{errorMessage.password2}</p> : null}
                  </Form.Field>
                  {/* <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                  </Form.Field> */}
                  <p style={{textAlign:"center"}}>¿Ya tienes cuenta? Inicia sesión <Link to="/login/">aquí.</Link></p>
                  <Form.Field  style={{textAlign: 'center'}}> {/* TODO: loading */}
                    <Button type='submit' onClick = {(e) => handleSubmit(e)} secondary>Registrarse</Button>
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
    onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2)),
    clearErrors: () => dispatch(actions.authStart()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
