import React, { useEffect } from "react";
import { useState } from "react";
//import axios from "axios";
import Exchange from "./components/Exchange";
//import bootstrap from 'bootstrap'

import "./App.css";

//next step: manipulate the DOM to get the exchange rate? or childToParent callback
// multiply exchange rate by input to get a true exchange

function App() {
  const [listCountries, setListCountries] = useState("");
  const pull_child_data = (data) => {
    console.log(data);
    setExchange(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  };
  //fetch list of countries and place into array
  //map this array into the options selector for currencies, possibly include countries?
  useEffect(() => {
    fetch(
      "https://free.currconv.com/api/v7/currencies?apiKey=0a6fa1f6b3600e490794"
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        // turn data into JSON string
        const countries = JSON.stringify(data, null, 2);
        console.log(countries);
        //setListCountries(countries.results)
      })
      .catch((error) => console.error(error));
  }, []);

  const options = [
    {
      label: "USD",
      value: "usd"
    },
    {
      label: "MXN",
      value: "mxn"
    },
    {
      label: "EUR",
      value: "eur"
    },
    {
      label: "CNY",
      value: "cny"
    }
  ];

  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const [currencyFirst, setCurrencyFirst] = useState("");
  const [currencySecond, setCurrencySecond] = useState("");
  const [exchange, setExchange] = useState("");

  // const [exchange, setExchange] = useState("");
  // run a callback function to return exchange rate from Exchange component

  const handleSubmit = (event) => {
    event.preventDefault();

    //console.log("it works")
    setAmount(input);
    console.log(amount);

    setInput("");
    //find the values selected for currencies by user
    const currencySelection1 = document
      .querySelector("#currency_initial")
      .value.toUpperCase();
    console.log(currencySelection1);
    setCurrencyFirst(currencySelection1);
    console.log(currencyFirst);
    const currencySelection2 = document
      .querySelector("#currency_final")
      .value.toUpperCase();
    setCurrencySecond(currencySelection2);
    console.log(currencySecond);
  };

  const conversion = (amount, exchange) => {
    return Math.floor(amount * exchange);
  };

  return (
    <>
      <div className="App">
        <h1 className="header">Currency Exchange</h1>
        <div></div>
        <div className="currency_container">
          <p>Choose starting currency:</p>

          <select className="currency_initial" id="currency_initial">
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* <select>
          <option  id="USD" name="currency" value="USD"/>
            
          <option  id="MXN" name="currency" value="MXN"/>
            
          <option  id="EUR" name="currency" value="EUR"/>
            
        </select> */}

        <div>
          <form onSubmit={handleSubmit}>
            <p>Enter amount of currency:</p>
            <label>$</label>
            <input
              type="text"
              placeholder="100.00"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </form>
        </div>
        <div className="currency_container">
          <p>Choose final currency:</p>

          <select className="currency_final" id="currency_final">
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="currency_display">
          <pre>
            <li>
              ${amount} {currencyFirst} to {conversion(amount, exchange)}{" "}
              {currencySecond}
            </li>
            <Exchange
              func={pull_child_data}
              className="exchange"
              id="exchange"
              currencyFirst={currencyFirst}
              currencySecond={currencySecond}
            />
          </pre>
        </div>
      </div>
    </>
  );
}

export default App;
