import React from "react";
import {List, Typography, Flex} from "antd";
import TodoItem from "./TodoItem";
import dayjs from "dayjs";

const {Title} = Typography;

const TodoList = ({todos, selectedDate, onToggle, onEdit, onDelete}) => {
  // 날짜가 있는 할 일과 없는 할일 분리
  const datelessTodos = todos.filter(todo => !todo.startDate && !todo.endDate);
  const datedTodos = todos.filter(todo => {
    if (!todo.startDate && !todo.endDate) {
      return false;
    }

    if (!selectedDate) {
      return false;
    }

    const selectedDateStr = selectedDate.format('YYYY-MM-DD');

    if (todo.startDate && todo.endDate) {
      const start = dayjs(todo.startDate).startOf('day');
      const end = dayjs(todo.endDate).startOf('day');
      const selected = dayjs(selectedDateStr).startOf('day');
      return selected.isSameOrAfter(start) && selected.isSameOrBefore(end);
    }

    if (todo.startDate) {
      return dayjs(todo.startDate).format('YYYY-MM-DD') === selectedDateStr;
    }

    if (todo.endDate) {
      return dayjs(todo.endDate).format('YYYY-MM-DD') === selectedDateStr;
    }

    return false;
  });

  // 우선순위, 날짜로 정렬
  const sortByPriority = (todos) => {
    return [...todos].sort((a, b) => {
      const priorityOrder = {HIGH: 3, MEDIUM: 2, LOW: 1};
      if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (a.startDate && b.startDate) {
        return dayjs(a.startDate).diff(dayjs(b.startDate));
      }
      return 0;
    });
  };

  return (
      <Flex vertical gap="large">
        <div>
          <Title level={4}>
            {selectedDate ? selectedDate.format('YYYY년 M월 D일') : '전체'} 할 일
          </Title>
          <List
              dataSource={sortByPriority(datedTodos)}
              renderItem={todo => (
                  <TodoItem
                      todo={todo}
                      onToggle={onToggle}
                      onEdit={onEdit}
                      onDelete={onDelete}
                  />
              )}
              locale={{
                emptyText: '이 날의 할 일이 없습니다.'
              }}
          />
        </div>

        <div>
          <Title level={4}>날짜 미지정 할 일</Title>
          <List
              dataSource={sortByPriority(datelessTodos)}
              renderItem={todo => (
                  <TodoItem
                      todo={todo}
                      onToggle={onToggle}
                      onEdit={onEdit}
                      onDelete={onDelete}
                  />
              )}
              locale={{
                emptyText: '날짜 미지정 할 일이 없습니다.'
              }}
          />
        </div>
      </Flex>
  );
};

export default TodoList;