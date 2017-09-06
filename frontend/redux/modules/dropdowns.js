export const SHOW_DROPDOWN = "SHOW_DROPDOWN";
export const HIDE_DROPDOWN = "HIDE_DROPDOWN";
export const HIDE_ALL_DROPDOWNS = "HIDE_ALL_DROPDOWNS";

export const showDropdown = name => ({
  name,
  type: SHOW_DROPDOWN
});

export const hideDropdown = name => ({
  name,
  type: HIDE_DROPDOWN
});

export const hideAllDropdowns = () => ({
  type: HIDE_ALL_DROPDOWNS
});

const _defaultState = {};
const dropdownsReducer = (oldState = _defaultState, action) => {
  switch (action.type) {
    case SHOW_DROPDOWN:
      return Object.assign({}, oldState, { [action.name]: true });

    case HIDE_DROPDOWN:
      return Object.assign({}, oldState, { [action.name]: false });

    case HIDE_ALL_DROPDOWNS:
      return _defaultState;

    default:
      return oldState;
  }
};

export default dropdownsReducer;
