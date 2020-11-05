// @flow
import React, { memo } from 'react';
import cx from 'classnames';

type Props = {|
  +children: React$Node,
  +className?: string,
  +style?: $Shape<CSSStyleDeclaration>,
|};

function Paper(props: Props) {
  const {
    className, children, style,
  } = props;

  return (
    <div className={cx('container', className)} style={style} data-cy="paper">
      {children}
      <style jsx>
        {`
          .container {
            box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
            border-radius: 4px;
            color: rgba(0, 0, 0, 0.87);
            background-color: #fff;
            flex: 1 1 auto;
          }
        `}
      </style>
    </div>
  );
}
export default memo<Props>(Paper);
