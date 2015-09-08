var React = require('react');
var classNames = require('classnames/dedupe');

require('./home.css');

var Anerror = React.createClass({
  render:function(){
    return(
      <div className="animated fadeInUp"> 
        <p>Problemas houston!</p>
        <p>¿Seguro que escribiste correctamente tu correo?</p>
      </div> 
    )
  }
})
var Inscribete = React.createClass({
  getInitialState: function() {
    return {
      subscribed: false, 
      busy:false, 
      error:false,
      url:'http://api.noders.com:80/api/jsconfs',
      email: ''
    };
  },
  handleClick: function(event) {
    var that = this;
    if(!that.state.busy){
      that.setState({busy:true,error:false});
      var URL = that.state.url;
      var xmlhttp=new XMLHttpRequest();
      xmlhttp.open("POST",URL,true);
      xmlhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
      xmlhttp.onreadystatechange = function() {//Call a function when the state changes.
          if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            that.setState({busy:false,subscribed: true});
          }else{
            that.setState({busy:false,subscribed: false});
            if(JSON.parse(this.response).error){
              that.setState({error:true})
            }
          }
      }
      xmlhttp.send(JSON.stringify({email:that.state.email}));
    }
  },
  handleChange: function(event) {
    this.setState({
      email : event.target.value
    })
  },
  render:function(){
    var isSubscribed = this.state.subscribed ? 'subscribed' : 'not-subscribed';
    var isBusy = this.state.busy ? 'busy' : 'not-busy';
    var isError = this.state.error ? 'error ' : 'not-error';
    var classes = classNames('col-xs-12','col-md-8','col-md-offset-2','animated', isSubscribed, isBusy, isError);

    return(
        <form className="form-horizontal inscribete animated">
          <div className="form-group form-group-lg">
            <div className={classes}>
              <h3>¿Quieres saber más?</h3>  
              <input className="form-control email" type="email"  value={this.state.email} onChange={this.handleChange} placeholder="Ingresa aquí tu email"/>
              <button href="#" type="submit" className="btn btn-large btnInscribir" onClick={this.handleClick}> Inscríbete! </button>
              {this.state.error? <Anerror/> : null}
            </div>
          </div>
        </form>
    )
  }
})

var Title = React.createClass({
  render: function() {
    return (
      <div className="col-xs-12 block display-table full-height">
        <div className="text-center display-cell">
          <div className="text-center">
            <h1 className="site-name">#SeViene</h1>
            <h2 className="site-desc"><span className="event">JSConf CL</span><span className="date">2016</span></h2>
            <div className="col-xs-6 col-xs-offset-3">
            <hr/>
          </div>
           <Inscribete/>
          </div>
         
        </div>
      </div>
    );
  }
});


module.exports =  
React.createClass({
  render: function() {
      return (
        <div>
          <Title/>
        </div>
      );
  }
});