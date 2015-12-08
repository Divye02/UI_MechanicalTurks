var TextV = React.createClass({displayName: "TextV",
	getInitialState: function(){
		return {value: ''};
	},
	handleChange : function(e){
		this.setState({value: e.target.value});
	},

	render: function  () {
		var value = this.state.value;
		return(React.createElement("div", {className: "form-group"}, 
      			React.createElement("label", {className: "col-sm-1 control-label"}, "Text"), 
      				React.createElement("div", {className: "col-sm-4"}, 
        				React.createElement("textarea", {className: "form-control", rows: "10", id: "focusedInput", onChange: this.handleChange, type: "text", value: this.state.value})
      				)
      			)
			);
	}

});

var TextImage = React.createClass({displayName: "TextImage",
	getInitialState: function(){
		return {text: false};
	},
	itsText: function(e){
		this.setState({text: true});
	},
	itsImage: function(e){
		this.setState({text: false});
	},
	render: function(){
		return(
			React.createElement("div", {className: "radio"}, 
			  React.createElement("label", null, React.createElement("input", {type: "radio", name: "optradio", onChange: this.itsText}), "Text"), 
			  React.createElement("label", null, React.createElement("input", {type: "radio", name: "optradio", onChange: this.itsImage}), "Image")	
			)
			);
	}
});
var SubmitB = React.createClass({displayName: "SubmitB",
	getInitialState: function(){
		return{value: '' };
	},
	handleClick : function(e){
		this.setState({value: this.refs['a'].state.text}, function () {
    		console.log(this.state.value);
    	});
		console.log(this.state.value);
	},
	render : function(){
		var value = this.state.value;
		return (
			
			React.createElement("div", null, 
				React.createElement(FontSize, {ref: "a", value: value}), 
				React.createElement("button", {onClick: this.handleClick}, "Hello")
			)
		);
	}
});

var FontSize = React.createClass({displayName: "FontSize",
	getInitialState: function(){
		return {text: this.props.value};
	},
	handleChange : function(e){
		this.setState({text: e.target.value});
	},
	render: function  () {
		return(React.createElement("div", {className: "form-group"}, 
      			React.createElement("label", {className: "col-sm-1 control-label"}, "FontSize"), 
      				React.createElement("div", {className: "col-sm-1"}, 
        				React.createElement("textarea", {className: "form-control", ref: "a", rows: "1", id: "focusedInput", onChange: this.handleChange, type: "text", value: this.text})
      				)
      			)
			);
	}
});


React.render(React.createElement(SubmitB, null) , document.getElementById('fontSize'));











