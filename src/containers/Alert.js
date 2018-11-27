import React from 'react';
import PropTypes from 'prop-types';
import { TransitionablePortal, Message } from 'semantic-ui-react';

const Alert = ({ message }) => (
  <TransitionablePortal open={Boolean(message)}>
    <Message
      negative
      style={{
        left: '45%', position: 'fixed', top: '10%', zIndex: 1000,
      }}
    >
      <Message.Header content={message} />
    </Message>
  </TransitionablePortal>
);

Alert.defaultProps = {
  message: '',
};

Alert.propTypes = {
  message: PropTypes.string,
};

export default Alert;
