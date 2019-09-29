import React from 'react';
import { Link } from 'react-router-component';
import { Icon } from 'semantic-ui-react';

import { previousDateKey, nextDateKey, toDisplayDate } from '../utils/dates';
import './LogDateNavigation.css';

function logLink(date) {
    return `#/log/${ date }`;
}

function LogDateNavigation({date}) {
    return (
        <div>
          <Link href={ logLink(previousDateKey(date)) }>
            <Icon name="left arrow" />
          </Link>
          <span className="log-date">
            <strong>{ toDisplayDate(date) }</strong>
          </span>
          <Link href={ logLink(nextDateKey(date)) }>
            <Icon name="right arrow" />
          </Link>
        </div>
    );
}

export default LogDateNavigation;
