import React from 'react';
import {Button} from 'semantic-ui-react';
import isNil from 'lodash/fp/isNil';

import {EVENT} from '../utils/constants';

export default ({eventType, selectFilter}) => (
    <Button.Group basic toggle>
        <Button active={isNil(eventType)} onClick={selectFilter(null)}>
            All
        </Button>
        <Button active={eventType === EVENT.FEEDING} onClick={selectFilter(EVENT.FEEDING)}>
            Feedings
        </Button>
        <Button active={eventType === EVENT.DIAPER} onClick={selectFilter(EVENT.DIAPER)}>
            Diapers
        </Button>
        <Button active={eventType === EVENT.PUMPING} onClick={selectFilter(EVENT.PUMPING)}>
            Pumpings
        </Button>
    </Button.Group>
);
