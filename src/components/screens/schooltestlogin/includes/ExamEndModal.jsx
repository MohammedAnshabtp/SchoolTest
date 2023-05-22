import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useCountdown } from "../../../hooks/useCountdown";
import RequestLoader from "../../../general/loaders/RequestLoader";
import { Context } from "../../../context/store";

function ExamEndModal({
    endExamination,
    handleExamCompleted,
    completedloading,
    setEndModal,
    showEndModal,
}) {
    const {
        state: { school_test_data },
        dispatch,
    } = useContext(Context);
    const [days, hours, minutes, seconds, isLoading, isDanger] = useCountdown(
        school_test_data.end_timestamp
    );
    //---------------Mobile browser-----------------------------------
    // window.addEventListener("beforeunload", (event) => {
    //     event.preventDefault();
    //     event.returnValue = "";
    //     localStorage.clear();
    // });
    //----------------------------------------------------------------

    return (
        <BackContainer showEndModal={showEndModal}>
            <Overlay></Overlay>
            <ModalContainer showEndModal={showEndModal}>
                <TopImage>
                    <img
                        src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/Asset+1+8.png"
                        alt="Sky"
                    />
                    <NotePad>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-01-2023/Frame+(1).svg"
                            alt="Notepad"
                        />
                    </NotePad>
                </TopImage>
                <ContentBox>
                    <Title>Are you sure you want to end the test?</Title>

                    <ButtonsDiv>
                        {!completedloading ? (
                            <CancelBtn
                                onClick={() => {
                                    setEndModal(false);
                                }}
                            >
                                Cancel
                            </CancelBtn>
                        ) : (
                            <CancelBtn className="disabled">Cancel</CancelBtn>
                        )}

                        {!completedloading ? (
                            <>
                                <EndBtn
                                    onClick={() => {
                                        handleExamCompleted("end");
                                        setEndModal(true);
                                        endExamination(false, true);
                                        localStorage.clear();
                                        window.location.href = "/entrance";
                                    }}
                                >
                                    End Test
                                </EndBtn>
                            </>
                        ) : (
                            <EndBtn>
                                <RequestLoader />
                            </EndBtn>
                        )}
                    </ButtonsDiv>
                </ContentBox>
            </ModalContainer>
        </BackContainer>
    );
}

export default ExamEndModal;

const BackContainer = styled.div`
    position: fixed;
    transition: 0.3s;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    left: 0;
    top: 0;
    display: ${({ showEndModal }) => (showEndModal ? "block" : "none")};
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
    height: 400px;
    transform: ${({ showEndModal }) =>
        showEndModal ? "scale(1,1)" : "scale(0,0)"};

    @media (max-width: 640px) {
        width: 420px;
        height: 330px;
    }
    @media all and (max-width: 480px) {
        width: 340px;
        /* height: 490px; */
    }
    @media all and (max-width: 360px) {
        width: 305px;
        height: 300px;
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
    width: 100px;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 640px) {
        width: 90px;
        bottom: -47px;
    }
    @media all and (max-width: 480px) {
        width: 70px;
        bottom: -20px;
    }
`;

const ContentBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 50px;
    margin-top: 60px;
    @media all and (max-width: 480px) {
        padding: 0 30px;
        margin-top: 30px;
    }
`;
const Title = styled.h4`
    color: #2d2d2d;
    font-size: 16px;
    margin-bottom: 17px;
    font-weight: 600;
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
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
const ButtonsDiv = styled.div`
    display: flex;
    justify-content: center;
`;
const CancelBtn = styled.span`
    background: linear-gradient(90deg, #a3080c 1.55%, #d2042d 100%);
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    width: 140px;
    height: 40px;
    cursor: pointer;
    margin-right: 10px;
    font-size: 15px;
    &.disabled {
        filter: opacity(0.5);
        cursor: not-allowed;
    }
    @media all and (max-width: 480px) {
        width: 120px;
    }
`;
const EndBtn = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9e1b32;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    width: 140px;
    height: 40px;
    font-size: 15px;
    text-decoration: none;

    /* margin-top: 30px; */
    @media all and (max-width: 480px) {
        width: 120px;
    }
`;
