import {
    createError
} from 'apollo-errors';

const UnauthorizedError = createError('UnauthorizedError', {
    message: 'UnauthorizedError',
    data: {
        status: 401
    }
});

export default UnauthorizedError;