import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TodoItem from "./components/TodoItem";
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
  Typography,
  FormControl,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
        },
      },
    },
  },
});

const PRIORITY = {
  HIGH: { value: "HIGH", label: "높음", color: "#ef4444" },
  MEDIUM: { value: "MEDIUM", label: "보통", color: "#10b981" },
  LOW: { value: "LOW", label: "낮음", color: "#6b7280" },
};

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [selectedPriority, setSelectedPriority] = useState(
    PRIORITY.MEDIUM.value
  );
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
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
        dueDate: null,
      };
      setTodos((prev) => [...prev, newTodoItem]);
      setNewTodo("");
    }
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: "100vh",
          borderRadius: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 2,
            WebkitAppRegion: "drag",
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="h6">할 일 목록</Typography>
        </Box>

        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            WebkitAppRegion: "no-drag",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
          >
            <Tab label={`진행중 (${activeTodos.length})`} />
            <Tab label={`완료됨 (${completedTodos.length})`} />
          </Tabs>
        </Box>

        <Box sx={{ p: 2, flex: 1, overflowY: "auto" }}>
          {activeTab === 0 && (
            <form onSubmit={addTodo}>
              <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="새로운 할 일을 입력하세요"
                  />
                  <IconButton type="submit" color="primary">
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography color="textSecondary">우선순위 선택</Typography>
                  <FormControl size="small" sx={{ flex: 1 }}>
                    <Select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                    >
                      {Object.values(PRIORITY).map((priority) => (
                        <MenuItem
                          key={priority.value}
                          value={priority.value}
                          sx={{ color: priority.color }}
                        >
                          {priority.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Paper>
            </form>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {(activeTab === 0 ? activeTodos : completedTodos)
              .sort((a, b) => {
                if (activeTab === 0) {
                  const priorityOrder = { HIGH: 2, MEDIUM: 1, LOW: 0 };
                  return priorityOrder[b.priority] - priorityOrder[a.priority];
                }
                return new Date(b.completedAt) - new Date(a.completedAt);
              })
              .map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={(id) => {
                    setTodos((prev) =>
                      prev.map((t) =>
                        t.id === id
                          ? {
                              ...t,
                              completed: !t.completed,
                              completedAt: !t.completed
                                ? new Date().toISOString()
                                : null,
                            }
                          : t
                      )
                    );
                  }}
                  onDelete={(id) => {
                    setTodos((prev) => prev.filter((t) => t.id !== id));
                  }}
                  onEdit={(id, updates) => {
                    setTodos((prev) =>
                      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
                    );
                  }}
                />
              ))}
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
