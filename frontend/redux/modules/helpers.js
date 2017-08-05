export const arrayify = (objsById) => (
  Object.keys(objsById).map(id => objsById[id])
);

export const isObject = (item) => item !== null && typeof item === 'object';
export const isEmpty = (obj) => Object.keys(obj).length === 0;
