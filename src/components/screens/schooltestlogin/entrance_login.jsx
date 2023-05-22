import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../../context/store";
import RequestLoader from "../../general/loaders/RequestLoader";
import { useNavigate } from "react-router-dom";
import ReactWhatsapp from "react-whatsapp";
import VerifyLoader from "../../general/loaders/VerifyLoader";
import FailedLoader from "../../general/loaders/FailedLoader";
import Header from "../schooltest_register/includes/Header";
import banner from "../../../assets/images/ban.jpeg";
import { AxiosInstance } from "../../../axiosInstance";
import moment from "moment";

function EntranceLogin() {
    const [phoneNumber, setPhonNumber] = useState("");
    const [admissionNumber, setAdmissionNumber] = useState("");
    const [isError, setError] = useState(false);
    const [isAuthError, setAuthError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [admissionErrorMessage, setAdmissionErrorMessage] = useState("");
    const [isTidio, setIsTidio] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [show, setShow] = useState(false);
    const [phoneLoader, setphoneLoader] = useState(false);
    const navigate = useNavigate();
    const {
        state: { school_test_data },
        dispatch,
    } = useContext(Context);

    //"Enter" key function
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            SubmitForm(e);
        }
    };

    //-----------------------Back tab prevent-------------------------
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

    //----------------------local Storage---------------------
    // window.addEventListener("beforeunload", (event) => {
    //     event.preventDefault();
    //     event.returnValue = "";
    //     localStorage.clear();
    // });

    //----------------------------------------------------------
    const handleVerification = (number) => {
        // setphoneLoader(true);
        if (number.length === 10) {
            AxiosInstance.post("api/v1/accounts/phone-number-verification/", {
                phone: number,
            }).then((response) => {
                const { app_data, data } = response.data;

                if (app_data.StatusCode === 6000) {
                    setPhonNumber(number);
                    setRegistered(true);
                    setError(true);
                    setErrorMsg("Mobile number is Registered");
                } else if (app_data.StatusCode === 6001) {
                    setError(true);
                    setRegistered(false);
                    setErrorMsg("Mobile number is not registered");
                }
            });
        }
    };

    const PhonenumberVerify = () => {
        setphoneLoader(true);
        setErrorMsg("");
        AxiosInstance.post("api/v1/accounts/phone-number-verification/", {
            phone: phoneNumber,
        })
            .then((response) => {
                const { app_data, data } = response.data;
                if (app_data.StatusCode === 6000) {
                    setRegistered(false);
                    setError(false);
                    setShow(true);
                    setphoneLoader(false);
                } else if (app_data.StatusCode === 6001) {
                    setRegistered(false);
                    setphoneLoader(false);
                    setError(true);
                    setShow(false);
                    setAdmissionErrorMessage("");
                    if (phoneNumber.length === 10) {
                        setErrorMsg("Mobile number doesn't exist");
                    } else if (phoneNumber.length === 0) {
                        setErrorMsg("This field is required");
                    } else {
                        setErrorMsg("Phone number must be 10 digits");
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                setphoneLoader(false);
            });
    };
    const onChange = (e) => {
        setError(false);

        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            if (!isLoading) {
                setPhonNumber(e.target.value);
            }
        }
        handleVerification(e.target.value);
    };

    const SubmitForm = (e) => {
        e.preventDefault();
        setError(false);
        if (phoneNumber && admissionNumber) {
            setLoading(true);
            AxiosInstance.post("api/v1/accounts/student/login/", {
                phone: phoneNumber,
                admission_number: admissionNumber,
                service: "learn",
            })
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
                                end_timestamp:
                                    app_data.data.student_exam_end_time_stamp,
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

                        setAdmissionErrorMessage("");
                    } else if (app_data.StatusCode === 6001) {
                        setAdmissionErrorMessage(
                            " Facing issues with admission code? "
                        );
                        setErrorMsg("Invaild credentials");
                        setAuthError(true);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setError(true);
            setErrorMsg("This field is required*");
        }
    };
    let tendigits = phoneNumber.length;

    return (
        <>
            <Header />
            <Section>
                <Spotlight>
                    <LeftDiv>
                        <LeftContent>
                            <img src={banner} alt="Creator-club" />
                            <LeftDetails></LeftDetails>
                            <BottomDesignOne></BottomDesignOne>
                            <BottomDesignTwo></BottomDesignTwo>
                        </LeftContent>
                    </LeftDiv>
                    <RightDiv>
                        <RightContent>
                            <RightTitle>Login to start exam</RightTitle>
                            {show ? (
                                <InputContainer>
                                    <Label>Admission Code</Label>
                                    <Input
                                        className="phone"
                                        type="text"
                                        placeholder="Enter your admission code"
                                        onChange={(event) => {
                                            setAdmissionNumber(
                                                event.target.value
                                            );
                                            setErrorMsg("");
                                        }}
                                        onKeyDown={(e) => handleKeyDown(e)}
                                        value={admissionNumber}
                                    />

                                    <ErrorMsg className="admission">
                                        {admissionErrorMessage}
                                        <span
                                            onClick={() =>
                                                setIsTidio((prev) => !prev)
                                            }
                                            className="tidios"
                                            id="creator-student-login"
                                        >
                                            <ReactWhatsapp
                                                number="+917559913558"
                                                message="I am facing issues with logging in for Creator Club entrance examination. Please do the needful."
                                            >
                                                <span>
                                                    {admissionErrorMessage &&
                                                        " Contact us"}
                                                </span>
                                            </ReactWhatsapp>
                                        </span>
                                    </ErrorMsg>
                                    {!admissionNumber && isError && (
                                        <ErrorMsg>{errorMsg}</ErrorMsg>
                                    )}
                                    {admissionNumber && isAuthError && (
                                        <ErrorMsg>{errorMsg}</ErrorMsg>
                                    )}
                                </InputContainer>
                            ) : (
                                <InputContainer>
                                    <Label>Phone Number</Label>
                                    <Phonediv>
                                        <Input
                                            type="tel"
                                            placeholder="Enter your registered phone number"
                                            onChange={onChange}
                                            onKeyDown={(e) => handleKeyDown(e)}
                                            value={phoneNumber}
                                            maxLength="10"
                                        />

                                        <Tickdiv>
                                            {tendigits == 10 ? (
                                                registered ? (
                                                    <VerifyLoader />
                                                ) : (
                                                    <>
                                                        <div className="fail">
                                                            <FailedLoader />
                                                        </div>
                                                        <FailedMsg className="admission">
                                                            {/* {errorMsg} */}
                                                            <span
                                                                onClick={() =>
                                                                    setIsTidio(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            !prev
                                                                    )
                                                                }
                                                                className="tidios"
                                                                id="creator-student-login"
                                                            ></span>
                                                        </FailedMsg>
                                                    </>
                                                )
                                            ) : (
                                                ""
                                            )}
                                        </Tickdiv>
                                    </Phonediv>

                                    {isError && (
                                        <ErrorMsg registered={registered}>
                                            {errorMsg}
                                        </ErrorMsg>
                                    )}
                                    {isAuthError && (
                                        <AuthErrorMsg>Hello</AuthErrorMsg>
                                    )}
                                </InputContainer>
                            )}
                            {show ? (
                                <LoginButton onClick={(e) => SubmitForm(e)}>
                                    {isLoading ? <RequestLoader /> : "Login"}
                                </LoginButton>
                            ) : (
                                <LoginButton
                                    onClick={(e) => PhonenumberVerify(e)}
                                >
                                    {phoneLoader ? <RequestLoader /> : "Next"}
                                </LoginButton>
                            )}
                        </RightContent>
                    </RightDiv>
                </Spotlight>
            </Section>
        </>
    );
}

export default EntranceLogin;
const Section = styled.section`
    padding-top: 80px;
`;
const Spotlight = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: calc(100vh - 85px);
    @media all and (max-width: 640px) {
        flex-direction: column;
        justify-content: flex-start;
        grid-gap: 50px;
    }
`;
const LeftDiv = styled.div`
    background-color: #a3080c;
    width: 50%;
    background-size: 100% 100%;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media all and (max-width: 1280px) {
        padding: 40px;
    }
    @media all and (max-width: 980px) {
        width: 50%;
        padding: 25px;
    }

    @media all and (max-width: 640px) {
        width: 100%;
    }
    @media all and (max-width: 480px) {
        padding: 15px 15px 39px;
    }
`;
const LeftContent = styled.div`
    height: 60%;
    border-radius: 10px;
    width: 120%;
    padding: 45px;
    min-height: 370px;
    position: relative;
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
    @media all and (max-width: 1280px) {
        padding: 45px 55px;
        min-height: 370px;
    }
    @media all and (max-width: 1080px) {
        min-height: 320px;
        max-height: 320px;
    }
    @media all and (max-width: 980px) {
        min-height: 290px;
        max-height: 290px;
        min-width: 280px;
        padding: 45px 45px;
    }
    @media all and (max-width: 768px) {
    }
    @media all and (max-width: 640px) {
        padding: 35px 35px 40px 35px;
    }
    @media all and (max-width: 560px) {
        min-height: 250px;
        max-height: 250px;
        padding: 35px 25px 40px 35px;
        border-radius: 5px;
    }
    @media all and (max-width: 480px) {
        min-height: 200px;
        max-height: 200px;
        min-width: 325px;
    }
`;
const MammokkaImage = styled.div`
    position: absolute;
    bottom: 0;
    left: 10px;
    width: 250px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 1280px) {
        width: 250px;
        left: 0;
    }
    @media all and (max-width: 1080px) {
        width: 200px;
    }
    @media all and (max-width: 980px) {
        width: 144px;
    }
    @media all and (max-width: 480px) {
        width: 150px;
    }
`;
const LeftDetails = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    color: red;
`;
const BottomDesignOne = styled.div`
    position: absolute;
    height: 100px;
    background: #6dada5;
    border-radius: 8px;
    width: 95%;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
    @media all and (max-width: 1280px) {
        bottom: -20px;
    }
    @media all and (max-width: 1080px) {
        bottom: -15px;
    }
    @media all and (max-width: 640px) {
        border-radius: 5px;
        bottom: -10px;
    }
`;
const BottomDesignTwo = styled.div`
    position: absolute;
    height: 100px;
    background: rgba(254, 254, 254, 0.2);
    border-radius: 8px;
    width: 90%;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -2;
    @media all and (max-width: 1280px) {
        bottom: -35px;
    }
    @media all and (max-width: 1080px) {
        bottom: -28px;
    }
    @media all and (max-width: 640px) {
        border-radius: 5px;
        bottom: -20px;
    }
`;
const TopSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 265px;
    p {
        color: #747474;
    }
    @media all and (max-width: 1280px) {
        width: 265px;
    }
    @media all and (max-width: 1080px) {
        width: 240px;
    }
    @media all and (max-width: 980px) {
        width: 215px;
        p {
            font-size: 14px;
        }
    }
    @media all and (max-width: 640px) {
        width: 300px;
    }
    @media all and (max-width: 560px) {
        width: 255px;
    }
    @media all and (max-width: 480px) {
        width: 190px;
    }
`;

const RightDiv = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    padding: 0 170px 0 140px;
    @media all and (max-width: 1280px) {
        padding: 0 50px 0 80px;
    }
    @media all and (max-width: 1080px) {
        padding: 0 40px 0 70px;
    }
    @media all and (max-width: 980px) {
        width: 50%;
        padding: 0 10px 0 10px;
    }
    @media all and (max-width: 640px) {
        width: 100%;
        padding: 0 20px;
        margin-bottom: 25px;
    }
`;

const RightContent = styled.div`
    width: 100%;
`;
const RightTitle = styled.h3`
    font-size: 30px;
    margin-bottom: 70px;
    font-weight: 600;
    @media all and (max-width: 1080px) {
        font-size: 25px;
        margin-bottom: 45px;
    }
    @media all and (max-width: 640px) {
        font-size: 24px;
        margin-bottom: 50px;
    }
`;
const InputContainer = styled.div`
    position: relative;
    margin-bottom: 60px;
    &:nth-child(3) {
        margin-bottom: 60px;
    }
    @media all and (max-width: 980px) {
        margin-bottom: 45px;
        &:nth-child(3) {
            margin-bottom: 50px;
        }
    }
    @media all and (max-width: 640px) {
        margin-bottom: 50px;
        &:nth-child(3) {
            margin-bottom: 40px;
        }
    }
`;
const FailedMsg = styled.p`
    bottom: -69px;
    right: -25px;
    font-size: 12px;
    color: red;
    width: 200px;
    position: absolute;
    font-family: "gordita_medium";
`;
const ErrorMsg = styled.p`
    position: absolute;
    bottom: -25px;
    right: 0;
    font-size: 12px;
    color: ${(props) => (props.registered ? "green" : `red`)};
    font-family: "gordita_medium";

    span {
        color: #a3080c;
        font-size: 12px;
        font-family: "gordita_medium";
    }
    &.admission {
        position: absolute;
        bottom: -45px;
        right: 0px;
        font-size: 12px;
        color: grey;
    }
`;
const AuthErrorMsg = styled.p`
    position: absolute;
    bottom: -40px;
    font-size: 12px;
    color: red;
`;
const Label = styled.label`
    color: #747474;
    position: absolute;
    top: -20px;
    font-size: 13px;
`;

const LoginButton = styled.div`
    background: linear-gradient(90deg, #a3080c 1.55%, #d2042d 100%);
    height: 50px;
    padding: 0px 20px;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 7px;
`;
const Phonediv = styled.div`
    display: flex;
    position: relative;
`;
const Input = styled.input`
    font-size: 16px;
    width: 100%;
    background-color: #f9f9f9;
    border: 1px solid #d9d9d9;
    display: inline-block;
    border-radius: 6px !important;
    padding: 10px 10px;
    line-height: 1;
    text-transform: uppercase;
    ::placeholder {
        text-transform: none;
    }

    :-ms-input-placeholder {
        text-transform: none;
    }

    ::-ms-input-placeholder {
        text-transform: none;
    }

    @media all and (max-width: 1080px) {
        font-size: 15px;
    }
    @media all and (max-width: 980px) {
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        padding: 12px 15px;
    }
`;
const Tickdiv = styled.div`
    position: absolute;
    right: 0px;
    top: 5px;
    transform: translate3d(0px, -8px, 0px);
    .fail {
        position: absolute;
        right: 5px;
        top: 12px;
        transform: translate3d(0px, -8px, 0px);
    }
`;
