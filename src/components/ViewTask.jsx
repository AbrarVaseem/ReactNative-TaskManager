import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ViewTask = ({ route }) => {
  const taskId = route?.params?.state?.taskId;
  const [currentTask, setCurrentTask] = useState({});

  const getSelectedNotes = async () => {
    try {
      const result = await fetch(
        `http://192.168.1.79:3000/tasks?id=${taskId}`,
        {
          method: "GET",
        }
      );
      if (!result.ok) {
        console.error("error", result);
        return;
      }

      const currentTaskContent = await result.json();
      setCurrentTask(currentTaskContent[0]);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getSelectedNotes();
  }, []);

  return (
    <View style={styles.viewTaskContainer}>
      <View style={styles.viewTaskContent}>
        <View style={styles.taskContent}>
          <Text style={styles.taskItemsHeaderText}>Title:</Text>
          <Text style={styles.currentTaskText}>{currentTask?.title}</Text>
        </View>
        <View style={styles.taskContent}>
          <Text style={styles.taskItemsHeaderText}>Description: </Text>
          <Text style={styles.currentTaskText}>{currentTask?.description}</Text>
        </View>
        <View style={styles.taskContent}>
          <Text style={styles.taskItemsHeaderText}>Status: </Text>
          <Text style={styles.currentTaskText}>{currentTask?.status}</Text>
        </View>
        <View style={styles.taskContent}>
          <Text style={styles.taskItemsHeaderText}>Due Date: </Text>
          <Text style={styles.currentTaskText}>{currentTask?.due_date?.split('T')[0]}</Text>
        </View>
        <View style={styles.taskContent}>
          <Text style={styles.taskItemsHeaderText}>Location: </Text>
          <Text style={styles.currentTaskText}>
            {currentTask?.location?.latitude || "Not Found"}
          </Text>
          <Text style={styles.currentTaskText}>
            {currentTask?.location?.longitude || "Not Found"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ViewTask;

const styles = StyleSheet.create({
  viewTaskContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  currentTaskText: {
    color: "#FFF",
  },
  viewTaskContent: {
    backgroundColor: "#212121",
    width: "90%",
    height: 400,
    maxHeight: "fit-content",
    borderWidth: 0.2,
    borderColor: "#CCC",
    padding: 20,
    borderRadius: 5,
  },
  taskItemsHeaderText: {
    fontWeight: "bold",
    color: "#F5F5F5",
    fontSize: 16,
    marginTop: 18,
    marginBottom: 5,
  },
});
