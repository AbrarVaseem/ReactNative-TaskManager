import { useState, createContext } from "react";

export const TaskManagerStore = createContext(null);

const TaskManagerContext = ({ children }) => {
  const [dueDate, setDueDate] = useState(new Date());
  const [loggedInUserInfo, setLoggedInUserInfo] = useState({
    user_id: "",
    role: "",
  });

  const values = {
    dueDate,
    setDueDate,
    loggedInUserInfo,
    setLoggedInUserInfo,
  };
  return (
    <TaskManagerStore.Provider value={values}>
      {children}
    </TaskManagerStore.Provider>
  );
};

export default TaskManagerContext;
