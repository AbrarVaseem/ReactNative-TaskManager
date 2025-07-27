import { useContext, useState } from 'react';
import { View, Text, Platform, Pressable, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TaskManagerStore } from '../TaskManagerContext';

const DueDatePicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const {dueDate, setDueDate} = useContext(TaskManagerStore);

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selectedDate) setDueDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
        <Text style={styles.inputText}>
          {dueDate?.toISOString().split('T')[0]}
        </Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DueDatePicker;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#666',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#1e1e1e',
  },
  inputText: {
    color: '#fff',
  },
});
