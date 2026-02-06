const { getProfile, updateProfile } = require('./user.controller');
const User = require('../../model/user');

jest.mock('../../model/user', () => ({
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
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
});
