const {
  getProfile,
  updateProfile,
  getAllUsers,
  updateUserById,
  deleteUser,
} = require('./user.controller');
const User = require('../../model/user');
const bcrypt = require('bcryptjs');

jest.mock('../../model/user', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('User Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  it('getProfile returns user without password', async () => {
    const user = { id: 'u1', name: 'Test' };
    const select = jest.fn().mockResolvedValue(user);
    User.findById.mockReturnValue({ select });

    const req = { user: { id: 'u1' } };
    const res = createRes();

    await getProfile(req, res);

    expect(User.findById).toHaveBeenCalledWith('u1');
    expect(select).toHaveBeenCalledWith('-password');
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it('updateProfile updates user and returns result', async () => {
    const updated = { id: 'u1', name: 'New' };
    User.findByIdAndUpdate.mockResolvedValue(updated);

    const req = { user: { id: 'u1' }, body: { name: 'New' } };
    const res = createRes();

    await updateProfile(req, res);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith('u1', req.body, { new: true });
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it('getAllUsers returns list without passwords', async () => {
    const users = [{ id: 'u1' }];
    const select = jest.fn().mockResolvedValue(users);
    User.find.mockReturnValue({ select });

    const req = {};
    const res = createRes();

    await getAllUsers(req, res);

    expect(User.find).toHaveBeenCalledTimes(1);
    expect(select).toHaveBeenCalledWith('-password');
    expect(res.json).toHaveBeenCalledWith(users);
  });

  it('updateUserById hashes password and returns updated user', async () => {
    const updates = { name: 'New', password: 'plain' };
    const updatedUser = { id: 'u1', name: 'New' };
    const select = jest.fn().mockResolvedValue(updatedUser);
    User.findByIdAndUpdate.mockReturnValue({ select });
    bcrypt.hash.mockResolvedValue('hashed');

    const req = { params: { id: 'u1' }, body: updates };
    const res = createRes();

    await updateUserById(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('plain', 10);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { name: 'New', password: 'hashed' },
      { new: true, runValidators: true }
    );
    expect(select).toHaveBeenCalledWith('-password');
    expect(res.json).toHaveBeenCalledWith(updatedUser);
  });

  it('updateUserById returns 404 when user missing', async () => {
    const select = jest.fn().mockResolvedValue(null);
    User.findByIdAndUpdate.mockReturnValue({ select });

    const req = { params: { id: 'missing' }, body: {} };
    const res = createRes();

    await updateUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  it('deleteUser removes user and returns message', async () => {
    User.findByIdAndDelete.mockResolvedValue({ id: 'u1' });

    const req = { params: { id: 'u1' } };
    const res = createRes();

    await deleteUser(req, res);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith('u1');
    expect(res.json).toHaveBeenCalledWith({ message: 'User deleted' });
  });

  it('deleteUser returns 404 when user missing', async () => {
    User.findByIdAndDelete.mockResolvedValue(null);

    const req = { params: { id: 'missing' } };
    const res = createRes();

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });
});
