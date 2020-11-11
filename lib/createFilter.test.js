// @flow
import createFilter from './createFilter';

describe('createFilter', () => {
  it('should create a query from string', () => {
    const filter = createFilter('rick alive human male');
    expect(filter).toBe('name=rick&status=alive&species=human&gender=male');
  });

  it('should create a query with a multiple words in name', () => {
    const filter = createFilter('rick Sanchez alive human male');
    expect(filter).toBe('name=rick+Sanchez&status=alive&species=human&gender=male');
  });
});
