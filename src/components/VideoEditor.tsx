import React, { useEffect } from "react";
import Loader from "./Loader";
import { MediaFieldVal } from "./form/MediaField";

type ImageEditorProps = {
  video: MediaFieldVal;
  onEdit?: (output: MediaFieldVal, thumb: Blob) => void;
  onProcessing?: (value: boolean) => void;
  asButtonView?: boolean;
};

const VideoEditor = ({
  video, onEdit, onProcessing, asButtonView
}: ImageEditorProps):React.ReactElement => {
  useEffect(() => {
    const processVideo = async () => {
      const getVideoUrl = (input: MediaFieldVal): string => {
        if (typeof input === 'string') return input;

        return URL.createObjectURL(input);
      };

      const videoUrl = getVideoUrl(video);
      const videoElement = document.createElement("video");
      videoElement.src = videoUrl;
      videoElement.currentTime = 1;

      const blobThumb = await new Promise<Blob>((resolve, reject) => {
        videoElement.addEventListener("loadeddata", () => {
          const canvas = document.createElement("canvas");
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          const context = canvas.getContext("2d");

          if (context) {
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(blob => {
              if (blob) {
                // Only revoke URL if we created it
                if (typeof video !== 'string') URL.revokeObjectURL(videoUrl);
                resolve(blob);
              } else {
                if (typeof video !== 'string') URL.revokeObjectURL(videoUrl);
                reject(new Error("Failed to create blob from canvas"));
              }
            }, "image/png");
          } else {
            if (typeof video !== 'string') URL.revokeObjectURL(videoUrl);
            reject(new Error("Failed to get canvas context"));
          }
        });

        videoElement.addEventListener("error", () => {
          if (typeof video !== 'string') URL.revokeObjectURL(videoUrl);
          reject(new Error("Error loading video"));
        });
      });

      return { blobThumb };
    };

    const handleSave = async () => {
      if (onEdit) {
        if (onProcessing) onProcessing(true);
        const { blobThumb } = await processVideo();
        if (onProcessing) onProcessing(false);
        onEdit(video, blobThumb);
      }
    };

    const load = async () => {
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
