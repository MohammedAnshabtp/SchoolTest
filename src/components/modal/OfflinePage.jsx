import React from "react";
import styled from "styled-components";
import ClockTimer from "../general/ClockTimer";

function OfflinePage({ isOffline, reloadWebPage }) {
    return (
        <BackContainer isOffline={isOffline}>
            <Overlay></Overlay>
            <ModalContainer isOffline={isOffline}>
                <TopCover>
                    <WifiContainer>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/26-01-2023/no-wifi.svg"
                            alt="No Wifi"
                        />
                    </WifiContainer>
                    <TimerContainer>
                        <ClockTimer />
                    </TimerContainer>
                </TopCover>
                <BottomCover>
                    <Heading>Network not found!</Heading>
                    <Para>Check your connection and try again</Para>
                </BottomCover>
                <Button onClick={reloadWebPage}>Retry</Button>
            </ModalContainer>
        </BackContainer>
    );
}

export default OfflinePage;

const BackContainer = styled.div`
    position: fixed;
    transition: 0.3s;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    left: 0;
    top: 0;
    display: ${({ isOffline }) => (isOffline ? "block" : "none")};
`;
const Overlay = styled.div`
    backdrop-filter: blur(4px);

    width: 100%;
    height: 100vh;
`;

const ModalContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) !important;
    border-radius: 9px;
    overflow: hidden;
    transition: all;
    background-color: #fff;
    width: 550px;
    height: 550px;
    transform: ${({ isOffline }) => (isOffline ? "scale(1,1)" : "scale(0,0)")};
    padding: 130px 0px 60px 0px;

    @media (max-width: 640px) {
        width: 440px;
    }
    @media all and (max-width: 480px) {
        width: 340px;
        height: 450px;
    }
    @media all and (max-width: 360px) {
        width: 305px;
        height: 400px;
    }
`;

const TopCover = styled.div`
    position: relative;
    margin-bottom: 50px;
`;
const WifiContainer = styled.div`
    width: 15%;
    margin: 0 auto;
    img {
        width: 100%;
        display: block;
    }
`;
const TimerContainer = styled.div`
    position: absolute;
    top: 58%;
    left: 44.5%;
`;
const BottomCover = styled.div`
    width: 75%;
    margin: 0 auto;
`;
const Heading = styled.h3`
    color: #4d4d4d;
    font-size: 24px;
    font-family: "gordita_medium";
    text-align: center;
    margin-bottom: 20px;
`;
const Para = styled.p`
    color: #949494;
    font-size: 16px;
    text-align: center;
    margin-bottom: 40px;
`;
const Button = styled.button`
    font-size: 16px;
    /* background: linear-gradient(90deg, #0a4771 1.55%, #1d74af 100%); */
    background: linear-gradient(90deg, #a3080c 1.55%, #d2042d 100%);

    border-radius: 6px;
    width: 30%;
    display: block;
    margin: 0 auto;
    padding: 15px 0;
    color: #fff;
    text-align: center;
    cursor: pointer;
`;
