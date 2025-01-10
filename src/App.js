import React, {useState, useEffect} from "react";
import {
  Layout,
  Flex,
  Button,
  Space,
  ConfigProvider,
  Tooltip
} from "antd";
import {
  CloseOutlined,
  MoreOutlined, PlusCircleFilled,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import TodoCalendar from "./components/calender/index";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import defaultTheme from "./constants/defaultTheme";

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
    const noDateTodos = todos.filter(
        (todo) => !todo.startDate && !todo.endDate
    );

    if (!selectedDate) {
      return noDateTodos;
    }

    const dateStr = selectedDate.format("YYYY-MM-DD");

    const dateTodos = todos.filter((todo) => {
      if (!todo.startDate && !todo.endDate) {
        return false;
      }

      if (todo.startDate && todo.endDate) {
        const start = dayjs(todo.startDate).startOf("day");
        const end = dayjs(todo.endDate).startOf("day");
        const current = dayjs(dateStr);
        return current.isBetween(start, end, "day", "[]");
      }

      if (todo.startDate) {
        return dayjs(todo.startDate).format("YYYY-MM-DD") === dateStr;
      }

      if (todo.endDate) {
        return dayjs(todo.endDate).format("YYYY-MM-DD") === dateStr;
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
      createdAt: new Date().toISOString(),
    };

    console.log("새로운 할 일:", newTodo);
    setTodos((prev) => [...prev, newTodo]);
    setFormVisible(false);
  };

  const handleEditTodo = (values) => {
    setTodos((prev) =>
        prev.map((todo) =>
            todo.id === editingTodo.id
                ? {
                  ...todo,
                  text: values.text,
                  priority: values.priority,
                  startDate: values.startDate,
                  endDate: values.endDate,
                }
                : todo
        )
    );
    setEditingTodo(null);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const theme = defaultTheme.token;

  return (
      <ConfigProvider
          theme={{
            ...defaultTheme,
          }}>
        <Layout
            style={{
              padding: "10px 5px",
              minHeight: "100vh",
            }}>
          <Header
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "transparent",
                width: "100%",
                WebkitAppRegion: "drag",
                padding: "0 20px",
                margin: "0 auto",
              }}>
            <Tooltip title="할 일 추가" placement="bottom">
              <Button
                  icon={<PlusCircleFilled style={{fontSize: '24px'}}/>}
                  onClick={() => setFormVisible(true)}
                  style={{
                    WebkitAppRegion: "no-drag",
                    color: theme.colorTextSecondary,
                    background: 'transparent',
                    border: "none",
                  }}
              />
            </Tooltip>

            <Space style={{flex: 1}}/>

            <Space>
              <Tooltip title="설정" placement="bottom">
                <Button
                    type="text"
                    icon={<MoreOutlined style={{fontSize: '22px'}}/>}
                    style={{
                      WebkitAppRegion: "no-drag",
                      color: theme.colorTextSecondary,
                    }}
                />
              </Tooltip>

              <Tooltip title="닫기" placement="bottom">
                <Button
                    type="text"
                    icon={<CloseOutlined style={{fontSize: '22px'}}/>}
                    onClick={() => window.electron.window.close()}
                    style={{
                      WebkitAppRegion: "no-drag",
                      color: theme.colorTextSecondary
                    }}
                />
              </Tooltip>
            </Space>
          </Header>

          <Content style={{
            padding: "20px"
          }}>
            <Flex
                gap="large"
                vertical
                style={{
                  borderRadius: theme.borderRadius,
                }}>
              <TodoCalendar
                  todos={todos}
                  selectedDate={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
              />

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
            </Flex>
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
      </ConfigProvider>
  );
};

export default App;
