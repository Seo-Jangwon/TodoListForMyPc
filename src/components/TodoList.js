import React from "react";
import {List, Typography} from "antd";
import TodoItem from "./TodoItem";
import dayjs from "dayjs";

const {Title} = Typography;

const TodoList = ({todos, selectedDate, onToggle, onEdit, onDelete}) => {
  const filteredTodos = todos.filter(todo => {
    if (!todo.startDate && !todo.endDate) {
      // 날짜 미지정 할일은 항상 표시
      return true;
    }

    if (!selectedDate) {
      return false;
    }

    const selectedDateStr = selectedDate.format('YYYY-MM-DD');

    // 시작일과 종료일이 모두 있는 경우
    if (todo.startDate && todo.endDate) {
      const start = dayjs(todo.startDate).startOf('day');
      const end = dayjs(todo.endDate).startOf('day');
      const selected = dayjs(selectedDateStr).startOf('day');
      return selected.isSameOrAfter(start) && selected.isSameOrBefore(end);
    }

    // 시작일만 있는 경우
    if (todo.startDate) {
      return dayjs(todo.startDate).format('YYYY-MM-DD') === selectedDateStr;
    }

    // 종료일만 있는 경우
    if (todo.endDate) {
      return dayjs(todo.endDate).format('YYYY-MM-DD') === selectedDateStr;
    }

    return false;
  });

  // 우선순위, 날짜로 정렬
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const priorityOrder = {HIGH: 3, MEDIUM: 2, LOW: 1};
    if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (a.startDate && b.startDate) {
      return dayjs(a.startDate).diff(dayjs(b.startDate));
    }
    return 0;
  });

  return (
      <div>
        <Title level={4}>
          {selectedDate ? selectedDate.format('YYYY년 MM월 DD일') : '날짜 미지정 할일'}의 할
          일
        </Title>
        <List
            dataSource={sortedTodos}
            renderItem={todo => (
                <TodoItem
                    todo={todo}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            )}
            locale={{
              emptyText: selectedDate
                  ? '이 날의 할 일이 없습니다.'
                  : '날짜 미지정 할 일이 없습니다.'
            }}
        />
      </div>
  );
};

export default TodoList;