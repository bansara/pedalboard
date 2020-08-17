import { parseOptions } from './utils/modules'

it('uses ES2020 nullish coalescing', () => {
  const nullishObj = {
    prop1: 0,
    prop2: '',
    prop3: false,
    prop4: null,
    prop5: undefined
  }
  expect(nullishObj.prop1 ?? 'default').toEqual(0);
  expect(nullishObj.prop2 ?? 'default').toEqual('');
  expect(nullishObj.prop3 ?? 'default').toEqual(false);
  expect(nullishObj.prop4 ?? 'default').toEqual('default');
  expect(nullishObj.prop5 ?? 'default').toEqual('default');
  expect(nullishObj.prop1 || 'default').toEqual('default');
  expect(nullishObj.prop2 || 'default').toEqual('default');
  expect(nullishObj.prop3 || 'default').toEqual('default');
});
it('uses ES2020 optional chaining', () => {
  const someObj = {
    prop1: 1,
    prop2: {
      prop3: 3
    }
  }
  expect(someObj?.prop1).toEqual(1);
  expect(someObj?.prop2?.prop3).toEqual(3);
  expect(someObj?.prop2?.prop4).toEqual(undefined);
  expect(someObj?.prop3).toEqual(undefined);
});
it('combines both', () => {
  const defaultValueObj = {
    gain: 0,
    pan: null
  }
  expect(defaultValueObj?.gain ?? 1).toEqual(0);
  expect(defaultValueObj?.pan ?? 1).toEqual(1);
});
it('uses parseOptions correctly', () => {
  const options = {
    gain: 0,
  }
  expect(parseOptions(options, 'gain', 1)).toEqual(0);
});