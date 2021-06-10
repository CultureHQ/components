/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Button from "./buttons/Button";
import Icon from "./Icon";
import Loader from "./Loader";

const ffmpeg = createFFmpeg({ log: true });

type ImageEditorProps = {
  video: any;
  onEdit?: (values: {thumbUrl: string, gifUrl: string}) => void;
  onFailure?: () => void;
};

const VideoEditor = ({
  video, onFailure = undefined, onEdit = undefined
}: ImageEditorProps):React.ReactElement => {
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const load = async () => {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const getThumbAndGif = async () => {
    setProcessing(true);
    // Write the file to memory
    ffmpeg.FS("writeFile", "video.mp4", await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run("-i", "video.mp4", "-t", "2.5", "-ss", "2.0", "-f", "gif", "gif.gif");
    await ffmpeg.run("-i", "video.mp4", "-ss", "00:00:01.000", "-vframes", "1", "thumbnail.png");

    // Read the result
    const videoGif = ffmpeg.FS("readFile", "gif.gif");
    const thumb = ffmpeg.FS("readFile", "thumbnail.png");

    // Create a URL
    const gifUrl = URL.createObjectURL(new Blob([videoGif.buffer], { type: "image/gif" }));
    const thumbUrl = URL.createObjectURL(new Blob([thumb.buffer], { type: "image/png" }));
    setProcessing(false);
    return { gifUrl, thumbUrl };
  };

  const handleSave = async () => {
    if (onEdit) {
      onEdit(await getThumbAndGif());
    }
  };

  if (loading) {
    return <Loader loading />;
  }

  return (
    <div className="chq-ied">
      <div className="chq-ied--ctrl">
        <Button primary onClick={handleSave}>
          <Icon icon="ios-camera-outline" /> Save
        </Button>
      </div>
      <div className="chq-ied--img">
        {processing && <Loader loading />}
        <video
          controls
          src={video || undefined}
          onError={onFailure}
        />
      </div>
    </div>
  );
};

export default VideoEditor;
