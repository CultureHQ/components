import React, { useCallback, useState } from "react";

import { Panel, SearchBar } from "../../src";

const OPTIONS = [
  "Harry", "Hermione", "Ron", "Ginny", "Fred", "George", "Neville", "Luna"
];

const match = search => OPTIONS.filter(option => (
  option.toLowerCase().includes(search.toLowerCase())
));

const SearchBarContainer = () => {
  const [matched, setMatched] = useState([]);
  const onSearch = useCallback(search => setMatched(search ? match(search) : []));

  return (
    <Panel>
      <Panel.Body>
        <SearchBar onSearch={onSearch} placeholder="Search students..." />
        <ul>
          {matched.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </Panel.Body>
    </Panel>
  );
};

export default SearchBarContainer;
