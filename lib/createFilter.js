// @flow
const patterns = {
  gender: /male|female|genderless/i,
  status: /alive|dead|genderless/i,
  species: /human|humanoid/i,
};

const createFilter = (query: string): string => {
  const words = query.split(' ');
  const wordsMap = new Map();
  words.forEach((word) => {
    if (patterns.gender.test(word)) {
      wordsMap.set('gender', word);
      return;
    }
    if (patterns.status.test(word)) {
      wordsMap.set('status', word);
      return;
    }
    if (patterns.species.test(word)) {
      wordsMap.set('species', word);
      return;
    }
    if (wordsMap.has('name')) {
      // $FlowFixMe[incompatible-type]
      const existingQuery: string = wordsMap.get('name');
      wordsMap.set('name', `${existingQuery} ${word}`);
      return;
    }
    wordsMap.set('name', word);
  });
  const params = new URLSearchParams([...wordsMap]);
  return params.toString();
};

export default createFilter;