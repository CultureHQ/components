import React, { useCallback, useState } from "react";

import Panel from "../Panel";
import SearchBar from "../SearchBar";

const STUDENTS = ["Harry", "Hermione", "Ron", "Ginny", "Fred", "George", "Neville", "Luna"];
const HOUSES = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

const match = (search, options) => options.filter(option => (
  option.toLowerCase().includes(search.toLowerCase())
));

const SearchBarContainer = () => {
  const [matchedStudents, setMatchedStudents] = useState([]);
  const [matchedHouses, setMatchedHouses] = useState([]);

  const onStudentSearch = useCallback(search => (
    setMatchedStudents(search ? match(search, STUDENTS) : [])
  ));

  const onHouseSearch = useCallback(search => (
    setMatchedHouses(search ? match(search, HOUSES) : [])
  ));

  return (
    <Panel>
      <Panel.Body>
        <SearchBar onSearch={onStudentSearch} placeholder="Search students..." />
        <ul>
          {matchedStudents.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <SearchBar onSearch={onHouseSearch} placeholder="Search houses..." throttle={null} />
        <ul>
          {matchedHouses.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </Panel.Body>
    </Panel>
  );
};

export default SearchBarContainer;
