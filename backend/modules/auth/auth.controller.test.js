const { register, login } = require('./auth.controller');
const User = require('../../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../../model/user', () => ({
  create: jest.fn(),
  findOne: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  describe('register', () => {
    it('creates user, hashes password, and returns token', async () => {
      const req = { body: { name: 'A', email: 'a@test.com', password: 'pw', role: 'customer' } };
      const res = createRes();
      const mockUser = { _id: '1', role: 'customer' };

      bcrypt.hash.mockResolvedValue('hashed');
      User.create.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue('token123');

      await register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith('pw', 10);
      expect(User.create).toHaveBeenCalledWith({ ...req.body, password: 'hashed' });
      expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser._id, role: mockUser.role }, 'test-secret');
      expect(res.json).toHaveBeenCalledWith({ user: mockUser, token: 'token123' });
    });

    it('returns 500 when creation fails', async () => {
      const req = { body: { name: 'A', email: 'a@test.com', password: 'pw', role: 'customer' } };
      const res = createRes();
      bcrypt.hash.mockResolvedValue('hashed');
      User.create.mockRejectedValue(new Error('fail'));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'fail' });
    });
  });

  describe('login', () => {
    it('logs in with correct credentials', async () => {
      const req = { body: { email: 'a@test.com', password: 'pw' } };
      const res = createRes();
      const mockUser = { _id: '1', role: 'admin', password: 'hashed' };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token456');

      await login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'a@test.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('pw', 'hashed');
      expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser._id, role: mockUser.role }, 'test-secret');
      expect(res.json).toHaveBeenCalledWith({ user: mockUser, token: 'token456' });
    });

    it('returns 400 when user not found', async () => {
      const req = { body: { email: 'missing@test.com', password: 'pw' } };
      const res = createRes();
      User.findOne.mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('returns 400 when password invalid', async () => {
      const req = { body: { email: 'a@test.com', password: 'pw' } };
      const res = createRes();
      User.findOne.mockResolvedValue({ password: 'hashed' });
      bcrypt.compare.mockResolvedValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid password' });
    });

    it('returns 500 on unexpected error', async () => {
      const req = { body: { email: 'a@test.com', password: 'pw' } };
      const res = createRes();
      User.findOne.mockRejectedValue(new Error('db down'));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'db down' });
    });
  });
});
