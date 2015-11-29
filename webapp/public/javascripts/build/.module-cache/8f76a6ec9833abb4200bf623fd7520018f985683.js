var HelloMessage = React.createClass({displayName: "HelloMessage",
        render: function() {
          return (React.createElement("div", null, 
          				React.createElement("h1", null, " Hello man ")
          		));
        }
      });
      React.render(React.createElement("div", null, 
      	           React.createElement(HelloMessage, null), 
      	           React.createElement(HelloMessage, null), 
      	           React.createElement(HelloMessage, null)
      	           ), document.body);