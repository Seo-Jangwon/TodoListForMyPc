import React from "react";
import { List, Checkbox, Button, Typography, Dropdown, Space } from "antd";
import { MoreOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;

const PRIORITY_COLORS = {
  HIGH: "#f5222d",
  MEDIUM: "#faad14",
  LOW: "#52c41a",
};

const PRIORITY_LABELS = {
  HIGH: "높음",
  MEDIUM: "보통",
  LOW: "낮음",
};

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const menuItems = {
    items: [
      {
        key: "1",
        label: "수정",
        onClick: () => onEdit(todo),
      },
      {
        key: "2",
        label: "삭제",
        danger: true,
        onClick: () => onDelete(todo.id),
      },
    ],
  };

  return (
    <List.Item
      style={{
        backgroundColor: todo.completed ? "#f5f5f5" : "white",
        borderLeft: `3px solid ${PRIORITY_COLORS[todo.priority]}`,
        marginBottom: 8,
        padding: 12,
        borderRadius: 4,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
        <Space
          direction="vertical"
          size={0}
          style={{ flex: 1, marginLeft: 12 }}
        >
          <Text
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#999" : "inherit",
            }}
          >
            {todo.text}
          </Text>
          <Space size={8}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {PRIORITY_LABELS[todo.priority]}
            </Text>
            {todo.dueDate && (
              <Text type="secondary" style={{ fontSize: 12 }}>
                <CalendarOutlined style={{ marginRight: 4 }} />
                {dayjs(todo.dueDate).format("YYYY-MM-DD HH:mm")}
              </Text>
            )}
          </Space>
        </Space>
        <Dropdown menu={menuItems} placement="bottomRight" trigger={["click"]}>
          <Button
            type="text"
            icon={<MoreOutlined />}
            style={{ marginLeft: 8 }}
          />
        </Dropdown>
      </div>
    </List.Item>
  );
};

export default TodoItem;
