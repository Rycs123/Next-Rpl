import React from "react";

const DeleteTask = (props) => {
  return (
    <>
      <h1>Are you sure wanna delete this task?</h1>
      <div className='button-group'>
        <button
          className='button-submit'
          onClick={props.handleClickDeleteModal}
        >
          Yes
        </button>
        <button onClick={props.handleCloseModal} className='button-cancel'>
          No
        </button>
      </div>
    </>
  );
};

export default DeleteTask;
