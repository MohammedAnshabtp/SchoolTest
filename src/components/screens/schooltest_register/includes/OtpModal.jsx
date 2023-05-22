import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import closeImage from "../../../../assets/images/school-scientist/close.svg";
import { accountsConfig } from "../../../../axiosConfig";
import RequestLoader from "../../../general/loaders/RequestLoader";
import ReactWhatsapp from "react-whatsapp";
import Success from "../../../general/loaders/Success";
import SuccessModal from "./SuccessModal";
import { AxiosInstance } from "../../../../axiosInstance";

function OtpModal({
    isOtpModal,
    setOtpModal,
    viewPhone,
    setSuccessModal,
    phone,
    name,
    isClass,
    studentDivision,
    isStream,
    campusPk,
    CampusName,
    clearInputField,
    state,
    setPhoneNumber,
    phoneNumber,
    admissionNumber,
    setPhonNumber,
    setAdmissionNumber,
}) {
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isResendSuccess, setResendSuccess] = useState(null);
    const [isResendLoading, setResendLoading] = useState(false);
    const [counter, setCounter] = useState(20);
    const [resend, setResend] = useState("");
    const [successShow, setSuccessShow] = useState(false);

    const recaptchaRef = useRef(null);
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        } else if (e.keyCode === 69) {
            e.preventDefault();
        }
    };

    const onChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setOtp(e.target.value);
            setErrorMessage("");
        }
    };
    const handleSuccess = () => {
        setSuccessShow(true);
        setTimeout(() => {
            setOtpModal(false);
            setSuccessModal(true);
        }, 2000);
    };

    const renderSubmit = () => {
        const formData = new FormData();
        formData.append("country", "IN");
        formData.append("phone", phone);
        formData.append("otp", otp);

        if (otp !== "") {
            setLoading(true);

            AxiosInstance.post(
                `api/v1/accounts/creator-club/registration/verify/`,
                formData
            )
                .then((response) => {
                    setLoading(false);
                    const { app_data } = response.data;

                    if (app_data.StatusCode === 6000) {
                        setOtp("");
                        setCounter(20);
                        setError(false);
                        setErrorMessage("");
                        clearInputField();
                        handleSuccess();
                        setPhonNumber(app_data.data.phone);
                        setAdmissionNumber(app_data.data.admission_number);
                    } else {
                        setErrorMessage(app_data.data.message);
                        setError(true);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                });
        } else {
            setError(true);
            setErrorMessage("Please enter OTP");
        }
    };

    // resend otp============================
    const resendOtp = async () => {
        const formData = new FormData();
        formData.append("country", "IN");
        formData.append("phone", phone);
        formData.append("otp", otp);

        setLoading(true);

        AxiosInstance.post(`api/v1/accounts/resend/otp/`, formData)
            .then((response) => {
                setLoading(false);
                const { app_data } = response.data;
                setOtp("");
                setErrorMessage("");

                if (app_data.StatusCode === 6000) {
                    setError(false);
                    setCounter(20);
                    setOtp("");
                    setResend("OTP does not exist. Try again");
                    setErrorMessage("");
                    setPhonNumber(app_data.data.phone);
                    setAdmissionNumber(app_data.data.admission_number);
                } else if (app_data.StatusCode === 6001) {
                    setErrorMessage(app_data.data.message);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    // timer function======================
    const Timer = ({
        resendOtp,
        isLoading,
        isResendSuccess,
        otpErrorMessage,
    }) => {
        useEffect(() => {
            isOtpModal &&
                counter > 0 &&
                setTimeout(() => setCounter(counter - 1), 1000);
        }, [counter]);

        return (
            <TimerMainContainer>
                {counter === 0 ? (
                    <TimerContainer onClick={resendOtp}>
                        {isResendSuccess ? (
                            <SendIcon
                                className="las la-check-circle"
                                style={{
                                    color: isResendSuccess
                                        ? "#a3080c"
                                        : isResendSuccess === false
                                        ? "#f44336"
                                        : "#000",
                                }}
                            ></SendIcon>
                        ) : isResendSuccess === false ? (
                            <SendIcon
                                style={{ color: "#f44336" }}
                                className="las la-exclamation-circle"
                            ></SendIcon>
                        ) : (
                            <SendIcon
                                className={`las la-undo-alt ${
                                    isLoading && "loader"
                                }`}
                            ></SendIcon>
                        )}

                        <Resend
                            className="b-medium"
                            style={{
                                color: isResendSuccess
                                    ? "#a3080c"
                                    : isResendSuccess === false
                                    ? "#f44336"
                                    : "#000",
                            }}
                        >
                            {isResendSuccess
                                ? "OTP Sent!"
                                : isResendSuccess === false
                                ? "Resend OTP failed"
                                : "Resend OTP"}
                        </Resend>
                    </TimerContainer>
                ) : (
                    <>
                        <Resending className="b-medium">
                            Resend code {counter}s{" "}
                        </Resending>
                    </>
                )}
            </TimerMainContainer>
        );
    };
    return (
        <>
            <Overlay
                onClick={() => setOtpModal(false)}
                className={isOtpModal ? "active" : ""}
            ></Overlay>
            <BackContainer style={{ transform: isOtpModal && "scale(1,1)" }}>
                {!successShow ? (
                    <Modal>
                        <TitleSection>
                            <Title>Enter Verification Code</Title>
                            <Close
                                onClick={() => {
                                    setOtpModal(false);
                                    setOtp("");
                                    setErrorMessage("");
                                    clearInputField();
                                }}
                            >
                                <img src={closeImage} alt="Close" />
                            </Close>
                        </TitleSection>
                        <Container>
                            {resend ? (
                                <InputDescription>
                                    {" "}
                                    We have send you a verification code to {""}
                                    <span>{"+91" + " " + phone}</span>
                                    {""} in WhatsApp and SMS
                                </InputDescription>
                            ) : (
                                <InputDescription>
                                    {" "}
                                    We have send you a verification code to {""}
                                    <span>{"+91" + " " + phone}</span>
                                    {""} in WhatsApp
                                </InputDescription>
                            )}
                            <OtpInput
                                type="text"
                                placeholder="Enter OTP"
                                onKeyDown={handleKeyDown}
                                onChange={onChange}
                                value={otp}
                                maxLength="4"
                            />
                            <Timer
                                resendOtp={resendOtp}
                                isResendLoading={isResendLoading}
                                isResendSuccess={isResendSuccess}
                            />
                            <ErrorMessage>
                                {errorMessage === "invalid otp"
                                    ? "Invalid OTP"
                                    : errorMessage}
                            </ErrorMessage>
                            {resend === "OTP sent successfully" ? (
                                <P>{resend} </P>
                            ) : null}
                            <IssueContainer className="g-medium">
                                If you are facing any issues to get the OTP,{" "}
                                <ReactWhatsapp
                                    number="+917559913558"
                                    message={`I am ${name.toUpperCase()} studying in ${state} ${isStream.toUpperCase()} ${studentDivision.toUpperCase()} at ${CampusName} have issues with receiving OTP during Creator Club registration. Please do the needful.`}
                                >
                                    <span>chat with our support team.</span>
                                </ReactWhatsapp>
                            </IssueContainer>
                            <Button
                                onClick={renderSubmit}
                                disabled={otp === "" ? "disabled" : ""}
                                className={otp === "" ? "disabled" : ""}
                            >
                                {isLoading ? <RequestLoader /> : "Verify"}
                            </Button>
                        </Container>
                        <BottomLine></BottomLine>
                    </Modal>
                ) : (
                    <Success />
                )}
            </BackContainer>
        </>
    );
}

export default OtpModal;
const IssueContainer = styled.div`
    color: #4d4e4e;
    display: block;
    font-size: 14px;
    margin-bottom: 15px;
    font-family: "gordita_medium";

    span {
        color: #a3080c;
        cursor: pointer;
        font-size: 14px;
        font-family: "gordita_medium";
    }
    @media (max-width: 480px) {
        font-size: 12px;
    }
`;
const Links = styled.span`
    color: #0a4771;
    font-family: "gordita_regular";
    cursor: pointer;
`;

const P = styled.p`
    color: black;
    font-size: 16px;
    text-align: right;
`;
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
    width: 100%;
    max-height: 90vh;
    height: 400;
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
    max-width: 600px;

    @media (max-width: 560px) {
        max-width: 400px;
        padding: 30px;
    }

    @media (max-width: 450px) {
        max-width: 350px;
        padding: 35px;
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
    flex-wrap: wrap;

    span {
        color: #a3080c;
        display: inline-block;
        margin-left: 5px;
        @media (max-width: 640px) {
            display: contents;
            margin-right: 10px;
        }
    }
    br {
        @media all and (max-widht: 560px) {
            display: none;
        }
    }
    @media (max-width: 560px) {
        width: 100%;
    }
    @media (max-width: 640px) {
    }
    @media (max-width: 480px) {
        font-size: 14px;
    }
`;

const OtpInput = styled.input`
    border: 2px solid #e6e6e6;
    border-radius: 10px !important;
    font-size: 16px;
    width: 100%;
    height: 100%;
    padding: 15px;
    margin-bottom: 15px;
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
const Button = styled.button`
    font-size: 16px;
    background: linear-gradient(90deg, #a3080c 1.55%, #d2042d 100%);
    padding: 5px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-family: "gordita_medium";
    color: #fff;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    &.disabled {
        filter: opacity(0.5);
        cursor: not-allowed;
    }
    @media (max-width: 640px) {
        font-size: 14px;
    }
`;
const BottomLine = styled.span`
    display: block;
    width: 100%;
    border-top: 7px solid #a3080c;
    border-bottom: 7px solid #d2042d;
    position: absolute;
    bottom: 0;
    left: 0;
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
const ImageContainer = styled.div`
    width: 50px;
    margin-right: 20px;

    & img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 480px) {
        width: 40px;
    }
`;

const Title = styled.h2`
    font-family: "gordita_medium";
    font-size: 20px;
    color: #000;
    @media (max-width: 480px) {
        font-size: 16px;
    }
`;
const ErrorMessage = styled.p`
    color: red;
    font-size: 12px;
    text-align: right;
    opacity: 1;
    margin-bottom: 10px;
`;
const TimerMainContainer = styled.div``;
const TimerContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
`;
const SendIcon = styled.span`
    font-size: 14px;
    margin-right: 5px;
    transform: translateY(-2px);
    -webkit-text-stroke-width: 0.02em;
    &.loader {
        animation: rotate 2s infinite linear reverse;
    }
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @media all and (max-width: 480px) {
        transform: translateY(-1px);
        margin-right: 3px;
    }
`;
const Resend = styled.p`
    font-size: 14px;
    font-family: "gordita_regular" !important;
    text-align: right;
    cursor: pointer;

    & b {
        color: #f1c217;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
const Resending = styled.p`
    font-size: 14px;
    font-family: "gordita_medium" !important;
    text-align: right;
    font-size: 14px;
    display: inline-block;
    color: #a3080c;
    font-family: "gordita_regular" !important;
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
