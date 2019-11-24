import React from 'react';

import {Message} from 'semantic-ui-react';

function Error() {
    return (
        <Message negative>
            <Message.Header>Sorry, something happened.</Message.Header>
            <p>Please try again.</p>
        </Message>
    );
}

export default Error;
