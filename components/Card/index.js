// @flow
import React, { memo } from 'react';

import Base from './Base';

type Props = {|
  +id: number,
  +image: string,
  +name: string,
  +episodesCount: number,
  +location: string,
  +onClick: (id: number) => void,
  +className?: string,
|};

function Card(props: Props) {
  const {
    image, name, className, onClick, id, location, episodesCount,
  } = props;
  const handleClick = () => {
    onClick(id);
  };

  return (
    <Base image={image} className={className} onClick={handleClick} id={id}>
      <div className="content">
        <h2>{name}</h2>
        <p>
          <b>Last location</b>
          <span>{location}</span>
        </p>
        <p>
          <b>Total episodes</b>
          <span>{episodesCount}</span>
        </p>
      </div>
      <style jsx>
        {`
          .content {
            padding: 16px;
          }

          .content p b {
            margin-right: 5px;
          }

          .content p b::after {
            content: ":";
          }
        `}
      </style>
    </Base>
  );
}
export default memo<Props>(Card);
