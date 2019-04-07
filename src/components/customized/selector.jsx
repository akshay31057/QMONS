import React, { Component } from "react";
import axios from "axios";
import DistrictRenderer from "./districtRenderer"
import Cards from "./cards"

export default class Selector extends Component {
  state = {
    stateDistrictMap:{},// {"UP":["Prayagraj", "Moradabad"], "Punjab":["Chandigarh", "Jalandhar"], "selectState":[]},
    districtRender: [],
    value: "selectState",
    valueDistrict: "Select District",
    showCards: false,
    cardsData: {},
    collapse : new Array(100).fill(false)
  };
  // Uncomment this when using on local

  componentDidMount(e){
    const that = this;
    console.log("Hi")
    const jsonPromise = fetch("http://localhost:5000/centres").then(response => response.json());
    jsonPromise.then((data) =>
      { let va = {"selectState":[]};
        this.setState({stateDistrictMap:{...data, ...va}});
      }); // this works
  }

  handleCollapsible = (e, ind) =>   {
    var newState = this.state.collapse;
    newState[ind] = !newState[ind];
    this.setState({collapse:newState})
};

  handleStateChange=(e)=>{
    if(e.target.value !== "selectState"){
    this.setState({districtRender:this.state.stateDistrictMap[e.target.value],
                  value: e.target.value,
                valueDistrict:"Select District",
              showCards:false})
    }
    else{
      this.setState({districtRender:this.state.stateDistrictMap[e.target.value],
                    value: e.target.value,
                  valueDistrict: "Select District",
                  showCards: false})

    }

  }
  handleDistrictClick=(e) => {
      const data = {
        "state":this.state.value,
        "district":e.target.value
      };
      const params = {
        body: data,
        method: "GET"
      };

      const jsonPromise = fetch("http://localhost:5000/centre_data?state="+data["state"].replace(" ","+")+"&district="+data["district"].replace(" ","+")).then(response => response.json());
      jsonPromise.then((dat) =>
        {//console.log(dat);
          this.setState({valueDistrict:data["district"],
                        showCards: data["district"] !== "Select District" ? true: false,
                      cardsData: dat});
        }); // this works
      // this.setState({valueDistrict:e.target.value,
      //               showCards: e.target.value !== "Select District" ? true: false,
      //             cardsData: {"Railway Station":[1,2,3,4],"Bus Stand @ 1":[1,2,31],"RW @2":[1,31,1]}});

  }

  render() {
    const states = Object.keys(this.state.stateDistrictMap);
    const options = states.map( (state) =>
    <option value={state}>{state}</option>
  );

    return (
          <div>
            <div>
                {this.state.showCards && <Cards data={this.state.cardsData} onCollapsible= {this.handleCollapsible} collapse={this.state.collapse} />}
            </div>
            <div>
              <form>
                <label>
                  Pick your favorite state:
                  <select value= {this.state.value} onChange={this.handleStateChange}>
                    {options}
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
