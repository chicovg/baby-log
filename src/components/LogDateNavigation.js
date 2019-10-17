import React from 'react';
import { Link } from 'react-router-component';
import { Icon } from 'semantic-ui-react';

import { previousDateKey, nextDateKey, toDisplayDate } from '../utils/dates';
import './LogDateNavigation.css';

function logLink(logId, date) {
    return `#/logs/${logId}/entries/${ date }`;
}

function addEntryLink(logId, date) {
    return `#/logs/${logId}/add-entry/${ date }`;
}

function LogDateNavigation({ logId, date }) {
    return (
        <div className="log-date-nav">
          <div>
            <Link href={ logLink(logId, previousDateKey(date)) }>
              <Icon name="left arrow" />
            </Link>
            <span className="log-date">
              <strong>{ toDisplayDate(date) }</strong>
            </span>
            <Link href={ logLink(logId, nextDateKey(date)) }>
              <Icon name="right arrow" />
            </Link>
          </div>
          <Link href={ addEntryLink(logId, date) }>
            <Icon name="add" />
            New Entry
          </Link>
        </div>
    );
}

export default LogDateNavigation;
