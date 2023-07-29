import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/recipes';

describe('/api/recipes', () => {
  test('GET not allowed (405)', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});