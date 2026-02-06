const { getAllReviews, getReviewById, createReview } = require('./review.controller');
const Review = require('../../model/review');

jest.mock('../../model/review', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
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

describe('Review Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('getAllReviews', () => {
    it('returns reviews with customer and artisan populated', async () => {
      const reviews = [{ id: 1 }];
      const { first, second } = buildDoublePopulate(reviews);
      Review.find.mockReturnValue({ populate: first });

      const res = createRes();
      await getAllReviews({}, res);

      expect(Review.find).toHaveBeenCalledTimes(1);
      expect(first).toHaveBeenCalledWith('customer');
      expect(second).toHaveBeenCalledWith('artisan');
      expect(res.json).toHaveBeenCalledWith(reviews);
    });
  });

  describe('getReviewById', () => {
    it('returns review when found', async () => {
      const review = { id: 'r1' };
      const { first, second } = buildDoublePopulate(review);
      Review.findById.mockReturnValue({ populate: first });

      const req = { params: { id: 'r1' } };
      const res = createRes();

      await getReviewById(req, res);

      expect(Review.findById).toHaveBeenCalledWith('r1');
      expect(first).toHaveBeenCalledWith('customer');
      expect(second).toHaveBeenCalledWith('artisan');
      expect(res.json).toHaveBeenCalledWith(review);
    });

    it('returns 404 when missing', async () => {
      const { first, second } = buildDoublePopulate(null);
      Review.findById.mockReturnValue({ populate: first });

      const req = { params: { id: 'missing' } };
      const res = createRes();

      await getReviewById(req, res);

      expect(second).toHaveBeenCalledWith('artisan');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Review not found' });
    });
  });

  describe('createReview', () => {
    it('creates review and returns 201', async () => {
      const review = { id: 'new' };
      Review.create.mockResolvedValue(review);

      const req = { body: { rating: 5 } };
      const res = createRes();

      await createReview(req, res);

      expect(Review.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(review);
    });

    it('returns 500 on creation error', async () => {
      Review.create.mockRejectedValue(new Error('db'));

      const req = { body: {} };
      const res = createRes();

      await createReview(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'db' });
    });
  });
});
