import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TaskStatus = ({ taskInformation, setTaskInformation }) => {
  const options = ["Pending", "Approved", "Rejected"];

  const selectStaus = (option) => {
    setTaskInformation((prev) => ({ ...prev, status: option }));
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionContainer}
          onPress={() => selectStaus(option)}
        >
          <View style={styles.outerCircle}>
            {taskInformation?.status === option && (
              <View style={styles.innerCircle} />
            )}
          </View>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TaskStatus;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    display: "flex",
    flexDirection: "row",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#414141",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: "#616161",
  },
  optionText: {
    color: "#fff",
    fontSize: 14,
  },
});
