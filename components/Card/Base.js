// @flow
import React, { memo, useCallback } from 'react';

import Button from '../Button';
import Paper from './Paper';

type Props = {|
  +id: number,
  +image: string,
  +onClick?: (id: number) => void,
  +children: React$Node,
  +actions?: React$Element<$FlowFixMe> | Array<React$Element<$FlowFixMe>>,
  +className?: string,
  +style?: $Shape<CSSStyleDeclaration>,
|};

function CardBase(props: Props) {
  const {
    image, className, onClick, id, children, actions, style,
  } = props;

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(id);
    }
  }, [onClick, id]);

  return (
    <Paper className={className}>
      <div className="image" style={{ backgroundImage: `url(${image})` }} />
      {children}
      {(actions || handleClick) && (
        <div className="actions">
          {actions || <Button flat onClick={handleClick} dataCy="view-buttonw">View</Button>}
        </div>
      )}
      <style jsx>
        {`
          .image {
            height: 300px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
          }

          .actions {
            padding: 8px;
          }
        `}
      </style>
    </Paper>
  );
}
export default memo<Props>(CardBase);
