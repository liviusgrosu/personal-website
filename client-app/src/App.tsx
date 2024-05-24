import { Container, Header, Segment } from "semantic-ui-react";
import NavBar from "./NavBar";

function App() {
  return (
    <Segment 
      inverted
      textAlign = "center"
      vertical
    >
      <Container as="nav">
        <Header inverted as="h1">
            Livius Grosu
        </Header>
        <NavBar/>
      </Container>
    </Segment>
    // <Segment inverted vertical textAlign="center">
    //   <Container as="nav">
    //     <Header inverted as="h1">
    //       Cover
    //     </Header>
    //     <Menu borderless compact inverted>
    //       <Menu.Item active>Home</Menu.Item>
    //       <Menu.Item>Feature</Menu.Item>
    //       <Menu.Item>Contact</Menu.Item>
    //     </Menu>
    //   </Container>
    //   <Container className="content">
    //     <Header inverted as="h1">
    //       Cover your page.
    //     </Header>
    //     <p>
    //       Cover is a one-page template for building simple and beautiful
    //       home pages. Download, edit the text, and add your own fullscreen
    //       background photo to make it your own.
    //     </p>
    //     <Button size="huge">Learn more</Button>
    //   </Container>
    //   <Segment inverted vertical as="footer">
    //     Cover template for <a href="http://semantic-ui.com">Semantic-UI</a>,
    //     by{" "}
    //     <a href="https://github.com/semantic-ui-forest">
    //       @Semantic-UI-Forest
    //     </a>
    //     .
    //   </Segment>
    // </Segment>
  );
}

export default App
