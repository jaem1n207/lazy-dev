import React from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange: onChangeProps }: SearchProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeProps(e.target.value);
  };

  return (
    <div>
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default Search;
