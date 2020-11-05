// @flow
import React, { Children, Fragment } from 'react';

type Props = {|
  +children: React$Node,
|};

export default function Breadcrumbs({ children }: Props) {
  return (
    <nav className="breadcrumbs" data-cy="breadcrumbs">
      <ol>
        <li>
          <a href="/">Main</a>
        </li>

        {Children.toArray(children).map((el, i) => (
          <Fragment key={`f-${i + 1}`}>
            <li className="separator">/</li>
            {el}
          </Fragment>
        ))}
      </ol>
      <style jsx global>
        {`
          .breadcrumbs {
            color: rgba(0, 0, 0, 0.54);
            font-size: 1rem;
            font-weight: 400;
            letter-spacing: 0.00938em;
            line-height: 1.5;
            margin: 0;
          }

          .breadcrumbs > ol {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .breadcrumbs > ol > li > a {
            color: inherit;
            margin: 0;
            text-decoration: none;
          }

          .breadcrumbs > ol > li > p {
            color: rgba(0, 0, 0, 0.87);
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            letter-spacing: 0.00938em;
          }

          .breadcrumbs .separator {
            display: flex;
            margin-left: 8px;
            user-select: none;
            margin-right: 8px;
          }
        `}
      </style>
    </nav>
  );
}
