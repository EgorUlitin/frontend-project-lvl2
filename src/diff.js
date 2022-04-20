import _ from 'lodash';
import types from './helpers/types.js';

const getChildren = (data) => {
  const entries = Object.entries(data);
  return entries.map(([key, value]) => {
    if (_.isObject(value)) {
      return getChildren(value);
    }
    return { [key]: value };
  });
};

const diff = (entriesValue1, entriesValue2) => {
  const iter = (data1, data2) => {
    const keys = _.union(Object.keys(data1), Object.keys(data2));
    const sortedKeys = _.sortBy(keys);
    return sortedKeys.map((key) => {
      const value1 = data1[key];
      const value2 = data2[key];

      if (_.isObject(value1) && _.isObject(value2)) {
        return {
          key,
          type: types.NODE,
          children: diff(value1, value2),
        };
      }
      if (!_.has(data2, key)) {
        return {
          key,
          type: types.REMOVE,
          value1,
          value2,
        };
      }
      if (!_.has(data1, key)) {
        return {
          key,
          type: types.ADD,
          value1,
          value2,
        };
      }
      if (!_.isEqual(value1, value2)) {
        return {
          key,
          type: types.CHANGE,
          value1,
          value2,
        };
      }
      return {
        key,
        type: types.UNCHANGE,
        value1,
      };
    });
  };
  return { key: '', type: types.ROOT, children: iter(entriesValue1, entriesValue2) };
};
export default diff;
