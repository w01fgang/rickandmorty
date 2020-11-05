// @flow
import React from 'react';
import ReactSelect from 'react-select';

const styles = {
  container: () => ({ flex: '1 1 auto' }),
};

type Props = {|
  +name: string,
  +label: string,
  +options: Array<{ value: string, label: string, ... }>,
  +value: ?string,
  onChange: (val: { value: string, label: string, ... }) => void,
|};

export default function Select({
  name, label, options, value, onChange,
}: Props) {
  return (
    <div className="container">
      <label htmlFor={name}>{label}</label>
      <ReactSelect
        options={options}
        value={options.find((el) => el.value === value)}
        styles={styles}
        onChange={onChange}
        isClearable
      />
      <style jsx>
        {`
          .container {
            min-width: 150px;
            display: inline-flex;
            padding: 0;
            position: relative;
            vertical-align: top;
          }
          .container label {
            color: rgba(0,0,0,0.54);
            display: block;
            font-size: 0.75rem;
            font-weight: 400;
            letter-spacing: 0.00938em;
            line-height: 1;
            pointer-events: none;
            position: absolute;
            top: -6px;
            left: 7px;
            z-index: 1;
            background-color: white;
            padding: 0 4px;
          }
        `}
      </style>
    </div>
  );
}
