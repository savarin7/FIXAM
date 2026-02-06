const { getAllAdmins, createAdmin, updateAdmin, deleteAdmin } = require('./admin.controller');
const Admin = require('../../model/admin');

jest.mock('../../model/admin', () => ({
  find: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

const createRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Admin Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAllAdmins returns populated admins', async () => {
    const mockAdmins = [{ id: 1 }];
    const populate = jest.fn().mockResolvedValue(mockAdmins);
    Admin.find.mockReturnValue({ populate });

    const req = {};
    const res = createRes();

    await getAllAdmins(req, res);

    expect(Admin.find).toHaveBeenCalledTimes(1);
    expect(populate).toHaveBeenCalledWith('user', '-password');
    expect(res.json).toHaveBeenCalledWith(mockAdmins);
  });

  it('createAdmin returns 201 with new admin', async () => {
    const mockAdmin = { id: 'a1' };
    Admin.create.mockResolvedValue(mockAdmin);

    const req = { body: { user: 'u1' } };
    const res = createRes();

    await createAdmin(req, res);

    expect(Admin.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockAdmin);
  });

  it('updateAdmin returns updated admin', async () => {
    const updated = { id: 'a1', permissions: [] };
    Admin.findByIdAndUpdate.mockResolvedValue(updated);

    const req = { params: { id: 'a1' }, body: { permissions: ['p'] } };
    const res = createRes();

    await updateAdmin(req, res);

    expect(Admin.findByIdAndUpdate).toHaveBeenCalledWith('a1', req.body, { new: true });
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it('deleteAdmin removes admin and confirms', async () => {
    Admin.findByIdAndDelete.mockResolvedValue();

    const req = { params: { id: 'a1' } };
    const res = createRes();

    await deleteAdmin(req, res);

    expect(Admin.findByIdAndDelete).toHaveBeenCalledWith('a1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Admin deleted' });
  });
});
