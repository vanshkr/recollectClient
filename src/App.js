import React from "react";
import {Container} from '@material-ui/core';
import { BrowserRouter,Switch,Route,Redirect} from "react-router-dom";
import Navbar  from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import Auth from './Components/Auth/Auth';
import PostDetails from "./Components/PostDetails/PostDetails";
import {GoogleOAuthProvider} from '@react-oauth/google';

const App = ()=>{
    const user = JSON.parse(localStorage.getItem('profile'));
    
    
    
    return(
        <GoogleOAuthProvider clientId = '258499216146-2jvd08hoo7rmm71upp290mubofd3qhiu.apps.googleusercontent.com' >
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar/>
                    <Switch>
                        <Route path = '/' exact component={()=><Redirect to ='/posts'/>}/>
                        <Route path = '/posts' exact component={Home}/>
                        <Route path = '/posts/search' exact component={Home}/>
                        <Route path = '/posts/:id' component={PostDetails}/> 
                        <Route path = '/auth' exact component={()=>(!user?<Auth/> : <Redirect to="/"/>)}/>
                    </Switch>
                </Container> 
            </BrowserRouter>
        </GoogleOAuthProvider>


    );
};

export default App;