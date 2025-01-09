import React from 'react';
import {Button} from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import TodoDots from "../TodoDots";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

const WeekView = ({todos, currentDate, setCurrentDate, onSelect}) => {
  const getWeekDays = () => {
    const startOfWeek = currentDate.startOf('week');
    return Array.from({length: 7}, (_, i) => startOfWeek.add(i, 'day'));
  };

  const navigateWeek = (direction) => {
    setCurrentDate(prev => prev.add(direction * 7, 'day'));
  };

  const dateCellRender = (date) => {
    return <TodoDots todos={todos} date={date}/>;
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
          <Button icon={<LeftOutlined/>} onClick={() => navigateWeek(-1)}/>
          <span>{currentDate.format('YYYY년 MM월')}</span>
          <Button icon={<RightOutlined/>} onClick={() => navigateWeek(1)}/>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 8
        }}>
          {weekDays.map((date) => {
            const isToday = date.format('YYYY-MM-DD') === today.format(
                'YYYY-MM-DD');
            return (
                <div
                    key={date.format()}
                    style={{
                      padding: '12px',
                      border: '1px solid #f0f0f0',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      backgroundColor: isToday ? '#e6f7ff' : 'white',
                    }}
                    onClick={() => onSelect(date)}
                >
                  <div style={{
                    marginBottom: '8px',
                    fontWeight: isToday ? '600' : '400'
                  }}>
                    <div>{date.format('ddd')}</div>
                    <div>{date.format('D')}</div>
                  </div>
                  {dateCellRender(date)}
                </div>
            );
          })}
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