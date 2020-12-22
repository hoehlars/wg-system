import React from "react";
import Button from "react-bootstrap/Button";
import Chore from "../../types/chore";
import Form from "react-bootstrap/Form";
import "./ChoresCard.css";
import {ChoreService} from "../../services/choreService"
import changeChoreIcon from "../../assets/icon/changeChoreIcon.svg";
import expandMoreIcon from "../../assets/icon/expandMoreIcon.svg";
import expandLessIcon from "../../assets/icon/expandLessIcon.svg";
import taskIcon from "../../assets/icon/taskIcon.svg";
import { DebtService } from "../../services/debtService";
import FormGroup from "react-bootstrap/esm/FormGroup";

interface ChoresCardState {
  chores: Chore[];
}

class ChoresCard extends React.Component<{}, ChoresCardState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      chores: [],
    };
  }

  async componentDidMount() {
    const chores = await ChoreService.getAllChores();
    console.log(chores);
    this.setState({
      chores
    })
  }

  private async handleChangeChores(): Promise<void> {

    const choresNotDone = this.state.chores.filter((chore) => {
      return chore.done === false;
    })

    const chores = await ChoreService.changeChors();

    this.setState({
      chores
    })
  }

  private async handleFinishedChore(chorId: string): Promise<void> {
    
    const chores = await ChoreService.updateChoreFinished(chorId);

    this.setState({
      chores
    })
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
                checked={chore.done}
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
