import React, { Component } from "react";
import axios from "axios";
import DistrictRenderer from "./districtRenderer"
import Cards from "./cards"
import Frame from "./frame"

export default class Selector extends Component {
  state = {
    stateDistrictMap:{},// {"UP":["Prayagraj", "Moradabad"], "Punjab":["Chandigarh", "Jalandhar"], "selectState":[]},
    districtRender: [],
    value: "selectState",
    valueDistrict: "Select District",
    showCards: false,
    collapseInnerCards: new Array(100).fill(false).map(() => new Array(100).fill(false).map(() => new Array(100).fill(false))),
    cardsData: {},
    collapse : new Array(100).fill(false).map(() => new Array(100).fill(false)),
    finalCards: []

  };
  //onInnerCollapsible: {this.handleInnerCardCollapsible} collapseInnerCards: {this.state.collapseInnerCards}
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

  handleCollapsible = (e, out_ind, in_ind, da) =>   {
    var newState = this.state.collapse;
    //console.log(out_ind, in_ind);
    newState[out_ind][in_ind] = !newState[out_ind][in_ind];
    //this.state.finalCards.forceUpdate();
    //var newFinalCards =  this.state.finalCards;
    //newFinalCards[out_ind][in_ind] = <div><Cards data={da} index={out_ind} onCollapsible= {this.handleCollapsible} collapse={this.state.collapse} onInnerCollapsible={this.handleInnerCardCollapsible} collapseInnerCards={this.state.collapseInnerCards} /> </div>;
    this.setState({collapse:newState});
};

  handleInnerCardCollapsible = (e, index, out_ind, in_ind) => {
    var newState = this.state.collapseInnerCards;
    console.log(index, out_ind, in_ind);
    newState[index][out_ind][in_ind] = !newState[index][out_ind][in_ind];
    this.setState({collapseInnerCards:newState});
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
          var rowLocation = {}
          for (var key in dat){
            const location = dat[key]['location'];
            if(!(location in rowLocation))
              rowLocation[dat[key]["location"]] = [];
            rowLocation[dat[key]["location"]].push(dat[key]);
          }
          console.log(rowLocation);
          var finalCards = [];
          var p = 0;
          for(var key in rowLocation){
            const ind = p;
            p = p + 1;
            const card = <div><Cards data={rowLocation[key]} index={ind} onCollapsible= {this.handleCollapsible} collapse={this.state.collapse} onInnerCollapsible={this.handleInnerCardCollapsible} collapseInnerCards={this.state.collapseInnerCards} /> </div>;
            finalCards.push(card);
          }
          this.setState({valueDistrict:data["district"],
                        showCards: data["district"] !== "Select District" ? true: false,
                      cardsData: dat,
                    finalCards: finalCards});
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
              {this.state.showCards && this.state.finalCards}
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

//{this.state.showCards && <Cards data={this.state.cardsData} onCollapsible= {this.handleCollapsible} collapse={this.state.collapse} onInnerCollapsible={this.handleInnerCardCollapsible} collapseInnerCards={this.state.collapseInnerCards} />}
/*
<div>
    {this.state.showCards && <Cards data={Object.keys(this.state.cardsData)}/>}
</div>

{cardsData: {"Railway Station":[1,2,3,4],"Bus Stand @ 1":[1,2,31],"RW @2":[1,31,1]}}
*/
