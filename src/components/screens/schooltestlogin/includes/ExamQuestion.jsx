import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Context } from "../../../context/store";

function ExamQuestions({
    selectedOption,
    setSelectedOption,
    setSelectedAnswer,
    selectedAnswer,
    examQuestion,
    totalQuestions,
    selectedLanguage,
    category,
    currentQuestion,
    nextLoading,
    image,
    setLastQuestionSelected,
    initialCount,
    setinitialCount,
}) {
    const {
        state: { school_test_data },
        dispatch,
    } = useContext(Context);
    const total = school_test_data.all_questions;
    // const currentQuestionnumber = school_test_data?.currentQuestionnumber;
    useEffect(() => {
        setSelectedOption(currentQuestion.selected_option);
    }, [currentQuestion]);
    //--------Text Copy Preventing--------------
    const handleCopy = (e) => {
        e.preventDefault();
    };
    //------------------------------------------

    return (
        <>
            {total.map((item, index) =>
                initialCount === item.order_id ? (
                    <SectionContainer>
                        <QuestionCount>
                            Question {item?.order_id}
                            {item?.order_id
                                ? currentQuestion?.order_id
                                : examQuestion.order_id}{" "}
                            of {item?.total_questions}{" "}
                        </QuestionCount>
                        <SplitScreen>
                            {item?.question_details.category ===
                                "figure_based" && (
                                <FigureQuestion>
                                    <FigureSpace>
                                        <img
                                            src={
                                                item?.question_details
                                                    .question_image
                                            }
                                            alt="question_images"
                                        />
                                    </FigureSpace>
                                </FigureQuestion>
                            )}
                            <ExamQuestion onCopy={handleCopy}>
                                {item?.question}
                                {school_test_data.selected_language ===
                                    "english" &&
                                    item?.question_details.english_question}

                                {school_test_data.selected_language !==
                                    "english" &&
                                    item?.question_details.question}
                            </ExamQuestion>
                        </SplitScreen>

                        {school_test_data.selected_language === "english" ? (
                            <>
                                <Options
                                    className={
                                        selectedOption === "option1" && "active"
                                    }
                                    onClick={(e) => {
                                        if (!nextLoading) {
                                            setSelectedOption("option1");
                                            setSelectedAnswer("option1");
                                        }
                                        if (item?.order_id == totalQuestions) {
                                            setLastQuestionSelected(false);
                                        }
                                    }}
                                >
                                    <Code>A</Code>{" "}
                                    <Op>
                                        {
                                            item?.question_details
                                                ?.english_option1
                                        }

                                        {item?.question_details
                                            ? currentQuestion?.english_option1
                                            : examQuestion.english_option1}
                                    </Op>
                                </Options>

                                <Options
                                    className={
                                        selectedOption === "option2" && "active"
                                    }
                                    onClick={(e) => {
                                        if (!nextLoading) {
                                            setSelectedOption("option2");

                                            setSelectedAnswer("option2");
                                        }
                                        if (item?.order_id == totalQuestions) {
                                            setLastQuestionSelected(false);
                                        }
                                    }}
                                >
                                    <Code>B</Code>{" "}
                                    <Op>
                                        {
                                            item?.question_details
                                                ?.english_option2
                                        }
                                        {item?.question_details
                                            ? currentQuestion?.english_option2
                                            : examQuestion.english_option2}
                                    </Op>
                                </Options>
                                <Options
                                    className={
                                        selectedOption === "option3" && "active"
                                    }
                                    onClick={(e) => {
                                        if (!nextLoading) {
                                            setSelectedOption("option3");
                                            setSelectedAnswer("option3");
                                        }
                                        if (item?.order_id == totalQuestions) {
                                            setLastQuestionSelected(false);
                                        }
                                    }}
                                >
                                    <Code>C</Code>{" "}
                                    <Op>
                                        {
                                            item?.question_details
                                                ?.english_option3
                                        }
                                        {item?.question_details
                                            ? currentQuestion?.english_option3
                                            : examQuestion.english_option3}
                                    </Op>
                                </Options>
                                <Options
                                    className={
                                        selectedOption === "option4" && "active"
                                    }
                                    onClick={(e) => {
                                        if (!nextLoading) {
                                            setSelectedOption("option4");
                                            setSelectedAnswer("option4");
                                        }
                                        if (item?.order_id == totalQuestions) {
                                            setLastQuestionSelected(false);
                                        }
                                    }}
                                >
                                    <Code>D</Code>{" "}
                                    <Op>
                                        {
                                            item?.question_details
                                                ?.english_option4
                                        }
                                        {item?.question_details
                                            ? currentQuestion?.english_option4
                                            : examQuestion.english_option4}
                                    </Op>
                                </Options>
                            </>
                        ) : (
                            <>
                                <Options
                                    className={
                                        selectedOption === "option1" && "active"
                                    }
                                    onClick={(e) => {
                                        if (!nextLoading) {
                                            setSelectedOption("option1");
                                            setSelectedAnswer("option1");
                                        }
                                        if (item?.order_id == totalQuestions) {
                                            setLastQuestionSelected(false);
                                        }
                                    }}
                                >
                                    <Code>A</Code>{" "}
                                    <Op>
                                        {item?.question_details?.option1}
                                        {item?.question_details.option1
                                            ? currentQuestion?.option1
                                            : examQuestion.option1}
                                    </Op>
                                </Options>
                                <Options
                                    className={
                                        selectedOption === "option2" && "active"
                                    }
                                    onClick={(e) => {
                                        if (!nextLoading) {
                                            setSelectedOption("option2");
                                            setSelectedAnswer("option2");
                                        }
                                        if (item?.order_id == totalQuestions) {
                                            setLastQuestionSelected(false);
                                        }
                                    }}
                                >
                                    <Code>B</Code>{" "}
                                    <Op>
                                        {item?.question_details?.option2}
                                        {item?.question_details.option2
                                            ? currentQuestion?.option2
                                            : examQuestion.option2}
                                    </Op>
                                </Options>
                                <Options
                                    className={
                                        selectedOption === "option3" && "active"
                                    }
                                    onClick={(e) => {
                                        if (!nextLoading) {
                                            setSelectedOption("option3");
                                            setSelectedAnswer("option3");
                                        }
                                        if (item?.order_id == totalQuestions) {
                                            setLastQuestionSelected(false);
                                        }
                                    }}
                                >
                                    <Code>C</Code>{" "}
                                    <Op>
                                        {item?.question_details?.option3}
                                        {item?.question_details.option3
                                            ? currentQuestion?.option3
                                            : examQuestion.option3}
                                    </Op>
                                </Options>
                                <Options
                                    className={
                                        selectedOption === "option4" && "active"
                                    }
                                    onClick={(e) => {
                                        if (!nextLoading) {
                                            setSelectedOption("option4");
                                            setSelectedAnswer("option4");
                                        }
                                        if (item?.order_id == totalQuestions) {
                                            setLastQuestionSelected(false);
                                        }
                                    }}
                                >
                                    <Code>D</Code>{" "}
                                    <Op>
                                        {item?.question_details?.option4}
                                        {item?.question_details.option4
                                            ? currentQuestion?.option4
                                            : examQuestion.option4}
                                    </Op>
                                </Options>
                            </>
                        )}
                    </SectionContainer>
                ) : null
            )}
        </>
    );
}

export default ExamQuestions;
const SectionContainer = styled.div``;
const SplitScreen = styled.div``;
const QuestionCount = styled.p`
    font-family: "gordita_medium" !important;
    font-size: 20px;
    color: #747474;
    margin-bottom: 20px;
    @media all and (max-width: 980px) {
        font-size: 19px;
    }
    @media all and (max-width: 768px) {
        font-size: 18px;
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media (max-width: 480px) {
        margin-bottom: 15px;
    }
`;
const FigureQuestion = styled.div``;
const FigureSpace = styled.div`
    width: 300px;
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
const ExamQuestion = styled.p`
    width: 90%;
    max-width: 650px;
    font-size: 19px;
    color: #0a0a0a;
    margin-bottom: 20px;
    @media all and (max-width: 980px) {
        font-size: 18px;
        width: 100%;
    }
    @media all and (max-width: 768px) {
        font-size: 17px;
        width: 100%;
    }
    @media (max-width: 480px) {
        font-size: 16px;
        margin-top: 10px;
        margin-bottom: 15px;
    }
`;
const Code = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    min-height: 30px;
    border-radius: 3px;
    border: 1px solid #747474;
    margin-right: 10px;
    font-family: "gordita_medium" !important;
    padding-top: 6px;
    @media all and (max-width: 768px) {
        min-width: 25px;
        min-height: 25px;
        font-size: 15px;
        padding-top: 3px;
    }
    @media all and (max-width: 480px) {
        min-width: 25px;
        min-height: 25px;
    }
`;
const Op = styled.p`
    color: #545454;
    font-family: "gordita_medium" !important;
    font-size: 16px;
    min-height: 24px;
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;
const Options = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
    :last-child {
        margin-bottom: 0;
    }
    &.active {
        border: 1px solid #a3080c;
        background: linear-gradient(90deg, #a3080c 1.55%, #d2042d 100%);

        color: #fff;
        ${Code} {
            border: 1px solid #fff;
            color: #fff;
        }
        ${Op} {
            color: #fff;
        }
    }
    @media all and (max-width: 480px) {
        padding: 0;
        padding-left: 15px;
        width: 100%;
        min-height: 50px;
    }
`;
