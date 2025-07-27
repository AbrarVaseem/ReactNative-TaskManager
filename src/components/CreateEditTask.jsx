import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import * as Location from "expo-location";
import { TaskManagerStore } from "./TaskManagerContext";
import DueDatePicker from "./organisms/DatePicker";
import TaskStatus from "./organisms/TaskStatus";

const CreateEditTask = ({ navigation, route }) => {
  const { dueDate, setDueDate, loggedInUserInfo } =
    useContext(TaskManagerStore);
  const taskId = route?.params?.state?.taskId || null;

  const [taskInformation, setTaskInformation] = useState({
    title: "",
    description: "",
    status: "Pending",
    due_date: dueDate,
    file: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
    user_id: "",
  });

  const updateTasksInfo = (name, value) => {
    setTaskInformation((prev) => ({ ...prev, [name]: value }));
  };

  // Create Task
  const createEditTask = async () => {
    const apiUrl = taskId
      ? `http://192.168.1.79:3000/tasks/${taskId}`
      : `http://192.168.1.79:3000/tasks`;
    const apiMethod = taskId ? "PUT" : "POST";
    const result = await fetch(apiUrl, {
      method: apiMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskInformation),
    });
    navigation.navigate("dashboard");
  };

  const managerLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    const currentLocation = await Location.getCurrentPositionAsync({});
    setTaskInformation((prev) => ({
      ...prev,
      location: {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      },
    }));
  };

  const getSelectedNotes = async () => {
    try {
      const result = await fetch(
        `http://192.168.1.79:3000/tasks?id=${taskId}`,
        {
          method: "GET",
        }
      );
      if (!result.ok) {
        console.error("Failed to fetch task:", result);
        return;
      }
      const currentTaskContent = await result.json();
      setTaskInformation((prev) => ({
        ...prev,
        title: currentTaskContent[0]?.title,
        description: currentTaskContent[0]?.description,
        status: currentTaskContent[0]?.status,
        due_date: currentTaskContent[0]?.due_date,
        file: "",
        location: {
          latitude: currentTaskContent[0]?.location?.latitude,
          longitude: currentTaskContent[0]?.location?.longitude,
        },
      }));
      setDueDate(new Date(currentTaskContent[0]?.due_date));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setTaskInformation((prev) => ({
      ...prev,
      due_date: dueDate,
      user_id: loggedInUserInfo?.user_id,
    }));
  }, [dueDate, loggedInUserInfo?.user_id]);

  useEffect(() => {
    // Populate Task Details For Editing
    if (taskId) {
      getSelectedNotes();
    }
  }, [taskId]);

  useEffect(() => {
    managerLocationPermission();
  }, []);

  return (
    <View style={styles.createTask}>
      <TextInput
        style={styles.createTaskInputs}
        placeholder="Create Title"
        placeholderTextColor="#A0A0A0"
        onChangeText={(text) => updateTasksInfo("title", text)}
        value={taskInformation?.title}
      />
      <TextInput
        style={styles.createTaskInputs}
        placeholder="Create Description"
        placeholderTextColor="#A0A0A0"
        multiline={true}
        textAlignVertical="top"
        onChangeText={(text) => updateTasksInfo("description", text)}
        value={taskInformation?.description}
      />
      {loggedInUserInfo?.role === "admin" && (
        <TaskStatus
          taskInformation={taskInformation}
          setTaskInformation={setTaskInformation}
        />
      )}
      <View style={styles.datePickerAndSaveContainer}>
        <View>
          <DueDatePicker />
        </View>
        <View>
          <TouchableOpacity style={styles.createBtn} onPress={createEditTask}>
            <Text style={styles.createBtnText}>
              {taskId ? "Save" : "Create"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateEditTask;

const styles = StyleSheet.create({
  createTask: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createTaskInputs: {
    color: "#CCC",
    borderWidth: 1,
    borderColor: "#CCC",
    width: "80%",
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  createBtn: {
    backgroundColor: "#313131",
    padding: 10,
    width: 100,
    borderRadius: 5,
  },
  createBtnText: {
    color: "#f5f5f5",
    textAlign: "center",
    padding: 3,
  },
  datePickerAndSaveContainer: {
    width: "88%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
