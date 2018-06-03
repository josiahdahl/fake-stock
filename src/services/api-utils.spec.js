import mockAxios from 'jest-mock-axios';
import * as apiUtils from './api-utils';
import { mapToQueryString } from './api-utils';

test('filterUnsetParams', () => {
  const params = [
    ['one', 'one'],
    ['two', true],
    ['three', 3],
    ['four', undefined],
    ['five', null],
    ['six', {}],
    ['seven', []],
  ];

  const filteredParams = params.filter(apiUtils.filterUnsetParams);

  expect(filteredParams).toEqual([
    ['one', 'one'],
    ['two', true],
    ['three', 3],
  ]);
});

test('mapToQueryString', () => {
  const param = ['one', 'two'];

  expect(mapToQueryString(param)).toEqual('one=two');
});

test('buildQueryString', () => {
  const params = [
    'one=one',
    'two=true',
    'three=3',
  ];
  const queryString = params.reduce(apiUtils.buildQueryString, '');

  expect(queryString).toEqual('?one=one&two=true&three=3');
});

test('queryBuilder', () => {
  const params = {
    one: 'two',
    three: 4,
  };

  const query = apiUtils.queryBuilder(params);

  expect(query).toEqual('?one=two&three=4');
});

test('get', () => {

  const baseURI = 'http://www.example.com';
  const endpoint = '/test';
  const uri = '/testing';
  const params = {
    one: 'two',
    three: 4,
  };

  apiUtils.get(baseURI)(endpoint)(uri, params);

  expect(mockAxios.get).toHaveBeenCalledWith('http://www.example.com/test/testing?one=two&three=4');
});