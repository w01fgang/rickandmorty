// @flow
import React, { memo, useEffect, useState } from 'react';
import cx from 'classnames';

import facts from '../assets/facts';

type Props = {|
  +className?: string,
  +style?: $Shape<CSSStyleDeclaration>,
|};

let latsIndex = 0;

function QuoteCard({ className, style }: Props) {
  const [index, setIndex] = useState(latsIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((state) => {
        const next = (state + 1) % facts.length;
        latsIndex = next;
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cx('container', className)} style={style}>
      <h3>Fun facts about Rick and Morty!</h3>
      <p>{facts[index]}</p>
      <style jsx>
        {`
          .container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            align-content: center;
            flex: 1 1 auto;
            color: rgba(0, 0, 0, 0.54);
            background-color: #fff;
            padding: 24px;
          }

          .container h6 {
            font-size: 1.25rem;
            font-weight: 500;
            line-height: 1.6;
            letter-spacing: 0.0075em;
          }
          .container p {
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            letter-spacing: 0.00938em;
          }
        `}
      </style>
    </div>
  );
}
export default memo<Props>(QuoteCard);
