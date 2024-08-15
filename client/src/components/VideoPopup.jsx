"use client";
import { Fragment } from "react";
import ReactPlayer from "react-player";
import useClickOutside from "../Utility/useClickOutside";

const VideoPopup_ = ({ close, videoID }) => {
  let domNode = useClickOutside(() => {
    close(false);
  });

  return (
    <Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => close(false)}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div ref={domNode} className=" p-6 rounded-lg shadow-lg">
          <button
            title="Close"
            type="button"
            className="text-black float-right"
            onClick={() => close(false)}
          >
            ×
          </button>
          <ReactPlayer url={videoID} playing={true} controls />
        </div>
      </div>
    </Fragment>
  );
};

const VideoPopup = ({ close, videoID }) => {
  return (
    <Fragment>
      <VideoPopup_ close={close} videoID={videoID} />
    </Fragment>
  );
};

export default VideoPopup;
