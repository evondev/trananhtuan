import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CurrencySelect from "./components/CurrencySelect";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { prices } from "./constants";
import { IconExchange } from "./icons";
import { delay } from "./utils";
const FormSchema = z.object({
  amount: z
    .number({
      message: "Amount must be a number",
    })
    .min(0, {
      message: "Amount must be greater than 0",
    }),
});
function App() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 0,
    },
  });
  const currencies = prices.map((price) => price.currency);
  const [baseCurrency, setBaseCurrency] = useState(currencies[0]);
  const [targetCurrency, setTargetCurrency] = useState(currencies[1]);
  const [conversionResult, setConversionResult] = useState(0);
  const [fetchingData, setFetchingData] = useState(false);
  const findPrice = (currency: string) => {
    const entry = prices.find((item) => item.currency === currency);
    return entry ? entry.price : 1;
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setFetchingData(true);
    await delay(2000);
    const fromPrice = findPrice(baseCurrency);
    const toPrice = findPrice(targetCurrency);
    const convertedAmount = (data.amount * fromPrice) / toPrice;
    setConversionResult(convertedAmount);
    setFetchingData(false);
  }
  const amount = form.watch("amount");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10">
        <div className="bg-white rounded-xl max-w-[600px] mx-auto p-5 shadow">
          <h1 className="font-bold text-3xl mb-5">Currency converter</h1>
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="amount"
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="min-h-6">
              {conversionResult > 0 && !fetchingData && (
                <div className="flex gap-1">
                  <img src={`/tokens/${baseCurrency}.svg`} alt="" />
                  <strong>{amount.toLocaleString("us")}</strong> {baseCurrency}{" "}
                  = <img src={`/tokens/${targetCurrency}.svg`} alt="" />
                  <strong>{conversionResult.toFixed(2)}</strong>{" "}
                  {targetCurrency}
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-0 md:gap-10">
              <div className="flex flex-col gap-2 flex-1">
                <FormLabel htmlFor="from">From</FormLabel>
                <CurrencySelect
                  value={baseCurrency}
                  onChange={(value) => {
                    setBaseCurrency(value);
                    // re-submit the form
                    form.handleSubmit(onSubmit)();
                  }}
                  disabled={fetchingData}
                  currencies={currencies}
                ></CurrencySelect>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0 self-center">
                <FormLabel htmlFor="">&nbsp;</FormLabel>
                <button
                  className="size-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"
                  type="submit"
                  onClick={() => {
                    setBaseCurrency(targetCurrency);
                    setTargetCurrency(baseCurrency);
                  }}
                >
                  <IconExchange></IconExchange>
                </button>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <FormLabel htmlFor="to">To</FormLabel>
                <CurrencySelect
                  value={targetCurrency}
                  onChange={(value) => {
                    setTargetCurrency(value);
                    // re-submit the form
                    form.handleSubmit(onSubmit)();
                  }}
                  disabled={fetchingData}
                  currencies={currencies}
                ></CurrencySelect>
              </div>
            </div>

            <button
              className="h-12 rounded-lg px-5 flex items-center justify-center font-semibold text-white bg-primary disabled:opacity-50"
              disabled={fetchingData}
              type="submit"
            >
              {fetchingData ? (
                <div className="animate-spin size-5 rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                "Convert"
              )}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default App;
