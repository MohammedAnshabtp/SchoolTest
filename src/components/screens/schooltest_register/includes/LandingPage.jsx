import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EnterDetails from "./EnterDetails";
import $ from "jquery";
import OtpModal from "./OtpModal";
import SuccessModal from "./SuccessModal";
// import promotion from "../../../../assets/images/probanner.svg";
import ReactPlayer from "react-player";
import Header from "./Header";
import "../../../../assets/css/style.css";

function LandingPage() {
    const [isModal, setModal] = useState(false);
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [studentDivision, setStudentDivision] = useState("");
    const [campusPk, setCampusPk] = useState("");
    const [CampusName, setCampusName] = useState("");

    const [isClass, setClass] = useState("");
    const [isStream, setIsStream] = useState("");
    const [stream, setStream] = useState("");
    const [isDetailsModal, setDetailsModal] = useState(false);
    const [isOtpModal, setOtpModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [isregistered, setIsRegistered] = useState("");
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [state, setState] = useState("");
    const [phoneNumber, setPhonNumber] = useState("");
    const [admissionNumber, setAdmissionNumber] = useState("");
    const playerRef = useRef(null);

    const handlePlay = () => {
        playerRef.current?.play();
    };

    const clearInputField = () => {
        setName("");
        setPhone("");
        setStudentDivision("");
        setClass("");
        setIsStream("");
        setCampusName("");
    };
    const handleResize = () => {
        setWindowHeight(window.innerHeight);
    };
    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        if (isDetailsModal) {
            $("html").addClass("modal-enabled");
        } else {
            $("html").removeClass("modal-enabled");
        }
    }, [isDetailsModal]);
    const classString = [
        {
            symbol: "5",
            text: "5th",
        },
        {
            symbol: "6",
            text: "6th",
        },
        {
            symbol: "7",
            text: "7th",
        },
        {
            symbol: "8",
            text: "8th",
        },
        {
            symbol: "9",
            text: "9th",
        },
        {
            symbol: "10",
            text: "10th",
        },
        {
            symbol: "+1",
            text: "11th",
        },
        {
            symbol: "+2",
            text: "12th",
        },
    ];
    const handleClass = () => {
        classString.map((item) => {
            if (item.symbol == isClass) {
                setState(item.text);
            }
        });
    };

    useEffect(() => {
        handleClass();
    }, [isClass]);

    return (
        <>
            <Header />
            <Container height={windowHeight} id="home">
                {isDetailsModal && (
                    <EnterDetails
                        isDetailsModal={isDetailsModal}
                        setDetailsModal={setDetailsModal}
                        phone={phone}
                        setPhone={setPhone}
                        name={name}
                        CampusName={CampusName}
                        setCampusName={setCampusName}
                        setName={setName}
                        studentDivision={studentDivision}
                        setStudentDivision={setStudentDivision}
                        campusPk={campusPk}
                        setCampusPk={setCampusPk}
                        isClass={isClass}
                        setClass={setClass}
                        isStream={isStream}
                        setStream={setStream}
                        stream={stream}
                        setIsStream={setIsStream}
                        setOtpModal={setOtpModal}
                        isregistered={isregistered}
                        setIsRegistered={setIsRegistered}
                    />
                )}
                {isOtpModal && (
                    <OtpModal
                        phone={phone}
                        name={name}
                        state={state}
                        studentDivision={studentDivision}
                        campusPk={campusPk}
                        CampusName={CampusName}
                        isClass={isClass}
                        isStream={isStream}
                        isOtpModal={isOtpModal}
                        phoneNumber={phoneNumber}
                        setPhonNumber={setPhonNumber}
                        admissionNumber={admissionNumber}
                        setAdmissionNumber={setAdmissionNumber}
                        setOtpModal={setOtpModal}
                        setSuccessModal={setSuccessModal}
                        clearInputField={clearInputField}
                    />
                )}
                {successModal && (
                    <SuccessModal
                        successModal={successModal}
                        setSuccessModal={setSuccessModal}
                        phoneNumber={phoneNumber}
                        admissionNumber={admissionNumber}
                    />
                )}
                <Wrapper className="wrapper">
                    <Landing>
                        <LandingLeft>
                            <Head>
                                Empowering Education:
                                <b> Your Path to Success Starts Here</b>
                            </Head>
                            <Subhead>
                                In today's fast-paced world, the education
                                system is undergoing a profound transformation.
                                Keeping pace with this shift, our online exam
                                test portal is at the forefront of modern
                                education, providing a dynamic platform that
                                empowers students, educators, and institutions
                                alike. With our user-friendly interface,
                                comprehensive features, and advanced technology,
                                we are redefining the way exams are conducted
                                and revolutionizing the learning experience
                            </Subhead>

                            {/* <Initiative>
                                <img src={promotion} />
                            </Initiative> */}
                            <RegisterButton
                                onClick={() => {
                                    setDetailsModal(true);
                                }}
                            >
                                Register
                            </RegisterButton>
                        </LandingLeft>
                        <LandingRight>
                            <div style={{ borderRadius: "20px" }}>
                                <ReactPlayer
                                    url="https://youtu.be/5CELM4h0pQg"
                                    playing={true}
                                    controls={true}
                                    width="100%"
                                    config={{
                                        file: {
                                            attributes: {
                                                controlsList: "nodownload",
                                            },
                                        },
                                    }}
                                    muted={true}
                                    ref={playerRef}
                                />
                            </div>
                        </LandingRight>
                    </Landing>
                </Wrapper>
            </Container>
        </>
    );
}

export default LandingPage;

const Container = styled.section`
    padding: 140px 0 7%;
    min-height: ${(props) => props.height};
    ::-webkit-scrollbar {
        display: none;
    }
    @media all and (max-width: 1280px) {
        padding-top: 50px;
    }
    @media all and (max-width: 1080px) {
        padding-top: 30px;
    }
    @media all and (max-width: 980px) {
        padding-top: 15px;
    }
    @media all and (max-width: 640px) {
        padding-bottom: 30px;
    }
`;
const Wrapper = styled.section``;
const Landing = styled.div`
    width: 100%;
    padding-top: 100px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap-reverse;
    @media all and (max-width: 1280px) {
        padding-top: 130px;
    }
    @media all and (max-width: 980px) {
        padding-top: 70px;
    }
`;
const LandingLeft = styled.div`
    width: 50%;
    @media all and (max-width: 1280px) {
        padding-top: 45px;
    }
    @media all and (max-width: 980px) {
        width: 100%;
        padding-top: 0px;
    }
`;

const Head = styled.h3`
    font-weight: 700;
    font-size: 40px;
    text-align: center;
    color: #a3080c;
    margin-bottom: 30px;
    text-align: left;
    position: relative;
    width: 100%;

    & b {
        color: #d2042d;
        font-weight: 700;
    }

    &::after {
        content: "";
        position: absolute;
        width: 500px;
        height: 500px;
        background: url("https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/ykipp/25-05-2022/background.svg");
        background-repeat: no-repeat;
        background-size: 100%;
        top: -165px;
        z-index: -1;
        left: -126px;
    }

    @media all and (max-width: 1280px) {
        font-size: 38px;
    }
    @media all and (max-width: 1080px) {
        font-size: 36px;
    }
    @media all and (max-width: 980px) {
        text-align: center;
        max-width: 100%;
        font-size: 28px;
    }
    @media all and (max-width: 640px) {
        font-size: 25px;
        &::after {
            width: 250px;
            height: 250px;
            background-size: 100%;
            top: -80px;
        }
    }
    @media all and (max-width: 480px) {
        margin-bottom: 20px;
        font-size: 22px;
        text-align: unset;
    }
    @media all and (max-width: 360px) {
        font-size: 20px;
    }
`;

const Banner = styled.div`
    height: 100%;
    width: 100%;
`;
const PlayerContainer = styled.div`
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
`;

const Video = styled.div`
    position: absolute;

    width: 600px;
    height: 400px;
`;
const Subhead = styled.p`
    color: #7d7d7d;
    font-size: 16px;
    margin-bottom: 20px;
    @media all and (max-width: 980px) {
        text-align: center;
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        margin-bottom: 20px;
        text-align: unset;
    }
`;
const LineContainer = styled.div`
    width: 55%;
    @media all and (max-width: 980px) {
        margin: 0 auto;
    }
    @media all and (max-width: 480px) {
        margin: unset;
    }
`;
const Initiative = styled.div`
    color: #7d7d7d;
    font-size: 16px;
    margin-top: 25px;
    width: 80%;
    -webkit-box-align: center;
    img {
        width: 100%;
        display: block;
    }
    @media all and (max-width: 1080px) {
        margin-top: none;
    }
    @media all and (max-width: 980px) {
        text-align: center;
        margin: auto 70px;
    }
    @media all and (max-width: 640px) {
        font-size: 14px;
        width: 100%;
        margin: 0 auto;
    }
    @media all and (max-width: 480px) {
        text-align: unset;
    }
    @media all and (max-width: 360px) {
        font-size: 13px;
    }
`;
const Brand = styled.a`
    color: #4a4a4a;
    font-weight: 900;
    font-size: 16px;
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
    }
`;
const RegisterButton = styled(Link)`
    width: 236px;
    font-size: 16px;
    padding: 15px 0;
    color: #fff;
    background: linear-gradient(90deg, #a3080c 1.55%, #d2042d 100%);
    text-align: center;
    font-family: "gordita_medium";
    border-radius: 8px;
    cursor: pointer;
    margin-top: 30px;
    display: block;
    @media all and (max-width: 1280px) {
        font-size: 15px;
    }
    @media all and (max-width: 1080px) {
        width: 270px;
    }
    @media all and (max-width: 980px) {
        margin: 0 auto;
        margin-top: 30px;
    }
    @media all and (max-width: 640px) {
        font-size: 14px;
    }
    @media all and (max-width: 480px) {
        font-size: 13px;
        width: 200px;
        margin: 30px auto;
    }
    @media all and (max-width: 360px) {
        width: 220px;
    }
`;
const LandingRight = styled.div`
    width: 50%;
    border-radius: 10px;
    /* background-color: greenyellow; */
    position: relative;

    & .mobile {
        display: none;
    }
    @media all and (max-width: 1080px) {
        margin-top: 70px;
    }
    @media all and (max-width: 980px) {
        width: 85%;
        margin: 60px auto;

        & .mobile {
            display: block;
        }
        & .web {
            display: none;
        }
    }
    @media all and (max-width: 768px) {
        margin-bottom: 70px;
    }
    @media all and (max-width: 640px) {
        width: 100%;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 40px;
    }
`;
