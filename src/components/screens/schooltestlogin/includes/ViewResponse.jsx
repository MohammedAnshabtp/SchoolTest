import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AxiosInstance } from "../../../../axiosInstance";
import { Context } from "../../../context/store";
import RequestLoader from "../../../general/loaders/RequestLoader";
import Header from "../../schooltest_register/includes/Header";
import LanguageBox from "./LanguageBox";
import NoDataFound from "./NoDataFound";

function ViewResponse() {
    const {
        state: { school_test_data },
        dispatch,
    } = useContext(Context);
    const [isLoading, setLoading] = useState(false);
    const [attendedQuestions, setAttendedQuestions] = useState([]);
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("english");

    //---------------Mobile browser-----------------------------------
    // window.addEventListener("beforeunload", (event) => {
    //     event.preventDefault();
    //     event.returnValue = "";
    //     localStorage.clear();
    // });
    //----------------------------------------------------------------
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

    // useEffect(() => {
    //     const handleTabClose = (event) => {
    //         dispatch({
    //             type: "UPDATE_SCHOOL_TEST_DATA",
    //             school_test_data: {
    //                 is_verified: false,
    //             },
    //         });
    //         console.log("beforeunload event triggered");

    //         return (event.returnValue = "Are you sure you want to exit?");
    //     };

    //     window.addEventListener("beforeunload", handleTabClose);

    //     return () => {
    //         window.removeEventListener("beforeunload", handleTabClose);
    //     };
    // }, []);
    // useEffect(() => {
    //     // Add event listener to the window
    //     window.addEventListener("beforeunload", clearLocalStorage);

    //     // Remove event listener when component unmounts
    //     return () => {
    //         window.removeEventListener("beforeunload", clearLocalStorage);
    //     };
    // }, []);

    // const clearLocalStorage = () => {
    //     // Clear local storage data
    //     localStorage.clear();

    //     // Clear session storage data
    //     sessionStorage.clear();

    //     // Clear cookies
    //     document.cookie.split(";").forEach((c) => {
    //         document.cookie = c
    //             .replace(/^ +/, "")
    //             .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    //     });
    // };

    const ViewResult = () => {
        AxiosInstance.get(
            `api/v1/exams/creator_club/attented-questions/             
            `,
            {
                headers: {
                    Authorization: `Bearer ${school_test_data.access_token}`,
                },
            }
        )
            .then((response) => {
                let { app_data } = response.data;
                if (app_data.StatusCode === 6000) {
                    setAttendedQuestions(app_data.data);
                    setCategory(app_data?.data?.category);
                    setImage(app_data?.data?.question_image);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    };
    const setAnswerStatus = (option, rightOption, selectedOption) => {
        if (option === rightOption && option === selectedOption) {
            return "right-answer";
        } else if (option === rightOption && option !== selectedOption) {
            return "active-answer";
        } else if (
            option === selectedOption &&
            selectedOption !== rightOption
        ) {
            return "wrong-answer";
        }
    };
    useEffect(() => {
        ViewResult();
    }, []);
    return (
        <>
            <Header />
            <LanguageBox />
            <Views>
                <ContentDiv>
                    {isLoading ? (
                        <RequestLoader />
                    ) : attendedQuestions?.length > 0 ? (
                        attendedQuestions.map((question, index) => {
                            return (
                                <TotalContainer>
                                    <LeftContent>{index + 1}</LeftContent>
                                    <RightContent>
                                        <Paragraph>
                                            {school_test_data.selected_language ===
                                                "english" &&
                                                question?.question_details
                                                    .english_question}

                                            {school_test_data.selected_language !==
                                                "english" &&
                                                question?.question_details
                                                    .question}
                                        </Paragraph>

                                        {question?.question_details
                                            ?.category === "figure_based" && (
                                            <FigureQuestion>
                                                <FigureSpace>
                                                    <img
                                                        src={
                                                            question
                                                                ?.question_details
                                                                ?.question_image
                                                        }
                                                        alt="question_images"
                                                    />
                                                </FigureSpace>
                                            </FigureQuestion>
                                        )}
                                        {school_test_data.selected_language ===
                                        "english" ? (
                                            <Cover>
                                                <Item
                                                    className={setAnswerStatus(
                                                        "option1",

                                                        question
                                                            ?.question_details
                                                            ?.right_option,
                                                        question.selected_option
                                                    )}
                                                >
                                                    <Left>A</Left>
                                                    <Right>
                                                        {
                                                            question
                                                                ?.question_details
                                                                ?.english_option1
                                                        }
                                                    </Right>
                                                </Item>
                                                <Item
                                                    className={setAnswerStatus(
                                                        "option2",
                                                        question
                                                            ?.question_details
                                                            ?.right_option,
                                                        question.selected_option
                                                    )}
                                                >
                                                    <Left>B</Left>
                                                    <Right>
                                                        {
                                                            question
                                                                ?.question_details
                                                                ?.english_option2
                                                        }
                                                    </Right>
                                                </Item>
                                                <Item
                                                    className={setAnswerStatus(
                                                        "option3",
                                                        question
                                                            ?.question_details
                                                            ?.right_option,
                                                        question.selected_option
                                                    )}
                                                >
                                                    <Left>C</Left>
                                                    <Right>
                                                        {
                                                            question
                                                                ?.question_details
                                                                ?.english_option3
                                                        }
                                                    </Right>
                                                </Item>
                                                <Item
                                                    className={setAnswerStatus(
                                                        "option4",
                                                        question
                                                            ?.question_details
                                                            ?.right_option,
                                                        question.selected_option
                                                    )}
                                                >
                                                    <Left>D</Left>
                                                    <Right>
                                                        {
                                                            question
                                                                ?.question_details
                                                                ?.english_option4
                                                        }
                                                    </Right>
                                                </Item>
                                            </Cover>
                                        ) : (
                                            <Cover>
                                                <Item
                                                    className={setAnswerStatus(
                                                        "option1",

                                                        question
                                                            ?.question_details
                                                            ?.right_option,
                                                        question.selected_option
                                                    )}
                                                >
                                                    <Left>A</Left>
                                                    <Right>
                                                        {
                                                            question
                                                                ?.question_details
                                                                ?.option1
                                                        }
                                                    </Right>
                                                </Item>
                                                <Item
                                                    className={setAnswerStatus(
                                                        "option2",
                                                        question
                                                            ?.question_details
                                                            ?.right_option,
                                                        question.selected_option
                                                    )}
                                                >
                                                    <Left>B</Left>
                                                    <Right>
                                                        {
                                                            question
                                                                ?.question_details
                                                                ?.option2
                                                        }
                                                    </Right>
                                                </Item>
                                                <Item
                                                    className={setAnswerStatus(
                                                        "option3",
                                                        question
                                                            ?.question_details
                                                            ?.right_option,
                                                        question.selected_option
                                                    )}
                                                >
                                                    <Left>C</Left>
                                                    <Right>
                                                        {
                                                            question
                                                                ?.question_details
                                                                ?.option3
                                                        }
                                                    </Right>
                                                </Item>
                                                <Item
                                                    className={setAnswerStatus(
                                                        "option4",
                                                        question
                                                            ?.question_details
                                                            ?.right_option,
                                                        question.selected_option
                                                    )}
                                                >
                                                    <Left>D</Left>
                                                    <Right>
                                                        {
                                                            question
                                                                ?.question_details
                                                                ?.option4
                                                        }
                                                    </Right>
                                                </Item>
                                            </Cover>
                                        )}
                                    </RightContent>
                                </TotalContainer>
                            );
                        })
                    ) : (
                        <NoDataFound />
                    )}
                </ContentDiv>
            </Views>
        </>
    );
}
export default ViewResponse;

const Views = styled.div`
    padding-top: 140px;
    width: 100%;
    overflow-y: scroll;
    margin-top: 150px;

    ::-webkit-scrollbar {
        display: none;
    }
    @media all and (max-width: 980px) {
        margin-top: 135px;
    }
`;
const LeftContainer = styled.div``;

const ContentDiv = styled.div`
    max-height: calc(100vh - 100px);
    @media (max-width: 1080px) {
        max-height: calc(100vh - 300px);
    }
`;

const SubTitle = styled.span`
    color: #545454;
    font-size: 16px;
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
`;
const RightDiv = styled.div``;
const QuestionNumber = styled.span`
    font-size: 16px;
    color: #fff;
`;
const TotalContainer = styled.div`
    display: flex;
    background: #eef5f4;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid #747474;
`;
const LeftContent = styled.div`
    margin-right: 10px;
    color: #545454;
    font-size: 17px;
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
`;
const RightContent = styled.div`
    width: 99%;
`;
const FigureQuestion = styled.div``;
const FigureSpace = styled.div`
    width: 300px;
    padding-bottom: 20px;
    margin: 0 auto;
    img {
        display: block;
        width: 100%;
    }
    @media (max-width: 640px) {
        width: 250px;
    }
    @media all and (max-width: 360px) {
        width: 200px;
    }
`;
const Paragraph = styled.p`
    margin-bottom: 30px;
    color: #545454;
    font-size: 17px;
    font-family: "gordita_regular";
    width: 89%;
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        width: 100%;
    }
`;
const Cover = styled.ul``;

const Item = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #747474;
    padding: 10px;
    :last-child {
        margin-bottom: 0;
    }

    &.active-answer {
        border-radius: 5px;
        padding: 5px;
    }
    &.wrong-answer {
        background: linear-gradient(90deg, #d2042d 1.75%, #a3080c 100%);

        border-radius: 5px;
        padding: 5px;
    }
    &.right-answer {
        background-color: #d2042d;
        border-radius: 5px;
        padding: 5px;
    }
`;
const Left = styled.p`
    margin-right: 10px;
    min-width: 35px;
    min-height: 35px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #26272a;
    background: #eef5f4;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #545454;
`;
const Right = styled.p`
    color: #545454;
    font-size: 17px;
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
`;
