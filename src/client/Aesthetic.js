import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Aesthetic extends React.Component {
    render() {
        return (
            <div>
                <Link to={`/post/${this.props.id}`}>
                    <div className="uk-text-center box-shadow grow">
                        <div className="uk-inline-clip uk-transition-toggle uk-border-rounded" tabIndex="0">
                            <img className="aesthetic-image" src={this.props.image} />
                            <div className="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary">
                                <p className="uk-h4 uk-margin-remove">{this.props.title}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

Aesthetic.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string
};

export default Aesthetic;
