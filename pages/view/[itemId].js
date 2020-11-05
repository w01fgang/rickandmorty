// @flow
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Initial, Loading, Failure, Success,
} from 'lemons';

import { fetchCharacter } from '../../lib/api';

import CharacterDetails from '../../components/CharacterDetails';

/* this component is done without redux for purpose, to show an exmple without redux */
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
        () => <div className="center">Loading...</div>,
        (err) => (
          <div className="center error">
            <p>{err.message}</p>
          </div>
        ),
        (char) => <CharacterDetails character={char} />,
      )}
      <style jsx>
        {`
          .container {
            display: flex;
            min-height: calc(100vh - 40px);
          }
          .center {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100vw;
            height: 100vh;
          }

          .error {
            color: #d32f2f;
          }

        `}
      </style>
    </div>
  );
};

export default ViewItem;
