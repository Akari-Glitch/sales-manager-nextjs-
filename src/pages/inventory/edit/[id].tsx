import { ExChangeRate } from "../../../interfaces/ExchangeRate";
import New from "../new";

export interface Props {
  exchange_rate: ExChangeRate[];
}

function Edit({ exchange_rate }: Props) {
  return <New exchange_rate={exchange_rate}></New>;
}

export default Edit;

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/inventory/exchangeRate");
  const exchange_rate = await res.json();
  return {
    props: {
      exchange_rate: exchange_rate,
    },
  };
};
