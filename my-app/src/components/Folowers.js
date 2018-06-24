import React, {Component} from 'react';
import {connect} from 'react-redux';
import Menu from '../Menu';
class Followers extends React.Component {
  render(){
    return (
        <div>
            <div className="SearchBar"></div>
                <div className="baza">
                    <Menu/>
                    <div className="cont">
                    <h1>Followers</h1>
                        {(this.props.fol)&&(this.props.fol.length!==0)
                        ?this.props.fol.map((or, index) =>
                        <a key={index} className="organiz" href={"https://github.com/"+or.login}>{or.login} </a>
                        )
                        :"No information!"}  
                    </div>
                </div>
        </div>
    );
  }
};

export default connect(
    state => ({
         fol: state.fol
     })
)(Followers);