import React, { useState } from "react";
import { mount } from "enzyme";

import FileField from "../FileField";

const FileFieldContainer = props => {
  const [value, setValue] = useState(null);

  return <FileField {...props} value={value} onChange={setValue} />;
};

const mountWithUtils = component => {
  const mounted = mount(component);

  return Object.assign(mounted, {
    selectFiles: files => (
      mounted.find("input[type='file']").simulate("change", { target: { files } })
    ),
    getFileSummary: () => mounted.find(".chq-ffd--fd").text()
  });
};

test("passes on className", () => {
  const component = mount(<FileField name="name" className="file-field" />);

  expect(component.find("label").hasClass("chq-ffd")).toBe(true);
  expect(component.find("label").hasClass("file-field")).toBe(true);
});

test("calls up to callbacks if they are provided", () => {
  const file = { name: "foo" };

  const response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };

  const component = mountWithUtils(
    <FileField
      name="file"
      value={file}
      onChange={changeValue => {
        Object.assign(response, { changeValue });
      }}
      onFormChange={(formChangeName, formChangeValue) => {
        Object.assign(response, { formChangeName, formChangeValue });
      }}
    />
  );

  component.selectFiles([file]);

  expect(response).toEqual({
    changeValue: file,
    formChangeName: "file",
    formChangeValue: file
  });
});

test("tracks touch status in component state", () => {
  const component = mount(<FileField name="name" required />);
  expect(component.text()).not.toContain("Required");

  component.find("input[type='file']").simulate("change", {
    target: { files: [{ foo: "bar" }] }
  });
  expect(component.text()).toContain("Required");
});

test("works with multiple files", () => {
  const files = [{ name: "foo" }, { name: "bar" }, { name: "baz" }];

  const response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };

  const component = mountWithUtils(
    <FileField
      multiple
      value={files}
      name="files"
      onChange={changeValue => {
        Object.assign(response, { changeValue });
      }}
      onFormChange={(formChangeName, formChangeValue) => {
        Object.assign(response, { formChangeName, formChangeValue });
      }}
    />
  );

  component.selectFiles(files);

  expect(response).toEqual({
    changeValue: files,
    formChangeName: "files",
    formChangeValue: files
  });
});

test("displays an accurate summary", () => {
  const files = [{ name: "foo" }, { name: "bar" }, { name: "baz" }];
  const component = mountWithUtils(<FileFieldContainer multiple name="files" />);

  component.selectFiles(files);
  expect(component.getFileSummary()).toEqual("foo, bar, baz");

  component.selectFiles([]);
  expect(component.getFileSummary()).toEqual("");
});

test("accepts autoFocus", () => {
  mount(<FileField name="file" autoFocus />);

  expect(document.activeElement.id).toEqual("file");
});
