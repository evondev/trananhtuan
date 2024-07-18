import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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

const formSchema = z.object({
  amount: z
    .number({
      message: "Amount must be a number",
    })
    .min(0, {
      message: "Amount must be greater than 0",
    }),
});
function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1,
    },
  });
  const currencies = prices.map((price) => price.currency);
  const [baseCurrency, setBaseCurrency] = useState(currencies[0]);
  const [targetCurrency, setTargetCurrency] = useState(currencies[1]);
  const [conversionResult, setConversionResult] = useState(0);
  const amount = form.watch("amount");

  const findPrice = (currency: string) => {
    const entry = prices.find((item) => item.currency === currency);
    return entry ? entry.price : 1;
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const fromPrice = findPrice(baseCurrency);
    const toPrice = findPrice(targetCurrency);
    if (baseCurrency === targetCurrency) {
      setConversionResult(data.amount);
      return;
    }
    const convertedAmount = (data.amount * fromPrice) / toPrice;
    setConversionResult(convertedAmount);
  };
  useEffect(() => {
    form.handleSubmit(onSubmit)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseCurrency, targetCurrency, amount]);
  const handleSwapCurrency = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10">
        <div className="bg-white rounded-xl max-w-[600px] mx-auto p-5 shadow relative">
          <h1 className="mb-5 text-3xl font-bold">Currency converter</h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col justify-between gap-0 md:flex-row md:gap-10">
              <div className="flex flex-col flex-1 gap-2">
                <FormLabel htmlFor="from">From</FormLabel>
                <CurrencySelect
                  value={baseCurrency}
                  onChange={(value) => {
                    setBaseCurrency(value);
                  }}
                  currencies={currencies}
                ></CurrencySelect>
              </div>
              <div className="flex flex-col self-center flex-shrink-0 gap-2">
                <FormLabel htmlFor="">&nbsp;</FormLabel>
                <button
                  className="flex items-center justify-center text-gray-500 bg-gray-200 rounded-full size-12"
                  type="submit"
                  onClick={handleSwapCurrency}
                >
                  <IconExchange></IconExchange>
                </button>
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <FormLabel htmlFor="to">To</FormLabel>
                <CurrencySelect
                  value={targetCurrency}
                  onChange={(value) => {
                    setTargetCurrency(value);
                  }}
                  currencies={currencies}
                ></CurrencySelect>
              </div>
            </div>
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
                      onChange={(e) => {
                        field.onChange(e.target.valueAsNumber);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="min-h-6">
              {conversionResult > 0 && amount >= 0 && (
                <div className="flex gap-1 font-bold">
                  <img src={`/tokens/${baseCurrency}.svg`} alt="" />
                  {amount.toLocaleString("us")} {baseCurrency} ={" "}
                  <img src={`/tokens/${targetCurrency}.svg`} alt="" />
                  {conversionResult.toFixed(3)} {targetCurrency}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default App;
