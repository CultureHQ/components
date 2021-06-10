/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Loader from "./Loader";

const ffmpeg = createFFmpeg({ log: false });

type ImageEditorProps = {
  video: any;
  onEdit?: (thumbUrl: string) => void;
};


const VideoEditor = ({
  video, onEdit = undefined
}: ImageEditorProps):React.ReactElement => {
  useEffect(() => {
    const getThumbAndGif = async () => {
      // Write the file to memory
      ffmpeg.FS("writeFile", "video.mp4", await fetchFile(video));

      // Run the FFMpeg command
      await ffmpeg.run("-i", "video.mp4", "-ss", "00:00:00.000", "-vframes", "1", "thumbnail.png");

      // Read the result
      const thumb = ffmpeg.FS("readFile", "thumbnail.png");

      // Create a URL
      const thumbUrl = URL.createObjectURL(new Blob([thumb.buffer], { type: "image/png" }));
      return thumbUrl;
    };

    const handleSave = async () => {
      if (onEdit) {
        onEdit(await getThumbAndGif());
      }
    };
    const load = async () => {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }
      await handleSave();
    };

    load();
  }, [video, onEdit]);

  return <Loader loading />;
};

export default VideoEditor;
