// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, type NextRouter } from 'next/router';
import type { Dispatch } from 'redux';

import {
  setQuery as setQueryAction,
  makeSearch as makeSearchAction,
  setPage as setPageAction,
  getAllCharacters as getAllCharactersAction,
  type Action,
} from '../lib/actions';
import {
  selectPage,
  selectCount,
  selectQuery,
  selectCharacters,
} from '../lib/selectors';
import { cardsPerPage } from '../lib/constants';
import { scrollToTop } from '../lib/utils';

import Search from '../components/Search';
import Filters from '../components/Filters';
import Breadcrumbs from '../components/Breadcrumbs';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import QuoteCard from '../components/QuoteCard';

type StateProps = {|
  characters: Array<Character>,
  page: number,
  totalPages: number,
  query: string,
|};

type DispatchProps = {|
  +setQuery: (query: string) => Action,
  +getAllCharacters: () => Action,
  +makeSearch: (query: string) => Action,
  +setPage: (page: number) => Action,
|};

type OwnProps = {|
  +router: NextRouter,
|};

type Props = {|
  ...StateProps,
  ...DispatchProps,
  ...OwnProps,
|};

class ResultsPage extends PureComponent<Props> {
  componentDidMount() {
    const {
      router,
      setQuery,
      query,
      makeSearch,
      getAllCharacters,
    } = this.props;
    // router query will be empty https://github.com/vercel/next.js/discussions/18268#discussioncomment-112532
    const queryParameters = new URLSearchParams(router.asPath);
    const queryFromUrl = [...queryParameters.entries()].map(([, el]) => el).join(' ');
    // fetch items on page reload
    if (queryFromUrl !== query) {
      setQuery(queryFromUrl);
      makeSearch(queryFromUrl);
    }
    // fetch all it the query is empty
    if (!queryFromUrl && !query) {
      getAllCharacters();
    }
  }

  handleReset = () => {
    const { router, getAllCharacters } = this.props;
    router.push({
      pathname: '/results',
      shadow: true,
      query: {},
    });
    getAllCharacters();
  }

  handleCardClick = (id: number) => {
    const { router } = this.props;
    router.push({ pathname: `/view/${id}` });
  }

  handlePageChange = (nextPage: number) => {
    const { setPage } = this.props;
    setPage(nextPage);
    scrollToTop();
  }

  onFilterChange = (filter: { [string]: string | void, ... }) => {
    const { router, makeSearch, setQuery } = this.props;
    const newQuery = { ...router.query, ...filter };
    // remove undefined properties
    const cleanQuery = JSON.parse(JSON.stringify(newQuery));
    router.push({
      pathname: '/results',
      query: cleanQuery,
    });
    const queryText = Object.values(cleanQuery).join(' ');
    setQuery(queryText);
    makeSearch(queryText);
  };

  render() {
    const {
      characters,
      page,
      totalPages,
      router,
    } = this.props;

    const cards = characters.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage);

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

        <Search onReset={this.handleReset} />

        <Filters
          status={router.query.status}
          gender={router.query.gender}
          species={router.query.species}
          onChange={this.onFilterChange}
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
                onClick={this.handleCardClick}
              />
            </div>
          ))}

          {cards.length === cardsPerPage && (
          <div className="card-container">
            <QuoteCard />
          </div>
          )}
        </div>

        {characters.length > 5 && (
        <div className="pagination">
          <Pagination page={page} totalPages={totalPages} onClick={this.handlePageChange} />
        </div>
        )}

        <style jsx>
          {`
          .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: flex-start;
            max-width: 1200px;
            margin: 0 auto;
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
  }
}

const mapStateToProps = (state: GlobalState): StateProps => ({
  characters: selectCharacters(state),
  page: selectPage(state),
  totalPages: Math.ceil(selectCount(state) / 5),
  query: selectQuery(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  setQuery: (query: string) => dispatch(setQueryAction(query)),
  makeSearch: (query: string) => dispatch(makeSearchAction(query)),
  setPage: (page: number) => dispatch(setPageAction(page)),
  getAllCharacters: () => dispatch(getAllCharactersAction()),
});
/* eslint-disable-next-line max-len */
export default withRouter(connect<Props, OwnProps, StateProps, DispatchProps, GlobalState, Dispatch<Action>>(mapStateToProps, mapDispatchToProps)(ResultsPage));
