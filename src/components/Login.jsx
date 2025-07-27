import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { TaskManagerStore } from "./TaskManagerContext";

const Login = ({ navigation }) => {
  const { setLoggedInUserInfo } = useContext(TaskManagerStore);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [isLoggedInfailed, setIsLoggedInfailed] = useState(null);

  // Update Login User Details
  const updateUserDetails = (name, value) => {
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Make Login Request
  const makeLoginRequest = async () => {
    fetch(
      `http://192.168.1.79:3000/users?email=${encodeURIComponent(
        loginDetails?.email
      )}&password=${encodeURIComponent(loginDetails?.password)}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setLoggedInUserInfo({
            user_id: data[0]?.id,
            role: data[0]?.role,
          });
          navigation.navigate("dashboard");
        } else {
          setIsLoggedInfailed(true);
        }
      })
      .catch((err) => console.error("error:", err));
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginContent}>
        <Text style={styles.loginHeaderText}>LOGIN</Text>
        <TextInput
          onChangeText={(text) => updateUserDetails("email", text)}
          style={styles.inputBox}
          placeholder="Enter Email"
          placeholderTextColor="#A0A0A0"
        />
        <TextInput
          onChangeText={(text) => updateUserDetails("password", text)}
          style={styles.inputBox}
          placeholder="Enter Password"
          placeholderTextColor="#A0A0A0"
        />
        {isLoggedInfailed && (
          <Text style={styles.invalidLoginMessage}>Invalid Credentails</Text>
        )}
        <TouchableOpacity style={styles.loginBtn} onPress={makeLoginRequest}>
          <Text style={styles.loginBtnText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  loginHeaderText: {
    fontSize: 30,
    color: "#CCC",
    marginBottom: 20,
    fontWeight: "bold",
  },
  loginContent: {
    height: 350,
    width: "80%",
    backgroundColor: "#1E1E1E",
    borderWidth: 0.2,
    borderColor: "#2C2C2C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  inputBox: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "80%",
    borderRadius: 5,
    marginVertical: 10,
    color: "#CCC",
    borderColor: "#3A3A3A",
  },
  loginBtn: {
    backgroundColor: "#333333",
    width: "80%",
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    borderRadius: 5,
  },
  loginBtnText: {
    color: "#CCC",
  },
  invalidLoginMessage: {
    color: "crimson",
  },
});
