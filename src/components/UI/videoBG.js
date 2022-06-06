import React from "react";
import videoBG from "./assets/retro-arcade-background.mp4";

const Video = () => {
    return (
        <div>
            <video src={videoBG} autoPlay={true} loop={true} muted={true} />
        </div>
    )
}

export default Video;