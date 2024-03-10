"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "@/components/Board/Board";
import { move, reorder } from "@/utils/dragDrop";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/actions/api";
import classifyTaskStatus from "@/utils/classifyTaskStatus";
import { STATUS, StatusOrder } from "@/constants/constants";

const Home = () => {
  const [ready, setReady] = useState(false);
  const [task, setTask] = useState([[], [], []]);
  const queryClient = useQueryClient();

  const {
    data: tasksData,
    error: tasksError,
    isLoading: tasksLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await api.getTasks("/task");
      return data;
    },
  });

  const {
    mutate: addTaskMutate,
    isPending: addTaskIsPending,
    isSuccess: addTaskIsSuccess,
    error: addTaskError,
  } = useMutation({
    mutationFn: (data) => api.addTask("/task", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  console.log(addTaskError);

  const {
    mutate: updateTaskMutate,
    isPending: updateTaskIsPending,
    isSuccess: updateTaskIsSuccess,
    error: updateTaskError,
  } = useMutation({
    mutationFn: ({ taskId, data }) => {
      return api.updateTask(`task/${taskId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const {
    mutate: deleteTaskMutate,
    isPending: deleteTaskIsPending,
    isSuccess: deleteTaskIsSuccess,
    error: deleteTaskError,
  } = useMutation({
    mutationFn: ({ taskId }) => {
      return api.deleteTask(`task/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const handleSubmitAddTask = async (data) => {
    await addTaskMutate(data);
    await refetch();
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    updateTaskMutate({
      taskId,
      data: {
        status: newStatus,
      },
    });
    refetch();
  };

  const onDragEnd = async (event) => {
    const { source, destination } = event;
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd !== dInd) {
      const result = move(task[sInd], task[dInd], source, destination);
      const newState = [...task];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
      await updateTaskStatus(event.draggableId, StatusOrder[dInd]);
      setTask(newState);
    }
  };

  const handleDeleteTask = async (taskId) => {
    deleteTaskMutate({ taskId });
    refetch();
  };

  const handleUpdateTask = async (taskId) => {
    updateTaskMutate({ taskId });
    refetch;
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    setTask(
      classifyTaskStatus(
        tasksData?.data?.tasks?.filter((task) => !task.deletedAt)
      )
    );
  }, [tasksLoading, isRefetching]);

  console.log(tasksData);

  return (
    <div className='board'>
      {ready && (
        <>
          <div className='main-board'>
            <DragDropContext onDragEnd={onDragEnd}>
              <Board
                status={STATUS.UNFINISHED}
                idx={0}
                tasks={task[0]}
                onSubmitAddTask={handleSubmitAddTask}
                onDelete={handleDeleteTask}
                onEdit={updateTaskStatus}
              />
              <Board
                status={STATUS.INPROGRESS}
                idx={1}
                tasks={task[1]}
                onSubmitAddTask={handleSubmitAddTask}
                onDelete={handleDeleteTask}
                onEdit={handleUpdateTask}
              />
              <Board
                idx={2}
                tasks={task[2]}
                status={STATUS.DONE}
                onSubmitAddTask={handleSubmitAddTask}
                onDelete={handleDeleteTask}
                onEdit={handleUpdateTask}
              />
            </DragDropContext>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
