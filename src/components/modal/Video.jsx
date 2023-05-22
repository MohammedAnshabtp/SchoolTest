import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import "../application/assets/css/styles.css";
import VideoPlayer from "../application/video-player/src/VideoPlayer";
import $ from "jquery";

function VideoModal({ isModal, setModal, videoUrl, modalType }) {
    const videoJsOptions = {
        autoplay: true,
        controls: false,
    };
    useEffect(() => {
        if (isModal) {
            $("html").addClass("modal-enabled");
        } else {
            $("html").removeClass("modal-enabled");
        }
    }, [isModal]);
    return (
        isModal && (
            <>
                <BackContainer id="invite-video">
                    <Overlay onClick={() => setModal(false)}></Overlay>
                    <VideoModalContainer>
                        <Video className="player-wrapper">
                            <VideoPlayer
                                {...videoJsOptions}
                                // source={videoUrl}

                                source={
                                    modalType
                                        ? "https://youtu.be/T5hOw5M5TeE"
                                        : "https://youtu.be/T5hOw5M5TeE"
                                }
                                // source={
                                //     "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
                                // }
                            />
                        </Video>

                        <CloseIconContainer onClick={() => setModal(false)}>
                            <CloseIcon
                                src={
                                    require("../../assets/images/school-scientist/close.svg")
                                        .default
                                }
                                alt="cross icon"
                            />
                        </CloseIconContainer>
                    </VideoModalContainer>
                </BackContainer>
            </>
        )
    );
}
export default VideoModal;
const videoAnimation = keyframes`
 0% { transform:scale(0,0); opacity:0; }
 100% { transform:scale(1,1); opacity:1; }
`;
const BackContainer = styled.div`
    position: fixed;
    transition: 0.3s;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    left: 0;
    top: 0;
    animation-name: ${videoAnimation};
    animation-duration: 0.3s;
`;
const Overlay = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
`;

const VideoModalContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 9px;
    background-color: #000;
    width: 70%;
    @media (max-width: 480px) {
        width: 97%;
    }
`;
const Video = styled.div`
    position: relative;
`;
const CloseIcon = styled.img`
    display: block;
    width: 100%;
`;
const CloseIconContainer = styled.div`
    position: absolute;
    top: 0;
    right: -35px;
    width: 25px;
    cursor: pointer;
    @media (max-width: 640px) {
        right: -30px;
        width: 22px;
    }
    @media (max-width: 480px) {
        right: 0;
        top: -28px;
        width: 20px;
    }

    // const BackContainer = styled.div
`;
//   position: fixed;
//   transition: 0.3s;
//   width: 100%;
//   height: 100vh;
//   z-index: 1000;
//   left: 0;
//   top: 0;
//   animation-name: ${videoAnimation};
//   animation-duration: 0.3s;
// `;
// const Overlay = styled.div`
//   background-color: rgba(0, 0, 0, 0.5);
//   width: 100%;
//   height: 100vh;
// `;

// const VideoModalContainer = styled.div`
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   border-radius: 9px;
//   width: 30%;
//   @media (max-width: 1080px) {
//     display: flex;
//     justify-content: center;
//   }
// `;
// const VideoBox = styled.div`
//   width: 500px;
// `;
// const Video = styled.div`
//   position: relative;
// `;
// const CloseIcon = styled.img`
//   display: block;
//   width: 100%;
// `;
// const CloseIconContainer = styled.div`
//   position: absolute;
//   top: 0;
//   right: -35px;
//   width: 17px;
//   cursor: pointer;
//   right: -85px;
//   width: 20px;

//   @media all and (max-width: 1280px) {
//     right: -123px;
//     top: -15px;
//     width: 15px;
//   }
//   @media all and (max-width: 1080px) {
//     right: -50px;
//   }
//   @media all and (max-width: 980px) {
//     right: -80px;
//   }
//   @media all and (max-width: 768px) {
//     right: -100px;
//   }
//   @media all and (max-width: 640px) {
//     right: -135px;
//   }
//   @media all and (max-width: 480px) {
//     right: -110px;
//     top: 7px;
//   }
//   @media all and (max-width: 393px) {
//     right: -127px;
//     top: -21px;
//   }
//   @media all and (max-width: 360px) {
//     right: -110px;
//     top: 7px;
//   }
// `;
