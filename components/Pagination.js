// @flow
import React from 'react';

import Button from './Button';

type Props = {|
  +page: number,
  +totalPages: number,
  +onClick: (page: number) => void,
|};

export default function Pagination({ page, totalPages, onClick }: Props) {
  let pages = new Array(totalPages).fill(1).map((_, i) => i);

  if (page > 2) {
    pages = pages.slice(page - 2, page + 3);
  } else {
    pages = pages.slice(0, 5);
  }

  const nextPage = () => onClick(page + 1);

  const prevPage = () => onClick(page - 1);

  return (
    <div className="container">
      <div className="btn">
        {page > 0 && (
          <Button onClick={prevPage}>
            {'<'}
          </Button>
        )}
      </div>

      <div className="pages">
        {pages.map((el) => (
          <div key={`btn-${el + 1}`} className="btn">
            <Button onClick={() => onClick(el)} active={page === el}>
              {el + 1}
            </Button>
          </div>
        ))}
      </div>

      <div className="btn">
        {page !== totalPages && (
          <Button onClick={nextPage}>
            {'>'}
          </Button>
        )}
      </div>

      <style jsx>
        {`
          .container {
            display: flex;
            flex: 1 1 auto;
            justify-content: center;
          }
          .pages {
            display: flex;
          }
          .btn {
            margin: 4px;
            display: flex;
            flex: 0 0 64px;
          }
        `}
      </style>
    </div>
  );
}
