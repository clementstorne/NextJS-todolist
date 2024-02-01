export interface AddTaskProps {
  task: string;
  setTask: (task: string) => void;
  handleCreateTask: () => void;
}

export interface AddTaskProps {
  task: string;
  setTask: (task: string) => void;
  handleCreateTask: () => void;
}

export interface ITask {
  _id: string;
  task: string;
  completed: boolean;
}

export interface TaskProps {
  task: ITask;
  handleCompleteTask: (is: string) => void;
  handleDeleteTask: (is: string) => void;
}

export interface IDeleteTaskRequestParam {
  params: {
    id: string;
  };
}
