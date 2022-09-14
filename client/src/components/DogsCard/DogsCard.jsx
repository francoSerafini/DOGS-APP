import React, { Component } from 'react';

export class DogsCard extends Component {

    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <img src={this.props.image} alt='Not Found'></img>
                {this.props.temperaments &&
                <div>
                    <h3>Temperaments: {this.props.temperaments}</h3>
                    <h3>Weight: {this.props.weight} Kg</h3>
                </div>
                }
            </div>
        );
    };
};