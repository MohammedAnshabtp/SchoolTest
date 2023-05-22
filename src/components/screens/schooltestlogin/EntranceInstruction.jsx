import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Context } from "../../context/store";
import { useNavigate } from "react-router-dom";
import RequestLoader from "../../general/loaders/RequestLoader";
import moment from "moment";
import { AxiosInstance } from "../../../axiosInstance";
import Header from "../schooltest_register/includes/Header";

function EntranceInstruction({}) {
    const [selectedLanguage, setSelectedLanguage] = useState("english");

    const {
        state: { school_test_data },
        dispatch,
    } = useContext(Context);

    let Date = moment(school_test_data.date).format("DD-MMMM-YYYY");
    let Time = moment(school_test_data.date).format("LT");

    //--------------------Site local Storage Clearing ------------------------
    // window.addEventListener("beforeunload", (event) => {
    //     event.preventDefault();
    //     event.returnValue = "";
    //     localStorage.clear();
    // });
    //----------------------------------------------------------------------------------
    //-----------------------Back tab prevent-------------------------------------------
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
    //-----------------------

    const [difLanguage] = useState([
        {
            id: 1,
            langage1: `The exam consist of ${school_test_data.total_questions} multiple-choice questions.`,
            langage2: `പരീക്ഷയിൽ ${school_test_data.total_questions} മൾട്ടിപ്പിൾ ചോയ്സ് ചോദ്യങ്ങളാണ് ഉണ്ടാവുക.`,
        },
        {
            id: 2,
            langage1: `The examination will last for ${school_test_data.total_time_allotted} minutes. `,
            langage2: `${school_test_data.total_time_allotted} മിനിറ്റാണ്  പരീക്ഷയുടെ ദൈർഘ്യം.`,
        },
        {
            id: 3,
            langage1: `The <b>${school_test_data.total_time_allotted}</b> minutes long exam can be attended at any time before <b>${Time}</b> on <b> ${Date}</b>  .`,
            langage2: `<b>${school_test_data.total_time_allotted}</b> മിനിറ്റ് ദൈർഘ്യമുള്ള പരീക്ഷയ്ക്ക് <b> ${Date}</b> <b>${Time}</b> മണിക്ക് മുമ്പ് എപ്പോൾ വേണമെങ്കിലും പങ്കെടുക്കാം.`,
        },
        {
            id: 4,
            langage1: `Each multiple-choice question includes four options, and the candidate must select the right one by clicking on it.`,
            langage2: `ഓരോ മൾട്ടിപ്പിൾ ചോയ്‌സ് ചോദ്യത്തിനും നാല് ഓപ്‌ഷനുകൾ ഉണ്ടായിരിക്കും. കാൻഡിഡേറ്റ് അതിൽ ശരിയായ ഓപ്‌ഷൻ തിരഞ്ഞെടുക്കണം.`,
        },
        {
            id: 5,
            langage1: `There is no negative marks for wrong answers.`,
            langage2: `തെറ്റായ ഉത്തരങ്ങൾക്ക് നെഗറ്റീവ് മാർക്കില്ല.`,
        },
        {
            id: 6,
            langage1: `The examination begins only when the 'Start Test' button is clicked.You can only attend the exam once.`,
            langage2: `'സ്റ്റാർട്ട് ടെസ്റ്റ്' ബട്ടണിൽ ക്ലിക്ക് ചെയ്യുമ്പോൾ മാത്രമേ പരീക്ഷ ആരംഭിക്കൂ. നിങ്ങൾക്ക് ഒരു തവണ മാത്രമേ പരീക്ഷയിൽ പങ്കെടുക്കാൻ കഴിയൂ.`,
        },
        {
            id: 7,
            langage1: `The remaining time of the test will be displayed on the screen.`,
            langage2: ` ടെസ്റ്റിന്റെ ശേഷിക്കുന്ന സമയം സ്ക്രീനിൽ പ്രദർശിപ്പിക്കും .`,
        },
        {
            id: 8,
            langage1: `When the allotted time has passed, the exam ends automatically. Alternatively, if the student completes the exam earlier, he or she may exit by clicking the "End Test " button.`,
            langage2: `പരീക്ഷയിലേ  എല്ലാ ചോദ്യങ്ങളും അറ്റൻഡ് ചെയ്തതിന് ശേഷം , ചോദ്യങ്ങൾക്ക് നേരെയുള്ള നമ്പറുകളിൽ ക്ലിക്കു ചെയ്‌തുകൊണ്ട് പരീക്ഷാർത്ഥിക്ക് എല്ലാ ചോദ്യങ്ങളിലൂടെയും നാവിഗേറ്റ് ചെയ്യുവാനും  ആവശ്യമായ തിരുത്തുകൾ തിരുത്തുവാനും  സാധിക്കും. `,
        },

        {
            id: 9,
            langage1: `Do not click the "End Test" button until you are ready to exit the examination. `,
            langage2: `നിങ്ങൾ പരീക്ഷയിൽ നിന്ന് പുറത്തുകടക്കാൻ തയ്യാറാകുന്നത് വരെ "എൻഡ് ടെസ്റ്റ്" ബട്ടണിൽ ക്ലിക്ക് ചെയ്യരുത്.`,
        },
        {
            id: 10,
            langage1: `Do not try to close the window or reload the page until you finish the exam.`,
            langage2: `പരീക്ഷ പൂർത്തിയാകുന്നതുവരെ ടാബ് ക്ലോസ് ചെയ്യുവാനോ പേജ് റീലോഡ് ചെയ്യുവാനോ ശ്രമിക്കരുത്‌.`,
        },
    ]);

    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const [studentData, setStudentData] = useState();

    useEffect(() => {
        setTimeout(() => {
            setError(false);
        }, 1000);

        if (school_test_data.exam_status === "attending") {
            navigate("/entrance/questions");
        }
    }, [isError]);

    useEffect(() => {
        setStudentData(school_test_data);
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
    const handleStarting = () => {
        setLoading(true);
        setError(false);
        setErrorMsg("");
        AxiosInstance.post(
            "api/v1/exams/start/exam/",
            {},
            {
                headers: {
                    Authorization: `Bearer ${school_test_data.access_token}`,
                },
            }
        )
            .then((response) => {
                const { app_data } = response.data;
                if (app_data.StatusCode === 6000) {
                    setLoading(false);

                    dispatch({
                        type: "UPDATE_SCHOOL_TEST_DATA",
                        school_test_data: {
                            exam_pk: app_data.data.exam_pk,
                            exam_status: "attending",
                            start_timestamp: app_data.data.start_timestamp,
                            end_timestamp: app_data.data.end_timestamp,
                        },
                    });
                    navigate({
                        pathname: "/entrance/questions",
                        state: {
                            exam_pk: app_data.data.exam_pk,
                            data: studentData,
                        },
                    });
                } else if (app_data.StatusCode === 6001) {
                    setLoading(false);
                    setErrorMsg(app_data.data.message);
                    setError(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Header />
            <Wrapper>
                <HeaderTop>
                    <Title>
                        <span>Test</span> Instructions
                    </Title>
                    <LanguageBox>
                        <PrimaryLanguage
                            className={
                                selectedLanguage === "malayalam" && "active"
                            }
                        >
                            Malayalam
                        </PrimaryLanguage>
                        <Switch
                            onClick={(e) => {
                                setSelectedLanguage(
                                    selectedLanguage === "malayalam"
                                        ? "english"
                                        : "malayalam"
                                );
                            }}
                        >
                            <Ball
                                active={
                                    selectedLanguage === "english"
                                        ? true
                                        : false
                                }
                            ></Ball>
                        </Switch>
                        <PrimaryLanguage
                            className={
                                selectedLanguage === "english" && "active"
                            }
                        >
                            English
                        </PrimaryLanguage>
                    </LanguageBox>
                </HeaderTop>
                <InstructionsBox>
                    {selectedLanguage === "english" ? (
                        <>
                            {difLanguage.map((item) => (
                                <Instructions>
                                    <OuterCircle>
                                        <img
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-01-2023/green-arrow.svg"
                                            alt="Arrow"
                                        />
                                    </OuterCircle>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: item.langage1,
                                        }}
                                    ></p>
                                </Instructions>
                            ))}
                        </>
                    ) : (
                        <>
                            {difLanguage.map((item) => (
                                <Instructions>
                                    <OuterCircle>
                                        <img
                                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-01-2023/green-arrow.svg"
                                            alt="Arrow"
                                        />
                                    </OuterCircle>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: item.langage2,
                                        }}
                                    ></p>
                                </Instructions>
                            ))}
                        </>
                    )}
                </InstructionsBox>
                <Warning>
                    Please be sure you take the exam by yourself in a quiet
                    and undisturbed space.
                </Warning>

                <ButtonContainer>
                    {!isLoading ? (
                        <Button
                            onClick={() => {
                                handleStarting();
                            }}
                        >
                            Start Test
                        </Button>
                    ) : (
                        <Button>
                            <RequestLoader />
                        </Button>
                    )}
                    {isError && <Error>{errorMsg}</Error>}
                </ButtonContainer>
            </Wrapper>
        </>
    );
}

export default EntranceInstruction;

const Title = styled.h2`
    font-family: "gordita_medium";
    font-size: 26px;
    margin-top: 15px;
    margin-bottom: 15px;
    span {
        color: #a3080c;
        font-weight: 600;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 10px;
        font-size: 20px;
    }
    @media all and (max-width: 480px) {
        font-size: 15px;
    }
    @media all and (max-width: 360px) {
        font-size: 21px;
        margin-bottom: 5px;
    }
`;
const Wrapper = styled.div`
    width: 90%;
    margin: 0 auto;
    /* padding: 0 100px; */
    padding-top: 30px;
    height: calc(100px-100vh);
    @media all and (max-width: 1080px) {
        padding: 0 60px;
    }
    @media all and (max-width: 980px) {
        padding: 0 40px;
    }
    @media all and (max-width: 768px) {
        padding: 0 30px;
    }

    @media all and (max-width: 640px) {
        padding: 0 20px;
    }
    @media all and (max-width: 480px) {
        padding: 0 10px;
    }
    @media all and (max-width: 360px) {
        width: 93%;
        padding: 0;
    }
`;
const InstructionsBox = styled.div`
    border: 1px solid #d4d4d4;
    padding: 25px 20px;
    border-radius: 5px;
    margin-bottom: 10px;
    @media all and (max-width: 640px) {
        padding: 15px 10px;
    }
    @media all and (max-width: 360px) {
        padding: 20px 10px;
    }
`;
const Instructions = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
    p {
        font-size: 18px;
        width: 100%;
    }
    &:last-child {
        margin-bottom: 0;
    }
    @media all and (max-width: 640px) {
        p {
            font-size: 15px;
        }
    }
    @media all and (max-width: 480px) {
        p {
            font-size: 14px;
        }
    }
    @media all and (max-width: 360px) {
        p {
            /* font-size: 14px; */
        }
    }
`;
const OuterCircle = styled.span`
    max-width: 13px;
    max-height: 13px;
    margin-right: 10px;
    margin-top: 5px;
    display: inline-block;

    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 480px) {
        max-width: 10px;
        max-height: 10px;
    }
    @media all and (max-width: 360px) {
        margin-right: 5px;
    }
`;
const HeaderTop = styled.span`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 100px;
`;
const LanguageBox = styled.div`
    display: flex;
    align-items: center;

    @media all and (max-width: 640px) {
        /* display: none; */
    }
`;
const PrimaryLanguage = styled.p`
    height: 17px;
    color: #9e9e9e;
    font-family: "gordita_medium";

    &.active {
        color: #a3080c;
    }
    @media (max-width: 640px) {
        font-size: 13px;
    }
`;
const Switch = styled.span`
    display: inline-block;
    cursor: pointer;
    width: 40px;
    height: 24px;
    background-color: #a3080c;
    border-radius: 30px;
    position: relative;
    margin: 0 10px;

    @media all and (max-width: 480px) {
        margin: 0 5px;
        width: 35px;
        height: 20px;
    }
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
    @media (max-width: 640px) {
        width: 15px;
        height: 15px;
    }
`;

const Warning = styled.div`
    border: 1px solid #ffcccc;
    border-radius: 6px;
    background-color: #ffefef;
    color: #f0857d;
    text-align: center;
    padding: 15px 0;
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 10px;
    @media all and (max-width: 716px) {
        font-size: 16px;
    }
    @media all and (max-width: 480px) {
        padding: 15px 10px;
        font-size: 12px;
    }
    @media all and (max-width: 360px) {
        /* font-size: 13px; */
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
`;
const Button = styled.span`
    display: inline-block;
    /* background: #f1c217; */
    background: linear-gradient(90deg, #a3080c 1.55%, #d2042d 100%);

    width: 300px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 7px;
    font-weight: 600;
    margin-bottom: 20px;
    cursor: pointer;
    @media all and (max-width: 480px) {
        font-size: 13px;
    }
`;
const Error = styled.p`
    color: red;
    font-size: 14px;
    position: absolute;
    right: 9px;
    top: -9px;
`;
