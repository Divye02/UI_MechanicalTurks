
var API_URL = "http://52.25.69.175:3000";
var SubmitB = React.createClass({displayName: "SubmitB",
  getInitialState: function(){
    return{value: '',  text: false, para: '', position: [], keywords: [], data: {} };
  },
    
  handleClick : function(e){
    var data = 
            {
             "position" : this.refs['d'].state.position,
             "isItText" : this.refs['b'].state.text,
             "Text" : this.refs['c'].state.value,
            "FontSize" : this.refs['d'].state.currentPage,
            "Keywords" :  this.refs['e'].state.keywords
            };
    //console.log(data);
    $.ajax({
                 url: API_URL + '/data',
                 dataType: 'json',
                 type: 'POST',
                 cache: false,
                 data: data
             }).done(function (data) {
                 console.log(data);
             });

      this.setState({value: '',  text: false, para: '', position: [], keywords: [], data: {}}); 
    
  },
  
  render : function(){
    var value = this.state.value;
    var text = this.state.text;
    var para = this.state.para;
    var position = this.state.position;
      var Button = ReactBootstrap.Button;
      var Row = ReactBootstrap.Row;
      var Col = ReactBootstrap.Col;
    return (
			React.createElement("div", null, 
                React.createElement(Row, {className: "show-grid"}, 
                    React.createElement(Col, {md: 6, mdPush: 6}, 
				        React.createElement(TextImage, {ref: "b", value: text}), 
                        React.createElement(TextV, {ref: "c", value: para}), 
				        React.createElement(Keywords, {ref: "e", value: this.state.keywords}), 
                        React.createElement(Button, {bsStyle: "primary", onClick: this.handleClick, id: "button"}, "Submit")
                    ), 
                    React.createElement(Col, {md: 6, mdPull: 6}, 
                        React.createElement(Imagepos, {ref: "d", value: position})
                    )
                )
			)
		);
	}
});

var Imagepos = React.createClass({displayName: "Imagepos",
	getInitialState: function(){
    return {position: this.props.value, clicks: 0, x_axis: 0, y_axis: 0, height: 0, width: 0, removeBox: false, currentPage: 1,
      pages: 0,
      file: ''};
  },
  componentWillReceiveProps: function(np){
    
    this.setState({position: np.value, clicks: 0, x_axis: 0, y_axis: 0, height: 0, width: 0, removeBox: false});
  },
  handleChange: function(event){
      var offset = $("#cross").offset();
      //console.log(offset.left);
      var pos_x = event.pageX;
      pos_x = pos_x - offset.left; 
      var pos_y = event.pageY;
      //console.log(offset.top);
      pos_y = pos_y - offset.top;
      if(this.state.clicks == 0){
        this.setState({x_axis: pos_x, y_axis: pos_y, clicks: this.state.clicks + 1 , position: [pos_x, pos_y]}, function(){
          //console.log(this.state.position);
        });
      }
      else if(this.state.clicks == 1){
        this.setState({
          width: pos_x - this.state.x_axis, height: pos_y - this.state.y_axis ,
          clicks: this.state.clicks + 1 , position: [this.state.position[0], this.state.position[1], pos_x, pos_y]}, function(){
          console.log(this.state.position);
          var c = document.getElementById("cross1");
          var ctx = c.getContext("2d");
          c.height = $( "#cross1" ).height();
          c.width = $( "#cross1" ).width();
          //console.log(c.height);

         // console.log($( "#cross1" ).height());
          //console.log(c.height);
          //console.log(c.style.width);
          //console.log(this.state.x_axis);
          //console.log(this.state.y_axis); 
          //console.log(this.state.width);
          //console.log(this.state.height);
          ctx.strokeRect(this.state.x_axis, this.state.y_axis, this.state.width, this.state.height);
        });
      }
      
      else{
        document.getElementById("cross").onclick = function() { return false; } ;
      } 
  }, 
  handleClick: function(){
    this.setState({removeBox: true, clicks: 0}, function(){
      //console.log(this.state.removeBox);
      var c = document.getElementById("cross1");
          var ctx = c.getContext("2d");
          //console.log(this.state.x_axis);
          //console.log(this.state.y_axis); 
          //console.log(this.state.width);
          //console.log(this.state.height);
          ctx.clearRect(this.state.x_axis-2, this.state.y_axis-2, this.state.width+4, this.state.height+4);
    });
  },
  prevPage: function(ev) {
    ev.preventDefault();
    this.setState({
      currentPage: this.state.currentPage > 1 ? this.state.currentPage - 1 : 1
    });
  },
  nextPage: function(ev) {
    ev.preventDefault();
    if(this.state.currentPage < this.state.pages)
      this.setState({currentPage: this.state.currentPage < this.state.pages ? this.state.currentPage + 1 : this.state.pages });
  },
  onFileChange: function(ev) {
    this.setState({
      file: ev.target.files[0]
    });
  },

  render:function(){
      var Button = ReactBootstrap.Button;
      var Input = ReactBootstrap.Input;
    return(
        React.createElement("div", null, 
        React.createElement("div", {id: "pdf_selector"}, 
          React.createElement(Input, {label: "Change file", type: "file", onChange: this.onFileChange})
        ), 
        React.createElement("div", {id: "cross2"}, 
          React.createElement(PDF, {page: this.state.currentPage, file: this.state.file, onDocumentComplete: this._onDocumentComplete}), 
          React.createElement("div", {id: "cross"}, React.createElement("canvas", {id: "cross1", width: "100%", height: "100%", onClick: this.handleChange}))
        ), 
        React.createElement("div", {id: "next_prev"}, 
          React.createElement(Button, {onClick: this.prevPage}, "Previous page"), 
          React.createElement(Button, {onClick: this.nextPage}, "Next page"), 
            React.createElement(Button, {bsStyle: "danger", id: "addRemoveBox", onClick: this.handleClick}, "Remove")
         )
         )
          
			);
	},
   _onDocumentComplete: function(pages){
    this.setState({pages: pages});
  }
});

var TextV = React.createClass({displayName: "TextV",
	getInitialState: function(){
		return {value: this.props.value};
	},
	handleChange : function(e){
		this.setState({value: e.target.value});
	},
	componentWillReceiveProps: function(np){
		this.setState({value: np.value});
	},
	render: function  () {
        var Input = ReactBootstrap.Input;
		return(
            React.createElement("div", {id: "textV"}, 
                React.createElement(Input, {type: "textarea", id: "focusedInput", onChange: this.handleChange, label: "Text Area", placeholder: "Type here.", value: this.state.value})
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
	componentWillReceiveProps: function(np){
		this.setState({text: np.value});
	},
	render: function(){
        var Input = ReactBootstrap.Input;
        var Well = ReactBootstrap.Well;
		return(
			React.createElement("div", {className: "radio", id: "TextOrImage"}, 
            React.createElement(Well, {bsSize: "small"}, 
			  React.createElement(Input, {type: "radio", label: "Text", name: "optradio", onChange: this.itsText}), 
			  React.createElement(Input, {type: "radio", label: "Image", name: "optradio", onChange: this.itsImage})
            )
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
	componentWillReceiveProps: function(np){
		this.setState({text: np.value});
	},
	render: function  () {
		return(React.createElement("div", {className: "form-group", id: "fontSize"}, 
      			React.createElement("label", {className: "col-sm-1 control-label"}, "FontSize"), 
      				React.createElement("div", {className: "col-sm-1"}, 
        				React.createElement("textarea", {className: "form-control", rows: "1", id: "focusedInput", onChange: this.handleChange, type: "text", value: this.state.text})
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
  componentWillReceiveProps: function(np){
		this.setState({keywords: np.value, text: ''});
	},
  handleSubmit: function(e) {
    e.preventDefault();
    var nextkeywords = this.state.keywords.concat([this.state.text]);
    var nextText = '';
    this.setState({keywords: nextkeywords, text: nextText});
  },
  render: function() {
      var Button = ReactBootstrap.Button;
      var Input = ReactBootstrap.Input;
      const innerButton = React.createElement(Button, {onClick: this.handleSubmit}, "Add");
    return (
      React.createElement("div", {id: "keywords"}, 
        React.createElement("label", null, "Keywords"), 
        React.createElement(FinalKeywords, {items: this.state.keywords}), 
        React.createElement("form", {onSubmit: this.handleSubmit}, 
          React.createElement(Input, {type: "text", buttonBefore: innerButton, placeholder: "Type here.", onChange: this.onChange, value: this.state.text})
        )
      )
    );
  }
});


var PDF = React.createClass({
  displayName: 'React-PDF',
  propTypes: {
    file: React.PropTypes.string,
    content: React.PropTypes.string,
    page: React.PropTypes.number,
    scale: React.PropTypes.number,
    onDocumentComplete: React.PropTypes.func,
    onPageComplete: React.PropTypes.func
  },
  getInitialState: function() {
    return { };
  },
  getDefaultProps: function() {
    return {page: 1, scale: 1.0};
  },
  componentDidMount: function() {
    this._loadPDFDocument(this.props);
  },
  _loadByteArray: function(byteArray) {
    PDFJS.getDocument(byteArray).then(this._onDocumentComplete);
  },
  _loadPDFDocument: function(props) {
    if(!!props.file){
      if (typeof props.file === 'string') return PDFJS.getDocument(props.file).then(this._onDocumentComplete);
      // Is a File object
      var reader = new FileReader(), self = this;
      reader.onloadend = function() {
        self._loadByteArray(new Uint8Array(reader.result));
      };
      reader.readAsArrayBuffer(props.file);
    }
    else if(!!props.content){
      var bytes = window.atob(props.content);
      var byteLength = bytes.length;
      var byteArray = new Uint8Array(new ArrayBuffer(byteLength));
      for(index = 0; index < byteLength; index++) {
        byteArray[index] = bytes.charCodeAt(index);
      }
      this._loadByteArray(byteArray);
    }
    else {
      console.error('React_Pdf works with a file(URL) or (base64)content. At least one needs to be provided!');
    }
  },
  componentWillReceiveProps: function(newProps) {
    if ((newProps.file && newProps.file !== this.props.file) || (newProps.content && newProps.content !== this.props.content)) {
      this._loadPDFDocument(newProps);
    }
    if (!!this.state.pdf && !!newProps.page && newProps.page !== this.props.page) {
      this.setState({page: null});
      this.state.pdf.getPage(newProps.page).then(this._onPageComplete);
    }
  },
  render: function() {
    var self = this;
    if (!!this.state.page){
      setTimeout(function() {
        if(self.isMounted()){
          var canvas = self.refs.pdfCanvas.getDOMNode(),
            context = canvas.getContext('2d'),
            scale = self.props.scale,
            viewport = self.state.page.getViewport(scale);
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          self.state.page.render(renderContext);
        }
      });
      return (React.createElement("canvas", {ref: "pdfCanvas"}));
    }
    return (this.props.loading || React.createElement("div", null, ""));
  },
  _onDocumentComplete: function(pdf){
    if (!this.isMounted()) return;
    this.setState({ pdf: pdf });
    if(!!this.props.onDocumentComplete && typeof this.props.onDocumentComplete === 'function'){
      this.props.onDocumentComplete(pdf.numPages);
    }
    pdf.getPage(this.props.page).then(this._onPageComplete);
  },
  _onPageComplete: function(page){
    if (!this.isMounted()) return;
    this.setState({ page: page });
    if(!!this.props.onPageComplete && typeof this.props.onPageComplete === 'function'){
      this.props.onPageComplete(page.pageIndex + 1);
    }
  }
});



React.render(React.createElement(SubmitB, null) , document.getElementById('main'));

