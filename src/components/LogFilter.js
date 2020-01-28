import React from 'react';
import {Menu} from 'semantic-ui-react';
import isEqual from 'lodash/fp/isEqual';
import isNil from 'lodash/fp/isNil';

import {EVENT} from '../utils/constants';

export default ({eventType, selectFilter}) => (
    <Menu secondary stackable>
      <Menu.Item active={isNil(eventType)} onClick={selectFilter(null)}>All</Menu.Item>
      <Menu.Item active={isEqual(EVENT.DIAPER, eventType)} onClick={selectFilter(EVENT.DIAPER)}>Diapers</Menu.Item>
      <Menu.Item active={isEqual(EVENT.FEEDING, eventType)} onClick={selectFilter(EVENT.FEEDING)}>Feedings</Menu.Item>
      <Menu.Item active={isEqual(EVENT.PUMPING, eventType)} onClick={selectFilter(EVENT.PUMPING)}>Pumpings</Menu.Item>
      <Menu.Item active={isEqual(EVENT.OTHER, eventType)} onClick={selectFilter(EVENT.OTHER)}>Other</Menu.Item>
    </Menu>
);
