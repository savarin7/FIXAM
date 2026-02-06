const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('./category.controller');
const Category = require('../../model/category');

jest.mock('../../model/category', () => ({
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

describe('Category Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  it('getAllCategories returns categories', async () => {
    const categories = [{ id: 1 }];
    Category.find.mockResolvedValue(categories);

    const res = createRes();
    await getAllCategories({}, res);

    expect(Category.find).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(categories);
  });

  it('createCategory stores and returns 201', async () => {
    const category = { id: 'c1' };
    Category.create.mockResolvedValue(category);

    const req = { body: { name: 'Test' } };
    const res = createRes();

    await createCategory(req, res);

    expect(Category.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(category);
  });

  it('updateCategory returns updated doc', async () => {
    const updated = { id: 'c1', name: 'New' };
    Category.findByIdAndUpdate.mockResolvedValue(updated);

    const req = { params: { id: 'c1' }, body: { name: 'New' } };
    const res = createRes();

    await updateCategory(req, res);

    expect(Category.findByIdAndUpdate).toHaveBeenCalledWith('c1', req.body, { new: true });
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it('deleteCategory removes and confirms', async () => {
    Category.findByIdAndDelete.mockResolvedValue();

    const req = { params: { id: 'c1' } };
    const res = createRes();

    await deleteCategory(req, res);

    expect(Category.findByIdAndDelete).toHaveBeenCalledWith('c1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Category deleted' });
  });
});
