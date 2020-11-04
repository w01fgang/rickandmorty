// @flow
import React, { PureComponent } from 'react';

import CardBase from './Card/Base';
import Button from './Button';

type Props = {|
  +character: Character,
|};

class CharacterDetails extends PureComponent<Props> {
  handleClick = () => {
    alert('Buy merchendaise clicked! Thank you!');
  }

  render() {
    const { character } = this.props;
    return (
      <div className="container">
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
          }
        `}
        </style>
      </div>
    );
  }
}

export default CharacterDetails;
