import useUnits from './use-units';

describe('unitOptions', () => {
    const {unitOptions} = useUnits();

    it('returns the expected unit options', () => {
        expect(unitOptions).toStrictEqual([
            {
                key: 'fl. oz.',
                text: 'fl. oz.',
                value: 'fl. oz.',
            },
            {
                key: 'cup',
                text: 'cup',
                value: 'cup',
            },
            {
                key: 'quart',
                text: 'quart',
                value: 'quart',
            },
            {
                key: 'mL',
                text: 'mL',
                value: 'mL',
            },
        ]);
    });
});
