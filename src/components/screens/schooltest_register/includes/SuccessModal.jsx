import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import closeImage from "../../../../assets/images/school-scientist/close.svg";
import successImage from "../../../../assets/images/school-scientist/success-image.svg";
import { Context } from "../../../context/store";
import bodymovin from "lottie-web";
import Success from "../../../general/loaders/Success";
import { AxiosInstance } from "../../../../axiosInstance";
import LogoutLoader from "../../../general/loaders/LogoutLoader";

function SuccessModal({
    successModal,
    setSuccessModal,
    phoneNumber,
    admissionNumber,
}) {
    const [registered, setRegistered] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const navigate = useNavigate();
    const {
        dispatch,
        state: { school_test_data },
    } = useContext(Context);
    const handleSubmit = () => {
        dispatch({
            type: "UPDATE_SCHOOL_TEST_DATA",
            school_test_data: {},
        });
    };

    //----------Blast popper-------------------------------
    const [isPlaying, setIsPlaying] = useState(false);
    const svgContainer = document.getElementById("svg");
    const playAnimation = () => {
        setIsPlaying(true);
        svgContainer.classList.remove("hide");
        const animItem = bodymovin.loadAnimation({
            wrapper: svgContainer,
            animType: "svg",
            loop: false,
            autoplay: false,
            path: "https://assets2.lottiefiles.com/packages/lf20_u4yrau.json",
        });
        animItem.goToAndPlay(0, true);

        animItem.addEventListener("complete", () => {
            setIsPlaying(false);
            svgContainer.classList.add("hide");
        });
    };
    //---------------------------------------------------------

    //-----------Go to Exam -----------------------------------
    const ExamCall = () => {
        const formData = new FormData();
        formData.append("phone", phoneNumber);
        formData.append("admission_number", admissionNumber);
        if (phoneNumber && admissionNumber) {
            setLoading(true);
            AxiosInstance.post("api/v1/accounts/student/login/", formData)
                .then((response) => {
                    const { app_data } = response.data;
                    if (app_data.StatusCode === 6000) {
                        setError(false);
                        setLoading(false);
                        localStorage.setItem(
                            "newToken",
                            app_data.data.access_token
                        );
                        dispatch({
                            type: "UPDATE_SCHOOL_TEST_DATA",
                            school_test_data: {
                                ...school_test_data,
                                exam_status: app_data.data.exam_status,
                                exam_pk: app_data.data.exam_pk,
                                name: app_data.data.name,
                                access_token: app_data.data.access_token,
                                refresh_token: app_data.data.refresh_token,
                                is_verified: true,
                                student_category:
                                    app_data.data.student_category,
                                is_loading: false,
                                date: app_data.data.exam_end_date_time,
                                predate: app_data.data.exam_start_date_time,
                                total_time_allotted:
                                    app_data.data.total_time_allotted,
                                total_questions: app_data.data.total_questions,
                            },
                        });
                        navigate({
                            pathname:
                                app_data.data.exam_status === "pending"
                                    ? "/entrance/instructions"
                                    : app_data.data.exam_status === "attending"
                                    ? "/entrance/questions"
                                    : app_data.data.exam_status === "completed"
                                    ? "/entrance/completed"
                                    : app_data.data.exam_status === "Expired"
                                    ? "/entrance/expired"
                                    : app_data.data.exam_status === "Commence"
                                    ? "/entrance/commence"
                                    : "/entrance",
                            state: {
                                data: app_data.data,
                            },
                        });
                    } else if (app_data.StatusCode === 6001) {
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setError(true);
        }
    };
    //---------------------------------------------------------

    return (
        <>
            <Overlay
                onClick={() => setSuccessModal(false)}
                className={successModal ? "active" : ""}
            ></Overlay>
            <BackContainer style={{ transform: successModal && "scale(1,1)" }}>
                <Modal>
                    <TitleSection>
                        <Left>
                            <TickImage>
                                <img src={successImage} alt="Tick" />
                            </TickImage>
                            <Title>Successfully Registered</Title>
                        </Left>

                        <Close
                            onClick={() => {
                                setSuccessModal(false);
                                handleSubmit();
                                navigate("/");
                            }}
                        >
                            <img src={closeImage} alt="Close" />
                        </Close>
                    </TitleSection>
                    <Container>
                        <InputDescription>
                            You have successfully registered for
                            <span> School Test.</span>
                        </InputDescription>
                        <Note>
                            Note: The time for writing the exam is from 9 AM in
                            the morning until 10 PM at night every day.
                        </Note>
                    </Container>
                    <DirectionButton>
                        <Button
                            onClick={() => {
                                setSuccessModal(false);
                                handleSubmit();
                                navigate("/");
                            }}
                        >
                            I will attend later
                        </Button>

                        <AttendButton
                            onClick={() => {
                                ExamCall();
                            }}
                        >
                            Go to exam
                        </AttendButton>
                    </DirectionButton>
                </Modal>
            </BackContainer>
        </>
    );
}

export default SuccessModal;

const BackContainer = styled.div`
    position: fixed;
    transition: all 0.3s ease;
    transform: scale(0, 0);
    width: 100%;
    height: 100vh;
    z-index: 10000;
    left: 0;
    top: 0px;
    backdrop-filter: blur(4px);

    &.active {
        transform: scale(1);
    }
`;
const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1000;
    display: none;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.5);
    &.active {
        display: block;
    }
`;
const Modal = styled.div`
    width: 700px;
    max-height: 90vh;
    height: 300;
    overflow: hidden;
    margin: 0 auto;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 50px;
    border-radius: 10px;
    transition: all 0.4s ease;
    z-index: 101;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-size: contain;
    background-repeat: no-repeat;
    max-width: 500px;
    @media (max-width: 640px) {
        padding: 30px;
    }
    @media (max-width: 560px) {
        max-width: 400px;
    }
    @media (max-width: 450px) {
        max-width: 350px;
        padding: 25px;
    }
    @media (max-width: 390px) {
        max-width: 300px;
    }
`;
const InputDescription = styled.p`
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    align-self: baseline;
    font-size: 16px;
    color: #333333;
    span {
        color: black;
        font-weight: 500;
        font-family: "gordita_medium";
        margin-left: 5px;
        @media (max-width: 640px) {
            margin-left: 2px;
        }
    }
    @media (max-width: 640px) {
        flex-wrap: wrap;
    }
    @media (max-width: 560px) {
        width: 100%;
    }
    @media (max-width: 480px) {
        font-size: 14px;
    }
    @media (max-width: 360px) {
        font-size: 12px;
        margin-left: unset;
    }
`;
const Note = styled.p`
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    align-self: baseline;
    font-size: 14px;
    /* color: #333333; */
    color: black;
    font-weight: 700;
    span {
        color: black;
        font-weight: 500;
        font-family: "gordita_medium";
        margin-left: 5px;
        @media (max-width: 640px) {
            margin-left: 2px;
        }
    }
    @media (max-width: 640px) {
        flex-wrap: wrap;
    }
    @media (max-width: 560px) {
        width: 100%;
    }
    @media (max-width: 480px) {
        font-size: 14px;
    }
    @media (max-width: 360px) {
        font-size: 12px;
        margin-left: unset;
    }
`;

const Close = styled.span`
    width: 15px;
    display: block;
    cursor: pointer;
    margin-left: auto;
    margin-right: 0;
    img {
        display: block;
        width: 100%;
    }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 25px;
    position: relative;
`;
const DirectionButton = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    @media all and (max-width: 640px) {
        flex-wrap: wrap;
        justify-content: space-around;
    }
`;
const Button = styled.span`
    font-size: 16px;
    padding: 5px 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #d2042d;
    color: #d2042d;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 190px;
    @media (max-width: 640px) {
        margin-bottom: 10px;
    }
    @media (max-width: 480px) {
        width: 160px;
        font-size: 14px;
    }
    @media (max-width: 340px) {
        font-size: 14px;
    }
`;
const AttendButton = styled.span`
    font-size: 16px;
    background: linear-gradient(90deg, #a3080c 1.55%, #d2042d 100%);
    padding: 5px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-family: "gordita_medium";
    border: 1px solid #d2042d;
    color: #fff;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 190px;
    @media (max-width: 480px) {
        width: 160px;
        font-size: 14px;
    }
    @media (max-width: 340px) {
        font-size: 14px;
    }
`;

const TitleSection = styled.div`
    padding-bottom: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #e7e6e6;
    @media (max-width: 480px) {
        padding-bottom: 15px;
    }
`;

const Title = styled.h2`
    font-family: "gordita_medium";
    font-size: 20px;
    color: #000;
    @media (max-width: 640px) {
        font-size: 18px;
    }
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

const Left = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
const TickImage = styled.div`
    width: 15%;
    margin-right: 10px;

    img {
        width: 100%;
        display: block;
    }
    @media (max-width: 480px) {
        width: 12%;
    }
`;
