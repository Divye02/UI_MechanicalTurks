var text = React.createClass({displayName: "text",
	getInitialState: function(){
		return {text: ''}
	},

	render: function  () {
		return(
				React.createElement("div", null, 
					React.createElement("fieldset", {className: "form-group"}, 
					    React.createElement("label", {htmlFor: "textarea"}, "Example textarea"), 
					    React.createElement("textarea", {className: "form-control", id: "textarea", rows: "3"})
					  )
				)
			);
	}
});

React.render(React.createElement("text", null) , document.body);