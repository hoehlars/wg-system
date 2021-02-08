interface Debt {
  _id: string;
  amount: number;
  to: string;
  from: string;
  reason: string;
  date: string;
}

export default Debt;
