var SubmitB = React.createClass({displayName: "SubmitB",
	getInitialState: function(){
		return{value: '',  text: false, para: '', position: [], keywords: []};
	},
	handleClick : function(e){
		this.setState({value: this.refs['a'].state.text, 
					   text: this.refs['b'].state.text, 
					   para: this.refs['c'].state.value,
					   position: this.refs['d'].state.position,
					   keywords: this.refs['e'].state.keywords
						}, function () {
    		console.log(this.state.value);	
    		console.log(this.state.text);
    		console.log(this.state.para);
    		console.log(this.state.position);
    		consol.log(this.state.keywords);
    	});		
	},
	render : function(){
		var value = this.state.value;
		var text = this.state.text;
		var para = this.state.para;
		var position = this.state.position;
		return (
			
			React.createElement("div", null, 
				React.createElement(TextImage, {ref: "b", value: text}), 
				React.createElement(TextV, {ref: "c", value: para}), 
				React.createElement(FontSize, {ref: "a", value: value}), 
				React.createElement(Imagepos, {ref: "d", value: position}), 	
				React.createElement(Keywords, {ref: "e", value: this.state.keywords}), 				
				React.createElement("button", {onClick: this.handleClick, id: "button"}, "Submit")
			)
		);
	}
});

var Imagepos = React.createClass({displayName: "Imagepos",
	getInitialState: function(){
		return {position: this.props.value, clicks: 0};
	},

	handleChange: function(event){
			var OFFSET_X = 450+147;
			var OFFSET_Y = 60+18 ;
			var pos_x = event.clientX?(event.clientX):event.pageX;
			var pos_y = event.clientY?(event.clientY):event.pageY;
			if(this.state.clicks == 0){
				this.setState({clicks: this.state.clicks + 1 , position: [pos_x-OFFSET_X, pos_y-OFFSET_Y]}, function(){
					console.log(this.state.position);
				});
			}
			else if(this.state.clicks == 1){
				this.setState({clicks: this.state.clicks + 1 , position: [this.state.position[0], this.state.position[1], pos_x-OFFSET_X, pos_y-OFFSET_Y]}, function(){
					console.log(this.state.position);
				});
			}
			else{
				document.getElementById("cross").onclick = function() { return false; } ;
			}	
	},
	render:function(){
		return(	
			React.createElement("form", {name: "pointform", method: "post"}, 
				React.createElement("div", {id: "pointer_div"}, 
					React.createElement("img", {src: "test.png", id: "cross", onClick: this.handleChange})
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

var FinalKeywords = React.createClass({displayName: "FinalKeywords",
	render: function() {
    var createItem = function(itemText, index) {
      return React.createElement("li", {key: index + itemText}, itemText);
    };
    return (React.createElement("div", {id: "display"}, 
    		React.createElement("ul", null, this.props.items.map(createItem))));
  			
  	}
});


var Keywords = React.createClass({displayName: "Keywords",
  getInitialState: function() {
    return {keywords: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextkeywords = this.state.keywords.concat([this.state.text]);
    var nextText = '';
    this.setState({keywords: nextkeywords, text: nextText});
  },
  render: function() {
    return (
      React.createElement("div", {id: "keywords"}, 
        React.createElement("label", {className: "col-sm-1 control-label"}, "FontSize"), 
        React.createElement(FinalKeywords, {items: this.state.keywords}), 
        React.createElement("form", {onSubmit: this.handleSubmit}, 
          React.createElement("input", {onChange: this.onChange, value: this.state.text}), 
          React.createElement("button", null, "Add")
        )
      )
    );
  }
});



React.render(React.createElement(SubmitB, null) , document.getElementById('main'));











