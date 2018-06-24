import React, { Component } from 'react';
import Icon from './Icon';

class Kontakt extends React.Component {
    render(){
        let pole = this.props.polye;
        if(pole===null){
            pole='Ne ykazano';
        }
        if(this.props.lin===1){
            return(
                <div className="Kontakt">
                <Icon kart={this.props.ico}/>
                <a href={pole}>{pole}</a>
                </div>
            );
        }
        else {
            return(
                <div className="Kontakt">
                <Icon kart={this.props.ico}/>
                <span>{pole}</span>
                </div>
            );
        }
    }
};

export default Kontakt;