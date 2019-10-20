import React from 'react';
import { Location, Locations } from 'react-router-component';

import AddEntryPage from './AddEntryPage';
import CreateLogPage from './CreateLogPage';
import DeleteEntryPage from './DeleteEntryPage';
import DeleteLogPage from './DeleteLogPage';
import EditEntryPage from './EditEntryPage';
import EditLogPage from './EditLogPage';
import LogPage from './LogPage';
import LogSummaryPage from './LogSummaryPage';
import {
    addEntry,
    editEntry,
    deleteEntry,
    createLog,
    deleteLog,
    editLog,
    home,
    viewEntries,
    viewEntriesForDate,
} from '../utils/locations';

function AppLocations({ isLoaded }) {
    return (
        isLoaded
            ? <Locations hash>
                <Location path={ home.path } handler={ LogSummaryPage } />
                <Location path={ createLog.path } handler={ CreateLogPage } />
                <Location path={ editLog.path } handler={ EditLogPage } />
                <Location path={ deleteLog.path } handler={ DeleteLogPage } />
                <Location path={ viewEntries.path } handler={ LogPage } />
                <Location path={ viewEntriesForDate.path } handler={ LogPage } />
                <Location path={ addEntry.path } handler={ AddEntryPage } />
                <Location path={ editEntry.path } handler={ EditEntryPage } />
                <Location path={ deleteEntry.path } handler={ DeleteEntryPage } />
              </Locations>
            : null
    );
}

export default AppLocations;
