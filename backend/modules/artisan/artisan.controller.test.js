const {
  getAllArtisans,
  getArtisanById,
  createArtisan,
  updateArtisan,
  deleteArtisan,
} = require('./artisan.controller');
const Artisan = require('../../model/artesan');

jest.mock('../../model/artesan', () => ({
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

describe('Artisan Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllArtisans', () => {
    it('returns artisans with populated user', async () => {
      const data = [{ id: 1 }];
      const populate = jest.fn().mockResolvedValue(data);
      Artisan.find.mockReturnValue({ populate });

      const res = createRes();

      await getAllArtisans({}, res);

      expect(Artisan.find).toHaveBeenCalledTimes(1);
      expect(populate).toHaveBeenCalledWith('user', '-password');
      expect(res.json).toHaveBeenCalledWith(data);
    });
  });

  describe('getArtisanById', () => {
    it('returns artisan when found', async () => {
      const artisan = { id: 'x' };
      const populate = jest.fn().mockResolvedValue(artisan);
      Artisan.findById.mockReturnValue({ populate });

      const req = { params: { id: 'x' } };
      const res = createRes();

      await getArtisanById(req, res);

      expect(Artisan.findById).toHaveBeenCalledWith('x');
      expect(populate).toHaveBeenCalledWith('user', '-password');
      expect(res.json).toHaveBeenCalledWith(artisan);
    });

    it('returns 404 when missing', async () => {
      const populate = jest.fn().mockResolvedValue(null);
      Artisan.findById.mockReturnValue({ populate });

      const req = { params: { id: 'missing' } };
      const res = createRes();

      await getArtisanById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Artisan not found' });
    });
  });

  describe('createArtisan', () => {
    it('creates artisan and returns 201', async () => {
      const artisan = { id: 'new' };
      Artisan.create.mockResolvedValue(artisan);

      const req = { body: { user: 'u1' } };
      const res = createRes();

      await createArtisan(req, res);

      expect(Artisan.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(artisan);
    });

    it('returns 500 on creation error', async () => {
      Artisan.create.mockRejectedValue(new Error('db'));

      const req = { body: {} };
      const res = createRes();

      await createArtisan(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'db' });
    });
  });

  describe('updateArtisan', () => {
    it('updates artisan and returns result', async () => {
      const updated = { id: 'u1' };
      Artisan.findByIdAndUpdate.mockResolvedValue(updated);

      const req = { params: { id: 'u1' }, body: { bio: 'Hi' } };
      const res = createRes();

      await updateArtisan(req, res);

      expect(Artisan.findByIdAndUpdate).toHaveBeenCalledWith('u1', req.body, { new: true });
      expect(res.json).toHaveBeenCalledWith(updated);
    });
  });

  describe('deleteArtisan', () => {
    it('deletes artisan and returns message', async () => {
      Artisan.findByIdAndDelete.mockResolvedValue();

      const req = { params: { id: 'del' } };
      const res = createRes();

      await deleteArtisan(req, res);

      expect(Artisan.findByIdAndDelete).toHaveBeenCalledWith('del');
      expect(res.json).toHaveBeenCalledWith({ message: 'Artisan deleted' });
    });
  });
});
