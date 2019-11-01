import { toDisplayedEntry, toStoredEntry } from './entries';

describe('toDisplayedEntry', () => {
    it('re-writes fields displaying entry', () => {
        expect(toDisplayedEntry({
            date: '2019-06-10',
            time: '18:42',
        })).toStrictEqual({
            date: '2019-06-10',
            time: '6:42 PM',
        });
    });
});

describe('toStoredEntry', () => {
    it('re-writes fields for storing entry', () => {
        expect(toStoredEntry({
            date: '2019-03-11',
            time: '12:32 AM',
        })).toStrictEqual({
            date: '2019-03-11',
            time: '00:32',
        });
    });
});
