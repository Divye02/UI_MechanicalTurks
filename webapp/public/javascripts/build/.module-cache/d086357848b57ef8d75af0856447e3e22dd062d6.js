var TextV = React.createClass({displayName: "TextV",
	getInitialState: function(){
		return {value: ''};
	},
	handleChange : function(e){
		this.setState({value: e.target.value});
	},
	render: function  () {
		var value = this.state.value;
		return(
						React.createElement("div", null, 
					   React.createElement("input", {className: "form-control", id: "focusedInput", type: "text", value: "Click to focus...", onChange: this.handleChange}), 
					   React.createElement("button", null)
						)
			);
	}
});

React.render(React.createElement(TextV, null) , document.getElementById('form'));