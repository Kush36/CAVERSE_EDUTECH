import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

const VideoPopup = ({
  isVideoOpen,
  setIsVideoOpen,
  videoId = "3EUxZANXXXc", // Shorts video ID
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  return (
    <ModalVideo
      channel="youtube"
      isOpen={isVideoOpen}
      videoId={videoId}
      onClose={() => setIsVideoOpen(false)}
    />
  );
};

export default VideoPopup;
