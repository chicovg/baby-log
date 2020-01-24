import React from 'react';

import {Message} from 'semantic-ui-react';

export default () => (
    <Message negative>
        <Message.Header>Sorry, something happened.</Message.Header>
        <p>Please try again.</p>
    </Message>
);
