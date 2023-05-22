import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../context/store";
import LogoutLoader from "../../../general/loaders/LogoutLoader";

function TimeExceededModal({
    setCompletedModal,
    showCompletedModal,
    endExamination,
}) {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const {
        state: { school_test_data },
        dispatch,
    } = useContext(Context);

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.clear();
        setTimeout(() => {
            window.location.href = "/entrance";
        }, 1100);
    };

    //-----------------BACK TAB PREVENT--------------------------------
    // useEffect(() => {
    //     window.history.pushState(null, null, window.location.pathname);
    //     window.addEventListener("popstate", onBackButtonEvent);

    //     return () => {
    //         window.removeEventListener("popstate", onBackButtonEvent);
    //     };
    // }, []);

    // const onBackButtonEvent = (e) => {
    //     e.preventDefault();
    //     window.history.forward();
    // };

    //-----------------------------------------------------------------
    //---------------Mobile browser-----------------------------------
    // window.addEventListener("beforeunload", (event) => {
    //     event.preventDefault();
    //     event.returnValue = "";
    //     localStorage.clear();
    // });
    //----------------------------------------------------------------
    return (
        <BackContainer showCompletedModal={showCompletedModal}>
            <Overlay></Overlay>
            <ModalContainer showCompletedModal={showCompletedModal}>
                <TopImage>
                    <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/Asset+1+8.png"
                        alt="Sky"
                    />
                    <NotePad>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-01-2023/Group+(2).svg"
                            alt="Notepad"
                        />
                    </NotePad>
                </TopImage>
                <ContentBox>
                    <Title>Time Exceeded 🙁</Title>
                    <Desc>Your examination time has been exceeded</Desc>

                    <ButtonMainContiner>
                        <ButtonContinerTwo
                            onClick={() => {
                                setLoading(true);
                                endExamination(true, false);
                                // handleLogout();
                                localStorage.clear();
                                window.location.href = "/entrance";
                            }}
                        >
                            {isLoading ? (
                                <LogoutLoader />
                            ) : (
                                <>
                                    {" "}
                                    <LogoutImgContiner>
                                        <img
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-01-2023/Logout.svg"
                                            alt=""
                                        />
                                    </LogoutImgContiner>
                                    <span> Logout</span>
                                </>
                            )}
                        </ButtonContinerTwo>
                    </ButtonMainContiner>
                </ContentBox>
            </ModalContainer>
        </BackContainer>
    );
}

export default TimeExceededModal;

const BackContainer = styled.div`
    position: fixed;
    transition: 0.3s;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    left: 0;
    top: 0;
    display: ${({ showCompletedModal }) =>
        showCompletedModal ? "block" : "none"};
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
    height: 460px;
    transform: ${({ showCompletedModal }) =>
        showCompletedModal ? "scale(1,1)" : "scale(0,0)"};

    @media (max-width: 640px) {
        width: 440px;
    }
    @media all and (max-width: 480px) {
        width: 340px;
        height: 425px;
    }
    @media all and (max-width: 360px) {
        width: 305px;
        height: 425px;
    }
`;
const TopImage = styled.div`
    position: relative;
    img {
        width: 100%;
        display: block;
    }
`;
const NotePad = styled.span`
    display: inline-block;
    position: absolute;
    width: 125px;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 640px) {
        width: 120px;
        bottom: -7px;
    }
    @media all and (max-width: 480px) {
        width: 89px;
        bottom: -5px;
    }
`;

const ContentBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 50px;
    margin-top: 25px;
    @media all and (max-width: 480px) {
        padding: 0 30px;
        margin-top: 30px;
    }
`;
const Title = styled.h4`
    font-weight: 600;
    color: #2d2d2d;
    font-size: 16px;
    margin-bottom: 17px;
`;
const Desc = styled.p`
    color: #747474;
    font-size: 14px;
    text-align: center;
    margin-bottom: 27px;
    @media all and (max-width: 480px) {
        font-size: 13px;
    }
`;
const ButtonMainContiner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    @media all and (max-width: 480px) {
        flex-wrap: wrap;
    }
`;
const ButtonContiner = styled(Link)`
    display: flex;
    font-family: "gordita_medium";
    justify-content: center;
    align-items: center;
    background: linear-gradient(127.01deg, #edb420 -9.18%, #0f9ea7 129.96%);
    border-radius: 6px;
    cursor: pointer;
    gap: 10px;
    width: 220px;
    height: 54px;
    color: #fff;
    margin-right: 38px;
    @media all and (max-width: 768px) {
        height: 50px;
    }
    @media all and (max-width: 480px) {
        margin-right: 0px;
        margin-bottom: 20px;
        width: 300px;
        height: 45px;
    }
`;

const ButtonContinerTwo = styled.div`
    font-family: "gordita_medium";
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 220px;
    height: 54px;
    border: 1px solid #e02b1d;
    border-radius: 6px;
    cursor: pointer;
    text-decoration: none;

    @media all and (max-width: 768px) {
        height: 50px;
    }
    @media all and (max-width: 480px) {
        margin-right: 0px;
        margin-bottom: 20px;
        width: 300px;
        height: 45px;
    }
    h5 {
        font-size: 20px;
        text-align: center;
        color: #e02b1d;
        @media all and (max-width: 980px) {
            font-size: 16px;
        }
        @media all and (max-width: 768px) {
            font-size: 14px;
        }
        @media all and (max-width: 480px) {
            margin-right: 0px;
            margin-bottom: 20px;
            width: 300px;
            height: 45px;
        }
        span {
            font-size: 20px;
            text-align: center;
            color: #e02b1d;
            @media all and (max-width: 980px) {
                font-size: 16px;
            }
            @media all and (max-width: 768px) {
                font-size: 14px;
            }
            @media all and (max-width: 480px) {
                font-size: 12px;
            }
        }
    }
`;
const LogoutImgContiner = styled.div`
    img {
    }
`;
