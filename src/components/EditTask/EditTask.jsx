import React, { useState } from "react";
import PropTypes from "prop-types";

const EditTask = (props) => {
  const [title, setNewTitle] = useState(props.initialData?.title || "");
  const [description, setNewDescription] = useState(
    props.initialData?.description || ""
  );
  const [dueDate, setNewDueDate] = useState(props.initialData?.dueDate || "");
  const [tags, setNewTags] = useState(
    props.initialData?.tags ? props.initialData.tags.join(", ") : ""
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !description || !dueDate || !tags) return;

    const tagsArray = tags.split(",").map((tag) => tag.trim());

    const newTask = {
      title,
      description,
      dueDate,
      tags: tagsArray,
      status: props.status,
    };
    await props.onSubmit(newTask);
    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
    setNewTags("");
  };

  return (
    <>
      <h1>Edit Task</h1>
      <form className='login-form form-add-task' onSubmit={handleSubmit}>
        <div className='user-box'>
          <input
            type='text'
            value={title}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <label>📑Title</label>
        </div>

        <div className='user-box'>
          <input
            type='text'
            value={description}
            onChange={(e) => setNewDescription(e.target.value)}
            required
          />
          <label>📃Description</label>
        </div>

        <div className='user-box'>
          <input
            type='date'
            value={dueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            required
          />
          <label>Due Date</label>
        </div>

        <div className='user-box'>
          <input
            type='text'
            value={tags}
            onChange={(e) => setNewTags(e.target.value)}
            required
          />
          <label>🏷️Tags</label>
        </div>

        <button className='button-submit' type='submit'>
          Submit
        </button>
      </form>
      <button onClick={props.handleCloseModal} className='button-cancel'>
        Cancel
      </button>
    </>
  );
};

EditTask.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  dueDate: PropTypes.string,
  tags: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  initialData: PropTypes.object,
  onCloseModal: PropTypes.func.isRequired,
};

export default EditTask;
