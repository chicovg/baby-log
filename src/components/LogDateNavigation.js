import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

import { toDisplayDate } from '../utils/dates';
import './LogDateNavigation.css';

// todo: will need a change date function passed in...
function LogDateNavigation({date}) {
    // todo format the date
    return (
        <div>
          <Button icon>
            <Icon name='left arrow' />
          </Button>
          <span className="log-date">
            <strong>{ toDisplayDate(date) }</strong>
          </span>
          <Button icon>
            <Icon name='right arrow' />
          </Button>
        </div>
    );
}

export default LogDateNavigation;
