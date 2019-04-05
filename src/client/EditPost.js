import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditPost extends Component {
    constructor(props) {
        super(props);

        // store information relating to the post in state
        // should match the post object from the API
        this.state = {
            title: '',
            image: '',
            aesthetic_id: '',
            tags: [],
            tagString: '',
            aesthetics: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
    }

    componentDidMount() {
    // when this Component mounts, fetch data relating to the post to be edited
    // the post's ID is passed in via the URL and accessed via props
        axios.get('/api/posts/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    title: response.data.title,
                    image: response.data.image,
                    tags: response.data.tags,
                    aesthetic_id: response.data.aesthetic_id
                });
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('api/aesthetics')
            .then(response => {
                this.setState({ aesthetics: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange(event) {
    // one of the input boxes changed, update the state to match
    // note: name of the input boxes must match the property names in state
        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        // send a PUT request to the server
        // the request includes the state, which is the updated post information
        axios.put('/api/posts', this.state)
            .then(res => this.props.history.push('/')) // if successful go to home
            .catch(error => {
                console.log(error);
            });
    }

    addTag() {
        this.setState({ tags: [...this.state.tags, this.state.tagString] });
    }

    deleteTag(index) {
        let array = [...this.state.tags]; // make a separate copy of the array

        array.splice(index, 1);
        this.setState({tags: array});
    }

    render() {

        const tagList = this.state.tags.map((t, index) => (
            <Tag
                key={index}
                index={index}
                tag={t}
                deleteTag={this.deleteTag}
            />
        ));
        // note: name of the inputs must match the property names in state
        return (
            <div className="uk-container uk-container-xsmall uk-margin-large-top">

                <form onSubmit={this.handleSubmit}>
                    <fieldset className="uk-fieldset">

                        <legend className="uk-legend">Edit Post</legend>

                        <div className="uk-margin">
                            <input
                                className="uk-input"
                                type="text"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                placeholder="Title"
                            />
                        </div>

                        <div className="uk-margin">
                            <input
                                className="uk-input"
                                type="text"
                                name="image"
                                value={this.state.image}
                                onChange={this.handleChange}
                                placeholder="Image URL"
                            />
                        </div>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-select">Aesthetic</label>
                            <div className="uk-form-controls">
                                <select
                                    value={this.state.aesthetic_id}
                                    className="uk-select"
                                    id="form-stacked-select"
                                    onChange={(e) => this.setState({aesthetic_id: e.target.value, validationError: e.target.value === '' ? 'You must select an aesthetic' : ''})}
                                >
                                    {this.state.aesthetics.map((a) => <option key={a._id} value={a._id}> {a.title} </option>)}
                                </select>
                            </div>
                        </div>



                        <div className="uk-margin-bottom" uk-grid="true">
                            <div className="uk-width-1-3">
                                <div className="uk-margin">
                                    <div className="uk-inline">
                                        <span className="uk-form-icon" uk-icon="icon: tag"></span>
                                        <input className="uk-input" type="text" name="tagString" placeholder="Tags" onKeyPress={this.handleKeyPress} value={this.state.tagString} onChange={this.handleChange}/>
                                    </div>

                                </div>
                            </div>
                            <div className="uk-width-2-3">
                                {tagList.length ?
                                    <div>
                                        <div>{tagList}</div>
                                    </div> :
                                    <p>No Tags</p> }
                            </div>
                        </div>

                        <button className="uk-button uk-button-primary" type="submit" value="Submit">Create</button>

                    </fieldset>
                </form>

            </div>
        );
    }
}


const Tag = (props) => {

    return (

        <span className="uk-label uk-margin-small-right">{props.tag} <a onClick={() => {props.deleteTag(props.index);}} uk-icon="icon: close; ratio: 1"></a></span>

    );
};

export default EditPost;
