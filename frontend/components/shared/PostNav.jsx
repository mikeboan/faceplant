import React from 'react';
import { connect } from 'react-redux';

import { showModal } from '../../redux/modules/modal';
import { showDropdown, hideDropdown } from '../../redux/modules/dropdowns';
import PostFormEditModalContainer from './PostFormEditModalContainer';
import DeletePostPrompt from './DeletePostPrompt';
import { dropdownOpen } from '../../selectors/selectors';

const mapStateToProps = (state, { post }) => ({
  visible: dropdownOpen(state, `post-dropdown-${post.id}`),
});

const mapDispatchToProps = (dispatch, { post }) => ({
  showEditForm: () => dispatch(showModal(<PostFormEditModalContainer post={post} />)),
  showDeletePrompt: () => dispatch(showModal(<DeletePostPrompt post={post} />)),
  showDropdown: () => dispatch(showDropdown(`post-dropdown-${post.id}`)),
  hideDropdown: () => dispatch(hideDropdown(`post-dropdown-${post.id}`)),
});

const PostNav = ({ showEditForm, showDeletePrompt, hideDropdown, showDropdown, visible }) => {
  const clickAction = e => {
    e.stopPropagation();

    if (visible) hideDropdown();
    else showDropdown();
  };

  return (
    <nav onClick={ clickAction } className='post-dd-toggle'>
      ...
      <ul className={ visible ? "dropdown shadow" : "hidden" } onClick={ e => e.stopPropagation() }>
        <li onClick={showEditForm}>Edit Post</li>
        <li onClick={showDeletePrompt}>Delete Post</li>
      </ul>
    </nav>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(PostNav);
