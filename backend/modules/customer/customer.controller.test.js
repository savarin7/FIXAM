const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('./customer.controller');
const Customer = require('../../model/customer');

jest.mock('../../model/customer', () => ({
  find: jest.fn(),
  findById: jest.fn(),
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

describe('Customer Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getAllCustomers', () => {
    it('returns customers with populated user', async () => {
      const customers = [{ id: 1 }];
      const populate = jest.fn().mockResolvedValue(customers);
      Customer.find.mockReturnValue({ populate });

      const res = createRes();
      await getAllCustomers({}, res);

      expect(Customer.find).toHaveBeenCalledTimes(1);
      expect(populate).toHaveBeenCalledWith('user', '-password');
      expect(res.json).toHaveBeenCalledWith(customers);
    });
  });

  describe('getCustomerById', () => {
    it('returns customer when found', async () => {
      const customer = { id: 'c1' };
      const populate = jest.fn().mockResolvedValue(customer);
      Customer.findById.mockReturnValue({ populate });

      const req = { params: { id: 'c1' } };
      const res = createRes();

      await getCustomerById(req, res);

      expect(Customer.findById).toHaveBeenCalledWith('c1');
      expect(populate).toHaveBeenCalledWith('user', '-password');
      expect(res.json).toHaveBeenCalledWith(customer);
    });

    it('returns 404 when missing', async () => {
      const populate = jest.fn().mockResolvedValue(null);
      Customer.findById.mockReturnValue({ populate });

      const req = { params: { id: 'missing' } };
      const res = createRes();

      await getCustomerById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer not found' });
    });
  });

  describe('createCustomer', () => {
    it('creates customer and returns 201', async () => {
      const customer = { id: 'new' };
      Customer.create.mockResolvedValue(customer);

      const req = { body: { user: 'u1' } };
      const res = createRes();

      await createCustomer(req, res);

      expect(Customer.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(customer);
    });

    it('returns 500 on creation error', async () => {
      Customer.create.mockRejectedValue(new Error('db'));

      const req = { body: {} };
      const res = createRes();

      await createCustomer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'db' });
    });
  });

  describe('updateCustomer', () => {
    it('updates customer and returns result', async () => {
      const updated = { id: 'c1', phone: '123' };
      Customer.findByIdAndUpdate.mockResolvedValue(updated);

      const req = { params: { id: 'c1' }, body: { phone: '123' } };
      const res = createRes();

      await updateCustomer(req, res);

      expect(Customer.findByIdAndUpdate).toHaveBeenCalledWith('c1', req.body, { new: true });
      expect(res.json).toHaveBeenCalledWith(updated);
    });
  });

  describe('deleteCustomer', () => {
    it('deletes customer and returns message', async () => {
      Customer.findByIdAndDelete.mockResolvedValue();

      const req = { params: { id: 'del' } };
      const res = createRes();

      await deleteCustomer(req, res);

      expect(Customer.findByIdAndDelete).toHaveBeenCalledWith('del');
      expect(res.json).toHaveBeenCalledWith({ message: 'Customer deleted' });
    });
  });
});
