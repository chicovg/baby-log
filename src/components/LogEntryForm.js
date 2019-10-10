import React, { Component } from 'react';
import {
    Button,
    Container,
    Form,
    Header,
    Input
} from 'semantic-ui-react';
import {
    DateInput,
    TimeInput,
} from 'semantic-ui-calendar-react';

import { DATE_KEY_FORMAT } from '../utils/dates';
import {
    EVENT,
    FEEDING,
    BREAST,
    DIAPER,
} from '../utils/constants';

function Date({ date, handleChange }) {
    return (
        <DateInput
          dateFormat={ DATE_KEY_FORMAT }
          name='date'
          onChange={ handleChange }
          placeholder='Date'
          value={ date }
          width='six'
        />
    );
}
function Time({ time, handleChange }) {
    return (
        <TimeInput
          name='time'
          onChange={ handleChange }
          placeholder='Time'
          value={ time }
          width='six'
        />
    );
}

function Mood({ handleChange }) {
    return(
        <Form.Input
          label="Baby's Mood"
          placeholder='Happy, Cranky, etc.'
          name='mood'
          onChange={ handleChange }
          width='six'
        />
    );
}

function FeedingOrDiaper({ event, handleChange }) {
    return (
        <Form.Group inline>
          <label>Feeding or Diaper?</label>
          <Form.Radio
            label='Feeding'
            name='event'
            value={EVENT.FEEDING}
            checked={event === EVENT.FEEDING}
            onChange={handleChange}
          />
          <Form.Radio
            label='Diaper'
            name='event'
            value={EVENT.DIAPER}
            checked={event === EVENT.DIAPER}
            onChange={handleChange}
          />
        </Form.Group>
    );
}

function BreastOrBottle({ feeding, isFeeding, handleChange }) {
    if (!isFeeding) {
        return null;
    }

    return (
        <Form.Group inline>
          <label>Breast or Bottle?</label>
          <Form.Radio
            label='Breast'
            name='feeding'
            value={FEEDING.BREAST}
            checked={feeding === FEEDING.BREAST}
            onChange={handleChange}
          />
          <Form.Radio
            label='Bottle'
            name='feeding'
            value={FEEDING.BOTTLE}
            checked={feeding === FEEDING.BOTTLE}
            onChange={handleChange}
          />
        </Form.Group>
    );
}

function Breast({ isBreastFeeding, breast, duration, handleChange }) {
    if (!isBreastFeeding) {
        return null;
    }

    return (
        <Form.Group inline>
          <label>Left, Right, or Both?</label>
          <Form.Radio
            label='Left'
            name='breast'
            value={BREAST.LEFT}
            checked={breast === BREAST.LEFT}
            onChange={handleChange}
          />
          <Form.Radio
            label='Right'
            name='breast'
            value={BREAST.RIGHT}
            checked={breast === BREAST.RIGHT}
            onChange={handleChange}
          />
          <Form.Radio
            label='Both'
            name='breast'
            value={BREAST.BOTH}
            checked={breast === BREAST.BOTH}
            onChange={handleChange}
          />
        </Form.Group>
    );
}

function Duration({ isBreastFeeding, duration, handleChange }) {
    if (!isBreastFeeding) {
        return null;
    }

    return (
        <Form.Input
          control={Input}
          label='Duration (Minutes)'
          onChange={handleChange}
          name='duration'
          min={0}
          max={60}
          step={5}
          type='number'
          width='six'
        />
    );
}

function Amount({ isBottle, amount, handleChange }) {
    if (!isBottle) {
        return null;
    }

    return (
        <Form.Input
          label='Amount (oz)'
          control={Input}
          onChange={handleChange}
          name='amount'
          type='number'
          min={0}
          max={64}
          width='six'
        />
    );
}

function Diaper({ isDiaper, diaper, handleChange }) {
    if (!isDiaper) {
        return null;
    }

    return (
        <Form.Group inline>
          <label>Diaper</label>
          <Form.Radio
            label='Dirty'
            name='diaper'
            value={ DIAPER.DIRTY }
            checked={ diaper === DIAPER.DIRTY }
            onChange={ handleChange }
          />
          <Form.Radio
            label='Wet'
            name='diaper'
            value={ DIAPER.WET }
            checked={ diaper === DIAPER.WET }
            onChange={ handleChange }
          />
        </Form.Group>
    );
}

const initialState = {
    date: '',
    time: '',
    mood: '',
    event: '',
    feeding: '',
    breast: '',
    duration: '',
    amount: '',
    diaper: '',
};

class LogEntryForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.addLogEntryForDate = props.addLogEntryForDate;
    }

    handleChange = (e, { name, value }) => {
        if (name === 'event') {
            this.setState({
                event: value,
                feeding: '',
                breast: '',
                duration: '',
                amount: '',
                diaper: '',
            });
        } else if (name === 'feeding') {
            this.setState({
                feeding: value,
                breast: '',
                duration: '',
                amount: '',
            });
        } else {
            this.setState({ [name]: value });
        }
    };

    handleSubmit = () => {
        // TODO handle errors...
        this.addLogEntryForDate(this.state.date, {...this.state});
        this.setState(initialState);
        window.location.hash = '/';
    }

    render() {
        const {
            date,
            time,
            event,
            feeding,
            breast,
            duration,
            amount,
            diaper,
        } = this.state;
        const eventPopulated = date && time && event;
        const breastFeedingPopulated = feeding && breast && duration;
        const bottleFeedingPopulated = feeding && amount;
        const submitEnabled = eventPopulated && (breastFeedingPopulated || bottleFeedingPopulated || diaper);

        return (
            <Container>
              <Header as="h2">Add a new entry</Header>
              <Form onSubmit={ this.handleSubmit }>
                <Form.Group>
                  <Date
                    date={ date }
                    handleChange={ this.handleChange }
                  />
                  <Time
                    time={ time }
                    handleChange={ this.handleChange }
                  />
                </Form.Group>
                <Form.Group>
                  <Mood handleChange={ this.handleChange }/>
                </Form.Group>
                <FeedingOrDiaper
                  event={ event }
                  handleChange={ this.handleChange }
                />
                <BreastOrBottle
                  feeding={ feeding }
                  isFeeding={ event === EVENT.FEEDING }
                  handleChange={ this.handleChange }
                />
                <Breast
                  breast={ breast }
                  isBreastFeeding={ feeding === FEEDING.BREAST }
                  handleChange={ this.handleChange }
                />
                <Duration
                  duration={ duration }
                  isBreastFeeding={ feeding === FEEDING.BREAST }
                  handleChange={ this.handleChange }
                />
                <Amount
                  amount={ amount }
                  isBottle={ feeding === FEEDING.BOTTLE }
                  handleChange={ this.handleChange }
                />
                <Diaper
                  diaper={ diaper }
                  isDiaper={ event === EVENT.DIAPER }
                  handleChange={ this.handleChange }
                />
                <Button
                  disabled={ !submitEnabled }
                  type='submit'
                >
                  Submit
                </Button>
              </Form>
              <pre>{ JSON.stringify(this.state, null, 2) }</pre>
            </Container>
        );
    };
};

export default LogEntryForm;
