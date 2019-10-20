import React from 'react';
import { Link } from 'react-router-component';
import { Button, Icon } from 'semantic-ui-react';

import './LogDateNavigation.css';
import { previousDateKey, nextDateKey, toDisplayDate } from '../utils/dates';
import { addEntry, viewEntriesForDate } from '../utils/locations';

function LogDateNavigation({ logId, date }) {
    return (
        <div className="log-date-nav">
          <div>
            <Link href={ viewEntriesForDate.link(logId, previousDateKey(date)) }>
              <Icon name="left arrow" />
            </Link>
            <span className="log-date">
              <strong>{ toDisplayDate(date) }</strong>
            </span>
            <Link href={ viewEntriesForDate.link(logId, nextDateKey(date)) }>
              <Icon name="right arrow" />
            </Link>
          </div>
          <div>
            <Link href={ addEntry.link(logId, date) }>
              <Icon name="add" />
              New Entry
            </Link>
          </div>
        </div>
    );
}

export default LogDateNavigation;
