import React, {Component} from 'react';
import {connect} from 'react-redux';

class Tab extends React.Component{
    constructor(props){
    super(props);
    this.state = {
      polye: '',
      i: 0
    };
    this.handleChange = this.handleChange.bind(this);
    }
    handleFocus = () => {
      this.props.funcCh(this.props.tex);
    }
    handleChange =(e) => {
     this.setState({
        polye: e.target.value
      });
    }
    Submit =(e) => {
      e.preventDefault();
      this.setState({
        i: this.state.i+1
      });
    }
    
   render(){ 
       let st11 = { display: 'none'};
       let st12 = { borderBottom: '2px solid orange' };
       let st21 = { display: 'block'};
       let st22 = { borderBottom: 'none'};
       let st31 = { pointerEvents: 'none', background: '#F0F0F0'};
       let st32 = { pointerEvents: 'auto'};
       
       if(this.props.tex==='Organizations'){
          var stForOrg = {display: 'none'};
        
          if(this.props.active===1){
             stForOrg = {display: 'block'};
             var organiz = "Ne naydeno!";
             
             if(this.props.org){
              organiz = this.props.org;
             }
          }
       return(
                   <div>
                    <label className="tabbut" style={this.props.active===0?st22:st12}>
                    <input  type="radio" value={this.props.tex} onClick={this.handleFocus}/>
                    {this.props.tex}
                    </label>
                    <div className="tamdeform" style={stForOrg}>
                         {(this.props.org)&&(this.props.org.length!==0)
                         ?this.props.org.map((or, index) =>
                                <a key={index} className="organiz" href={"https://github.com/"+or.login}>{or.login} </a>
                            )
                         :"No information!"}   
                    </div>
                   </div>
           );   
        } 
        else{
            return(
                   <div>
                    <label className="tabbut" style={this.props.active===0?st22:st12}>
                    <input  type="radio" value={this.props.tex} onClick={this.handleFocus}/>
                    {this.props.tex}
                    </label>
                    <div className="tamdeform" style={this.props.active===0?st11:st21}>
                    <form onSubmit={this.Submit}>
                    <input className="buttonEd" type="submit" value={this.state.i%2===0?'EDIT':'SAVE'}/>
                    <textarea style={this.state.i%2===0?st31:st32}  name="text" type="text" id="subMenu" onChange={this.handleChange} value={this.state.polye}/>
                    </form>
                    </div>
                   </div>
        );
       }
    }  
};

class Tabs extends React.Component{
     constructor(props){
        super(props);
        this.state = {
            active1: 0,
            active2: 0,
            active3: 0,
            active4: 0
        };
    }
    handleCh = (tab) =>{
    if(tab === 'Main'){
      this.setState({
        active1: 1,
        active2: 0,
        active3: 0,
        active4: 0
      });
    }else
     if(tab === 'Education'){
      this.setState({
        active1: 0,
        active2: 1,
        active3: 0,
        active4: 0
      });
     }else
     if(tab === 'Contacts'){
      this.setState({
        active1: 0,
        active2: 0,
        active3: 1,
        active4: 0
      });
     }
     if(tab === 'Organizations'){
      this.setState({
        active1: 0,
        active2: 0,
        active3: 0,
        active4: 1
      });
     }
  };
    render(){    
        return(
                <div className="tabs">
                    <Tab active={this.state.active1} tex={"Main"} funcCh={this.handleCh}/>
                    <Tab active={this.state.active2} tex={"Education"} funcCh={this.handleCh}/>
                    <Tab active={this.state.active3} tex={"Contacts"} funcCh={this.handleCh}/>
                    <Tab org={this.props.org}  active={this.state.active4} tex={"Organizations"} funcCh={this.handleCh}/>
                </div>
        );
    } 
}
export default connect(
    state => ({
         org: state.org
     })
)(Tabs);