import React from 'react';
import { connect } from 'react-redux';

// import { hideModal } from '../../redux/modules/modal';

const DeletePrompt = ({ type, item, confirm, edit, hideModal }) => {

  const _onClick = action => e => {
    e.preventDefault();
    action().then(hideModal);
  };

  return (
    <div className='delete-prompt'>
      <h2>
        Delete { type.charAt(0).toUpperCase() + type.slice(1) }
      </h2>
      <p>
        This { type } will be deleted and you won't be able to find it anymore.
        You can also edit this { type }, if you just want to change something
      </p>
      <nav>
        <div className='left'>
          <div className='button' onClick={ _onClick(edit) }>
            Edit { type }
          </div>
        </div>

        <div className='right'>
          <div className='button' onClick={ hideModal }>
            Cancel
          </div>

          <div className='button' onClick={ _onClick(confirm) }>
            Delete { type }
          </div>
        </div>
      </nav>
    </div>
  );
}

export default DeletePrompt;
