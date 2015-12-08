var SubmitB = React.createClass({displayName: "SubmitB",
	getInitialState: function(){
		return{value: '',  text: false, para: ''};
	},
	handleClick : function(e){
		this.setState({value: this.refs['a'].state.text, text: this.refs['b'].state.text, para: this.refs['c'].state.value}, function () {
    		console.log(this.state.value);	
    		console.log(this.state.text);
    		console.log(this.state.para);
    	});		
	},
	render : function(){
		var value = this.state.value;
		var text = this.state.text;
		var para = this.state.para;
		return (
			
			React.createElement("div", null, 
				React.createElement(TextImage, {ref: "b", value: text}), 
				React.createElement(TextV, {ref: "c", value: para}), 
				React.createElement(FontSize, {ref: "a", value: value}), 				
				React.createElement("button", {onClick: this.handleClick, id: "button"}, "Submit")
			)
		);
	}
});

var Imagepos = React.createClass({displayName: "Imagepos",
	getInitialState: function(){
		return {position: []};
	},

	handleChange: function(event){
			var pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("cross").offsetLeft;
			var pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("cross").offsetTop;

			this.setState({position: [pos_x, pos_y]}, function(){
				console.log(this.state.position);
			});

	},
	render:function(){
		return(	
			React.createElement("form", {name: "pointform", method: "post"}, 
				React.createElement("div", {id: "pointer_div", onClick: this.handleChange}, 
					React.createElement("img", {src: "test.png", id: "cross"})
				)
			) 
			);
	}
});

var TextV = React.createClass({displayName: "TextV",
	getInitialState: function(){
		return {value: this.props.value};
	},
	handleChange : function(e){
		this.setState({value: e.target.value});
	},

	render: function  () {
		var value = this.state.value;
		return(React.createElement("div", {className: "form-group", id: "textV"}, 
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
		return {text: this.props.value};
	},
	itsText: function(e){
		this.setState({text: true});
	},
	itsImage: function(e){
		this.setState({text: false});
	},
	render: function(){
		return(
			React.createElement("div", {className: "radio", id: "TextOrImage"}, 
			  React.createElement("label", null, React.createElement("input", {type: "radio", name: "optradio", onChange: this.itsText}), "Text"), 
			  React.createElement("label", null, React.createElement("input", {type: "radio", name: "optradio", onChange: this.itsImage}), "Image")	
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
		return(React.createElement("div", {className: "form-group", id: "fontSize"}, 
      			React.createElement("label", {className: "col-sm-1 control-label"}, "FontSize"), 
      				React.createElement("div", {className: "col-sm-1"}, 
        				React.createElement("textarea", {className: "form-control", rows: "1", id: "focusedInput", onChange: this.handleChange, type: "text", value: this.text})
      				)
      			)
			);
	}
});

React.render(React.createElement(Imagepos, null) , document.getElementById('fontSize'));











