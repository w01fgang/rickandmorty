// @flow
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Initial, Loading, Failure, Success,
} from 'lemons';

import { fetchCharacter } from '../../lib/api';

import CharacterDetails from '../../components/CharacterDetails';

const ViewItem = () => {
  const router = useRouter();
  const [item, setItem] = useState(Initial());

  const fetchData = useCallback(async (id: string) => {
    setItem(Loading());
    const data = await fetchCharacter(id);
    if (data.isOk()) {
      setItem(Success(data.unwrap()));
      return;
    }
    try {
      data.unwrap();
    } catch (e) {
      setItem(Failure(e));
    }
  }, [setItem]);

  useEffect(() => {
    const { itemId } = router.query;
    if (itemId) {
      fetchData(itemId);
    }
  }, [fetchData, router]);

  return (
    <div className="container">
      {item.dispatch(
        () => <div />,
        () => <div>Loading...</div>,
        (err) => <div>{err.message}</div>,
        (char) => <CharacterDetails character={char} />,
      )}
      <style jsx>
        {`
          .container {
            display: flex;
          }
        `}
      </style>
    </div>
  );
};

export default ViewItem;
