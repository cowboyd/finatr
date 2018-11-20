import startOfDay from 'date-fns/fp/startOfDay';

import { convertRangeToInterval } from './index.js';

describe(`check convertRangeToInterval`, () => {
  it(`returns range start shifted forward`, () => {
    const transaction = { start: `2018-03-22` };
    let graphRange = {
      start: startOfDay('2018-01-01'),
      end: startOfDay('2018-06-01')
    };
    let interval = convertRangeToInterval(transaction, graphRange);
    expect(interval.start).toEqual(startOfDay('2018-03-22'));
    expect(interval.end).toEqual(startOfDay('2018-06-01'));
  });

  it(`returns range start before`, () => {
    const transaction = { start: `2017-08-01` };
    let graphRange = {
      start: startOfDay('2018-01-15'),
      end: startOfDay('2018-06-01')
    };
    let interval = convertRangeToInterval(transaction, graphRange);
    expect(interval.start).toEqual(startOfDay('2018-01-15'));
    expect(interval.end).toEqual(startOfDay('2018-06-01'));
  });

  it(`returns range end shifted back`, () => {
    const transaction = { start: `2018-03-22`, end: '2018-05-02' };
    let graphRange = {
      start: startOfDay('2018-01-01'),
      end: startOfDay('2018-06-01')
    };
    let interval = convertRangeToInterval(transaction, graphRange);
    expect(interval.start).toEqual(startOfDay('2018-03-22'));
    expect(interval.end).toEqual(startOfDay('2018-05-02'));
  });

  it(`returns range end after`, () => {
    const transaction = { start: `2017-08-22`, end: '2018-08-02' };
    let graphRange = {
      start: startOfDay('2018-01-15'),
      end: startOfDay('2018-06-01')
    };
    let interval = convertRangeToInterval(transaction, graphRange);
    expect(interval.start).toEqual(startOfDay('2018-01-15'));
    expect(interval.end).toEqual(startOfDay('2018-06-01'));
  });
});
