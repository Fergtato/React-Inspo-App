import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './app.css';

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [], aesthetic: [] };

        this.updatePosts = this.updatePosts.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {

        axios.get(`api/aesthetics/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ aesthetic: response.data });
            })
            .catch(error => {
                console.log(error);
            });


        this.updatePosts();
    }

    updatePosts() {
        axios.get(`api/aesthetics/${this.props.match.params.id}/posts`)
            .then(response => {
                this.setState({ posts: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleDelete(postId) {
    // make a DELETE request to the server to remove the user with this userId
        axios.delete('api/posts', {
            data: {
                id: postId
            }
        })
            .then(response => {
                // if delete was successful, re-fetch the list of users, will trigger a re-render
                this.updatePosts();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        const postList = this.state.posts.map(u => (
            <Post
                key={u._id}
                id={u._id}
                title={u.title}
                image={u.image}
                description={u.description}
                tags={u.tags}
                handleDelete={this.handleDelete}
            />
        ));

        return (
            <div>

                <div className="uk-section-default">
                    <div className="uk-section uk-light background-cover" style={{background: `url('${this.state.aesthetic.image}')no-repeat center center fixed`}} >
                        <div className="uk-container">

                            <h2>{this.state.aesthetic.title}</h2>

                            <p>{this.state.aesthetic.date}</p>

                            <p>{this.state.aesthetic.description}</p>

                        </div>
                    </div>
                </div>

                <div className="uk-container uk-margin-large-top uk-margin-large-bottom">
                    {postList.length ?
                        <div>
                            <h3 className="uk-margin-top">All Posts</h3>
                            <div className="uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
                                {postList}
                            </div>
                        </div> :
                        <h3 className="uk-margin-top">No Posts</h3> }
                </div>
            </div>
        );
    }
}

const Post = (props) => {

    const tagList = props.tags.map((t, index) => (
        <span key={index} className="uk-label uk-margin-right">{t}</span>
    ));

    return (
        <div>
            <div>

                <div className="uk-text-center box-shadow grow">
                    <div className="uk-inline-clip uk-transition-toggle" tabIndex="0">

                        <div uk-lightbox="true">
                            <a href={props.image} data-alt="Image">
                                <img className="uk-border-rounded" src={props.image} />
                            </a>
                        </div>

                        <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-primary uk-flex uk-flex-center uk-flex-middle uk-border-rounded click-through">

                            <div>
                                <h3>{props.title}</h3>
                                {
                                    tagList.length ?
                                        <div>
                                            <div className="uk-margin">{tagList}</div>
                                        </div> :
                                        <p>No Tags</p>
                                }


                            </div>

                        </div>

                        <div className="uk-transition-fade uk-position-small uk-position-bottom-right uk-overlay">
                            <ul className="uk-iconnav">
                                <li>
                                    <Link to={`/edit-post/${props.id}`} uk-icon="icon: file-edit"></Link>
                                </li>
                                <li>
                                    <a onClick={() => {props.handleDelete(props.id);}} uk-icon="icon: trash"></a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default PostList;
