import React, { Fragment } from 'react';
import { Link } from 'react-router-component';
import { Button, Icon } from 'semantic-ui-react';

import { previousDateKey, nextDateKey, toDisplayDate } from '../utils/dates';
import './LogDateNavigation.css';

function localClassName(name) {
    return `LogDateNavigation-${ name }`;
}

function logLink(date) {
    return `#/entries/${ date }`;
}

function addEntryLink(date) {
    return `#/add-entry/${ date }`;
}

function LogDateNavigation({date}) {
    return (
        <div className={ localClassName('nav') }>
          <div>
            <Link href={ logLink(previousDateKey(date)) }>
              <Icon name="left arrow" />
            </Link>
            <span className={ localClassName('log-date') }>
              <strong>{ toDisplayDate(date) }</strong>
            </span>
            <Link href={ logLink(nextDateKey(date)) }>
              <Icon name="right arrow" />
            </Link>
          </div>
          <Link href={ addEntryLink(date) }>
            <Icon name="add"/>
            New Entry
          </Link>
        </div>
    );
}

export default LogDateNavigation;
