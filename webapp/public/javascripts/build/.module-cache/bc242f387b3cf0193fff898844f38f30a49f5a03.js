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
      			React.createElement("label", {className: "col-sm-2 control-label"}, "Focused"), 
      				React.createElement("div", {className: "col-xs-6 col-sm-3"}, 
        				React.createElement("input", {className: "form-control", id: "focusedInput", onChange: this.handleChange, type: "text", value: this.state.value})
      				)
      			)
			);
	}
});

React.render(React.createElement(TextV, null) , document.getElementById('form'));