// @flow
const patterns = {
  gender: /male|female|genderless/i,
  status: /alive|dead|unknown/i,
  species: /human|humanoid/i,
};

const createFilter = (query: string): string => {
  if (!query) {
    return '';
  }
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
      // $FlowIgnore[incompatible-type]
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
