import React, { Component } from 'react';

export class DogsCard extends Component {

    render() {
        return (
            <div id={this.props.id} onClick={this.props.onClick}>
                <h2 id={this.props.id}>{this.props.name}</h2>
                <img src={this.props.image} alt='Not Found' id={this.props.id}></img>
                {this.props.temperaments &&
                <div id={this.props.id}>
                    <h3 id={this.props.id} >Temperaments: {this.props.temperaments}</h3>
                    <h3 id={this.props.id}>Weight: {this.props.weight} Kg</h3>
                </div>
                }
            </div>
        );
    };
};