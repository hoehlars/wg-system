interface Chore {
  choreDoer: string;
  choreName: string;
  id: string;
  done: boolean;
  choreTasks: string[];
  showDescriptionChore: boolean;
}

export default Chore;
