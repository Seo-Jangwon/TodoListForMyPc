import dayjs from 'dayjs';

const VALIDATION_RULES = {
  TEXT: {
    MAX_LENGTH: 3000,
    MIN_LENGTH: 1
  },
  PRIORITY: ['HIGH', 'MEDIUM', 'LOW']
};

// XSS 방지
export const sanitizeText = (text) => {
  if (typeof text !== 'string') {
    return '';
  }

  return text
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#x27;')
  .replace(/\//g, '&#x2F;')
  .trim();
};

// 입력값 검증
export const validateTodoInput = (values) => {
  const errors = {};

  // 텍스트 검증
  if (!values.text) {
    errors.text = '할 일을 입력해주세요';
  } else {
    const sanitizedText = sanitizeText(values.text);
    if (sanitizedText.length > VALIDATION_RULES.TEXT.MAX_LENGTH) {
      errors.text = `할 일은 ${VALIDATION_RULES.TEXT.MAX_LENGTH}자를 넘을 수 없습니다`;
    }
    if (sanitizedText.length < VALIDATION_RULES.TEXT.MIN_LENGTH) {
      errors.text = '할 일을 입력해주세요';
    }
  }

  // 우선순위 검증
  if (values.priority && !VALIDATION_RULES.PRIORITY.includes(values.priority)) {
    errors.priority = '올바른 우선순위를 선택해주세요';
  }

  // 날짜 검증 - 둘 다 없으면 패스, 하나만 있으면 에러
  if ((values.startDate && !values.endDate) || (!values.startDate
      && values.endDate)) {
    if (!values.endDate) {
      errors.endDate = '종료 시간을 선택해주세요';
    } else {
      errors.startDate = '시작 시간을 선택해주세요';
    }
  }

  // 둘 다 있는 경우에만 검증
  if (values.startDate && values.endDate) {
    // 날짜 형식 검증
    if (!dayjs(values.startDate).isValid()) {
      errors.startDate = '올바른 시작 날짜를 선택해주세요';
    }
    if (!dayjs(values.endDate).isValid()) {
      errors.endDate = '올바른 종료 날짜를 선택해주세요';
    }

    // 시작일이 종료일보다 늦음
    if (dayjs(values.startDate).isAfter(dayjs(values.endDate))) {
      errors.endDate = '종료 시간은 시작 시간보다 늦어야 합니다';
    }
  }

  return errors;
};

// 폼 제출 전 정제
export const sanitizeTodoData = (values) => {
  return {
    ...values,
    text: sanitizeText(values.text),
    // 날짜는 둘 다 있거나 둘 다 없어야 함
    startDate: values.startDate && values.endDate ? dayjs(
        values.startDate).format() : null,
    endDate: values.startDate && values.endDate ? dayjs(values.endDate).format()
        : null,
    priority: VALIDATION_RULES.PRIORITY.includes(values.priority)
        ? values.priority
        : 'MEDIUM'
  };
};