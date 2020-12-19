import React from "react";
import Button from "react-bootstrap/Button";
import Chore from "../../types/chore";
import Form from "react-bootstrap/Form";
import "./ChoresCard.css";
import changeChoreIcon from "../../assets/icon/changeChoreIcon.svg";
import expandMoreIcon from "../../assets/icon/expandMoreIcon.svg";
import expandLessIcon from "../../assets/icon/expandLessIcon.svg";
import taskIcon from "../../assets/icon/taskIcon.svg";

interface ChoresCardState {
  chores: Chore[];
}

class ChoresCard extends React.Component<{}, ChoresCardState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      chores: [
        {
          choreName: "Bad",
          choreDoer: "Lars",
          id: "0",
          done: false,
          choreTasks: ["Lavabo putzen"],
          showDescriptionChore: false,
        },
        {
          choreName: "Boden",
          choreDoer: "Florian",
          id: "1",
          done: false,
          choreTasks: ["Staubsaugen"],
          showDescriptionChore: false,
        },
        {
          choreName: "Küche",
          choreDoer: "Thomas",
          id: "2",
          done: false,
          choreTasks: ["Oberflächen putzen"],
          showDescriptionChore: false,
        },
      ],
    };
  }

  private handleChangeChores(): void {
    // TO DO: send change ämtli event to backend and get new data of backend
  }

  private handleFinishedChore(chorId: string): void {
    let chores = [...this.state.chores];
    const changedChor = chores.find((chor) => {
      return chorId === chor.id;
    });
    changedChor.done = !changedChor.done;
    const idx = chores.findIndex((chor) => {
      return chorId === chor.id;
    });
    chores.splice(idx, 1, changedChor);
    this.setState({
      chores,
    });

    // TO DO: send status update to backend
  }

  private handleShowChoresDescription(chorId: string): void {
    let chores = [...this.state.chores];
    const changedChor = chores.find((chor) => {
      return chorId === chor.id;
    });
    changedChor.showDescriptionChore = !changedChor.showDescriptionChore;
    const idx = chores.findIndex((chor) => {
      return chorId === chor.id;
    });
    chores.splice(idx, 1, changedChor);
    this.setState({
      chores,
    });
  }

  render() {
    return (
      <div>
        <h3>WG-Ämtli</h3>
        <p>
          Jede Woche werden Boden, WC und Küche fällig. Es wird jede Woche
          abgewechselt. Um den Abfall kümmern wir uns gemeinsam. <br />
          <b>
            Wichtig: Falls jemand sein Ämtli nicht eingehalten hat, werden 5.-
            CHF direkt ans Gemeinschäftskässeli in den Schulden eingetragen.{" "}
          </b>
        </p>

        <Form>
          {this.state.chores.map((chore) => (
            <div key={`${chore.id}`} className="mb-3">
              {chore.showDescriptionChore ? (
                <img
                  className="showChoresDescription"
                  onClick={() => this.handleShowChoresDescription(chore.id)}
                  src={expandMoreIcon}
                  alt="expandMoreIcon"
                ></img>
              ) : (
                <img
                  className="showChoresDescription"
                  onClick={() => this.handleShowChoresDescription(chore.id)}
                  src={expandLessIcon}
                  alt="expandLessIcon"
                ></img>
              )}
              <input
                className="checkBox"
                type="checkbox"
                value="1"
                id={`checkbox-${chore.id}`}
                name=""
                onChange={() => this.handleFinishedChore(chore.id)}
              />
              <label
                htmlFor={`checkbox-${chore.id}`}
              >{`${chore.choreDoer} hat folgendes Ämtli: ${chore.choreName}`}</label>

              {chore.showDescriptionChore ? (
                <ul>
                  {chore.choreTasks.map((task) => (
                    <li>{task}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </Form>

        <p>
          <Button variant="secondary" onClick={() => this.handleChangeChores()}>
            <img
              className="changeChoreIcon"
              src={changeChoreIcon}
              alt="ChangeCoreIcon"
            ></img>
            Ämtli wechseln
          </Button>
        </p>
      </div>
    );
  }
}

export default ChoresCard;
