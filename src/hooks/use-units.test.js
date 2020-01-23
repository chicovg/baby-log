import useUnits from './use-units';

describe('useUnits', () => {
    const {unitOptions, convert} = useUnits();

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

    it('converts oz to the other units', () => {
        expect(convert('fl. oz.', 'fl. oz.', 1)).toBe(1);
        expect(convert('fl. oz.', 'cup', 1)).toBe(0.125);
        expect(convert('fl. oz.', 'quart', 1)).toBe(0.0313);
        expect(convert('fl. oz.', 'mL', 1)).toBe(29.5735);
    });

    it('converts cup to the other units', () => {
        expect(convert('cup', 'cup', 1)).toBe(1);
        expect(convert('cup', 'fl. oz.', 1)).toBe(8);
        expect(convert('cup', 'quart', 1)).toBe(0.25);
        expect(convert('cup', 'mL', 1)).toBe(262.588);
    });

    it('converts quart to the other units', () => {
        expect(convert('quart', 'quart', 1)).toBe(1);
        expect(convert('quart', 'fl. oz.', 1)).toBe(32);
        expect(convert('quart', 'cup', 1)).toBe(4);
        expect(convert('quart', 'mL', 1)).toBe(946.353);
    });

    it('converts cup to the other units', () => {
        expect(convert('mL', 'mL', 1)).toBe(1);
        expect(convert('mL', 'fl. oz.', 1)).toBe(0.0338);
        expect(convert('mL', 'cup', 1)).toBe(0.0042);
        expect(convert('mL', 'quart', 1)).toBe(0.0011);
    });

    it('doesn\'t convert unknown units', () => {
        expect(convert('foo', 'bar', 1)).toBe(1);
    })
});
