import { normalize } from 'normalizr';

export const genericAction = (schema) => (type) => (data) => ({
  type,
  ...normalize(data, schema)
});

export const generateSyncActions = (types, schema) => {
  const action = genericAction(schema);

  return Object.assign(
    {},
    ...types.map(type => ({ [toCamelCase(type)]: action(type) }))
  );
}

export const toCamelCase = str => str.split("_").map(
  (word, i) => i === 0 ?
    word.toLowerCase() :
    word[0].toUpperCase() + word.slice(1).toLowerCase()
).join("");
