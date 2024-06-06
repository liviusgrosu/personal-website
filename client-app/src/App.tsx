/* eslint-disable react-refresh/only-export-components */
import { Container, Header, Segment } from "semantic-ui-react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ModalContainer from "./app/common/ModalContainer";

export default observer(function App() {
  return (
    <Segment 
      inverted
      textAlign = "center"
      vertical
    >
      <ModalContainer/>
      <Container as="nav">
        <Header inverted as="h1">
            Livius Grosu
        </Header>
        <NavBar/>
      </Container>
      <Container className="content">
          <Outlet/>
      </Container>
    </Segment>
  );
})