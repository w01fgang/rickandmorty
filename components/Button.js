// @flow
import React from 'react';
import cx from 'classnames';

type Props = {|
  +children: React$Node,
  +onClick: (e: SyntheticMouseEvent<HTMLButtonElement>) => void,
  +flat?: boolean,
  +className?: string,
  +active?: boolean,
  +round?: boolean,
  +color?: string,
  +hover?: string,
  +dataCy: string,
|};

const Button = ({
  children, onClick, flat, active, round, className = '', dataCy, ...other
}: Props) => {
  let color = other.color || '#1976d2';
  let hover = other.hover || '#0d47a1';
  if (active) {
    color = '#ffc400';
    hover = '#b28900';
  }

  return (
    <>
      <button type="button" className={cx('btn', className)} onClick={onClick} data-cy={dataCy}>
        {children}
      </button>
      <style jsx>
        {`
            .btn {
              box-shadow: none;
              color: ${flat ? color : '#fff'};
              background-color: ${flat ? 'transparent' : color};
              padding: 6px ${round ? 6 : 16}px;
              font-size: 0.875rem;
              min-width: ${round ? 0 : 64}px;
              box-sizing: border-box;
              transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
              font-family: "Roboto", "Helvetica", "Arial", sans-serif;
              font-weight: 500;
              line-height: 1.75;
              border-radius: ${round ? '50%' : '4px'};
              letter-spacing: 0.02857em;
              text-transform: uppercase;
              border: 0;
              cursor: pointer;
              margin: 0;
              display: inline-flex;
              outline: 0;
              position: relative;
              align-items: center;
              user-select: none;
              vertical-align: middle;
              justify-content: center;
              text-decoration: none;
            }

            .btn:hover {
              color: ${flat ? hover : '#fff'};
              background-color: ${flat ? 'transparent' : hover};
            }
        `}
      </style>
    </>
  );
};

export default Button;
