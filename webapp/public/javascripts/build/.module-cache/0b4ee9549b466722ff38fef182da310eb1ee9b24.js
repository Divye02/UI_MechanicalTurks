var text = React.createClass({displayName: "text",
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
					   React.createElement("input", {type: "text", value: value, onChange: this.handleChange})
						)
			);
	}
});

React.render(React.createElement("text", null) , document.getElementById('form'));