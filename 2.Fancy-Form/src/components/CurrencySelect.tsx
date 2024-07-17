import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CurrencySelect = ({
  value,
  onChange,
  disabled,
  currencies,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  currencies: string[];
}) => {
  return (
    <Select disabled={disabled} value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency} value={currency}>
            {currency}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelect;
