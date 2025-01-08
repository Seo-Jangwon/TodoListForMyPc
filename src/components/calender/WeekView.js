import React from 'react';
import { Badge, Tooltip, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const WeekView = ({ todos, currentDate, setCurrentDate, onSelect }) => {
  const getWeekDays = () => {
    const startOfWeek = currentDate.startOf('week');
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
  };

  const navigateWeek = (direction) => {
    setCurrentDate(prev => prev.add(direction * 7, 'day'));
  };

  const dateCellRender = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const todayTodos = todos.filter(todo => {
      if (!todo.dueDate) return false;
      return dayjs(todo.dueDate).format('YYYY-MM-DD') === dateStr;
    });

    const groupedTodos = {
      HIGH: todayTodos.filter(todo => todo.priority === 'HIGH'),
      MEDIUM: todayTodos.filter(todo => todo.priority === 'MEDIUM'),
      LOW: todayTodos.filter(todo => todo.priority === 'LOW')
    };

    return (
      <ul className="events">
        {Object.entries(groupedTodos).map(([priority, todos]) => {
          if (todos.length === 0) return null;
          return (
            <Tooltip 
              key={priority} 
              title={
                <div>
                  {todos.map(todo => (
                    <div key={todo.id}>{todo.text}</div>
                  ))}
                </div>
              }
            >
              <li>
                <Badge 
                  status={
                    priority === 'HIGH' ? 'error' :
                    priority === 'MEDIUM' ? 'warning' : 'success'
                  }
                  text={`${todos.length}개`}
                />
              </li>
            </Tooltip>
          );
        })}
      </ul>
    );
  };

  const weekDays = getWeekDays();
  const today = dayjs();

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 16 
      }}>
        <Button icon={<LeftOutlined />} onClick={() => navigateWeek(-1)} />
        <span>{currentDate.format('YYYY년 MM월')}</span>
        <Button icon={<RightOutlined />} onClick={() => navigateWeek(1)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
        {weekDays.map((date) => (
          <div
            key={date.format()}
            style={{
              padding: '12px',
              border: '1px solid #f0f0f0',
              borderRadius: '4px',
              cursor: 'pointer',
              background: date.format('YYYY-MM-DD') === today.format('YYYY-MM-DD') 
                ? '#e6f7ff' 
                : 'white',
            }}
            onClick={() => onSelect(date)}
          >
            <div style={{ 
              marginBottom: 8,
              fontWeight: date.format('YYYY-MM-DD') === today.format('YYYY-MM-DD') ? 'bold' : 'normal'
            }}>
              <div>{date.format('ddd')}</div>
              <div>{date.format('D')}</div>
            </div>
            {dateCellRender(date)}
          </div>
        ))}
      </div>
      <style jsx>{`
        .events {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default WeekView;