// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import type { Dispatch } from 'redux';

import { getCharacterEpisodes, type Action } from '../lib/actions';
import { selectQuery, selectEpisodes } from '../lib/selectors';
import createFilter from '../lib/createFilter';

import CardBase from './Card/Base';
import Paper from './Card/Paper';
import EpisodesTable from './EpisodesTable';
import Button from './Button';
import Breadcrumbs from './Breadcrumbs';
import BrandTitle from './BrandTitle';

const styles = {
  paper: {
    margin: '24px 0',
    flex: '1 1 100%',
  },
};

type OwnProps = {|
  +character: Character,
|};

type DispatchProps = {|
  +getEpisodes: (episodes: Array<string>) => Action,
|};

type StateProps = {|
  +query: string,
  +episodes: Array<Episode>,
|};

type Props = {|
  ...OwnProps,
  ...DispatchProps,
  ...StateProps,
|};

class CharacterDetails extends PureComponent<Props> {
  componentDidMount() {
    const { getEpisodes, character } = this.props;
    getEpisodes(character.episode);
  }

  handleClick = () => {
    alert('Buy merchendaise clicked! Thank you!'); // eslint-disable-line no-alert
  }

  render() {
    const { character, query, episodes } = this.props;

    return (
      <div className="container">
        <div className="logo-container">
          <BrandTitle />
        </div>
        <div className="breadcrumbs-container">
          <Breadcrumbs>
            <li>
              <Link href={`/results?${createFilter(query)}`}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>Search results</a>
              </Link>
            </li>
            <li>
              <p>
                {character.name}
              </p>
            </li>
          </Breadcrumbs>
        </div>

        <div className="profile">
          <CardBase
            image={character.image}
            id={character.id}
            actions={(
              <div className="cta-container">
                <Button color="#4caf50" hover="#388e3c" onClick={this.handleClick}>Buy merchendaise</Button>
              </div>
            )}
          >
            <div className="card-content">
              <h2>{character.name}</h2>
            </div>
          </CardBase>

          <Paper style={styles.paper}>
            <div className="card-content">
              <p>
                <b>Gender</b>
                <span>{character.gender}</span>
              </p>

              <p>
                <b>Species</b>
                <span>{character.species}</span>
              </p>

              <p>
                <b>Status</b>
                <span>{character.status}</span>
              </p>

              {character.origin.name && (
                <p>
                  <b>Origin</b>
                  <span>{character.origin.name}</span>
                </p>
              )}
              <p>
                <b>Total episodes</b>
                <span>{character.episode.length}</span>
              </p>
              <p>
                <b>Last location</b>
                <span>{character.location.name}</span>
              </p>
            </div>
          </Paper>
        </div>

        <div className="episodes">
          <EpisodesTable episodes={episodes} />
        </div>

        <style jsx>
          {`
            .container {
              display: flex;
              align-items: flex-start;
              justify-content: center;
              flex-wrap: wrap;
              max-width: 1200px;
              margin: 0 auto;
              padding: 24px;
            }

            .breadcrumbs-container {
              display: flex;
              flex: 1 1 100%;
              padding: 0 8px;
            }

            .profile {
              display: flex;
              flex: 0 1 300px;
              flex-wrap: wrap;
              margin-right: 24px;
            }

            .card-content {
              padding: 16px;
            }

            .card-content h2 {
              text-align: center;
            }

            .card-content p b {
              margin-right: 5px;
            }

            .card-content p b::after {
              content: ":";
            }

            .cta-container {
              display: flex;
              align-items: center;
              justify-content: center;
              flex: 1 1 100%;
              margin-bottom: 8px;
            }

            .logo-container {
              display: flex;
              width: 100%;
              border-bottom: 1px solid #cfd8dc;
              margin-bottom: 16px;
            }
        `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = (state): StateProps => ({
  query: selectQuery(state),
  episodes: selectEpisodes(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  getEpisodes: (episodes: Array<string>) => dispatch(getCharacterEpisodes(episodes)),
});
/* eslint-disable-next-line max-len */
export default connect<Props, OwnProps, StateProps, DispatchProps, GlobalState, _>(mapStateToProps, mapDispatchToProps)(CharacterDetails);
