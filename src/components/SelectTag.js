import React, { Component ,useEffect } from "react";
import "../components/comp.css";

class SelectTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitsName: "",
      unitRate: 0,
      quantity: 0,
      totalPrice: 0,
      currencyType: "",
    };
  }
  prices = { Apple: 20, Orange: 5, Grapes: 20, Chiku: 7, Banana: 6 };
  quan = { Apple: 0, Orange: 0, Grapes: 0, Chiku: 0, Banana: 0 };

  
  handleFruitChange(value) {
    if (value === "Apple" && this.quan["Banana"] !== 0) {
      return alert("Apple and Banana both can't be selected");
    } else if (value === "Banana" && this.quan["Apple"] !== 0) {
      return alert("Apple and Banana both can't be selected");
    }
    this.setState(
      {
        fruitsName: value,
        unitRate: this.prices[value],
        quantity: this.quan[value] || 0,
      },
      () => {
        console.log(this.quan, this.quan[`${this.state.fruitsName}`]);
      }
    );
  }

  onClickIncrease() {
    if (this.state.currencyType === "Dollar") {
      this.setState(
        {
          quantity: this.state.quantity + 1,
          totalPrice:
            this.state.unitRate *
              (this.state.quantity + 1 - this.quan[this.state.fruitsName]) *
              0.012 +
            this.state.totalPrice,
        },
        () => {
          this.quan[this.state.fruitsName]++;
          console.log(
            this.state.fruitsName,
            this.state.unitRate,
            this.state.quantity,
            this.state.totalPrice
          );
        }
      );
    } else {
      this.setState(
        {
          quantity: this.state.quantity + 1,
          totalPrice:
            this.state.unitRate *
              (this.state.quantity + 1 - this.quan[this.state.fruitsName]) +
            this.state.totalPrice,
        },
        () => {
          this.quan[this.state.fruitsName]++;
          console.log(
            this.state.fruitsName,
            this.state.unitRate,
            this.state.quantity,
            this.state.totalPrice
          );
        }
      );
    }
  }
  onClickDecrease() {
    if (this.state.currencyType === "Dollar") {
      this.setState(
        {
          quantity: this.state.quantity - 1 < 0 ? 0 : this.state.quantity - 1,
          totalPrice:
            this.quan[this.state.fruitsName] > 0
              ? this.state.totalPrice - this.state.unitRate * 0.012
              : this.state.totalPrice,
        },
        () => {
          if (this.quan[this.state.fruitsName] > 0) {
            this.quan[this.state.fruitsName]--;
          }
        }
      );
    } else {
      this.setState(
        {
          quantity: this.state.quantity - 1 < 0 ? 0 : this.state.quantity - 1,
          totalPrice:
            this.quan[this.state.fruitsName] > 0
              ? this.state.totalPrice - this.state.unitRate
              : this.state.totalPrice,
        },
        () => {
          if (this.quan[this.state.fruitsName] > 0) {
            this.quan[this.state.fruitsName]--;
          }
        }
      );
    }
  }
  onClickChangeToDollar() {
    if (this.state.currencyType != "Dollar")
      this.setState({
        currencyType: "Dollar",
        totalPrice: 0.012 * this.state.totalPrice,
      });
  }
  onClickChangeToRupee() {
    if (this.state.currencyType != "Rupee")
      this.setState({
        currencyType: "Rupee",
        totalPrice: Math.round((1 / 0.012) * this.state.totalPrice),
      });
  }
  render() {
    return (
      <div id="dropDown" >
        {/* <style> 
         background-color:red;
        background-image: url("../images.jfif");
        background-repeat: no-repeat;
        background-size: cover;
        
      </style> */}
        <select
          name="fruits"
          id="fruits"
          value={this.state.fruitsName}
          onChange={(event) => {
            this.handleFruitChange(event.target.value);
          }}
        >
          <option selected value> -- select a fruit -- </option>
          <option value="Apple">Apple</option>
          <option value="Orange">Orange</option>
          <option value="Grapes">Grapes</option>
          <option value="Chiku">Chiku</option>
          <option value="Banana">Banana</option>
        </select>
        <p>
          unitRate - {this.state.unitRate} quantity - {this.state.quantity}
        </p>
        <div >
        Weight -&nbsp;
        <button
          id="button1"
          className="button"
          onClick={() => this.onClickIncrease()}
        >
          {" "}
          + Increase
        </button>
        <button
          id="button2"
          className="button"
          onClick={() => this.onClickDecrease()}
        >
          {" "}
          - Decrease
        </button>
        </div>
       
        <br></br>
        CurrencyChange - &nbsp;
        <button onClick={() => this.onClickChangeToDollar()}>
          ChangeToDollar
        </button>
        <button onClick={() => this.onClickChangeToRupee()}>
          ChangeToRupee
        </button>
        <br></br>
        Total Price-{this.state.totalPrice}
      </div>
    );
  }
}

export default SelectTag;
