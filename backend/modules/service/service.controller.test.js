const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('./service.controller');
const Service = require('../../model/service');

jest.mock('../../model/service', () => ({
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

describe('Service Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllServices', () => {
    it('returns all services', async () => {
      const mockServices = [{ id: 1 }, { id: 2 }];
      const populate = jest.fn().mockResolvedValue(mockServices);
      Service.find.mockReturnValue({ populate });

      const req = {};
      const res = createRes();

      await getAllServices(req, res);

      expect(Service.find).toHaveBeenCalledTimes(1);
      expect(populate).toHaveBeenCalledWith('artisan');
      expect(res.json).toHaveBeenCalledWith(mockServices);
    });
  });

  describe('getServiceById', () => {
    it('returns a single service when found', async () => {
      const mockService = { id: 'abc' };
      const populate = jest.fn().mockResolvedValue(mockService);
      Service.findById.mockReturnValue({ populate });

      const req = { params: { id: 'abc' } };
      const res = createRes();

      await getServiceById(req, res);

      expect(Service.findById).toHaveBeenCalledWith('abc');
      expect(populate).toHaveBeenCalledWith('artisan');
      expect(res.json).toHaveBeenCalledWith(mockService);
    });

    it('responds 404 when service does not exist', async () => {
      const populate = jest.fn().mockResolvedValue(null);
      Service.findById.mockReturnValue({ populate });

      const req = { params: { id: 'missing' } };
      const res = createRes();

      await getServiceById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Service not found' });
    });
  });

  describe('createService', () => {
    it('creates a service and returns 201', async () => {
      const mockService = { id: 'new' };
      Service.create.mockResolvedValue(mockService);

      const req = { body: { name: 'Test' } };
      const res = createRes();

      await createService(req, res);

      expect(Service.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockService);
    });

    it('returns 500 on creation error', async () => {
      Service.create.mockRejectedValue(new Error('DB error'));

      const req = { body: { name: 'Bad' } };
      const res = createRes();

      await createService(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'DB error' });
    });
  });

  describe('updateService', () => {
    it('updates a service and returns the updated document', async () => {
      const updated = { id: '123', name: 'Updated' };
      Service.findByIdAndUpdate.mockResolvedValue(updated);

      const req = { params: { id: '123' }, body: { name: 'Updated' } };
      const res = createRes();

      await updateService(req, res);

      expect(Service.findByIdAndUpdate).toHaveBeenCalledWith('123', req.body, { new: true });
      expect(res.json).toHaveBeenCalledWith(updated);
    });
  });

  describe('deleteService', () => {
    it('deletes a service and returns confirmation message', async () => {
      Service.findByIdAndDelete.mockResolvedValue();

      const req = { params: { id: 'bye' } };
      const res = createRes();

      await deleteService(req, res);

      expect(Service.findByIdAndDelete).toHaveBeenCalledWith('bye');
      expect(res.json).toHaveBeenCalledWith({ message: 'Service deleted' });
    });
  });
});
