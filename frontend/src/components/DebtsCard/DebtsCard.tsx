import React from "react";
import Button from "react-bootstrap/Button";
import "./DebtsCard.css";
import Debt from "../../types/debt";

interface DebtsCardState {
  debts: Debt[];
  newDebt: {
    reason: string;
    from: string;
    to: string;
    amount: number;
  };
}

class DebtsCard extends React.Component<{}, DebtsCardState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      debts: [
        {
          amount: 10.0,
          to: "Gemeinschaftskasse",
          from: "Lars",
          reason: "Ämtli nicht gemacht",
          id: "0",
        },
        {
          amount: 5.0,
          to: "Florian",
          from: "Lars",
          reason: "Stromrechnung",
          id: "1",
        },
        {
          amount: 3.25,
          to: "Thomas",
          from: "Lars",
          reason: "Internet",
          id: "2",
        },
      ],
      newDebt: {
        reason: "",
        from: "",
        to: "",
        amount: 0,
      },
    };
  }

  private handleNewDebtClick() {

    const highestID = Math.max.apply(Math, this.state.debts.map((debt) => {return debt.id}));

    const newDebt: Debt = {
      ...this.state.newDebt,
      id: highestID
    };

    const debts: Debt[] = [newDebt, ...this.state.debts]
    this.setState({
      debts
    })

    // transfer 
    
  }

  private handlePayedDebt(debtId: string) {
    const debts = [...this.state.debts];
    const idx = debts.findIndex((debt) => {
      return debtId === debt.id;
    })

    debts.splice(idx, 1);
    this.setState({
      debts
    })
  }

  render() {
    return (
      <div>
        <h3>Schulden</h3>
        <p>Hier werden die Schulden festgehalten.</p>

        {this.state.debts.length === 0 ?
        <div className="noDebtText"><p>Momentan keine Schulden.</p></div> : null}

        <ul className="debtList">
          {this.state.debts.map((debt) => (
            <div key={`${debt.id}`} className="mb-2">
              <li className="debt">
                <div className="debtText">
                  <p>{`${debt.from} schuldet ${debt.to}: ${debt.amount}.- CHF`}</p>
                  <p>{`Grund: ${debt.reason}`}</p>
                </div>
                <Button onClick={() => this.handlePayedDebt(debt.id)} variant="secondary">Bezahlt</Button>
              </li>
            </div>
          ))}
        </ul>

        <div className="newDebtInput">
          <input
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

          <Button onClick={() => this.handleNewDebtClick()}variant="secondary" className="newDebtButton">Neue Schuld hinzufügen</Button>
        </div>
      </div>
    );
  }
}

export default DebtsCard;
