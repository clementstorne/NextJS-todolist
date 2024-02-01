"use client";

import Header from "@/components/Header";
import { Flex } from "@chakra-ui/react";
import AddTask from "@components/AddTask";
import Loading from "@components/Loading";
import NoTask from "@components/NoTask";
import Task from "@components/Task";
import { ITask } from "@types";
import { useEffect, useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/task/all");
      const data = await res.json();
      setAllTasks(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/task/new", {
        method: "POST",
        body: JSON.stringify({ task: task }),
      });

      if (res.ok) {
        setTask("");
        fetchTasks();
        // setAllTasks((prevTasks) => [task, ...prevTasks]);
      } else {
        console.error("Error creating task");
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleCompleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/task/complete/${id}`, {
        method: "PATCH",
      });

      if (res.ok) {
        await fetchTasks();
      } else {
        console.error("Error completing task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/task/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setAllTasks((prevTasks) =>
          prevTasks.filter((task: ITask) => task._id !== id)
        );
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Header />
      <AddTask
        task={task}
        setTask={setTask}
        handleCreateTask={handleCreateTask}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Flex direction="column" p="2rem">
            {allTasks.length > 0 ? (
              allTasks.map((individualTask: ITask) => (
                <Task
                  key={individualTask._id}
                  task={individualTask}
                  handleCompleteTask={handleCompleteTask}
                  handleDeleteTask={handleDeleteTask}
                />
              ))
            ) : (
              <NoTask />
            )}
          </Flex>
        </>
      )}
    </>
  );
}
