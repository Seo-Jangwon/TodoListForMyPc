import React, {useEffect} from 'react';
import {Modal, Form, Input, Select, DatePicker, Space, theme} from 'antd';
import dayjs from 'dayjs';
import {sanitizeTodoData, validateTodoInput} from "../utils/formSecurity";

const {Option} = Select;

const TodoForm = ({visible, initialValues = null, onSubmit, onCancel}) => {
  const [form] = Form.useForm();
  const {token} = theme.useToken();

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          startDate: initialValues.startDate ? dayjs(initialValues.startDate)
              : null,
          endDate: initialValues.endDate ? dayjs(initialValues.endDate) : null
        });
      } else {
        form.setFieldsValue({
          priority: 'MEDIUM'
        });
      }
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // 입력값 검증
      const errors = validateTodoInput(values);
      if (Object.keys(errors).length > 0) {
        // 에러가 있으면 폼에 표시
        form.setFields(
            Object.entries(errors).map(([field, error]) => ({
              name: field,
              errors: [error]
            }))
        );
        return;
      }

      // 데이터 정제
      const sanitizedData = sanitizeTodoData(values);

      // 모든 검증 통과 시 제출
      onSubmit(sanitizedData);
      form.resetFields();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Form validation failed:', error);
      }
    }
  };

  return (
      <Modal
          title={initialValues ? "할 일 수정" : "새 할 일"}
          open={visible}
          onOk={handleSubmit}
          onCancel={() => {
            form.resetFields();
            onCancel();
          }} styles={{
        content: {
          background: token.colorBgContainer,
        },
        header: {
          background: token.colorBgContainer,
        },
        body: {
          background: token.colorBgContainer,
        },
        footer: {
          background: token.colorBgContainer,
        }
      }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
              name="text"
              label="할 일"
              rules={[{required: true, message: '할 일을 입력해주세요'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
              name="priority"
              label="우선순위"
              initialValue="MEDIUM"
          >
            <Select>
              <Option value="HIGH">높음</Option>
              <Option value="MEDIUM">보통</Option>
              <Option value="LOW">낮음</Option>
            </Select>
          </Form.Item>

          <Space size={12} style={{width: '100%'}}>
            <Form.Item
                name="startDate"
                label="시작 시간"
                dependencies={['endDate']}
                validateTrigger={['onChange', 'onBlur']}
            >
              <DatePicker
                  inputReadOnly={true}
                  showTime={{format: 'HH:mm'}}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="시작 시간 선택"
                  onChange={(date) => {
                    // 시작 시간이 선택되면 종료 시간도 자동으로 1시간 뒤로 설정
                    if (date) {
                      const endDate = form.getFieldValue('endDate');
                      if (!endDate || endDate.isBefore(date)) {
                        form.setFieldsValue({
                          endDate: date.add(1, 'hour')
                        });
                      }
                      // 시작 시간이 설정되면 시작 시간 오류 지우기
                      form.setFields([{name: 'startDate', errors: []}]);
                    } else {
                      // 시작 시간이 삭제되었고 종료 시간이 있다면 에러 표시
                      const endDate = form.getFieldValue('endDate');
                      if (endDate) {
                        form.setFields([{
                          name: 'startDate',
                          errors: ['시작 시간을 선택해주세요']
                        }]);
                      }
                    }
                  }}
                  style={{width: '100%'}}
              />
            </Form.Item>

            <Form.Item
                name="endDate"
                label="종료 시간"
                dependencies={['startDate']}
                validateTrigger={['onChange', 'onBlur']}
            >
              <DatePicker
                  inputReadOnly={true}
                  showTime={{format: 'HH:mm'}}
                  format="YYYY-MM-DD HH:mm"
                  placeholder="종료 시간 선택"
                  onChange={(date) => {
                    // 종료 시간이 선택되었는데 시작 시간이 없다면 에러 표시
                    if (date && !form.getFieldValue('startDate')) {
                      form.setFields([{
                        name: 'startDate',
                        errors: ['시작 시간을 선택해주세요']
                      }]);
                    } else {
                      // 종료 시간이 선택되어 있고 시작 시간이 설정되면 경고 지우기
                      if (date && form.getFieldValue('startDate')) {
                        form.setFields([{name: 'startDate', errors: []}]); // 시작 시간 오류 제거
                      }
                    }

                    // 종료 시간이 지워졌을 때 경고 메시지 초기화
                    if (!date) {
                      form.setFields([{name: 'endDate', errors: []}]); // 종료 시간 오류 제거
                    }
                  }}
                  disabledDate={(current) => {
                    const startDate = form.getFieldValue('startDate');
                    return startDate && current && current.isBefore(startDate);
                  }}
                  style={{width: '100%'}}
              />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
  );
};

export default TodoForm;