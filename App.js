import { StyleSheet } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskManagerContext from "./src/components/TaskManagerContext";
import Login from "./src/components/Login";
import Dashboard from "./src/components/Dashboard";
import CreateEditTask from "./src/components/CreateEditTask";
import ViewTask from "./src/components/ViewTask";

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <TaskManagerContext>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerTitle: "Tasks Dashboard" }}
            name="dashboard"
            component={Dashboard}
          />
          <Stack.Screen
            options={{ headerTitle: "Create/Update Task" }}
            name="create-edit-task"
            component={CreateEditTask}
          />
          <Stack.Screen
            options={{ headerTitle: "View Task" }}
            name="view-task"
            component={ViewTask}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskManagerContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
