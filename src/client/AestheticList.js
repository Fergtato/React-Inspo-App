import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Aesthetic from './Aesthetic';
import axios from 'axios';
import './app.css';

class AestheticList extends Component {
    constructor(props) {
        super(props);

        this.state = { aesthetics: [] };
    }

    componentDidMount() {
        axios.get('api/aesthetics')
            .then(response => {
                this.setState({ aesthetics: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        const aestheticList = this.state.aesthetics.map(u => (
            <Aesthetic
                key={u._id}
                id={u._id}
                title={u.title}
                image={u.image}
                date={u.date}
            />
        ));

        return (
            <div>
                <div className="uk-container uk-margin-large-top uk-margin-large-bottom">

                    <h2>Aesthetics</h2>

                    <div className="uk-child-width-1-2 uk-text-center" uk-grid="true">
                        {aestheticList}
                    </div>
                </div>

            </div>
        );
    }
}

export default AestheticList;
