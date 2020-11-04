// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import type { Dispatch } from 'redux';

import type { Action } from '../lib/actions';
import { selectQuery } from '../lib/selectors';
import createFilter from '../lib/createFilter';

import CardBase from './Card/Base';
import Button from './Button';
import Breadcrumbs from './Breadcrumbs';

type OwnProps = {|
  +character: Character,
|};

type StateProps = {|
  +query: string,
|};

type Props = {|
  ...OwnProps,
  ...StateProps,
  /* eslint-disable-next-line */
  +dispatch: Dispatch<Action>,
|};

class CharacterDetails extends PureComponent<Props> {
  handleClick = () => {
    alert('Buy merchendaise clicked! Thank you!');
  }

  render() {
    const { character, query } = this.props;

    return (
      <div className="container">
        <div className="breadcrumbs-container">
          <Breadcrumbs>
            <li>
              <Link href={`/results?${createFilter(query)}`}>
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
              <Button flat onClick={this.handleClick}>Buy merchendaise</Button>
            )}
            style={{ flex: '0 0 300px' }}
          >
            <div className="card-content">
              <h2>{character.name}</h2>
            </div>
          </CardBase>
        </div>
        <style jsx>
          {`
          .container {
            display: flex;
            max-width: 1200px;
            margin: 0 auto;
            padding: 24px;
            flex-wrap: wrap;
          }

          .breadcrumbs-container {
            display: flex;
            flex: 1 1 100%;
            padding: 0 8px;
          }

          .profile {
            display: flex;
            flex: 1 1 auto;
          }
        `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = (state): StateProps => ({
  query: selectQuery(state),
});
/* eslint-disable-next-line */
export default connect<Props, OwnProps, _, StateProps, GlobalState, _>(mapStateToProps)(CharacterDetails);
