import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

type Task = { id: string; text: string; completed: boolean };

export default function App() {
  const [screen, setScreen] = useState<'login' | 'tasks' | 'removed' | 'completed'>('login');
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [removedTasks, setRemovedTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
    setTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const removeTask = (id: string) => {
    const toRemove = tasks.find(t => t.id === id);
    if (toRemove) {
      setRemovedTasks([...removedTasks, toRemove]);
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

 
  if (screen === 'login') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Button title="Sign In" onPress={() => setScreen('tasks')} />
      </View>
    );
  }

  if (screen === 'removed') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Removed Tasks</Text>
        <FlatList
          data={removedTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.taskText}>{item.text}</Text>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No removed tasks.</Text>}
        />
        <Button title="Back to Tasks" onPress={() => setScreen('tasks')} />
      </View>
    );
  }

  if (screen === 'completed') {
    const completedTasks = tasks.filter(t => t.completed);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Completed Tasks</Text>
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={[styles.taskText, styles.completed]}>{item.text}</Text>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No completed tasks.</Text>}
        />
        <Button title="Back to Tasks" onPress={() => setScreen('tasks')} />
      </View>
    );
  }

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
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={[styles.taskText, item.completed && styles.completed]}>
              {item.text}
            </Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.actionButton}>
                <Text style={styles.completeText}>✅</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeTask(item.id)} style={styles.actionButton}>
                <Text style={styles.deleteButton}>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet!</Text>}
      />
      <View style={styles.buttonRow}>
        <Button title="View Completed" onPress={() => setScreen('completed')} />
        <Button title="View Removed" onPress={() => setScreen('removed')} />
      </View>
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
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
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
  },
  completeText: {
    fontSize: 18,
    color: 'green',
    marginRight: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 5,
  },
});
