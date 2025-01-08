import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "antd/dist/reset.css";
import TodoCalendar from "./components/calender/index";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const { Header, Content } = Layout;

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [formVisible, setFormVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (values) => {
    const newTodo = {
      id: Date.now(),
      ...values,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
    setFormVisible(false);
  };

  const handleEditTodo = (values) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, ...values } : todo
      )
    );
    setEditingTodo(null);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "transparent" }}>
      <Header
        style={{
          background: "transparent",
          backgroundColor: "white",
          backdropFilter: "blur(10px)",
          WebkitAppRegion: "drag",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          할 일 캘린더
        </Typography.Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setFormVisible(true)}
          style={{ WebkitAppRegion: "no-drag" }}
        >
          새 할 일
        </Button>
      </Header>

      <Content style={{ padding: "24px" }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Col span={24}>
              <TodoCalendar
                todos={todos}
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
              />
            </Col>
          </Col>
          <Col span={24}>
            <TodoList
              todos={todos}
              selectedDate={selectedDate}
              onToggle={(id) => {
                setTodos((prev) =>
                  prev.map((todo) =>
                    todo.id === id
                      ? { ...todo, completed: !todo.completed }
                      : todo
                  )
                );
              }}
              onEdit={handleEdit}
              onDelete={(id) => {
                setTodos((prev) => prev.filter((todo) => todo.id !== id));
              }}
            />
          </Col>
        </Row>
      </Content>

      <TodoForm
        visible={formVisible || !!editingTodo}
        initialValues={editingTodo}
        onSubmit={editingTodo ? handleEditTodo : handleAddTodo}
        onCancel={() => {
          setFormVisible(false);
          setEditingTodo(null);
        }}
      />
    </Layout>
  );
};

export default App;
