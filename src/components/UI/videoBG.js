import React from "react";
import videoBG from "./assets/retro-arcade-background.mp4";

const Video = () => {
    return (
        <div>
            <video src={videoBG} autoPlay loop muted />
        </div>
    )
}

export default Video;