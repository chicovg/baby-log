import React from 'react';
import { Button, Card } from 'semantic-ui-react';

function LogSummary({ id, title }) {
    /*
      to calculate from entries:
      - the last entry.
      - the number of feedings
      - the number of diapers

      If today or yesterday, say today or yesterday
     */
    const logLocation = `/logs/${id}/entries`;
    const navigateToLog = () => window.location.hash = logLocation;

    return (
        <Card>
          <Card.Content>
            <Card.Header>{ title }</Card.Header>
            <Card.Meta>The last entry was yesterday</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Card.Description>
              Yesterday, Baby ate 10 times and used 5 diapers.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              basic
              onClick={ navigateToLog }
            >
              View Entries
            </Button>
            <Button
              basic
              onClick={ navigateToLog }
            >
              Add Entries
            </Button>
          </Card.Content>
        </Card>
    );
}

export default LogSummary;
