export const arrayify = (objsById) => (
  Object.keys(objsById).map(id => objsById[id])
);

export const normalize = (obj, targetKey) => {
  if (!isObject(obj) || isEmpty(obj)) return {};

  const items = {};

  Object.keys(obj).forEach( key => {
    if (key === targetKey) Object.assign(items, obj[key]);
    else Object.assign(items, normalize(obj[key], targetKey));
  });

  return Object.assign(items, normalize(items, targetKey));
};

export const normalize2 = (obj, targetKey) => {
  if (!isObject(obj) || isEmpty(obj)) return {};

  const items = {};
  debugger

  Object.keys(obj).forEach( key => {
    const item = obj[key];
    if (key === targetKey) Object.assign(items, { [item.id]: item });
    else Object.assign(items, normalize(item, targetKey));
  });

  debugger

  return items;
};

export const isObject = (item) => item !== null && typeof item === 'object';
export const isEmpty = (obj) => Object.keys(obj).length === 0;
