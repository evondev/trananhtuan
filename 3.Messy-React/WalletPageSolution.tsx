/*
// CHANGES: 1. Declare global classes object
const classes = {
  row: "row",
};
interface WalletBalance {
  currency: string;
  amount: number;
// CHANGES: 2. Add blockchain property to WalletBalance
  blockchain: string;
}
// CHANGES: 3. Extends WalletBalance with formatted property
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
// CHANGES: 4. Props interface extends ComponentProps<"div"> to inherit all props from div element
interface Props extends ComponentProps<"div"> {}
const WalletPage = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();
// CHANGES: 5. Change blockchain type from any to string
  const getPriority = (blockchain: string): number => {
// CHANGES: 6. Change switch statement to object map
    if(!blockchain) return -99;
    const priorityMap: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorityMap[blockchain] ?? -99;

  };
  const sortedBalances: WalletBalance[] = useMemo(() => {
    return balances
    .filter(
      (balance: WalletBalance) =>
// CHANGES: 7. Write short condition to filter balances
          getPriority(balance.blockchain || "") > -99 && balance.amount <= 0
      )

      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain || "");
        const rightPriority = getPriority(rhs.blockchain || "");
// CHANGES: 8. Write short condition to sort balances
        return rightPriority - leftPriority;
      });
// CHANGES: 9. Remove unused prices from useMemo dependencies
  }, [balances]);

  const formattedBalances: FormattedWalletBalance[] = useMemo(() => sortedBalances.map(
    (balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed(2),
      };
    }
  ), [sortedBalances]);
// CHANGES: 10. Using formattedBalances to render WalletRow component instead of sortedBalances as before
  const rows = useMemo(() => formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={`${balance.currency}-${index}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  ), [formattedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};
*/
