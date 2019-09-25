import React from "react";
import { render } from "@testing-library/react";

import DoorEffect from "../DoorEffect";

test("adds and removes the -open and -closed classes", () => {
  const { container, rerender } = render(
    <DoorEffect className="test" open={false}>
      Door effect!
    </DoorEffect>
  );

  const { classList } = container.firstChild as HTMLElement;

  expect(classList).toHaveLength(1);
  expect(classList).toContain("test");

  rerender(
    <DoorEffect className="test" open>
      Door effect!
    </DoorEffect>
  );

  expect(classList).toContain("test-open");

  rerender(
    <DoorEffect className="test" open={false}>
      Door effect!
    </DoorEffect>
  );

  expect(classList).toContain("test-closed");

  return new Promise(resolve => {
    setTimeout(() => {
      expect(classList).toHaveLength(1);
      expect(classList).toContain("test");
      resolve();
    }, 200);
  });
});
