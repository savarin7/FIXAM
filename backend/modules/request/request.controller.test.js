const {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
} = require('./request.controller');
const Request = require('../../model/request');

jest.mock('../../model/request', () => ({
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

const buildDoublePopulate = (finalValue) => {
  const second = jest.fn().mockResolvedValue(finalValue);
  const first = jest.fn().mockReturnValue({ populate: second });
  return { first, second };
};

describe('Request Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getAllRequests', () => {
    it('returns requests with customer and service populated', async () => {
      const requests = [{ id: 1 }];
      const { first, second } = buildDoublePopulate(requests);
      Request.find.mockReturnValue({ populate: first });

      const res = createRes();
      await getAllRequests({}, res);

      expect(Request.find).toHaveBeenCalledTimes(1);
      expect(first).toHaveBeenCalledWith('customer');
      expect(second).toHaveBeenCalledWith('service');
      expect(res.json).toHaveBeenCalledWith(requests);
    });
  });

  describe('getRequestById', () => {
    it('returns request when found', async () => {
      const request = { id: 'r1' };
      const { first, second } = buildDoublePopulate(request);
      Request.findById.mockReturnValue({ populate: first });

      const req = { params: { id: 'r1' } };
      const res = createRes();

      await getRequestById(req, res);

      expect(Request.findById).toHaveBeenCalledWith('r1');
      expect(first).toHaveBeenCalledWith('customer');
      expect(second).toHaveBeenCalledWith('service');
      expect(res.json).toHaveBeenCalledWith(request);
    });

    it('returns 404 when missing', async () => {
      const { first, second } = buildDoublePopulate(null);
      Request.findById.mockReturnValue({ populate: first });

      const req = { params: { id: 'missing' } };
      const res = createRes();

      await getRequestById(req, res);

      expect(second).toHaveBeenCalledWith('service');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Request not found' });
    });
  });

  describe('createRequest', () => {
    it('creates request and returns 201', async () => {
      const request = { id: 'new' };
      Request.create.mockResolvedValue(request);

      const req = { body: { customer: 'c1' } };
      const res = createRes();

      await createRequest(req, res);

      expect(Request.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(request);
    });

    it('returns 500 on creation error', async () => {
      Request.create.mockRejectedValue(new Error('db'));

      const req = { body: {} };
      const res = createRes();

      await createRequest(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'db' });
    });
  });

  describe('updateRequest', () => {
    it('updates request and returns result', async () => {
      const updated = { id: 'r1' };
      Request.findByIdAndUpdate.mockResolvedValue(updated);

      const req = { params: { id: 'r1' }, body: { status: 'accepted' } };
      const res = createRes();

      await updateRequest(req, res);

      expect(Request.findByIdAndUpdate).toHaveBeenCalledWith('r1', req.body, { new: true });
      expect(res.json).toHaveBeenCalledWith(updated);
    });
  });

  describe('deleteRequest', () => {
    it('deletes request and returns message', async () => {
      Request.findByIdAndDelete.mockResolvedValue();

      const req = { params: { id: 'del' } };
      const res = createRes();

      await deleteRequest(req, res);

      expect(Request.findByIdAndDelete).toHaveBeenCalledWith('del');
      expect(res.json).toHaveBeenCalledWith({ message: 'Request deleted' });
    });
  });
});
