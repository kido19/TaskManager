// app/index.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean }[]>([]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
    setTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const renderItem = ({ item }: { item: typeof tasks[0] }) => (
    <View style={styles.taskItem}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.taskText, item.completed && styles.completed]}>
          {item.text}
        </Text>
      </View>
      {!item.completed && (
        <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.actionButton}>
          <Text style={styles.completeButton}>✅</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => removeTask(item.id)} style={styles.actionButton}>
        <Text style={styles.deleteButton}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#aaa',
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  actionButton: {
    marginLeft: 10,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  completeButton: {
    fontSize: 18,
    color: 'green',
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 50,
  },
});
