import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, number, text } from "@storybook/addon-knobs";

import { MediaField, Form, Panel } from "../../src/components";
import { MediaFieldValue } from "../../src/components/form/MediaField";

const Container = (props: React.ComponentProps<typeof MediaField>) => (
  <Panel>
    <Panel.Body>
      <Form onSubmit={() => {}} style={{ height: "600px" }}>
        <MediaField {...props} />
      </Form>
    </Panel.Body>
  </Panel>
);

storiesOf("Form/MediaField", module)
  .add("default", () => {
    const children = text("children", "Image");
    const props = {
      aspectRatio: number("aspectRatio", 1),
      autoFocus: boolean("autoFocus", false),
      onChange: action("onChange"),
      progress: number("progress", 0),
      name: text("name", "image"),
      required: boolean("required", false),
      value: text("value", "culture.png")
    };

    return <Container {...props}>{children}</Container>;
  })
  .add("aspectRatio", () => (
    <Container name="image" aspectRatio={1}>Image</Container>
  ))
  .add("autoFocus", () => <Container name="image" autoFocus>Image</Container>)
  .add("required", () => <Container name="image" required>Image</Container>)
  .add("backgroundImage", () => {
    const [selectedImage, setSelectedImage] = useState("https://images.unsplash.com/photo-1525546822429-a214a6739ee7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80");
    const onChange = (media: any, _thumbUrl: any, _gifUrl: any, _duration: any) => {
      setSelectedImage(media);
    };
    return (
      <Container imageAsBackground onChange={onChange} name="image" required value={selectedImage} buttonLabel="Upload your own media"><></></Container>
    );
  })
  .add("backgroundVideo", () => {
    const [selectedVideo, setSelectedVideo]: [any, any] = useState("https://images.unsplash.com/photo-1525546822429-a214a6739ee7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80");// "http://localhost:3001/38e345e1-0aa2-4cd6-9540-5ea5de345b24");
    const [_thumb, setThumb] = useState();// "http://localhost:3001/287fd1d9-2e1a-4ef6-a19d-d18198a2763d");
    const [selectedThumbnailUrl, setSelectedThumbnailUrl]: [any, any] = useState();// "http://localhost:3001/287fd1d9-2e1a-4ef6-a19d-d18198a2763d");
    // const [progress, setProgress] = useState(0);
    const onChange = (media: any, thumbUrl: any, _gifUrl: any, _duration: any) => {
      if (media) {
        if (media.type.startsWith("video/")) {
          if (thumbUrl) {
            setThumb(thumbUrl);
            setSelectedThumbnailUrl(URL.createObjectURL(thumbUrl));
          }
        }
        setSelectedVideo(media);
      }
    };

    const getSelectedMedia = () => {
      if (selectedVideo?.type?.startsWith("video/")) {
        return URL.createObjectURL(selectedVideo);
      }

      return selectedVideo;
    };

    const onProcessing = (_: boolean) => {};
    /*
    const onTimeout = () => {
      console.log("increase");
      setProgress(progress + 1);
    };

    setTimeout(onTimeout, 50);
    console.log(thum && (typeof thum === "string" ? thum : URL.createObjectURL(thum)));
    console.log(getSelectedMedia());
    */
    /*
    if (thum) {
      const onTimeout = () => {
        setProgress(progress + 1);
      };

      setTimeout(onTimeout, 50);
    }
    */
    return (
      <Container
        videoThumb={selectedThumbnailUrl}
        imageAsBackground
        onChange={onChange}
        onProcessing={onProcessing}
        name="image"
        required
        value={getSelectedMedia()}
        buttonLabel="Upload your own media"
        showControls={false}
      >
        <></>
      </Container>
    );
  })
  .add("validator", () => {
    const validator = (value: MediaFieldValue) => {
      if (value instanceof File && value.type === "image/png") {
        return null;
      }
      return "We only support pngs.";
    };

    return (
      <Container name="image" required validator={validator}>Image</Container>
    );
  });
