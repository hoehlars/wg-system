import Debt from "../types/debt";

export class DebtService {
  static async createDebt(
    reason: string,
    to: string,
    from: string,
    amount: number
  ): Promise<Response> {
    const res = await fetch(`${process.env.BACKEND_IP}/api/debts`, {
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

  static async getAllDebts(): Promise<Debt[]> {
    const res = await fetch(`${process.env.BACKEND_IP}/api/debts`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }

  static async deleteDebt(id: string): Promise<Debt[]> {
    const res = await fetch(`${process.env.BACKEND_IP}/api/debts/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }
}
