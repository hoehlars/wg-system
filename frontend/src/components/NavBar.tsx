import React from "react";
import Navbar from "react-bootstrap/Navbar";

class NavBar extends React.Component<{}, {}> {
  render(): React.ReactNode {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Lars' WG-Website</Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavBar;
