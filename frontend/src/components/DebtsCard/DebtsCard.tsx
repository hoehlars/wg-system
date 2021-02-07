import React from "react";
import Button from "react-bootstrap/Button";
import "./DebtsCard.css";
import Debt from "../../types/debt";
import { DebtService } from "./../../services/debtService";

interface DebtsCardState {
  debts: Debt[];
  debtsDone: Debt[];
  newDebt: {
    reason: string;
    from: string;
    to: string;
    amount: number;
  };
  error: string;
}

class DebtsCard extends React.Component<{}, DebtsCardState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      debts: [],
      debtsDone: [],
      newDebt: {
        reason: "",
        from: "",
        to: "",
        amount: 0,
      },
      error: "",
    };
  }

  async componentDidMount() {
    const debts = await DebtService.getAllDebts();
    const debtsDone = await DebtService.getDebtsDone();

    this.setState({
      debts,
      debtsDone
    });
  }

  private async handleNewDebtClick() {
    const { reason, to, from, amount } = this.state.newDebt;

    // add to backend
    const res = await DebtService.createDebt(reason, to, from, amount);
    const debtJson = await res.json();

    if (debtJson.error) {
      this.setState({
        error: "Fehler beim Hinzufügen einer Schuld.",
      });
    } else {
      const debts = [debtJson, ...this.state.debts];
      this.setState({
        debts,
      });
    }

    // clear text inputs
    this.setState({
      newDebt: {
        reason: "",
        from: "",
        to: "",
        amount: 0,
      },
    });
  }

  private async handlePayedDebt(debtId: string) {
    const debts = await DebtService.deleteDebt(debtId);
    this.setState({
      debts,
    });
  }

  render() {
    return (
      <div>
        <h3>Schulden</h3>
        <p>Hier werden die Schulden festgehalten.</p>

        {this.state.debts.length === 0 ? (
          <div className="noDebtText">
            <p>Momentan keine Schulden.</p>
          </div>
        ) : null}

        <ul className="debtList">
          {this.state.debts.map((debt) => (
            <div key={`${debt.id}`} className="mb-2">
              <li className="debt">
                <div className="debtText">
                  <p>{`${debt.from} schuldet ${debt.to}: ${debt.amount}.- CHF`}</p>
                  <p>{`Grund: ${debt.reason}`}</p>
                  <p>{`Erstellt: ${debt.date}`}</p>
                </div>
                <Button
                  onClick={() => this.handlePayedDebt(debt.id)}
                  variant="secondary"
                >
                  Bezahlt
                </Button>
              </li>
            </div>
          ))}
        </ul>

        <form className="newDebtInput">
          <input
            required
            className="newDebtSingleInput"
            type="text"
            value={this.state.newDebt.reason}
            onChange={(event) =>
              this.setState({
                newDebt: {
                  ...this.state.newDebt,
                  reason: event.target.value,
                },
              })
            }
            placeholder="Grund der Schulden"
          />

          <input
            required
            className="newDebtSingleInput"
            type="text"
            value={this.state.newDebt.to}
            onChange={(event) =>
              this.setState({
                newDebt: {
                  ...this.state.newDebt,
                  to: event.target.value,
                },
              })
            }
            placeholder="Wer schuldet dir etwas?"
          />

          <input
            required
            className="newDebtSingleInput"
            type="text"
            value={this.state.newDebt.from}
            onChange={(event) =>
              this.setState({
                newDebt: {
                  ...this.state.newDebt,
                  from: event.target.value,
                },
              })
            }
            placeholder="Dein Name"
          />

          <input
            required
            className="newDebtSingleInput"
            type="number"
            step="0.05"
            min="0"
            max="1000"
            value={this.state.newDebt.amount}
            onChange={(event) =>
              this.setState({
                newDebt: {
                  ...this.state.newDebt,
                  amount: Number.parseFloat(event.target.value),
                },
              })
            }
          />
          {this.state.error ? (
            <div className="error">
              <p>{this.state.error}</p>
            </div>
          ) : null}
          <Button
            onClick={() => this.handleNewDebtClick()}
            variant="secondary"
            className="newDebtButton"
          >
            Neue Schuld hinzufügen
          </Button>
        </form>


        <ul className="oldDebtList">
          {this.state.debtsDone.map((debt) => (
            <div key={`${debt.id}`} className="mb-2">
              <li className="debt">
                <div className="debtText">
                  <p>{`${debt.from} schuldet ${debt.to}: ${debt.amount}.- CHF`}</p>
                  <p>{`Grund: ${debt.reason}`}</p>
                  <p>{`Erstellt: ${debt.date}`}</p>
                </div>
                <p className="debtsDoneText">
                  Erledigt!
                </p>
              </li>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default DebtsCard;
