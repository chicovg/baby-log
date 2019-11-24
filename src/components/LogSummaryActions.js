import React from 'react';
import {
    Button,
    Card,
} from 'semantic-ui-react';
import {
    editLog,
    deleteLog,
    goTo,
    viewEntries
} from '../utils/locations';

export default ({
    logId
}) => {
    return (
        <Card.Content extra>
          <Button.Group>
            <Button
              basic
              color='blue'
              compact
              content='View'
              icon='eye'
              onClick={ () => goTo(viewEntries.link(logId)) }
            />
            <Button
              basic
              color='green'
              compact
              content='Edit'
              icon='edit'
              onClick={ () => goTo(editLog.link(logId)) }
            />
            <Button
              basic
              color='red'
              compact
              content='Delete'
              icon='trash'
              onClick={ () => goTo(deleteLog.link(logId)) }
            />
          </Button.Group>
        </Card.Content>
    );
};
