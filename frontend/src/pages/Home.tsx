import React from "react";
import "./Home.css";
import InformationsCard from "../components/InformationsCard/InformationsCard";
import ChoresCard from "../components/ChoresCard/ChoresCard";
import DebtsCard from "../components/DebtsCard/DebtsCard";

class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div className="Cards">
          <div className="Card">
            <InformationsCard />
          </div>

          <div className="Card">
            <ChoresCard />
          </div>

          <div className="Card">
            <DebtsCard />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
