export interface Sale {
  id?: number;
  client: String;
  articles: String[];
  amount: Number[] | null[];
  price_dolar: Number[] | null[];
  price_bs: Number[] | null[];
  total_dolar: Number[] | null[];
  total_bs: Number[] | null[];
  all_total_dolar: Number;
  all_total_bs: Number;
  created_on?: String;
}
