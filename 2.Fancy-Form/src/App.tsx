import { useState } from "react";
import { prices } from "./constants";
import { IconExchange } from "./icons";

function App() {
  const [amount, setAmount] = useState<number>(0);
  const currencies = prices.map((price) => price.currency);
  const [baseCurrency, setBaseCurrency] = useState(currencies[0]);
  const [targetCurrency, setTargetCurrency] = useState(currencies[1]);
  const [conversionResult, setConversionResult] = useState(0);
  const [fetchingData, setFetchingData] = useState(false);
  const findPrice = (currency: string) => {
    const entry = prices.find((item) => item.currency === currency);
    return entry ? entry.price : 1;
  };
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const handleExchangeRate = async () => {
    setFetchingData(true);
    await delay(2000);
    const fromPrice = findPrice(baseCurrency);
    const toPrice = findPrice(targetCurrency);
    const convertedAmount = (amount * fromPrice) / toPrice;
    setConversionResult(convertedAmount);
    setFetchingData(false);
  };
  return (
    <div className="w-full p-10">
      <div className="bg-white rounded-xl max-w-[600px] mx-auto p-5 shadow">
        <h1 className="font-bold text-3xl mb-5">Currency converter</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="font-medium text-slate-500">
              Amount
            </label>
            <input
              className="bg-transparent border border-gray-200 rounded-lg outline-none h-12 px-5 transition-all focus:border-primary"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Amount"
              disabled={fetchingData}
            />
          </div>
          <div>
            {conversionResult > 0 && (
              <>
                <strong>{amount.toLocaleString("us")}</strong> {baseCurrency} ={" "}
                <strong>{conversionResult.toFixed(5)}</strong> {targetCurrency}
              </>
            )}
          </div>
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="from" className="font-medium text-slate-500">
                From
              </label>
              <select
                className="w-full h-12 border border-gray-200 rounded-lg px-3 outline-none"
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
                disabled={fetchingData}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <label htmlFor="to" className="font-medium text-slate-500">
                &nbsp;
              </label>
              <button className="size-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <IconExchange></IconExchange>
              </button>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="to" className="font-medium text-slate-500">
                To
              </label>
              <select
                className="w-full h-12 border border-gray-200 rounded-lg px-3 outline-none"
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="h-12 rounded-lg px-5 flex items-center justify-center font-semibold text-white bg-primary disabled:opacity-50"
            disabled={fetchingData}
            onClick={handleExchangeRate}
          >
            {fetchingData ? (
              <div className="animate-spin size-5 rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              "Convert"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
