import React, { useState, useEffect } from "react";
import { styles } from "./styles/common";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Flex,
  Input,
  Select,
  Space,
} from "antd";
import { PlusSquare } from "lucide-react";
import PriorityCircle from "./components/PriorityCircle";

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

  // 할 일 추가 모달
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);

  const showAddTodoModal = () => {
    setIsAddTodoModalOpen(true);
  };

  const hideAddTodoModal = () => {
    setIsAddTodoModalOpen(false);
  };

  // 우선순위 목록
  const priorityItems = {
    items: [
      {
        value: PRIORITY.HIGH.value,
        label: <PriorityCircle priority="priority-high-background" />,
        onClick: () => setSelectedPriority(PRIORITY.HIGH.value),
      },
      {
        value: PRIORITY.MEDIUM.value,
        label: <PriorityCircle priority="priority-medium-background" />,
        onClick: () => setSelectedPriority(PRIORITY.MEDIUM.value),
      },
      {
        value: PRIORITY.LOW.value,
        label: <PriorityCircle priority="priority-low-background" />,
        onClick: () => setSelectedPriority(PRIORITY.LOW.value),
      },
    ],
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Pretendard",
        },
      }}>
      <Flex gap="middle" vertical style={styles.container}>
        {/* 헤더 */}
        <Flex className="header accent" justify="space-between" align="center">
          <h1 style={{ fontSize: "1rem" }}>TODO</h1>
          <PlusSquare
            size={20}
            strokeWidth={2}
            stroke="#242424"
            fill="#FFB2F9"
          />
        </Flex>

        {/* 새로운 할 일 입력란 */}
        <Space
          className="rounded input-box-background"
          direction="vertical"
          style={{
            display: "flex",
            gap: 5,
            padding: "0.65rem 0.5rem",
          }}>
          <Space.Compact block>
            {/* 우선순위 드롭다운 */}
            <Select
              defaultValue={PRIORITY.MEDIUM.value}
              onChange={(value) => setSelectedPriority(value)}
              options={[
                {
                  value: PRIORITY.HIGH.value,
                  label: (
                    <PriorityCircle
                      priority={PRIORITY.HIGH.value.toLowerCase()}
                    />
                  ),
                },
                {
                  value: PRIORITY.MEDIUM.value,
                  label: (
                    <PriorityCircle
                      priority={PRIORITY.MEDIUM.value.toLowerCase()}
                    />
                  ),
                },
                {
                  value: PRIORITY.LOW.value,
                  label: (
                    <PriorityCircle
                      priority={PRIORITY.LOW.value.toLowerCase()}
                    />
                  ),
                },
              ]}
            />
            {/* 내용 */}
            <Input
              placeholder="새로운 할 일"
              style={{
                fontWeight: 500,
              }}
            />
          </Space.Compact>

          {/* 날짜 */}
          <DatePicker.RangePicker
            placeholder={["시작", "종료"]}
            allowEmpty={[false, false]}
          />

          {/* 버튼 */}
          <Space
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 5,
              paddingTop: "0.4rem",
            }}>
            <Button
              size="small"
              style={{
                ...styles.button,
                background: "var(--color-tabSelected)",
                fontWeight: 500,
              }}>
              저장
            </Button>
            <Button type="text" size="small" style={{ ...styles.button }}>
              취소
            </Button>
          </Space>
        </Space>
      </Flex>
    </ConfigProvider>
  );
};

export default App;
