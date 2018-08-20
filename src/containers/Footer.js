import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

const { REACT_APP_VERSION } = process.env;

function Footer() {
  return (
    <Segment basic style={{ padding: '1em 0em' }}>
      <Container textAlign="right" >
        {`version:${REACT_APP_VERSION}（目前使用假数据）`}
      </Container>
    </Segment>
  );
}

export default Footer;
