import React, { Component } from "react";
import DistrictRenderer from "./districtRenderer"
import Cards from "./cards"
export default class Selector extends Component {
  state = {
    stateDistrictMap: {"UP":["Prayagraj", "Moradabad"], "Punjab":["Chandigarh", "Jalandhar"], "selectState":[]},
    districtRender: [],
    value: "selectState",
    valueDistrict: "Select District",
    showCards: false,
    cardsData: {},
    collapse : new Array(100).fill(false)
  };

  handleCollapsible = (e, ind) =>   {
    var newState = this.state.collapse;
    newState[ind] = !newState[ind];
    this.setState({collapse:newState})
};

  handleStateChange=(e)=>{
    if(e.target.value !== "selectState"){
    this.setState({districtRender:this.state.stateDistrictMap[e.target.value],
                  value: e.target.value})
    }
    else{
      this.setState({districtRender:this.state.stateDistrictMap[e.target.value],
                    value: e.target.value,
                  valueDistrict: "Select District",
                  showCards: false})

    }

  }
  handleDistrictClick=(e) => {

      this.setState({valueDistrict:e.target.value,
                    showCards: e.target.value !== "Select District" ? true: false,
                  cardsData: {"Railway Station":[1,2,3,4],"Bus Stand @ 1":[1,2,31],"RW @2":[1,31,1]}});

  }

  render() {
    return (
          <div>
            <div>
                {this.state.showCards && <Cards data={this.state.cardsData} onCollapsible= {this.handleCollapsible} collapse={this.state.collapse} />}
            </div>
            <div>
              <form>
                <label>
                  Pick your favorite flavor:
                  <select value= {this.state.value} onChange={this.handleStateChange}>
                      <option value="UP">UP</option>
                      <option value="Punjab">Punjab</option>
                      <option value="selectState" selected>Select your state</option>
                  </select>
                </label>
                <DistrictRenderer districts={this.state.districtRender.concat(["Select District"])} onDistrictClick={this.handleDistrictClick} value={this.state.valueDistrict} />

              </form>
            </div>
          </div>
        );
          }
}
/*
<div>
    {this.state.showCards && <Cards data={Object.keys(this.state.cardsData)}/>}
</div>

{cardsData: {"Railway Station":[1,2,3,4],"Bus Stand @ 1":[1,2,31],"RW @2":[1,31,1]}}
*/
