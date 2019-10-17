import React from 'react';
import { Link } from 'react-router-component';
import { Header, Icon } from 'semantic-ui-react';

import './LogSummaryNavigation.css';

const addLogLink = () => '#/add-log';

function LogSummaryNavigation() {
    return (
        <div className="log-summary-nav">
          <Header as="h2">Your logs</Header>
          <Link href={ addLogLink() }>
            <Icon name="add"/>
            Create New Log
          </Link>
        </div>
    );
}

export default LogSummaryNavigation;
