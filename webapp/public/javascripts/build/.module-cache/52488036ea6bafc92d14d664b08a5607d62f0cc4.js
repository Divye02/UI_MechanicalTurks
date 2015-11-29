/**
 * @jsx React.DOM
 */

var App = React.createClass({displayName: "App",
  getInitialState: function() {
    return {
      currentPage: 2,
      pages: 0,
      file: 'example.pdf'
    };
  },
  prevPage: function(ev) {
    ev.preventDefault();
    this.setState({
      currentPage: this.state.currentPage > 1 ? this.state.currentPage - 1 : 1
    });
  },
  nextPage: function(ev) {
    ev.preventDefault();
    if(this.state.pages < this.state.pages)
      this.setState({currentPage: this.state.pages < this.state.pages ? this.state.currentPage + 1 : this.state.pages });
  },
  onFileChange: function(ev) {
    this.setState({
      file: ev.target.files[0]
    });
  },
  render: function() {
    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("h1", null, "PDF.js + React = <3"), 
        React.createElement("div", null, 
          React.createElement("label", null, 
            "Change file", React.createElement("br", null), 
            React.createElement("input", {type: "file", onChange: this.onFileChange})
          )
        ), 
        React.createElement(PDF, {page: this.state.currentPage, file: this.state.file, onDocumentComplete: this._onDocumentComplete}), 
        React.createElement("div", null, 
          React.createElement("button", {onClick: this.prevPage}, "Previous page"), 
          React.createElement("button", {onClick: this.nextPage}, "Next page")
        )
      )
    );
  },
  _onDocumentComplete: function(pages){
    this.setState({pages: pages});
  }
});

React.render(React.createElement(App, null), document.body);




/*



var SubmitB = React.createClass({
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
    		console.log(this.state.keywords);
    	});		
	},
	render : function(){
		var value = this.state.value;
		var text = this.state.text;
		var para = this.state.para;
		var position = this.state.position;
		return (
			
			<div>
				<TextImage ref="b" value={text} />
				<TextV ref="c" value={para} />
				<FontSize ref = "a" value={value} />
				<Imagepos ref = "d" value={position} />	
				<Keywords ref = "e" value={this.state.keywords} />				
				<button onClick={this.handleClick} id="button">Submit</button>
			</div>
		);
	}
});

var Imagepos = React.createClass({
	getInitialState: function(){
		return {position: this.props.value, clicks: 0};
	},

	handleChange: function(event){
			var OFFSET_X = 606;
			var OFFSET_Y = 75 ;
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
	ComponentDidMount : function(){
		PDFJS.getDocument('test.pdf').then(function(pdf) {
		  // Using promise to fetch the page
		  pdf.getPage(1).then(function(page) {
		    var scale = 1.5;
		    var viewport = page.getViewport(scale);

		    //
		    // Prepare canvas using PDF page dimensions
		    //
		    var canvas = document.getElementById('the-canvas');
		    var context = canvas.getContext('2d');
		    canvas.height = viewport.height;
		    canvas.width = viewport.width;

		    //
		    // Render PDF page into canvas context
		    //
		    var renderContext = {
		      canvasContext: context,
		      viewport: viewport
		    };
		    page.render(renderContext);
		  });
		});
	},
	render:function(){		
		return(	
			<form name="pointform" method="post">
				<div id="pointer_div"  >
					<canvas id="cross" onClick= {this.handleChange} />
				</div>
			</form> 
			);
	}
});

var TextV = React.createClass({
	getInitialState: function(){
		return {value: this.props.value};
	},
	handleChange : function(e){
		this.setState({value: e.target.value});
	},

	render: function  () {
		var value = this.state.value;
		return(<div className="form-group" id = "textV">
      			<label className="col-sm-1 control-label">Text</label>
      				<div className="col-sm-4">
        				<textarea className="form-control" rows= "10" id="focusedInput" onChange={this.handleChange} type="text" value={this.state.value}/>
      				</div>
      			</div>
			);
	}

});



var TextImage = React.createClass({
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
			<div className="radio" id="TextOrImage">
			  <label><input type="radio"  name="optradio" onChange={this.itsText} />Text</label>
			  <label><input type="radio"  name="optradio" onChange={this.itsImage} />Image</label>	
			</div>
			);
	}
});

var FontSize = React.createClass({
	getInitialState: function(){
		return {text: this.props.value};
	},
	handleChange : function(e){
		this.setState({text: e.target.value});
	},
	render: function  () {
		return(<div className="form-group" id= "fontSize">
      			<label className="col-sm-1 control-label">FontSize</label>
      				<div className="col-sm-1">
        				<textarea className="form-control" rows="1" id="focusedInput" onChange={this.handleChange} type="text" value={this.text}/>
      				</div>
      			</div>
			);
	}
});

var FinalKeywords = React.createClass({
	render: function() {
    var createItem = function(itemText, index) {
      return <li key={index + itemText}>{itemText}</li>;
    };
    return (<div id="display">
    		<ul>{this.props.items.map(createItem)}</ul></div>);
  			
  	}
});


var Keywords = React.createClass({
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
      <div id="keywords">
        <label className="col-sm-1 control-label">Keywords</label>
        <FinalKeywords items={this.state.keywords} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>Add</button>
        </form>
      </div>
    );
  }
});



React.render(<SubmitB /> , document.getElementById('main'));



*/







