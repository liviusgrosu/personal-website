/* eslint-disable react-refresh/only-export-components */
import { Container, Segment } from "semantic-ui-react";
import NavBar from "./navbar/NavBar";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ModalContainer from "./app/common/ModalContainer";

export default observer(function App() {
  return (
    <Segment 
      inverted
      vertical
    >

      <ModalContainer/>
      <Container as="nav">
        <NavBar/>
      </Container>
      <Container 
        className="content" 
        style={{ marginTop: '80px' }}
      >
          <Outlet/>
      </Container>

    </Segment>
  );
})