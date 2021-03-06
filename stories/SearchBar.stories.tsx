import React, { useCallback, useState } from "react";
import { storiesOf } from "@storybook/react";
import { number, text } from "@storybook/addon-knobs";

import { Panel, SearchBar } from "../src/components";

const match = (search: string, options: string[]) => options.filter(option => (
  option.toLowerCase().includes(search.toLowerCase())
));

type ContainerProps = {
  haystack: string[];
  placeholder: string;
  throttle: null | number;
  clearOptionEnabled: null | boolean;
};

const Container: React.FC<ContainerProps> = (
  { haystack, placeholder, throttle, clearOptionEnabled }
) => {
  const [matches, setMatches] = useState<string[]>([]);
  const onSearch = useCallback(
    search => setMatches(search ? match(search, haystack) : []),
    [haystack, setMatches]
  );

  return (
    <Panel>
      <Panel.Body>
        <SearchBar
          onSearch={onSearch}
          placeholder={placeholder}
          throttle={throttle}
          clearOptionEnabled={clearOptionEnabled}
        />
        <ul>
          {matches.map(name => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </Panel.Body>
    </Panel>
  );
};

storiesOf("SearchBar", module)
  .add("default", () => {
    const props = {
      haystack: [
        "Harry", "Hermione", "Ron", "Ginny", "Fred", "George", "Neville", "Luna"
      ],
      placeholder: text("placeholder", "Search students..."),
      throttle: number("throttle", 300),
      clearOptionEnabled: true
    };

    return <Container {...props} />;
  })
  .add("unthrottled", () => (
    <Container
      haystack={["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]}
      placeholder="Search houses..."
      throttle={null}
      clearOptionEnabled={false}
    />
  ));
