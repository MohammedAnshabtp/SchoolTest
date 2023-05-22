import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../../../context/store";
import moment from "moment";
import Header from "../../schooltest_register/includes/Header";

function NoExamination() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const {
        state: { school_test_data },
        dispatch,
    } = useContext(Context);
    //-----------------------Back tab prevent---------------
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
    //---------------------------------------------------
    //---------------Mobile browser-----------------------------------
    // window.addEventListener("beforeunload", (event) => {
    //     event.preventDefault();
    //     event.returnValue = "";
    //     localStorage.clear();
    // });
    //----------------------------------------------------------------

    return (
        <>
            <Header />
            <SectionContainer>
                <SectionWrapper>
                    <ContentBox>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/09-01-2023/Asset+1+7+(1).png"
                            alt=""
                        />
                    </ContentBox>
                    <NotePadImage>
                        <img
                            src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/23-01-2023/timer+1.svg"
                            alt=""
                        />
                    </NotePadImage>
                    <SubDiv>
                        <Title>Exam yet to commence</Title>
                        <Desc>
                            Your exam is not scheduled yet.The notifications
                            regarding the examination dates and other details
                            will reach you via your registered phone number.Stay
                            updated.
                            <span> </span>
                        </Desc>

                        <ButtonMainContiner>
                            <ButtonContiner
                                onClick={() => {
                                    setLoading(true);
                                    localStorage.removeItem("school_test_data");
                                    localStorage.clear();

                                    window.location.href = "/entrance";
                                }}
                            >
                                Logout
                            </ButtonContiner>
                        </ButtonMainContiner>
                    </SubDiv>{" "}
                </SectionWrapper>
            </SectionContainer>
        </>
    );
}

export default NoExamination;

const SectionContainer = styled.div`
    width: 100%;
    /* height: 100vh; */
    margin-top: 100px;
`;
const SectionWrapper = styled.div`
    width: 90%;
    padding: 1%;
    margin: 0 auto;
    position: relative;
`;
const ContentBox = styled.div`
    img {
        width: 100%;
        display: block;
    }
`;

const NotePadImage = styled.div`
    position: absolute;
    top: 22%;
    left: 44%;
    width: 12%;

    @media all and (max-width: 1280px) {
        top: 19%;
    }
    @media all and (max-width: 980px) {
        top: 16%;
    }
    @media all and (max-width: 768px) {
        top: 14%;
    }
    @media all and (max-width: 640px) {
        top: 12%;
    }
    @media all and (max-width: 480px) {
        top: 9%;
    }
    @media all and (max-width: 360px) {
        top: 8%;
    }

    img {
        width: 100%;
        display: block;
    }
`;
const Title = styled.div`
    font-size: 28px;
    text-align: center;
    color: #2d2d2d;
    font-family: "gordita_medium";
    margin-bottom: 15px;
    @media all and (max-width: 980px) {
        font-size: 20px;
    }
    @media all and (max-width: 480px) {
        font-size: 16px;
    }
`;
const Desc = styled.div`
    font-size: 20px;
    text-align: center;
    color: #6b6b6b;
    margin-bottom: 50px;
    @media all and (max-width: 980px) {
        font-size: 16px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
    span {
        font-size: 20px;
        color: #6b6b6b;
        font-family: "gordita_medium";
        @media all and (max-width: 980px) {
            font-size: 16px;
        }
        @media all and (max-width: 480px) {
            font-size: 14px;
        }
    }
`;

const SubDiv = styled.div`
    padding: 3% 0%;
    width: 80%;
    margin: 0 auto;
    @media all and (max-width: 980px) {
        width: 90%;
    }
    @media all and (max-width: 640px) {
        width: 100%;
    }
`;
const ItemLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
        color: #7556c3;
        font-family: "gordita_medium";
        font-size: 20px;
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
`;
const ButtonMainContiner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media all and (max-width: 480px) {
        flex-wrap: wrap;
    }
`;
const ButtonContiner = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "gordita_medium";
    background: linear-gradient(90deg, #a3080c 1.55%, #d2042d 100%);
    text-decoration: none;
    border-radius: 6px;
    cursor: pointer;
    gap: 10px;
    width: 240px;
    height: 58px;
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
    display: flex;
    justify-content: center;
    font-family: "gordita_medium";
    align-items: center;
    gap: 10px;
    width: 240px;
    height: 58px;
    border: 1px solid #e02b1d;
    border-radius: 6px;
    cursor: pointer;
    @media all and (max-width: 768px) {
        height: 50px;
    }
    @media all and (max-width: 480px) {
        margin-right: 0px;
        margin-bottom: 20px;
        width: 300px;
        height: 45px;
    }

    span {
        font-size: 20px;
        font-family: "gordita_regular";
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
`;
const LogoutImgContiner = styled.div`
    img {
    }
`;

const Phases = styled.div`
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 55px;
`;

const PhaseTwo = styled.div``;
const Backgroundcontiner = styled.div`
    position: absolute;
    width: 144px;
    height: 60px;
    border: 1px solid #8a6dd4;
    border-radius: 18px;
    @media all and (max-width: 640px) {
        width: 115px;
        height: 44px;
    }
    @media all and (max-width: 360px) {
        width: 90px;
        height: 36px;
    }
`;
const ItemContiner = styled.div`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: flex-start;
    /* padding: 14px 24.0158px; */
    gap: 9.48px;
    width: 360px;
    height: 64px;
    background: #f2f0fa;
    border: 1px solid #e2def1;
    box-shadow: 0px 3.79194px 89.1106px rgba(0, 0, 0, 0.05);
    border-radius: 13px;
    padding: 12px 18px;
    z-index: 1;
    top: 10px;
    left: 10px;
    @media all and (max-width: 1080px) {
        width: 289px;
        height: 100px;
        flex-wrap: wrap;
    }
    @media all and (max-width: 980px) {
        width: 214px;
        height: 89px;
        flex-wrap: wrap;
    }
    @media all and (max-width: 768px) {
        width: 176px;
        height: 89px;
        padding: 9px 15px;
    }
    @media all and (max-width: 480px) {
        width: 138px;
        height: 85px;
        padding: 9px 3px;
    }
    @media all and (max-width: 360px) {
        width: 115px;
        height: 77px;
        padding: 9px 3px;
        gap: 3.48px;
    }
`;
const ItemImgContiner = styled.div`
    width: 33%;
    img {
        display: block;
        width: 100%;
    }
    span {
    }
`;

const ItmeRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;
`;
const SubDate = styled.div`
    margin-bottom: -6px;
    span {
        color: #7556c3;
        font-size: 20px;
        font-family: "gordita_medium";
        @media all and (max-width: 980px) {
            font-size: 16px;
        }
        @media all and (max-width: 768px) {
            font-size: 14px;
        }
        @media all and (max-width: 480px) {
            font-size: 12px;
        }
        small {
            color: #6b6b6b;
            font-size: 20px;
            font-family: "gordita_medium";
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

const CalenderContiner = styled.div`
    width: 13%;
    margin-right: 6px;
    img {
        display: block;
        width: 100%;
    }
`;
