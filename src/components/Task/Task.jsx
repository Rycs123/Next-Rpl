"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Image from "next/image";
import EditIcon from "@/assets/img/edit-svgrepo-com.svg";
import DeleteIcon from "@/assets/img/delete-svgrepo-com.svg";
import EditTask from "../EditTask";
import DeleteTask from "../DeleteTask/DeleteTask";

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

const Task = (props) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const handleOpenDeleteModal = () => {
    setIsOpenDelete(!isOpenDelete);
  };

  const handleClickDeleteModal = async () => {
    await props.onDelete(props.id);
    setIsOpenDelete(false);
  };

  const handleCloseDeleteModal = () => {
    setIsOpenDelete(false);
  };

  const handleCloseEditModal = () => {
    setIsOpenEdit(false);
  };

  const handleOpenEditModal = () => {
    setIsOpenEdit(!isOpenEdit);
  };

  return (
    <li key={props.key} className='card-task'>
      <Modal
        isOpen={isOpenDelete}
        onRequestClose={handleOpenDeleteModal}
        style={customStyles}
      >
        <DeleteTask
          handleCloseModal={handleCloseDeleteModal}
          handleClickDeleteModal={handleClickDeleteModal}
        />
      </Modal>
      <Modal
        isOpen={isOpenEdit}
        onRequestClose={handleOpenEditModal}
        style={customStyles}
      >
        <EditTask
          handleCloseModal={handleCloseEditModal}
          initialData={editedTask}
        />
      </Modal>
      <div className='group-task-header'>
        <h5>{props.title}</h5>
        <button className='button-edit' onClick={handleOpenEditModal}>
          <span>
            <Image src={EditIcon} width={15} height={15} alt='' />
          </span>
        </button>
      </div>

      <p>{props.description}</p>
      <p>📅: {props.dueDate}</p>
      <div className='group-task-footer'>
        <p>
          🏷️: {Array.isArray(props.tags) ? props.tags.join(", ") : "No Tags"}
        </p>
        <button onClick={handleOpenDeleteModal} className='button-delete'>
          <span>
            <Image src={DeleteIcon} width={15} height={15} alt='' />
          </span>
        </button>
      </div>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  dueDate: PropTypes.string,
  tags: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
};

export default Task;
