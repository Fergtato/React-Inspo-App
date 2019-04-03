import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
// loads the Icon plugin
UIkit.use(Icons);

import AestheticList from './AestheticList';
import PostList from './PostList';
import CreateAesthetic from './CreateAesthetic';
import CreatePost from './CreatePost';
import EditPost from './EditPost';

// 'main' Component. Sets up the React Router and respective routes
const App = () => {
    return(
        <HashRouter>
            <div>
                <nav className="uk-navbar-container">
                    <div className="uk-container uk-container-expand">
                        <div className="uk-navbar">
                            <div className="uk-navbar-left">

                                <a className="uk-navbar-item uk-logo" href="#">Sinterest</a>

                                <ul className="uk-navbar-nav">
                                    <li className="uk-active">
                                        <Link to={'/'}>
                                        Aesthetics
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                            <div className="uk-navbar-right">



                                <div className="uk-navbar-item">
                                    <Link to={'/create-aesthetic'}>
                                        <button className="uk-button uk-button-primary">Create new aesthetic</button>
                                    </Link>
                                </div>

                                <div className="uk-navbar-item">
                                    <Link to={'/create-post'}>
                                        <button className="uk-button uk-button-primary">Create new post</button>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </nav>


                <Route exact path="/" component={AestheticList}/>
                <Route path="/post/:id" component={PostList}/>
                <Route path="/create-aesthetic" component={CreateAesthetic}/>
                <Route path="/create-post" component={CreatePost}/>
                <Route path="/edit-post/:id" component={EditPost}/>
            </div>
        </HashRouter>
    );
};

export default App;
