var text = React.createClass({displayName: "text",
	getInitialState: function(){
		return {text: ''}
	},

	render: function  () {
		return(
				React.createElement("div", null, 
					React.createElement("fieldset", {class: "form-group"}, 
					    React.createElement("label", {for: "textarea"}, "Example textarea"), 
					    React.createElement("textarea", {class: "form-control", id: "textarea", rows: "3"})
					  )
				)
			);
	}
});

React.render(React.createElement("text", null) , document.getElementById('form'));