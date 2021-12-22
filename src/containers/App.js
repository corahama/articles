import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import importedComponent from 'react-imported-component';
import { connect } from 'react-redux';

import favico from '../img/logo.png';
import Loading from '../components/Loading';
import * as actions from '../store/actions/auth';

const AsyncHome = importedComponent(
  () => import(/* webpackChunkName:'Home' */ './Home'),
  {
    LoadingComponent: Loading
  }
);
const AsyncArticle = importedComponent(
  () => import(/* webpackChunkName:'ArticleDetail' */ './ArticleDetail'),
  {
    LoadingComponent: Loading
  }
);
const AsyncArticleUpdate = importedComponent(
  () => import(/* webpackChunkName:'ArticleUpdate' */ './ArticleUpdate'),
  {
    LoadingComponent: Loading
  }
);
const AsyncArticleCreate = importedComponent(
  () => import(/* webpackChunkName:'ArticleCreate' */ './ArticleCreate'),
  {
    LoadingComponent: Loading
  }
);
const AsyncLogin = importedComponent(
  () => import(/* webpackChunkName:'Login' */ './Login'),
  {
    LoadingComponent: Loading
  }
);
const AsyncSignup = importedComponent(
  () => import(/* webpackChunkName:'Signup' */ './Signup'),
  {
    LoadingComponent: Loading
  }
);
const AsyncNoMatch = importedComponent(
    () => import(/* webpackChunkName:'NoMatch' */ './NoMatch'),
    {
      LoadingComponent: Loading
    }
);

const App = (props) => {
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.href = favico;
  document.head.appendChild(favicon)

  props.onTryAutoSignup();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AsyncHome}/>
        <Route exact path="/article/:id/" component={AsyncArticle}/>
        <Route exact path="/article/:id/update/" component={AsyncArticleUpdate}/>
        <Route exact path="/create-article/" component={AsyncArticleCreate}/>
        <Route exact path="/login/" component={AsyncLogin}/>
        <Route exact path="/signup/" component={AsyncSignup}/>
        <Route component={AsyncNoMatch} />
      </Switch>
    </Router>
  );
};


const mapStateToProps = state => {
  return {
    isAuthenticated: state.token != null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
