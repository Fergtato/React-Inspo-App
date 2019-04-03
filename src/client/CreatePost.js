import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        // store form fields in state
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
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
    }

    componentDidMount() {
        axios.get('api/aesthetics')
            .then(response => {
                // this.setState({ aesthetic_id: response.data[0]._id });
                this.setState({ aesthetics: response.data });
                // console.log(response.data[0]._id);
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
    // this.setState({ aesthetic_id: this.state.aesthetics[0]._id });
    }

    handleSubmit(event) {
        event.preventDefault();

        // send a POST request to the server
        // the request includes the state, which is the info. for the new user to be created

        axios.post('/api/posts', this.state)
            .then(res => this.props.history.push('/')) // if successful go to home
            .catch(error => {
                console.log(error);
            });
    }

    handleKeyPress(e) {

        if (e.key === 'Enter') {
            e.preventDefault();
            this.addTag();
            this.state.tagString = '';
        }
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

                        <legend className="uk-legend">Create New Post</legend>

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
                                    className="uk-select"
                                    id="form-stacked-select"
                                    onChange={(e) => this.setState({aesthetic_id: e.target.value, validationError: e.target.value === '' ? 'You must select an aesthetic' : ''})}
                                >
                                    <option disabled selected value> select an aesthetic </option>
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

export default CreatePost;
