import React,{ Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App=() => {
  useEffect(()=>{
    store.dispatch(loadUser());

  },[]);
  return( 
  <Provider store={store}>
  <Router>
<Fragment>
 <Navbar/>
 <Route exact path='/' component={Landing}/>
 <section className="container">
   <Alert/>
   <switch>
     <Route exact path="/register" component={Register}/>
     <Route exact path="/login" component={Login}/>
     <PrivateRoute exact path='/posts' component={Posts}/>
     <PrivateRoute exact path='/posts/:id' component={Post}/>
   </switch>
 </section>
</Fragment>
</Router>
</Provider>
)};
   
export default App;
