import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateAesthetic extends Component {
    constructor(props) {
        super(props);
        // store form fields in state
        this.state = {
            title: '',
            image: '',
            date: '',
            description: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        // send a POST request to the server
        // the request includes the state, which is the info. for the new user to be created

        axios.post('/api/aesthetics', this.state)
            .then(res => this.props.history.push('/')) // if successful go to home
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        // note: name of the inputs must match the property names in state
        return (
            <div className="uk-container uk-container-xsmall uk-margin-large-top">

                <form onSubmit={this.handleSubmit}>
                    <fieldset className="uk-fieldset">

                        <legend className="uk-legend">Create New Aesthetic</legend>

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
                            <label className="uk-form-label" htmlFor="form-s-date">Date</label>
                            <input
                                className="uk-input"
                                id="form-s-date"
                                type="date"
                                name="date"
                                value={this.state.date}
                                onChange={this.handleChange}
                                placeholder="1970-01-01"
                            />
                        </div>

                        <div className="uk-margin">
                            <textarea
                                className="uk-textarea"
                                rows="3"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleChange}
                                placeholder="Description">
                            </textarea>
                        </div>

                        <button className="uk-button uk-button-primary" type="submit" value="Submit">Create</button>

                    </fieldset>
                </form>

            </div>
        );
    }
}

export default CreateAesthetic;
