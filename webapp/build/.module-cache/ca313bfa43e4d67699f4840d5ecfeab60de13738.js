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
      				React.createElement("div", {className: "col-sm-10"}, 
        				React.createElement("input", {className: "form-control", id: "focusedInput", type: "text", value: "Click to focus..."})
      				)
      			)
			);
	}
});

React.render(React.createElement(TextV, null) , document.getElementById('form'));