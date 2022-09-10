import React, { Component } from 'react';

export class DogsCard extends Component {

    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <img src={this.props.image} alt='Not Found'></img>
                <h3>{this.props.temperaments}</h3>
                <h3>{this.props.weight} Kg</h3>
            </div>
        );
    };
};