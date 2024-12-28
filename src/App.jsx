import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";
import './App.css'

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { conversionRates} = useCurrencyInfo(from);
  const currencyOptions = Object.keys(conversionRates || {});

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (conversionRates[to]) {
      setConvertedAmount(amount * conversionRates[to]);
    }
  };



  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/4497591/pexels-photo-4497591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
      }}
    >
         <h1 className="uppercase text-[hsla(0,3%,12%,0.829)] absolute top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl font-bold">
        Currency Converter
      </h1>
      <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          {/* From Currency Input */}
          <div className="w-full mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={currencyOptions}
              onCurrencyChange={setFrom}
              onAmountChange={setAmount}
              selectedCurrency={from}
            />
          </div>

          {/* Swap Button */}
          <div className="relative w-full flex justify-center my-2">
            <button
              type="button"
              className="border-2 border-white rounded-md bg-blue-600 text-white px-3 py-1"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          {/* To Currency Input */}
          <div className="w-full mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={currencyOptions}
              onCurrencyChange={setTo}
              selectedCurrency={to}
              amountDisabled
            />
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
