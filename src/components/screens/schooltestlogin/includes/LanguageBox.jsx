import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CountDown from "../../../application/count-down";
import { Context } from "../../../context/store";

function LanguageContainer() {
    const {
        state: { school_test_data },
        dispatch,
    } = useContext(Context);
    const [isLoading, setLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("english");
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

    return (
        <Container>
            <DisplayContainer>
                <LeftContainer>
                    <Title>View Your Examination Result {""}</Title>

                    <LanguageBox>
                        <PrimaryLanguage
                            className={
                                school_test_data.selected_language ===
                                    "malayalam" && "active"
                            }
                        >
                            Malayalam
                        </PrimaryLanguage>
                        <Switch
                            onClick={(e) => {
                                setSelectedLanguage(
                                    school_test_data.selected_language ===
                                        "malayalam"
                                        ? "english"
                                        : "malayalam"
                                );
                            }}
                        >
                            <Ball
                                active={
                                    school_test_data.selected_language ===
                                    "english"
                                        ? true
                                        : false
                                }
                            ></Ball>
                        </Switch>
                        <PrimaryLanguage
                            className={
                                school_test_data.selected_language ===
                                    "english" && "active"
                            }
                        >
                            English
                        </PrimaryLanguage>
                    </LanguageBox>
                </LeftContainer>
                <RightContainer>
                    <CancelBtn
                        className="disabled"
                        to="/entrance/completed"
                        onClick={() => {
                            setLoading(true);
                        }}
                    >
                        Back
                    </CancelBtn>
                </RightContainer>
            </DisplayContainer>
        </Container>
    );
}

export default LanguageContainer;
const Container = styled.div``;
const Space = styled.div``;
const DisplayContainer = styled.div`
    border: 1px solid #d4d4d4;
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 10px;
    position: fixed;
    width: 100%;
    background-color: #fff;
    @media all and (max-width: 640px) {
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }
    @media all and (max-width: 360px) {
        padding: 10px;
    }
`;
const TitleDiv = styled.div`
    margin-bottom: 5px;
`;
const LeftDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Title = styled.h3`
    font-family: "gordita_medium";
    margin-bottom: 10px;
    font-size: 21px;
    span {
        font-family: "gordita_medium";
        margin-bottom: 10px;
        font-size: 16px;
        text-transform: uppercase;
        @media all and (max-width: 768px) {
            font-size: 15px;
        }

        @media all and (max-width: 360px) {
            font-size: 12px;
        }
    }
    @media all and (max-width: 980px) {
        font-size: 19px;
    }
    @media all and (max-width: 768px) {
        font-size: 17px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: unset;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
        margin-bottom: unset;
    }
`;
const CancelBtn = styled(Link)`
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
    @media all and (max-width: 640px) {
        height: 35px;
        width: 120px;
    }
    @media all and (max-width: 480px) {
        height: 30px;
        width: 120px;
    }
`;
const LeftContainer = styled.div``;

const LanguageBox = styled.div`
    display: flex;
    align-items: center;

    @media all and (max-width: 640px) {
        justify-content: center;
        padding: 10px;
    }
`;
const PrimaryLanguage = styled.p`
    height: 17px;
    color: #9e9e9e;
    font-family: "gordita_medium";
    font-weight: 600;
    &.active {
        color: #a3080c;
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
const Switch = styled.span`
    display: inline-block;
    cursor: pointer;
    width: 40px;
    height: 24px;
    /* background-color: #edb420; */
    background: linear-gradient(90deg, #a3080c 1.55%, #d2042d 100%);

    border-radius: 30px;
    position: relative;
    margin: 0 10px;
`;
const Ball = styled.span`
    display: inline-block;
    transition: 200ms ease all;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${({ active }) => (active ? "18px" : "5px")};
`;
const RightContainer = styled.div`
    display: flex;
    align-items: center;
    opacity: 1;
`;
const RemainingTime = styled.div`
    border-left: 1px solid #d4d4d4;
    height: 100%;
    width: 140px;
    display: flex;
    align-items: center;
    padding: 0 30px 0 20px;
    position: relative;
    ::before {
        content: "TIME REMAINING";
        font-family: "gordita_medium";
        position: absolute;
        color: #333;
        top: 0;
        left: 10px;
        font-size: 10px;
        white-space: nowrap;
    }

    @media all and (max-width: 640px) {
        border-left: 0;
        padding: 0 10px;
        &::before {
            content: "";
        }
    }
    @media all and (max-width: 360px) {
        font-size: 12px;
    }
`;
const TimerDiv = styled.span`
    display: none;
    width: 25px;
    height: 25px;
    img {
        display: block;
        width: 100%;
    }
    @media all and (max-width: 640px) {
        display: inline-block;
    }
`;
const TimeDiv = styled.div`
    display: flex;
    align-items: center;
`;
const Time = styled.div`
    color: #0a4771;
    font-family: "gordita_medium";
    font-weight: 600;
    height: 22px;
`;
const Min = styled.span`
    position: relative;
    margin-right: 5px;
    font-size: 21px;
    font-family: "gordita_medium";
    ::before {
        font-family: "gordita_regular";
        content: "Min";
        position: absolute;
        color: #333;
        bottom: -23px;
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        &::before {
            content: "";
        }
    }
`;
const Sec = styled.span`
    position: relative;
    margin-left: 5px;
    font-size: 21px;
    font-family: "gordita_medium";
    ::before {
        font-family: "gordita_regular";
        content: "Sec";
        position: absolute;
        color: #333;
        bottom: -23px;
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        &::before {
            content: "";
        }
    }
`;

const EndButton = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    border: 1px solid #ff5a4f;
    border-radius: 5px;
    font-weight: 600;
    font-size: 15px;
    color: #ff5a4f;
    cursor: pointer;
    width: 120px;
    height: 40px;
    @media all and (max-width: 640px) {
        display: none;
    }
`;
