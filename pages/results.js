// @flow
import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  setQuery,
  makeSearch,
  getMoreCharacters,
  setPage,
  getAllCharacters,
} from '../lib/actions';

import Search from '../components/Search';
import Filters from '../components/Filters';
import Breadcrumbs from '../components/Breadcrumbs';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import QuoteCard from '../components/QuoteCard';

const cardsPerPage = 5;

const ResultsPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchResults = useSelector((state: GlobalState) => state.searchResults);
  const page = useSelector((state: GlobalState) => state.page);
  const totalPages = useSelector((state: GlobalState) => Math.ceil(state.count / 5));
  const query = useSelector((state: GlobalState) => state.query);
  const [pageLoaded, setPageLoaded] = useState(false);

  const handleReset = useCallback(() => {
    router.push({
      pathname: '/results',
      shadow: true,
      query: {},
    });
    dispatch(getAllCharacters());
  }, [dispatch, router]);

  useEffect(() => {
    if (pageLoaded) {
      return;
    }
    // refetch after page reload
    const queryFromUrl = Object.values(router.query).join(' ');
    if (queryFromUrl !== query) {
      dispatch(setQuery(queryFromUrl));
      dispatch(makeSearch(queryFromUrl));
    }
    // fetch all it the query is empty
    if (!queryFromUrl && !query) {
      dispatch(getAllCharacters());
    }
    setPageLoaded(true);
  }, [dispatch, query, router, pageLoaded, handleReset]);

  useEffect(() => {
    // fetch next page
    if (searchResults.length > 0 && searchResults.slice(page * 5, page * 5 + 5).length === 0) {
      dispatch(getMoreCharacters());
    }
  }, [dispatch, page, searchResults]);

  const handleCardClick = useCallback((id: number) => {
    router.push({ pathname: `/view/${id}` });
  }, [router]);

  const handlePageChange = useCallback((nextPage: number) => {
    dispatch(setPage(nextPage));
  }, [dispatch]);

  const onFilterChange = useCallback((filter: { [string]: string | void, ... }) => {
    const newQuery = { ...router.query, ...filter };
    // remove undefined properties
    const cleanQuery = JSON.parse(JSON.stringify(newQuery));
    router.push({
      pathname: '/results',
      query: cleanQuery,
    });
    // allow items refetch
    setPageLoaded(false);
  }, [router]);

  const cards = searchResults.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage);

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

      <Search onReset={handleReset} />

      <Filters
        status={router.query.status}
        gender={router.query.gender}
        species={router.query.species}
        onChange={onFilterChange}
      />

      <div className="results">
        {cards.map((char) => (
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

        {cards.length === cardsPerPage && (
          <div className="card-container">
            <QuoteCard />
          </div>
        )}
      </div>

      {searchResults.length > 5 && (
        <div className="pagination">
          <Pagination page={page} totalPages={totalPages} onClick={handlePageChange} />
        </div>
      )}

      <style jsx>
        {`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            min-height: calc(100vh - 40px);
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

            .results {
              justify-content: center;
            }
          }

          @media(max-width: 600px) {
            .card-container {
              flex: 0 1 100%;
            }
            .pagination {
              padding: 8px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResultsPage;
