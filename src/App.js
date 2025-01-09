import React, {useState, useEffect} from "react";
import {Layout, Row, Col, Typography, Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import "antd/dist/reset.css";
import TodoCalendar from "./components/calender/index";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const {Header, Content} = Layout;

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

  const getFilteredTodos = () => {
    const noDateTodos = todos.filter(todo => !todo.startDate && !todo.endDate);

    if (!selectedDate) {
      return noDateTodos;
    }

    const dateStr = selectedDate.format('YYYY-MM-DD');

    const dateTodos = todos.filter(todo => {
      if (!todo.startDate && !todo.endDate) {
        return false;
      }

      if (todo.startDate && todo.endDate) {
        const start = dayjs(todo.startDate).startOf('day');
        const end = dayjs(todo.endDate).startOf('day');
        const current = dayjs(dateStr);
        return current.isBetween(start, end, 'day', '[]');
      }

      if (todo.startDate) {
        return dayjs(todo.startDate).format('YYYY-MM-DD') === dateStr;
      }

      if (todo.endDate) {
        return dayjs(todo.endDate).format('YYYY-MM-DD') === dateStr;
      }

      return false;
    });

    return [...dateTodos, ...noDateTodos];
  };

  const handleAddTodo = (values) => {
    const newTodo = {
      id: Date.now(),
      text: values.text,
      priority: values.priority,
      startDate: values.startDate || null,
      endDate: values.endDate || null,
      completed: false,
      createdAt: new Date().toISOString()
    };

    console.log('새로운 할일:', newTodo);
    setTodos(prev => [...prev, newTodo]);
    setFormVisible(false);
  };

  const handleEditTodo = (values) => {
    setTodos(prev => prev.map(todo =>
        todo.id === editingTodo.id
            ? {
              ...todo,
              text: values.text,
              priority: values.priority,
              startDate: values.startDate,
              endDate: values.endDate
            }
            : todo
    ));
    setEditingTodo(null);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  return (
      <Layout style={{minHeight: "100vh", background: "transparent"}}>
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
          <Typography.Title level={3} style={{margin: 0}}>
            할 일 캘린더
          </Typography.Title>
          <Button
              type="primary"
              icon={<PlusOutlined/>}
              onClick={() => setFormVisible(true)}
              style={{WebkitAppRegion: "no-drag"}}
          >
            새 할 일
          </Button>
        </Header>

        <Content style={{padding: "24px"}}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <TodoCalendar
                  todos={todos}
                  selectedDate={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
              />
            </Col>
            <Col span={24}>
              <TodoList
                  todos={getFilteredTodos()}
                  selectedDate={selectedDate}
                  onToggle={(id) => {
                    setTodos((prev) =>
                        prev.map((todo) =>
                            todo.id === id
                                ? {...todo, completed: !todo.completed}
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
