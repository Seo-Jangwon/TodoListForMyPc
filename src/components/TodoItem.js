import React from 'react';
import { PRIORITY } from '../constants/priority';

const TodoItem = ({ todo, onToggle, onDelete, onPriorityChange, showPrioritySelect = true }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      marginBottom: '8px',
      backgroundColor: 'white',
      borderRadius: '6px',
      borderLeft: `4px solid ${PRIORITY[todo.priority]?.color || '#d1d5db'}`,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
    }}
  >
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={onToggle}
      style={{ marginRight: '12px' }}
    />
    <div style={{ flex: 1 }}>
      <span style={{ 
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? '#9ca3af' : '#1f2937'
      }}>
        {todo.text}
      </span>
      {todo.completedAt && (
        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
          완료: {new Date(todo.completedAt).toLocaleString('ko-KR')}
        </div>
      )}
    </div>
    {showPrioritySelect && (
      <select
        value={todo.priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        style={{
          marginLeft: '8px',
          padding: '2px',
          border: '1px solid #e2e8f0',
          borderRadius: '4px'
        }}
      >
        {Object.values(PRIORITY).map((priority) => (
          <option key={priority.value} value={priority.value}>
            {priority.label}
          </option>
        ))}
      </select>
    )}
    <button
      onClick={onDelete}
      style={{
        marginLeft: '8px',
        padding: '4px 8px',
        border: 'none',
        background: 'none',
        color: '#9ca3af',
        cursor: 'pointer'
      }}
    >
      ✕
    </button>
  </div>
);

export default TodoItem;