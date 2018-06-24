import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class Icon extends React.Component {
    render(){
        return(
                <div className="tamdeIcon">
                <FontAwesomeIcon icon={this.props.kart}/>
                </div>
        );
    }
};

export default Icon;