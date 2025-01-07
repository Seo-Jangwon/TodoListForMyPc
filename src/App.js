import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import TodoTabs from './components/TodoTabs';
import { styles } from './styles/common';
import { PRIORITY } from './constants/priority';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(PRIORITY.MEDIUM.value);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        priority: selectedPriority,
        createdAt: new Date().toISOString(),
        completedAt: null
      };
      setTodos(prev => [...prev, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date().toISOString() : null
            }
          : todo
      )
    );
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const sortedTodos = [...(activeTab === 'active' ? activeTodos : completedTodos)]
    .sort((a, b) => {
      if (activeTab === 'completed') {
        // 완료된 항목은 최근에 완료된 순으로 정렬
        return new Date(b.completedAt) - new Date(a.completedAt);
      }
      // 진행중인 항목은 우선순위 순으로 정렬
      const priorityOrder = { HIGH: 2, MEDIUM: 1, LOW: 0 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

  return (
    <div style={styles.container}>
      <div style={styles.dragBar}>할 일 목록</div>
      
      <div style={styles.content}>
        {activeTab === 'active' && (
          <TodoInput
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            addTodo={addTodo}
          />
        )}

        <TodoTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeTodosCount={activeTodos.length}
          completedTodosCount={completedTodos.length}
        />

        <div>
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => {
                setTodos(prev => prev.filter(t => t.id !== todo.id));
              }}
              onPriorityChange={(newPriority) => {
                setTodos(prev =>
                  prev.map(t =>
                    t.id === todo.id ? { ...t, priority: newPriority } : t
                  )
                );
              }}
              showPrioritySelect={activeTab === 'active'}
            />
          ))}
        </div>

        {sortedTodos.length === 0 && (
          <div style={{ textAlign: 'center', color: '#6b7280', marginTop: '24px' }}>
            {activeTab === 'active' ? '추가된 할 일이 없습니다.' : '완료된 할 일이 없습니다.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;