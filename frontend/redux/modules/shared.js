import { normalize } from 'normalizr';

export const genericAction = (schema) => (type) => (data) => ({
  type,
  ...normalize(data, schema)
});

export const generateSyncActions = (types, schema) => {
  const _nameFromType = type => type.split("_").map(
    (word, i) =>
      i === 0 ?
        word.toLowerCase() :
        word[0].toUpperCase() + word.slice(1).toLowerCase()
  ).join("");

  const action = genericAction(schema);
  return Object.assign(
    {},
    ...types.map(type => ({ [_nameFromType(type)]: action(type) }))
  );
}
