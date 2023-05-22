import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import EntrancePageTop from "../schooltestlogin/includes/EntrancePageTop";
import ExamQuestions from "../schooltestlogin/includes/ExamQuestion";
import { useNavigate } from "react-router-dom";
import ExamEndModal from "../schooltestlogin/includes/ExamEndModal";
import TimeExceededModal from "../schooltestlogin/includes/TimeExceededModal";
import RequestLoader from "../../general/loaders/RequestLoader";
import OfflinePage from "../../modal/OfflinePage";
import $ from "jquery";
import { Context } from "../../context/store";
import { AxiosInstance } from "../../../axiosInstance";
import ViewResponse from "./includes/ViewResponse";
import Header from "../schooltest_register/includes/Header";
import axios from "axios";
import { initial } from "lodash";

function EntrancePage({}) {
    const [selectedLanguage, setSelectedLanguage] = useState("english");
    const [isLoading, setLoading] = useState(false);
    const [submitButton, setSubmitButton] = useState(true);
    const [completedloading, setCompltedloading] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState([]);
    const [questionNumbers, setQuestionNumbers] = useState([]);
    const [examEndTime, setExamEndTime] = useState("");
    const [totalQuestions, setTotalQuestions] = useState("");
    const [remainingTime, setRemainingTime] = useState("");
    const [checkCompleteday, setcheckCompleteday] = useState();
    const [selectedOption, setSelectedOption] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [lastQuestionSelected, setLastQuestionSelected] = useState(true);
    const [initialCount, setInitialCount] = useState(null);
    const [first, setfirst] = useState("");

    const [isReload, setReload] = useState(false);
    const [nextLoading, setNextLoading] = useState(false);
    const [QuestionLoading, setQuestionLoading] = useState(false);
    const [showEndModal, setEndModal] = useState(false);
    const [showCompletedModal, setCompletedModal] = useState(false);
    const [completed, setComplted] = useState("");
    const [updates, setUpdates] = useState("");
    const [isOffline, setOffline] = useState(false);
    const navigate = useNavigate();

    const {
        state: { school_test_data },
        dispatch,
    } = useContext(Context);
    const currentQuestionnumber = school_test_data?.currentQuestionnumber;
    const [count, setCount] = useState(
        currentQuestionnumber === 1 ? 0 : currentQuestionnumber - 1
    );

    const handleOnlineEvent = (e) => {
        reloadWebPage();
        setOffline(false);
    };
    const handleOfflineEvent = (e) => {
        setOffline(true);
    };

    const reloadWebPage = () => {
        window.location.reload();
    };
    //-----------------------Window close local clear---------------------------------------
    // window.addEventListener("beforeunload", (event) => {
    //     event.preventDefault();
    //     event.returnValue = "";
    //     localStorage.clear();
    // });

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
    //--------------------------------------------------------------

    useEffect(() => {
        if (showEndModal || showCompletedModal) {
            $("html").addClass("modal-enabled");
        } else {
            $("html").removeClass("modal-enabled");
        }
    }, [showEndModal, showCompletedModal]);

    useEffect(() => {
        if (navigator.onLine) {
            setOffline(false);
        } else {
            setOffline(true);
        }
        window.addEventListener("offline", handleOfflineEvent);
        window.addEventListener("online", handleOnlineEvent);
    }, []);

    useEffect(() => {
        setSelectedLanguage(
            school_test_data.selected_language
                ? school_test_data.selected_language
                : "english"
        );
    }, []);

    useEffect(() => {
        dispatch({
            type: "UPDATE_SCHOOL_TEST_DATA",
            school_test_data: {
                selected_language: selectedLanguage,
            },
        });
    }, [selectedLanguage]);

    useEffect(() => {
        setQuestionLoading(true);
        if (school_test_data.exam_pk) {
            AxiosInstance.get(
                `api/v1/exams/creator-club/student-exam/${school_test_data.exam_pk}/`,

                {
                    headers: {
                        Authorization: `Bearer ${school_test_data.access_token}`,
                    },
                }
            )
                .then((response) => {
                    const { app_data } = response.data;

                    if (app_data.StatusCode === 6000) {
                        setInitialCount(app_data.data[0].order_id);
                        setCurrentQuestion(app_data.data);
                        setTotalQuestions(app_data.data.length);
                        setQuestionLoading(false);
                        setExamEndTime(app_data.end_time_stamp);
                        setCategory(app_data?.data?.category);
                        setImage(app_data?.data?.question_image);
                        dispatch({
                            type: "UPDATE_SCHOOL_TEST_DATA",
                            school_test_data: {
                                ...school_test_data,
                                all_questions: app_data.data,
                            },
                        });
                    } else if (app_data.StatusCode === 6001) {
                        setQuestionLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setQuestionLoading(false);
                });
        }
    }, [school_test_data.exam_pk]);
    const SubmitAnswer = () => {
        setNextLoading(true);

        AxiosInstance.post(
            `api/v1/exams/submit-answer/${currentQuestion[count].question_details.id}/`,
            {
                selected_option: selectedAnswer,
            },
            {
                headers: {
                    Authorization: `Bearer ${school_test_data.access_token}`,
                },
            }
        )

            .then((response) => {
                const { data, StatusCode } = response.data;

                if (StatusCode === 6000) {
                    setCount(count + 1);
                    setSelectedOption("");
                    setSelectedAnswer("");
                    setNextLoading(false);
                    setReload(!isReload);
                    setComplted(data);
                    setInitialCount(initialCount + 1);
                    if (initialCount < totalQuestions) {
                        dispatch({
                            type: "UPDATE_SCHOOL_TEST_DATA",
                            school_test_data: {
                                ...school_test_data,
                                currentQuestionnumber: initialCount + 1,
                            },
                        });
                    }

                    if (data.is_exam_completed) {
                        setSelectedOption(selectedOption);
                        setExamCompleted(data);
                        navigate("/entrance/completed");
                    }
                } else if (StatusCode === 6001) {
                    setNextLoading(false);
                }
            })
            .catch((err) => {
                setNextLoading(false);
                console.log(err);
            });
    };

    const [ongoingQuestion, setOngoingQuestion] = useState("");
    const [isExamCompleted, setExamCompleted] = useState("");

    useEffect(() => {
        dispatch({
            type: "UPDATE_SCHOOL_TEST_DATA",
            school_test_data: {
                ongoingQuestion: ongoingQuestion,
                is_exam_completed:
                    !school_test_data.is_exam_completed ||
                    school_test_data.is_exam_completed === ""
                        ? isExamCompleted
                        : school_test_data.is_exam_completed,
            },
        });
    }, [ongoingQuestion, isExamCompleted]);

    useEffect(() => {
        if (school_test_data.access_token) {
            AxiosInstance.get(`api/v1/exams/questions-status/`, {
                headers: {
                    Authorization: `Bearer ${school_test_data.access_token}`,
                },
            })
                .then((response) => {
                    const { app_data } = response.data;
                    if (app_data.StatusCode === 6000) {
                        setcheckCompleteday(
                            app_data.data[app_data.data?.length - 1].order_id
                        );
                        setQuestionNumbers(app_data.data);
                        setOngoingQuestion(
                            app_data.data[app_data.data?.length - 1].id
                        );
                    } else if (app_data.StatusCode === 6001) {
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isReload, school_test_data.access_token]);

    const handleExamCompleted = (type) => {
        setCompltedloading(true);
        AxiosInstance.get(`api/v1/exams/update/exam-status/`, {
            headers: {
                Authorization: `Bearer ${school_test_data.access_token}`,
            },
        })
            .then((response) => {
                const { app_data } = response.data;
                if (app_data.StatusCode === 6000) {
                    setUpdates(app_data.data);
                    setCompltedloading(false);

                    dispatch({
                        type: "UPDATE_SCHOOL_TEST_DATA",
                        school_test_data: {
                            ...school_test_data,
                            exam_status: "completed",
                        },
                    });
                } else if (app_data.StatusCode === 6001) {
                    setCompltedloading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setCompltedloading(false);
            });
    };

    const endExamination = (isTimeOut, isEndTest) => {
        setCompletedModal(false);
        setLoading(true);

        if (
            (!school_test_data.is_timeout || !school_test_data.is_end_test) &&
            !school_test_data.is_loading
        ) {
            handleExamCompleted();

            AxiosInstance.post(
                `api/v1/exams/end-exam-when-timeout/`,
                {
                    is_timeout: isTimeOut ? "True" : "False",
                    is_end_test: isEndTest ? "True" : "False",
                },

                {
                    headers: {
                        Authorization: `Bearer ${school_test_data.access_token}`,
                    },
                }
            )
                .then((response) => {
                    const { app_data } = response.data;
                    if (app_data.StatusCode === 6000) {
                        if (isTimeOut) {
                            setCompletedModal(true);
                        }
                        dispatch({
                            type: "UPDATE_SCHOOL_TEST_DATA",
                            school_test_data: {
                                is_timeout: true,
                                is_end_test: true,
                            },
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        if (school_test_data.time_status === 0) endExamination(true, false);
    }, [school_test_data.time_status]);

    return (
        <>
            <Header />
            <SectionContainer>
                <OfflinePage
                    isOffline={isOffline}
                    setOffline={setOffline}
                    reloadWebPage={reloadWebPage}
                />
                <ExamEndModal
                    handleExamCompleted={handleExamCompleted}
                    setEndModal={setEndModal}
                    showEndModal={showEndModal}
                    remainingTime={remainingTime}
                    endExamination={endExamination}
                    // setViewQuestions={setViewQuestions}
                    completedloading={completedloading}
                    setCurrentQuestion={setCurrentQuestion}
                />
                <TimeExceededModal
                    setCompletedModal={setCompletedModal}
                    showCompletedModal={showCompletedModal}
                    endExamination={endExamination}
                />

                <SectionWrapper>
                    <TopBar>
                        <EntrancePageTop
                            endExamination={endExamination}
                            setCompletedModal={setCompletedModal}
                            showCompletedModal={showCompletedModal}
                            setEndModal={setEndModal}
                            showEndModal={showEndModal}
                            selectedLanguage={selectedLanguage}
                            setSelectedLanguage={setSelectedLanguage}
                            examEndTime={examEndTime}
                            setRemainingTime={setRemainingTime}
                        />
                    </TopBar>
                    <BottomBar>
                        <QuestionsDiv>
                            <>
                                <ExamQuestions
                                    setSelectedAnswer={setSelectedAnswer}
                                    selectedAnswer={selectedAnswer}
                                    examQuestion={currentQuestion}
                                    totalQuestions={totalQuestions}
                                    selectedLanguage={selectedLanguage}
                                    category={category}
                                    image={image}
                                    currentQuestion={currentQuestion}
                                    setCurrentQuestion={setCurrentQuestion}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption}
                                    endExamination={endExamination}
                                    setCount={setCount}
                                    setLastQuestionSelected={
                                        setLastQuestionSelected
                                    }
                                    initialCount={initialCount}
                                    setInitialCount={setInitialCount}
                                />

                                <NavigationBar>
                                    {initialCount == totalQuestions ? (
                                        <>
                                            {lastQuestionSelected && (
                                                <EndButton
                                                    onClick={() => {
                                                        setEndModal(true);
                                                        endExamination(
                                                            false,
                                                            true
                                                        );
                                                    }}
                                                >
                                                    End Test
                                                </EndButton>
                                            )}
                                            {submitButton && (
                                                <SubmitButton
                                                    action={selectedAnswer}
                                                    onClick={() => {
                                                        setSubmitButton(false);

                                                        selectedAnswer &&
                                                            SubmitAnswer();
                                                    }}
                                                >
                                                    Submit
                                                </SubmitButton>
                                            )}
                                        </>
                                    ) : !nextLoading ? (
                                        <>
                                            <EndButton
                                                onClick={() => {
                                                    setEndModal(true);
                                                }}
                                            >
                                                End Test
                                            </EndButton>

                                            <NextButton
                                                action={selectedAnswer}
                                                onClick={() => {
                                                    selectedAnswer &&
                                                        SubmitAnswer();
                                                }}
                                            >
                                                Next
                                            </NextButton>
                                        </>
                                    ) : (
                                        <NextButton>
                                            <RequestLoader />
                                        </NextButton>
                                    )}
                                </NavigationBar>
                            </>
                        </QuestionsDiv>
                    </BottomBar>
                </SectionWrapper>
            </SectionContainer>
        </>
    );
}

export default EntrancePage;
const SectionContainer = styled.section`
    margin-top: 100px;
`;
const SectionWrapper = styled.div`
    width: 90%;
    margin: 0 auto;
`;
const TopBar = styled.div`
    margin-top: 150px;
    @media all and (max-width: 640px) {
        margin-top: 100px;
    }
`;
const BottomBar = styled.div`
    display: flex;
    margin-top: 20px;
    min-height: calc(100vh - 400px);
    @media all and (max-width: 640px) {
        flex-direction: column;
    }
`;

const QuestionsDiv = styled.div`
    border: 1px solid grey;
    background-color: #eef5f4;
    border-radius: 8px;
    padding: 24px;
    width: 100%;
    @media all and (max-width: 980px) {
    }
    @media all and (max-width: 640px) {
        width: 100%;
    }
`;

const NavigationBar = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    @media (max-width: 480px) {
        justify-content: center;
    }
`;

const SubmitButton = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, #a3080c 1.55%, #d2042d 100%);
    width: 160px;
    height: 45px;
    color: #fff;
    cursor: ${({ action }) => (action ? "pointer" : "not-allowed")};
    border-radius: 5px;
    @media all and (max-width: 640px) {
        width: 140px;
        height: 40px;
    }
    @media all and (max-width: 360px) {
        width: 100%;
    }
`;
const EndButton = styled.span`
    display: flex;
    justify-content: center;
    margin-right: 13px;
    /* border: 1px solid #e02b1d; */
    align-items: center;
    width: 160px;
    height: 45px;
    background: #9e1b32;
    color: #fff;
    border-radius: 5px;
    margin-right: 10px;
    cursor: pointer;
    @media all and (max-width: 768px) {
        height: 40px;
    }
    @media all and (max-width: 640px) {
        width: 140px;
    }
    @media all and (max-width: 480px) {
        width: 120px;
        height: 35px;
        font-size: 14px;
    }
`;

const NextButton = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, #a3080c 1.55%, #d2042d 100%);
    width: 160px;
    height: 45px;
    color: #fff;
    border-radius: 5px;
    cursor: ${({ action }) => (action ? "pointer" : "not-allowed")};
    @media all and (max-width: 768px) {
        height: 40px;
    }
    @media all and (max-width: 640px) {
        width: 140px;
    }
    @media all and (max-width: 480px) {
        width: 120px;
        height: 35px;
        font-size: 14px;
    }
`;
