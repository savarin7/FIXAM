const {
  getNotifications,
  createNotification,
  markAsRead,
} = require('./notification.controller');
const Notification = require('../../model/notification');

jest.mock('../../model/notification', () => ({
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Notification Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  it('getNotifications returns items for user', async () => {
    const notifications = [{ id: 1 }];
    Notification.find.mockResolvedValue(notifications);

    const req = { user: { id: 'u1' } };
    const res = createRes();

    await getNotifications(req, res);

    expect(Notification.find).toHaveBeenCalledWith({ user: 'u1' });
    expect(res.json).toHaveBeenCalledWith(notifications);
  });

  it('createNotification stores and returns 201', async () => {
    const notification = { id: 'n1' };
    Notification.create.mockResolvedValue(notification);

    const req = { body: { user: 'u1', message: 'Hi' } };
    const res = createRes();

    await createNotification(req, res);

    expect(Notification.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(notification);
  });

  it('markAsRead updates notification', async () => {
    const updated = { id: 'n1', read: true };
    Notification.findByIdAndUpdate.mockResolvedValue(updated);

    const req = { params: { id: 'n1' } };
    const res = createRes();

    await markAsRead(req, res);

    expect(Notification.findByIdAndUpdate).toHaveBeenCalledWith('n1', { read: true }, { new: true });
    expect(res.json).toHaveBeenCalledWith(updated);
  });
});
