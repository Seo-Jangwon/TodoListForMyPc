import React from 'react';
import {Tooltip} from 'antd';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const priorityColors = {
  HIGH: '#ff4d4f',
  MEDIUM: '#faad14',
  LOW: '#52c41a'
};

const priorityLabels = {
  HIGH: '높음',
  MEDIUM: '보통',
  LOW: '낮음'
};

const TodoDots = ({todos, date}) => {
  const dateStr = date.format('YYYY-MM-DD');
  const todayTodos = todos.filter(todo => {
    if (!todo.startDate || !todo.endDate) {
      return false;
    }

    const currentDate = dayjs(dateStr);
    const startDate = dayjs(todo.startDate).startOf('day');
    const endDate = dayjs(todo.endDate).startOf('day');

    return currentDate.isBetween(startDate, endDate, 'day', '[]');
  });

  // 우선순위별로 그룹화
  const groupedTodos = {
    HIGH: todayTodos.filter(todo => todo.priority === 'HIGH'),
    MEDIUM: todayTodos.filter(todo => todo.priority === 'MEDIUM'),
    LOW: todayTodos.filter(todo => todo.priority === 'LOW')
  };

  return (
      <Tooltip title={
        <div>
          {Object.entries(groupedTodos).map(([priority, todos]) => {
            if (todos.length === 0) {
              return null;
            }
            return (
                <div key={priority}>
                  {`${priorityLabels[priority]}: ${todos.length}개`}
                  {todos.map(todo => (
                      <div key={todo.id}
                           style={{paddingLeft: '8px', fontSize: '12px'}}>
                        - {todo.text}
                      </div>
                  ))}
                </div>
            );
          })}
        </div>
      }>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3px',
          padding: '2px'
        }}>
          {Object.entries(groupedTodos).map(([priority, todos]) => (
              todos.length > 0 && (
                  <div key={priority} style={{display: 'flex', gap: '2px'}}>
                    {[...Array(todos.length)].map((_, idx) => (
                        <span
                            key={idx}
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: priorityColors[priority],
                              display: 'inline-block'
                            }}
                        />
                    ))}
                  </div>
              )
          ))}
        </div>
      </Tooltip>
  );
};

export default TodoDots;