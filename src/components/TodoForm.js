import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const TodoForm = ({ visible, initialValues = null, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        dueDate: initialValues.dueDate ? dayjs(initialValues.dueDate) : null,
      });
    }
  }, [visible, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const submitData = {
        ...values,
        dueDate: values.dueDate ? values.dueDate.toISOString() : null,
      };
      onSubmit(submitData);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={initialValues ? "할 일 수정" : "새 할 일"}
      open={visible}
      onOk={handleSubmit}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="text"
          label="할 일"
          rules={[{ required: true, message: "할 일을 입력해주세요" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="priority" label="우선순위" initialValue="MEDIUM">
          <Select>
            <Option value="HIGH">높음</Option>
            <Option value="MEDIUM">보통</Option>
            <Option value="LOW">낮음</Option>
          </Select>
        </Form.Item>
        <Form.Item name="dueDate" label="마감일">
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoForm;
