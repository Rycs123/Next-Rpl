"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import TaskForm from "../TaskForm";
import Task from "../Task";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { StatusTitle } from "@/constants/constants";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "white",
  },
};

const Board = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (data) => {
    await props.onSubmitAddTask(data);
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async (taskId) => {
    await props.onDelete(taskId);
    setIsOpen(false);
  };

  const handleEdit = async (taskId) => {
    await props.onEdit(taskId);
    setIsOpen(false);
  };

  return (
    <Droppable key={props.idx} droppableId={`${props.idx}`}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='card-board'
        >
          <Modal
            isOpen={isOpen}
            onRequestClose={handleOpenModal}
            style={customStyles}
          >
            <TaskForm
              status={props.status}
              onSubmit={handleSubmit}
              onCloseModal={handleCloseModal}
            />
          </Modal>
          <div className='card-header'>
            <h3>
              {StatusTitle[props.status]} <span>({props.tasks.length})</span>
            </h3>
            <button onClick={handleOpenModal} className='button-add-task'>
              <span>+</span>
            </button>
          </div>
          <div className='all-task'>
            <ul>
              {props.tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task
                        id={task._id}
                        title={task.title}
                        description={task.description}
                        dueDate={task.dueDate}
                        tags={task.tags}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          </div>
        </div>
      )}
    </Droppable>
  );
};

Board.propTypes = {
  status: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      dueDate: PropTypes.string,
      tags: PropTypes.array,
    })
  ),
  onSubmitAddTask: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

Board.defaultProptypes = {
  tasks: [],
};

export default Board;
