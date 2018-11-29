import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

const { REACT_APP_VERSION } = process.env;

function Footer() {
  return (
    <Segment basic style={{ position: 'fixed', bottom: 0, padding: '1em 0em' }}>
      <Container textAlign="right" >
        {`version:${REACT_APP_VERSION}`}
      </Container>
    </Segment>
  );
}

export default Footer;
