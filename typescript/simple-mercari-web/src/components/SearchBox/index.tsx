import React from 'react';

interface Props {
    onSearch: (keyword: string) => void;
}

const SearchBox: React.FC<Props> = ({ onSearch }) => {
    return (
        <input
        type="text"
        placeholder="Search Items"
        onChange={(e) => onSearch(e.target.value)}
        />
    );
};

export default SearchBox;