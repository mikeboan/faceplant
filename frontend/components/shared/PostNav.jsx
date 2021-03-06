import React from 'react';
import { connect } from 'react-redux';

import { showModal } from '../../redux/modules/modal';
import { showDropdown, hideDropdown } from '../../redux/modules/dropdowns';
import EditModalContainer from './EditModalContainer';
import DeletePrompt from './DeletePromptContainer';
import { dropdownOpen } from '../../selectors/selectors';

const mapStateToProps = (state, { type, item }) => {
  const name = `${type}-dropdown-${item.id}`;

  return ({
    visible: dropdownOpen(state, name),
  });
};

const mapDispatchToProps = (dispatch, { type, item }) => {
  const name = `${type}-dropdown-${item.id}`;

  return ({
    showEditForm: () => dispatch(showModal(<EditModalContainer post={ item } type={ type }/>)),
    showDeletePrompt: () => dispatch(showModal(<DeletePrompt item={ item } type={ type }/>)),
    showDropdown: () => dispatch(showDropdown(name)),
    hideDropdown: () => dispatch(hideDropdown(name)),
  });
};

const PostNav = (props) => {
  const { showEditForm, showDeletePrompt, hideDropdown, showDropdown, visible, type } = props;
  const name = type.charAt(0).toUpperCase() + type.slice(1);

  const clickAction = e => {
    e.stopPropagation();
    if (visible) hideDropdown();
    else showDropdown();
  };

  return (
    <nav onClick={ clickAction } className='post-dd-toggle'>
      ···
      <ul className={ visible ? "dropdown shadow" : "hidden" } onClick={ e => e.stopPropagation() }>
        <li onClick={showEditForm}>Edit { name }</li>
        <li onClick={showDeletePrompt}>Delete { name }</li>
      </ul>
    </nav>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PostNav);
