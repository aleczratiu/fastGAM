import { createError } from 'apollo-errors';

const NotFoundError = createError('NotFoundError', {
    message: 'Not found',
    data: {
        status: 404
    }
});

export default NotFoundError;
