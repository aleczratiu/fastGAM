import { createError } from 'apollo-errors';
 
const BadRequestError = createError('BadRequestError', {
  message: 'Bad request',
  data: {
      status: 400,
  }
});

export default BadRequestError;
