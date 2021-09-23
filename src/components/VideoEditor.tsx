/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Loader from "./Loader";

const ffmpeg = createFFmpeg({
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
  log: false
});

type ImageEditorProps = {
  video: any;
  onEdit?: (thumb: Blob) => void;
  onProcessing?: (value: boolean) => void;
  asButtonView?: boolean;
};

const VideoEditor = ({
  video, onEdit, onProcessing, asButtonView
}: ImageEditorProps):React.ReactElement => {
  useEffect(() => {
    const getThumb = async () => {
      // Write the file to memory
      ffmpeg.FS("writeFile", "video.mp4", await fetchFile(video));

      // Run the FFMpeg command
      await ffmpeg.run("-i", "video.mp4", "-ss", "00:00:00.000", "-vframes", "1", "thumbnail.png");

      // Read the result
      const thumb = ffmpeg.FS("readFile", "thumbnail.png");
      const blobThumb = new Blob([thumb.buffer], { type: "image/png" });

      return blobThumb;
    };

    const handleSave = async () => {
      if (onEdit) {
        if (onProcessing) {
          onProcessing(true);
        }
        const result = await getThumb();
        if (onProcessing) {
          onProcessing(false);
        }
        onEdit(result);
      }
    };
    const load = async () => {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }
      await handleSave();
    };

    load();
  }, [video, onEdit, onProcessing]);

  if (asButtonView) {
    return <></>;
  }

  return <Loader loading />;
};

export default VideoEditor;
