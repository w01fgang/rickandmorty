// @flow
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { makeSearch, getMoreCharacters, setPage } from '../lib/actions';

import Search from '../components/Search';
import Breadcrumbs from '../components/Breadcrumbs';
import Card from '../components/Card';
import Pagination from '../components/Pagination';

const ResultsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchResults = useSelector((state: GlobalState) => state.searchResults);
  const page = useSelector((state: GlobalState) => state.page);
  const totalPages = useSelector((state: GlobalState) => Math.ceil(state.count / 5));
  const query = useSelector((state: GlobalState) => state.query);

  useEffect(() => {
    const queryFromUrl = Object.values(router.query).join(' ');
    if (queryFromUrl !== query) {
      dispatch(makeSearch(queryFromUrl));
    }
  }, [dispatch, query, router]);

  useEffect(() => {
    if (searchResults.length > 0 && searchResults.slice(page * 5, page * 5 + 5).length === 0) {
      dispatch(getMoreCharacters());
    }
  }, [dispatch, page, searchResults]);

  const handleCardClick = useCallback((id: number) => {
    router.push({ pathname: '/view/[itemId]', query: { itemId: id } });
  }, [router]);

  const handlePageChange = useCallback((nextPage: number) => {
    dispatch(setPage(nextPage));
  }, [dispatch]);

  return (
    <div className="container">
      <div className="breadcrumbs-container">
        <Breadcrumbs>
          <li>
            <p>
              Search results
            </p>
          </li>
        </Breadcrumbs>
      </div>
      <Search />

      <div className="results">
        {searchResults.slice(page * 5, page * 5 + 5).map((char) => (
          <div key={char.id} className="card-container">
            <Card
              id={char.id}
              name={char.name}
              image={char.image}
              location={char.location.name}
              episodesCount={char.episode.length}
              onClick={handleCardClick}
            />
          </div>
        ))}
      </div>

      <div className="pagination">
        <Pagination page={page} totalPages={totalPages} onClick={handlePageChange} />
      </div>

      <style jsx>
        {`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }

          .breadcrumbs-container {
            display: flex;
            flex: 1 1 auto;
            padding: 0 8px;
          }

          .card-container {
            display: flex;
            justify-content: center;
            margin: 8px;
            flex: 0 1 32%;
          }

          .results {
            display: flex;
            flex-wrap: wrap;
            flex: 1 1 auto;
          }

          .pagination {
            display: flex;
            justify-content: center;
            flex: 1 1 100%;
            padding: 46px;
          }

          @media(max-width: 1200px) {
            .card-container {
              flex: 0 1 40%;
            }

            .breadcrumbs-container {
              padding: 0 24px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResultsPage;
