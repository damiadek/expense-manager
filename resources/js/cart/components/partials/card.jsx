import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className="card" style={this.props.style || { width: "18rem" }}>
        {this.props.img}
        <div className="card-body">{this.props.description}</div>
      </div>
    );
  }
}

export default Card;
