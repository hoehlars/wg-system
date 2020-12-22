import Chore from "../types/chore";

export class ChoreService {
  static async getAllChores(): Promise<Chore[]> {
    const res = await fetch(`http://localhost:5000/api/chores`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }

  static async changeChors(): Promise<Chore[]> {
    const res = await fetch(`http://localhost:5000/api/chores/changeChors`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }

  static async updateChoreFinished(choreId: string): Promise<Chore[]> {
    const res = await fetch(`http://localhost:5000/api/chores/${choreId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.json();
  }
}
