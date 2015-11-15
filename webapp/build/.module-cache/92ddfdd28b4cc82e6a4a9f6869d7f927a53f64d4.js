var text = React.createClass({displayName: "text",
	getInitialState: function() {
	    return {value: 'Hello!'};
	  },
	  handleChange: function(event) {
	    this.setState({value: event.target.value});
	  },
	  render: function() {
	    var value = this.state.value;
	    return React.createElement("input", {type: "text", value: value, onChange: this.handleChange});
	  }
});

React.render(React.createElement("text", null) , document.body);