"use client";
import { Fragment, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import useClickOutside from "../Utility/useClickOutside";

const VideoPopup_ = ({ close, videoID }) => {
  let domNode = useClickOutside(() => {
    close(false);
  });
  const [widthsize, setWidthsize] = useState('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setWidthsize(300);
      } else {
        setWidthsize(700);
      }
    };

    handleResize(); // Call initially to set the correct size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
   <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => close(false)}></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div ref={domNode} className="p-6 rounded-lg shadow-lg">
          <button
            title="Close"
            type="button"
            className="text-black float-right"
            onClick={() => close(false)}
          >
            ×
          </button>
          <ReactPlayer url={videoID} playing={true} controls width={widthsize} />
        </div>
      </div>
   </>
  );
};

const VideoPopup = ({ close, videoID }) => {
  return (
 
      <VideoPopup_ close={close} videoID={videoID} />
  
  );
};

export default VideoPopup;
