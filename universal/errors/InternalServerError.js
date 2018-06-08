import { createError } from 'apollo-errors';

const InternalServerError = createError('InternalServerError', {
    message: 'Internal Server Error',
    data: {
        status: 500,
    },
});

export default InternalServerError;
