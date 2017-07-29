export const arrayify = (objsById) => (
  Object.keys(objsById).map(id => objsById[id])
);
