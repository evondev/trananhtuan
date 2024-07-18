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
      <SelectTrigger className="flex items-center w-full custom-select">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem
            key={currency}
            value={currency}
            className="custom-select-item"
          >
            <div className="size-6">
              <img src={`/tokens/${currency}.svg`} alt="" />
            </div>
            <span>{currency}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelect;
