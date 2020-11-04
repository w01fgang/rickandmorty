// @flow
import React, { memo } from 'react';
import cx from 'classnames';

import Button from '../Button';

type Props = {|
  +id: number,
  +image: string,
  +onClick?: (id: number) => void,
  +children: React$Node,
  +actions?: React$Node,
  +className?: string,
  +style?: $Shape<CSSStyleDeclaration>,
|};

function CardBase(props: Props) {
  const {
    image, className, onClick, id, children, actions, style,
  } = props;

  if (!onClick && !actions) {
    console.error(new Error('You shoud provide ether onClick, ether actions')); // eslint-disable-line no-console
  }

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div className={cx('container', className)} style={style}>
      <div className="image" style={{ backgroundImage: `url(${image})` }} />
      {children}
      <div className="actions">
        {actions || <Button flat onClick={handleClick}>View</Button>}
      </div>
      <style jsx>
        {`
            .container {
              box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
              border-radius: 4px;
              color: rgba(0, 0, 0, 0.87);
              background-color: #fff;
              flex: 1 1 auto;
            }

            .image {
              height: 300px;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center;
            }

            .actions {

            }
            `}
      </style>
    </div>
  );
}
export default memo<Props>(CardBase);
