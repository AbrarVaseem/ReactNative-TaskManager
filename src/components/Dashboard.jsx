import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { TaskManagerStore } from "./TaskManagerContext";

const Dashboard = ({ navigation }) => {
  const { loggedInUserInfo } = useContext(TaskManagerStore);
  const [currentTasks, setCurrentTasks] = useState([]);

  // Get All User Tasks
  const getAllTasks = async () => {
    const apiUrl =
      loggedInUserInfo?.role === "admin"
        ? `http://192.168.1.79:3000/tasks`
        : `http://192.168.1.79:3000/tasks?user_id=${loggedInUserInfo?.user_id}`;
    const result = await fetch(apiUrl);
    const listOfTasks = await result.json();
    setCurrentTasks(listOfTasks);
  };

  // Delete a Task
  const deleteTask = async (taskId) => {
    const result = await fetch(`http://192.168.1.79:3000/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (result.ok) {
      // Refreshing All Tasks Post Deleting
      getAllTasks();
    } else {
      console.error("Failed to delete task");
    }
  };

  // Navigate To Create/Edit Task
  const createTaskNavigation = () => {
    navigation.navigate("create-edit-task");
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const viewTask = (taskId) => {
    navigation.navigate("view-task", { state: { taskId } });
  };

  const updateTaskScreen = (taskId) => {
    navigation.navigate("create-edit-task", { state: { taskId } });
  };

  return (
    <View style={styles.dashboardContainer}>
      <TouchableOpacity
        onPress={createTaskNavigation}
        style={styles.newTaskBtn}
      >
        <Text style={styles.newTaskBtnText}>+ Create New Task</Text>
      </TouchableOpacity>

      <FlatList
        data={currentTasks}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tasksContainer}
            onPress={() => viewTask(item?.id)}
          >
            <View style={styles.taskInfoContent}>
              <View style={styles.taskContent}>
                <Text style={styles.taskItemsHeaderText}>Title: </Text>
                <Text style={styles.taskTitle}>{item?.title}</Text>
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskItemsHeaderText}>Status: </Text>
                <Text style={styles.taskTitle}>{item?.status}</Text>
              </View>
              <View style={styles.taskContent}>
                <Text style={styles.taskItemsHeaderText}>Due Date: </Text>
                <Text style={styles.taskTitle}>{item?.due_date?.split('T')[0]}</Text>
              </View>
            </View>
            <View style={styles.taskActionsContent}>
              <TouchableOpacity onPress={() => updateTaskScreen(item?.id)}>
                <Text style={styles.editIcon}>
                  <Feather name="edit" size={21} color="white" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item?.id)}>
                <Text style={styles.editIcon}>
                  <Feather name="trash-2" size={22} color="#f03939" />
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tasksContainer: {
    borderWidth: 0.2,
    borderColor: "#FFF",
    padding: 13,
    height: 100,
    width: "93%",
    margin: 5,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
  },
  taskTitle: {
    color: "#CCC",
  },
  newTaskBtn: {
    backgroundColor: "#313131",
    padding: 15,
    width: "90%",
    borderRadius: 5,
    marginVertical: 20,
  },
  newTaskBtnText: {
    color: "#CCC",
    textAlign: "center",
    fontSize: 15,
  },
  taskContent: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 3,
  },
  taskItemsHeaderText: {
    fontWeight: "bold",
    color: "#F5F5F5",
  },
  taskInfoContent: {
    width: "85%",
  },
  taskActionsContent: {
    width: "15%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  editIcon: {
    color: "#CCC",
    borderWidth: 1,
    padding: 6,
  },
});
