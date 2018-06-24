import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Kontakt from './components/Kontakt';
import company from '@fortawesome/fontawesome-free-solid/faUserFriends';
import location from '@fortawesome/fontawesome-free-solid/faMapMarker';
import email from '@fortawesome/fontawesome-free-solid/faEnvelope';
import blog from '@fortawesome/fontawesome-free-solid/faLink';
import Menu from './Menu';
import Tabs from './components/Tabs';

class Main extends React.Component {
    render(){
        if(this.props.user.message){
            return(
                    <div><h1>Ne nayden</h1></div>
            );
        }
        else if(this.props.user.length!==0){
            return(    
            <div className="baza">
            <Menu/>
            <div className="Main">
                  <img src={this.props.user.avatar_url} height="300" width="300"/>
                  <h2>{this.props.user.name}</h2>
                  <span className="login">{this.props.user.login}</span>
                  <p>{this.props.user.bio}</p>
                  <hr/>
                  <br/>
                  <Kontakt polye={this.props.user.company} lin={0} ico={company}/>
                  <Kontakt polye={this.props.user.location} lin={0} ico={location}/>
                  <Kontakt polye={this.props.user.email} lin={1} ico={email}/>
                  <Kontakt polye={this.props.user.blog} lin={1} ico={blog}/>
            </div>
            <Tabs/>
            <div className="afterTabs"></div>
            </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
};
class SearchBar extends React.Component {
  searchData = (e) => {
    e.preventDefault();
    this.props.changeUser(e.target.text.value);
    this.props.getOrg(e.target.text.value);
    this.props.getFol(e.target.text.value);
    this.props.getRepo(e.target.text.value);
  }
  render() {
    return (
      <form className="SearchBar" onSubmit={this.searchData}>
        <input name="text" type="text" placeholder="Type github user"/>
        <input type="submit" value="Search"/>
      </form>
    );
  }
};
class App extends React.Component {
  render(){
    return (
      <div className="app-container">
        <SearchBar changeUser={this.props.changeUser} getOrg={this.props.getOrg} getFol={this.props.getFol} getRepo={this.props.getRepo}/>
        <Main user={this.props.user}/>
      </div>
    );
  }
};
export default connect(
     state => ({
         user: state.user,
         org: state.org
     }),
     dispatch => ({
         changeUser: (name) => {
             const async = () => dispatch => {
                setTimeout(() => {
                    fetch('https://api.github.com/users/'+name)
                        .then(res => res.json())
                        .then((data) => {
                                dispatch({type: 'CHANGE_USER', payload: data});
                        });
                },1000);                 
             };
             dispatch(async());
         },
         getOrg: (name) => {
             const async2 = () => dispatch => {
                setTimeout(() => {
                    fetch('https://api.github.com/users/'+name+'/orgs')
                        .then(res => res.json())
                        .then((data) => {
                                dispatch({type: 'CHANGE_ORG', payload: data});
                        });
                },1100);                 
             };
             dispatch(async2());
         },
         getFol: (name) => {
             const async3 = () => dispatch => {
                setTimeout(() => {
                    fetch('https://api.github.com/users/'+name+'/followers')
                        .then(res => res.json())
                        .then((data) => {
                                dispatch({type: 'CHANGE_FOL', payload: data});
                        });
                },1100);                 
             };
             dispatch(async3());
         },
         getRepo: (name) => {
             const async4 = () => dispatch => {
                setTimeout(() => {
                    fetch('https://api.github.com/users/'+name+'/repos')
                        .then(res => res.json())
                        .then((data) => {
                                dispatch({type: 'CHANGE_REPO', payload: data});
                        });
                },1100);                 
             };
             dispatch(async4());
         }
         
     })
)(App);

