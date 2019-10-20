import React from 'react';
import { Link } from 'react-router-component';
import { Header, Icon } from 'semantic-ui-react';

import './LogSummaryNavigation.css';
import { createLog } from '../utils/locations';

function LogSummaryNavigation() {
    return (
        <div className="log-summary-nav">
          <Header as="h2">Your logs</Header>
          <Link href={ createLog.link() }>
            <Icon name="add"/>
            Create New Log
          </Link>
        </div>
    );
}

export default LogSummaryNavigation;
