import React from "react";
import { List, Typography, Divider } from "antd";
import TodoItem from "./TodoItem";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const TodoList = ({ todos, selectedDate, onToggle, onEdit, onDelete }) => {
  // 선택된 날짜의 할 일과 날짜 미지정 할 일 분리
  const filteredTodos = todos.filter((todo) => {
    if (!todo.dueDate) return false;
    return (
      dayjs(todo.dueDate).format("YYYY-MM-DD") ===
      selectedDate?.format("YYYY-MM-DD")
    );
  });

  const undatedTodos = todos.filter((todo) => !todo.dueDate);

  // 우선순위와 마감시간으로 정렬
  const sortTodos = (todoList) => {
    const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    return [...todoList].sort((a, b) => {
      // 먼저 우선순위로 정렬
      if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      // 우선순위가 같으면 마감시간으로 정렬
      if (a.dueDate && b.dueDate) {
        return dayjs(a.dueDate).diff(dayjs(b.dueDate));
      }
      // 마감시간이 없는 항목은 뒤로
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return 0;
    });
  };

  const sortedDateTodos = sortTodos(filteredTodos);
  const sortedUndatedTodos = sortTodos(undatedTodos);

  return (
    <div>
      {selectedDate && (
        <>
          <Title level={4}>{selectedDate.format("YYYY년 MM월 DD일")}</Title>
          <List
            dataSource={sortedDateTodos}
            renderItem={(todo) => (
              <TodoItem
                todo={todo}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
            locale={{ emptyText: "이 날의 할 일이 없습니다." }}
          />
        </>
      )}

      {sortedUndatedTodos.length > 0 && (
        <>
          <Divider />
          <Title level={4}>날짜 미지정 할 일</Title>
          <Text type="secondary" style={{ marginBottom: 16, display: "block" }}>
            마감일이 지정되지 않은 할 일입니다
          </Text>
          <List
            dataSource={sortedUndatedTodos}
            renderItem={(todo) => (
              <TodoItem
                todo={todo}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
          />
        </>
      )}
    </div>
  );
};

export default TodoList;
