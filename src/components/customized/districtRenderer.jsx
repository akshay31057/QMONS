import React, { Component } from "react";

export default class DistrictRenderer extends Component {

  render() {
    const districts = this.props.districts;

    const options = districts.map((district) =>
    <option value = {district}>
      {district}
    </option>
    );

    return (
              <select value= {this.props.value} onChange={(e) => {
                this.props.onDistrictClick(e);
              }} >
                {options}
              </select>
            );
          }
}
/*onChange={this.handleChange*/
