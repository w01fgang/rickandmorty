// @flow
import React, { useCallback } from 'react';

import Select from './Select';

const statusOptions = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
];
const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' },
];
const speciesOptions = [
  { value: 'human', label: 'Human' },
  { value: 'humanoid', label: 'Humanoid' },
  { value: 'unknown', label: 'Unknown' },
];

const selectOption = (option: { value: string, label: string, ... } | null, name: string) => {
  if (option) {
    return { [name]: option.value };
  }
  return { [name]: undefined };
};

type Props = {|
  +status: ?string,
  +gender: ?string,
  +species: ?string,
  +onChange: ({ [string]: string | void, ... }) => void,
|};

export default function Filters({
  status, gender, species, onChange,
}: Props) {
  const onStatusChange = useCallback((option: { value: string, label: string, ... } | null) => {
    onChange(selectOption(option, 'status'));
  }, [onChange]);

  const onGenderChange = useCallback((option: { value: string, label: string, ... } | null) => {
    onChange(selectOption(option, 'gender'));
  }, [onChange]);

  const onSpeciesChange = useCallback((option: { value: string, label: string, ... } | null) => {
    onChange(selectOption(option, 'species'));
  }, [onChange]);

  return (
    <div className="container" data-cy="filter">
      <div className="input-container">
        <Select name="status" label="Status" options={statusOptions} value={status} onChange={onStatusChange} />
      </div>
      <div className="input-container">
        <Select name="gender" label="Gender" options={genderOptions} value={gender} onChange={onGenderChange} />
      </div>
      <div className="input-container">
        <Select name="species" label="Species" options={speciesOptions} value={species} onChange={onSpeciesChange} />
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            flex-wrap: wrap;
            width: 100vw;
          }

          .input-container {
            display: flex;
            justify-content: center;
            margin-bottom: 24px;
            flex: 0 0 180px;
          }
          `}
      </style>
    </div>
  );
}
