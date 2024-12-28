import React, { useId } from "react";
import PropTypes from "prop-types";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
  placeholder = "Select currency",
}) {
  const id = useId();

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex flex-wrap gap-3 ${className}`}>
      {/* Amount Input */}
      <div className="flex-1">
        <label htmlFor={id} className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        <input
          id={id}
          type="number"
          className="outline-none w-full bg-transparent py-1.5 border-b border-gray-300 focus:border-blue-500"
          placeholder="Amount"
          disabled={amountDisabled}
          value={amount}
          aria-label={`${label} amount`}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 0 && onAmountChange) onAmountChange(value);
          }}
        />
      </div>

      {/* Currency Selector */}
      <div className="flex-1">
        <p className="text-black/40 mb-2">Currency Type</p>
        <select
          className="w-full rounded-lg px-2 py-1 bg-gray-100 cursor-pointer outline-none border focus:border-blue-500"
          value={selectedCurrency}
          aria-label="Select currency type"
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisabled}
        >
          {currencyOptions.length === 0 ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : (
            currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
}

InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
  currencyOptions: PropTypes.arrayOf(PropTypes.string),
  selectedCurrency: PropTypes.string,
  amountDisabled: PropTypes.bool,
  currencyDisabled: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputBox;
