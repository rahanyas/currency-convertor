import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
  const [conversionRates, setConversionRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://v6.exchangerate-api.com/v6/ebe2871cf52c17611bac7769/latest/${baseCurrency}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        if (data.result === "success") {
          setConversionRates(data.conversion_rates);
        } else {
          throw new Error("Invalid response");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [baseCurrency]);

  return { conversionRates, loading, error };
}

export default useCurrencyInfo;
