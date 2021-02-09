import Debt from "../types/debt";


export class DebtService {
  static async createDebt(
    reason: string,
    to: string,
    from: string,
    amount: number
  ): Promise<Response> {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_IP}/api/debts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reason,
        to,
        from,
        amount,
      }),
    });
    return res;
  }

  static async getAllDebtsNotPayed(): Promise<Debt[]> {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_IP}/api/debts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }

  static async getDebtsPayed(): Promise<Debt[]> {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_IP}/api/debts/payed`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }

  static async patchDebt(id: string): Promise<Debt[]> {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_IP}/api/debts/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }

  static async getPayedMostByChores(): Promise<any> {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_IP}/api/debts/payedMostByChores`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
    
  }
}
