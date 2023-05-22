import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import RequestLoader from "../../../general/loaders/RequestLoader";
import closeImage from "../../../../assets/images/school-scientist/close.svg";
import "../../../../assets/css/style.css";
import { Context } from "../../../context/store";
import { accountsConfig, manageConfig } from "../../../../axiosConfig";
import ReactWhatsapp from "react-whatsapp";
import { AxiosInstance } from "../../../../axiosInstance";
import Success from "../../../general/loaders/Success";

function EnterDetails({
    isDetailsModal,
    setDetailsModal,
    phone,
    setPhone,
    name,
    setName,
    studentDivision,
    setStudentDivision,
    isClass,
    setClass,
    campusPk,
    setCampusPk,
    setOtpModal,
    CampusName,
    setCampusName,
    isStream,
    setStream,
    setIsStream,
    isregistered,
}) {
    const navigate = useNavigate();

    //states
    const {
        state: { school_test_data },
        dispatch,
    } = useContext(Context);
    const recaptchaRef = useRef(null);

    const [isLoading, setLoading] = useState(false);
    // dropDown Toggle===============================
    const [isDropDown, setDropDown] = useState(false);
    const [campusDropDown, setCampusDropDown] = useState(false);
    const [classDropDown, setClassDropDown] = useState(false);
    const [registrationclosed, setRegistrationClosed] = useState(true);
    const [isDivisionDown, setDivisionDown] = useState(false);
    const [isClassDown, setClassDown] = useState(false);
    // const [isregistered, setIsRegistered] = useState("");
    //stream toggle =================
    const [isStreamDown, setStreamDown] = useState(false);
    const [streamDropDown, setStreamDropDown] = useState(false);

    // secarh filter================================
    const [searchTerm, setSearchTerm] = useState("");

    // featch campus
    const [isCampus, setCampus] = useState([]);

    // error message================================
    const [isError, setError] = useState("");
    const [pnError, setPnError] = useState("");

    // user data====================================
    const [isTick, setTick] = useState(false);
    const [country, setCountry] = useState("IN");
    const [district, setDistrict] = useState("");
    const [campusErrorMessage, setCampusErrorMessage] = useState("");
    const [isTidio, setIsTidio] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(false);

    // testing
    const [checkClass, setCheckClass] = useState(false);

    //testing
    const checkStream = () => {
        if (isClass == "+1" || isClass == "+2") {
            setCheckClass(true);
        } else setCheckClass(false);
    };

    const [fetchStream, setfetchStream] = useState([
        {
            id: 1,
            stream: "Science",
        },
        {
            id: 2,
            stream: "Commerce",
        },
        {
            id: 3,
            stream: "Humanities",
        },
    ]);
    const [fetchClass, setFetchClass] = useState([
        {
            id: 1,
            class: "5",
        },
        {
            id: 2,
            class: "6",
        },
        {
            id: 3,
            class: "7",
        },
        {
            id: 4,
            class: "8",
        },
        {
            id: 5,
            class: "9",
        },
        {
            id: 6,
            class: "10",
        },
        {
            id: 7,
            class: "+1",
        },
        {
            id: 8,
            class: "+2",
        },
    ]);

    const onNameChange = (e) => {
        let value = e.target.value.replace(/[0-9]+/g, "");
        setIsFormFilled(e.target.value !== "");
        setName(value);
    };
    // form validation=======================
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        } else if (e.keyCode === 69 || e.key === "$") {
            e.preventDefault();
        }
    };
    const handleStudentDivisionChange = (e) => {
        let value = e.target.value;
        const regex = /^[a-zA-Z ]*$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setStudentDivision(value);
        }
    };
    const onChange = (e) => {
        setIsFormFilled(e.target.value !== "");
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setPhone(e.target.value);
        }
    };

    //outside click
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setDropDown(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    // campus list api=============================
    useEffect(() => {
        campusSearch();

        if (searchTerm) {
            setDropDown(false);
        }
    }, [searchTerm]);
    // campusSearch==========================
    const campusSearch = () => {
        AxiosInstance.get(`api/v1/campuses/?q=${searchTerm}`, {})
            .then((response) => {
                const { app_data, data } = response.data;
                if (app_data.StatusCode === 6000) {
                    setCampus(app_data.data);

                    if (app_data.data.length <= 0) {
                        setCampusDropDown(false);
                        setCampusErrorMessage("School not found?");
                    } else {
                        setCampusErrorMessage("");
                    }
                } else if (app_data.StatusCode === 6001) {
                    setCampusErrorMessage("");
                    setLoading(false);
                    setError(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const SubmitData = () => {
        setCampusErrorMessage("");
        setLoading(true);
        const formData = new FormData();
        formData.append("name", name.toUpperCase());
        formData.append("phone", phone);
        formData.append("country", country);
        formData.append("district", district);
        formData.append("student_division", studentDivision.toUpperCase());
        formData.append("campus_pk", campusPk);
        formData.append("stream", isStream.toLowerCase());
        formData.append("student_class", isClass.toString());

        formData.append("is_registration_closed", isregistered);
        formData.append("has_computer", isTick ? "True" : "False");

        AxiosInstance.post(
            `api/v1/accounts/creator-club/registration/`,
            formData,
            {}
        ).then((response) => {
            const { app_data } = response.data;

            if (app_data.StatusCode === 6000) {
                setLoading(false);
                setCampusPk("");
                setSearchTerm("");
                setOtpModal(true);
                setDetailsModal(false);
                setError("");
                setCampusErrorMessage("");
                setPnError("");
            } else if (app_data.StatusCode === 6001) {
                setLoading(false);
                setError("This field is required");
                setCampusErrorMessage("School not found");
                setPnError(app_data.data.message);
            }
        });
    };

    return (
        <>
            <Overlay
                onClick={() => setDetailsModal(false)}
                className={isDetailsModal ? "active" : ""}
            ></Overlay>
            <BackContainer
                style={{ transform: isDetailsModal && "scale(1,1)" }}
            >
                <Modal>
                    <TitleSection>
                        <Title>Enter Details</Title>
                        <Close
                            onClick={() => {
                                setDetailsModal(false);
                                setPhone("");
                                setName("");
                                setClass("");
                                setCampusPk("");
                                setStudentDivision("");
                                setIsStream("");
                                setStream("");
                                setCampusName("");
                                setSearchTerm("");
                                setError("");
                                setCampusErrorMessage("");
                                setPnError("");
                            }}
                        >
                            <img src={closeImage} alt="Close" />
                        </Close>
                    </TitleSection>
                    <Form>
                        <NameDiv>
                            <TextInput
                                type="text"
                                placeholder="Enter your full name"
                                id="name"
                                value={name}
                                onChange={onNameChange}
                            />
                            <Label htmlFor="name">Full Name*</Label>
                            <Error>{name ? "" : isError}</Error>
                        </NameDiv>
                        <NumberDiv>
                            <Code>{"+91"}</Code>
                            <NumberInput
                                type="tel"
                                placeholder="Enter your whatsapp number"
                                id="number"
                                value={phone}
                                maxLength="10"
                                onKeyDown={handleKeyDown}
                                onChange={onChange}
                            />

                            <Label htmlFor="number">WhatsApp Number*</Label>
                            {!phone ? (
                                <Error>{isError}</Error>
                            ) : phone.length == 10 ? (
                                <Error>
                                    {pnError === "Already applied"
                                        ? pnError
                                        : ""}
                                </Error>
                            ) : (
                                <Error>{pnError}</Error>
                            )}
                        </NumberDiv>

                        <InputDiv>
                            <Label htmlFor="select">Class*</Label>

                            <TextInput
                                placeholder="Select your class"
                                type="select"
                                id="select"
                                value={isClass ? isClass : ""}
                                onClick={(e) => {
                                    setIsFormFilled(e.target.value !== "");
                                    setClassDown(!isClassDown);
                                    setClassDropDown(false);
                                }}
                            />
                            <Arrow>
                                <img
                                    src={
                                        "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/down-arrow.svg"
                                    }
                                    alt="Down Arrow"
                                />
                            </Arrow>
                            <DropDown className={isClassDown ? "active" : ""}>
                                <Ul>
                                    {fetchClass.map((item, index) => (
                                        <Li
                                            key={index}
                                            onClick={() => {
                                                setClassDown(false);
                                                setClass(item.class);
                                                checkStream();
                                            }}
                                        >
                                            {item.class}
                                        </Li>
                                    ))}
                                </Ul>
                            </DropDown>
                        </InputDiv>

                        {isClass === "+1" || isClass === "+2" ? (
                            <>
                                <Drop>
                                    <TextInput
                                        placeholder="Select stream"
                                        type="select"
                                        id="select"
                                        value={isStream}
                                        onClick={() => {
                                            setStreamDown(!isStreamDown);
                                            setStreamDropDown(false);
                                        }}
                                    />
                                    <Label htmlFor="select">Stream*</Label>
                                    <Arrow>
                                        <img
                                            src={
                                                "https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/assets/images/30-04-2022/down-arrow.svg"
                                            }
                                            alt="Down Arrow"
                                        />
                                    </Arrow>
                                    <DropDown
                                        className={isStreamDown ? "active" : ""}
                                    >
                                        <Ul>
                                            {fetchStream.map((item, index) => (
                                                <Li
                                                    key={index}
                                                    onClick={() => {
                                                        setStreamDown(false);
                                                        setIsStream(
                                                            item.stream
                                                        );
                                                    }}
                                                >
                                                    {item.stream}
                                                </Li>
                                            ))}
                                        </Ul>
                                    </DropDown>
                                </Drop>
                                <SubDiv>
                                    <TextInput
                                        type="text"
                                        placeholder="Enter your divison"
                                        id="select"
                                        value={studentDivision}
                                        maxLength="1"
                                        onChange={handleStudentDivisionChange}
                                    />
                                    <Label htmlFor="select">Division</Label>

                                    <DropDown
                                        className={
                                            isDivisionDown ? "active" : ""
                                        }
                                    >
                                        <Ul></Ul>
                                    </DropDown>
                                </SubDiv>
                            </>
                        ) : (
                            <InputDiv>
                                <TextInput
                                    type="text"
                                    placeholder="Enter your divison"
                                    id="select"
                                    value={studentDivision}
                                    maxLength="1"
                                    onChange={handleStudentDivisionChange}
                                />
                                <Label htmlFor="select">Division</Label>

                                <DropDown
                                    className={isDivisionDown ? "active" : ""}
                                >
                                    <Ul></Ul>
                                </DropDown>
                            </InputDiv>
                        )}
                        <InputCamp>
                            <GraduationStatus>
                                <SchoolInput
                                    type="text"
                                    placeholder="Search for your school here"
                                    onClick={() => {
                                        setCampusDropDown(true);
                                    }}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCampusName("");
                                        setCampusDropDown(true);
                                    }}
                                    value={
                                        CampusName.length !== 0
                                            ? CampusName
                                            : searchTerm
                                    }
                                />
                                <Label>School*</Label>
                                {!campusPk ? (
                                    <>
                                        <Error>
                                            {campusErrorMessage}{" "}
                                            <span
                                                id="creator-student-login"
                                                onClick={() =>
                                                    setIsTidio((prev) => !prev)
                                                }
                                                className="tidios"
                                            >
                                                <ReactWhatsapp
                                                    number="+918714602283"
                                                    message={`I was trying to register for Creator Club but couldn't find my school in the given list.\nName of the School :`}
                                                >
                                                    <span>
                                                        {" "}
                                                        {campusErrorMessage &&
                                                            "Contact us"}
                                                    </span>
                                                </ReactWhatsapp>
                                            </span>
                                        </Error>
                                    </>
                                ) : null}
                            </GraduationStatus>
                            {
                                <ClassDropDown
                                    className={campusDropDown ? "active" : ""}
                                >
                                    <UlMini>
                                        {isCampus.map((item, index) =>
                                            item.is_registration_closed ? (
                                                <LiMini
                                                    key={index}
                                                    className={
                                                        item.is_registration_closed
                                                            ? "disabled"
                                                            : ""
                                                    }
                                                >
                                                    <p>{item.name}</p>
                                                </LiMini>
                                            ) : (
                                                <LiMini
                                                    key={index}
                                                    className={
                                                        item.is_registration_closed
                                                            ? "disabled"
                                                            : ""
                                                    }
                                                    onClick={() => {
                                                        setCampusPk(item.id);
                                                        setSearchTerm(
                                                            item.name
                                                        );
                                                        setCampusName(
                                                            item.name
                                                        );
                                                        setCampusDropDown(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    <p>{item.name}</p>
                                                </LiMini>
                                            )
                                        )}
                                    </UlMini>
                                </ClassDropDown>
                            }
                        </InputCamp>

                        <CheckBox>
                            <TickBox
                                onClick={() => {
                                    setTick(!isTick);
                                }}
                            ></TickBox>
                            {isTick && (
                                <ImageBox onClick={() => setTick(!isTick)}>
                                    <img
                                        src={
                                            require("../../../../assets/images/school-scientist/tick.svg")
                                                .default
                                        }
                                        alt="tick"
                                    />
                                </ImageBox>
                            )}
                            <CheckPara>Do you have a laptop/desktop?</CheckPara>
                        </CheckBox>
                        <Submit
                            onClick={SubmitData}
                            disabled={
                                phone === "" ||
                                name === "" ||
                                isClass === "" ||
                                checkClass === "" ||
                                // isStream === "" ||
                                campusPk === "" ||
                                country === ""
                            }
                            className={
                                phone === "" ||
                                name === "" ||
                                isClass === "" ||
                                checkClass === "" ||
                                // isStream === "" ||
                                campusPk === "" ||
                                country === ""
                                    ? "disabled"
                                    : ""
                            }
                        >
                            {isLoading ? <RequestLoader /> : "Send OTP"}
                        </Submit>
                    </Form>
                </Modal>
            </BackContainer>
        </>
    );
}

export default EnterDetails;

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
    width: 800px;
    height: 700px;
    max-height: 100vh;
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
    max-width: 800px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
        display: none;
    }
    @media all and (max-width: 1080px) {
        padding: 25px;
        width: 700px;
        height: 650px;
    }
    @media (max-width: 768px) {
        max-width: 500px;
        padding: 40px;
        height: 600px;
        overflow-y: scroll;
        scroll-behavior: smooth;
    }
    @media (max-width: 640px) {
        max-width: 400px;
        padding: 35px;
        height: 550px;
    }
    @media (max-width: 480px) {
        max-width: 355px;
        padding: 27px 20px;
        overflow-y: scroll;
        scroll-behavior: smooth;
        max-height: 500px;
    }
    @media (max-width: 360px) {
        max-width: 300px;
        overflow-y: scroll;
        scroll-behavior: smooth;
        max-height: 400px;
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
const TitleSection = styled.div`
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #e7e6e6;
    ::-webkit-scrollbar {
        display: none;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 14px;
    }
`;

const Title = styled.h2`
    font-family: "gordita_medium";
    font-size: 20px;
    color: #000;
    cursor: none;
`;
const CheckBox = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 35px;
    position: relative;
    cursor: pointer;
    @media all and (max-width: 980px) {
        margin-bottom: 25px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 10px;
    }
    @media all and (max-width: 400px) {
        margin-bottom: 20px;
        margin-top: 10px;
    }
`;
const TickBox = styled.div`
    width: 23px;
    height: 23px;
    border-radius: 2px;
    display: block;
    margin-right: 10px;
    border: 1px solid #a0a0a0;
    padding: 10px;
`;
const ImageBox = styled.div`
    width: 23px;
    position: absolute;
    img {
        width: 100%;
        display: block;
    }
`;
const CheckPara = styled.p`
    font-size: 15px;
    margin-top: 2px;
    color: #a0a0a0;
    @media all and (max-width: 640px) {
        font-size: 12px;
    }
`;
const Error = styled.p`
    color: red;
    font-size: 12px;
    position: absolute;
    bottom: -40%;
    right: 0;
    cursor: auto;
    font-family: "gordita_medium";

    span {
        color: #a3080c;
        font-size: 12px;
        cursor: auto;
        font-family: "gordita_medium";
    }
    &.tidios {
        /* color: #14a62a; */
        font-family: "gordita_medium";
        text-decoration: underline;
        cursor: pointer;
    }
    @media all and (max-width: 480px) {
        font-size: 11px;
    }
`;

const Form = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    margin-top: 50px;
    @media all and (max-width: 768px) {
        margin-top: 40px;
    }
    & input::placeholder {
        font-family: "gordita_regular";
    }
`;
const SubDiv = styled.div`
    width: 25%;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    margin-bottom: 50px;
    border-radius: 10px;
    height: 58px;
    display: flex;
    @media all and (max-width: 980px) {
        margin-bottom: 40px;
    }
    @media all and (max-width: 768px) {
        height: 50px;
        width: 100%;
    }
    @media all and (max-width: 640px) {
    }
    @media all and (max-width: 480px) {
        margin-bottom: 36px;
        height: 46px;
    }
`;
const InputDiv = styled.div`
    width: 48%;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    margin-bottom: 50px;
    border-radius: 10px;
    height: 58px;
    display: flex;
    @media all and (max-width: 980px) {
        margin-bottom: 40px;
    }
    @media all and (max-width: 768px) {
        height: 50px;
        width: 100%;
    }
    @media all and (max-width: 640px) {
        width: 100%;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 36px;
        height: 46px;
    }
`;
const Drop = styled.div`
    width: 25%;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    margin-bottom: 50px;
    border-radius: 10px;
    height: 58px;
    display: flex;
    @media all and (max-width: 980px) {
        margin-bottom: 40px;
    }
    @media all and (max-width: 768px) {
        height: 50px;
        width: 100%;
    }
    @media all and (max-width: 640px) {
        width: 100%;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 36px;
        height: 46px;
    }
`;
const InputCamp = styled.div`
    width: 100%;
    background-color: #fff;
    position: relative;
    cursor: pointer;
    margin-bottom: 35px;
    border-radius: 10px;
    height: 58px;
    display: flex;
    @media all and (max-width: 768px) {
        margin-bottom: 20px;
    }
    @media all and (max-width: 640px) {
        width: 100%;
        height: 50px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 25px;
        height: 35px;
    }
`;
const NameDiv = styled.div`
    position: relative;
    width: 100%;
    background-color: #fff;
    position: relative;
    margin-bottom: 50px;
    border-radius: 10px;
    height: 58px;

    @media all and (max-width: 768px) {
        width: 100%;
        height: 50px;
    }
    @media all and (max-width: 640px) {
        margin-bottom: 30px;
    }
    @media all and (max-width: 480px) {
        height: 46px;
        margin-bottom: 36px;
    }
`;
const TextInput = styled.input`
    border: 2px solid #e6e6e6;
    border-radius: 10px !important;
    text-transform: uppercase;
    font-size: 16px;
    width: 100%;
    height: 100%;
    padding: 15px;
    cursor: pointer;
    font-family: "gordita_regular";

    &:focus {
        border: 2px solid #a3080c;
        border-radius: 10px;
    }

    &:hover {
        border: 2px solid #a3080c;
        border-radius: 10px;
    }
    ::placeholder {
        text-transform: none;
    }

    :-ms-input-placeholder {
        text-transform: none;
    }

    ::-ms-input-placeholder {
        text-transform: none;
    }
    @media all and (max-width: 768px) {
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        padding: 12px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        padding: 9px;
    }
    @media all and (max-width: 360px) {
        border: 1px solid #e6e6e6;
        font-size: 12px;
        &:hover {
            border: 1px solid #a3080c;
            border-radius: 10px;
        }
    }
`;
const SchoolInput = styled.input`
    border: 2px solid #e6e6e6;
    border-radius: 10px !important;
    text-transform: capitalize;
    font-size: 16px;
    width: 100%;
    height: 100%;
    padding: 15px;
    cursor: pointer;
    font-family: "gordita_regular";

    &:focus {
        border: 2px solid #a3080c;
        border-radius: 10px;
    }

    &:hover {
        border: 2px solid #a3080c;
        border-radius: 10px;
    }
    ::placeholder {
        text-transform: none;
    }

    :-ms-input-placeholder {
        text-transform: none;
    }

    ::-ms-input-placeholder {
        text-transform: none;
    }
    @media all and (max-width: 768px) {
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        padding: 12px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        padding: 9px;
    }
    @media all and (max-width: 360px) {
        border: 1px solid #e6e6e6;
        font-size: 12px;
        &:hover {
            border: 1px solid #a3080c;
            border-radius: 10px;
        }
    }
`;
const NumberInput = styled.input`
    width: calc(100% - 100px);
    height: 100%;
    font-size: 16px;
    font-family: "gordita_Regular";
    /* text-transform: capitalize; */
    @media all and (max-width: 768px) {
        width: calc(100% - 40px);
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        font-size: 15px;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
    @media (max-width: 360px) {
        font-size: 12px;
    }
`;
const Label = styled.label`
    position: absolute;
    top: -30px;
    left: 0;
    font-size: 15px;
    color: #a0a0a0;
    margin-bottom: 10px;
    cursor: none;
    @media all and (max-width: 768px) {
        font-size: 14px;
    }
    @media all and (max-width: 640px) {
        top: -20px;
    }
    @media all and (max-width: 480px) {
        top: -25px;
    }
`;

const NumberDiv = styled.div`
    position: relative;
    display: flex;
    position: relative;
    align-items: center;
    border: 2px solid #e6e6e6;
    border-radius: 10px !important;
    background-color: #fff;
    width: 100%;
    height: 58px;
    padding: 15px;
    margin-bottom: 50px;
    &:focus-within {
        border: 2px solid #a3080c;
    }
    &:hover {
        border: 2px solid #a3080c;
        border-radius: 10px;
    }
    @media all and (max-width: 980px) {
        /* margin-bottom: 40px; */
    }
    @media all and (max-width: 768px) {
        width: 100%;
        height: 50px;
        padding: 12px;
    }
    @media all and (max-width: 480px) {
        margin-bottom: 36px;
        height: 46px;
        padding: 9px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
        border: 1px solid #e6e6e6;
        padding: 10px;
        &:hover {
            border: 1px solid #a3080c;
            border-radius: 10px;
        }
    }
`;
const Code = styled.span`
    font-size: 16px;
    margin-right: 10px;
    line-height: 18px;
    color: #000;
    @media all and (max-width: 480px) {
        font-size: 14px;
    }
`;
const Arrow = styled.div`
    width: 8px;
    transform: rotate(90deg);
    transition: all 0.4s ease;
    position: absolute;
    right: 13px;
    top: 40%;

    img {
        width: 100%;
        display: block;
    }

    &.modal-active {
        transform: rotate(-90deg);
    }
    &.active {
        transform: rotate(-90deg);
    }
`;
const Submit = styled.button`
    background: linear-gradient(90deg, #a3080c 1.55%, #d2042d 100%);
    width: 100%;
    margin-left: auto;
    margin-right: 0;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-family: "gordita_medium";
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    @media all and (max-width: 640px) {
        font-size: 15px;
        height: 40px;
    }
    &.disabled {
        filter: opacity(0.5);
        cursor: not-allowed;
    }
    @media all and (max-width: 480px) {
        font-size: 14px;
        margin: 0 auto;
    }
`;
const GraduationStatus = styled.div`
    position: relative;
    margin-bottom: 35px;
    border-radius: 10px;
    height: 58px;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #9e9e9e;
    font-family: "gordita_regular";
    &.district {
        color: #000;
    }
    @media all and (max-width: 1280px) {
        max-height: 50px;
        width: 100%;
        min-height: 50px;
    }

    @media all and (max-width: 768px) {
        width: 100%;
    }

    @media all and (max-width: 480px) {
        width: 100%;
        margin-bottom: 36px;
        height: 46px;
    }
    @media all and (max-width: 360px) {
        font-size: 14px;
        border: 1px solid #e6e6e6;
        &:hover {
            border: 1px solid #a3080c;
            border-radius: 10px;
        }
    }
`;

const UlMini = styled.ul`
    background-color: #fff;
    font-size: 14px;
    width: 100%;
    height: 100%;
    font-family: "gordita_regular";
    overflow-y: scroll;
    scroll-behavior: smooth;
    height: auto;
    max-height: 180px;
    ::scrollbar-color {
        color: red;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 480px) {
        max-height: 150px;
    }
    @media (max-width: 360px) {
        max-height: 100px;
    }
`;
const LiMini = styled.li`
    border: 2px solid #e6e6e6;
    padding: 10px;
    background-color: #fff;
    color: #747474;
    border-radius: 5px;
    margin: 4px;
    ::-webkit-scrollbar {
        display: none;
    }
    &.disabled {
        filter: opacity(0.5);
        cursor: not-allowed;
    }

    :hover {
        /* color: rgb(15, 139, 94); */
        background-color: rgb(229, 245, 238);
    }
    :last-child {
        margin-bottom: 0;
    }
    @media all and (max-width: 480px) {
        padding: 8px;
    }
    p {
        font-size: 14px;
        @media all and (max-width: 768px) {
            width: 90%;
            white-space: nowrap;
            overflow: hidden;
            /* text-overflow: ellipsis; */
        }
    }
`;
const DropDown = styled.div`
    position: absolute;
    top: 100%;
    z-index: 1;
    width: 100%;
    height: auto;
    overflow-y: scroll;
    scroll-behavior: smooth;
    max-height: 280px;
    display: none;
    ::-webkit-scrollbar {
        display: none;
    }
    &.active {
        display: block;
    }
    @media (max-width: 1380px) {
        max-height: 250px;
    }
    @media (max-width: 640px) {
        max-height: 200px;
    }
`;
const ClassDropDown = styled.div`
    position: absolute;
    top: 100%;
    z-index: 1;
    width: 100%;
    height: auto;
    background-color: #fff;
    padding: 3px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    display: none;
    overflow-y: scroll;
    max-height: 300px;

    &.active {
        display: block;
    }
    @media all and (max-width: 1280px) {
        top: 84%;
    }

    @media all and (max-width: 400px) {
        top: 100%;
        padding: 2px;
    }
`;
const Ul = styled.ul`
    background-color: #fff;
    border: 2px solid #e6e6e6;
    border-radius: 10px !important;
    font-size: 16px;
    width: 100%;
    font-family: "gordita_regular";
    overflow-y: scroll;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
        display: none;
    }
`;
const Li = styled.li`
    border-bottom: 2px solid #e6e6e6;
    padding: 10px;
    :last-child {
        border-bottom: none;
    }
`;
const TextInputdropdown = styled.div`
    border: 2px solid #e6e6e6;
    border-radius: 10px !important;
    text-transform: uppercase;
    font-size: 16px;
    width: 100%;
    height: 100%;
    padding: 15px;
    cursor: pointer;
    font-family: "gordita_regular";
    &:focus {
        border: 2px solid #a3080c;
        border-radius: 10px;
    }
    &:hover {
        border: 2px solid #a3080c;
        border-radius: 10px;
    }
    ::placeholder {
        text-transform: capitalize;
    }

    :-ms-input-placeholder {
        text-transform: capitalize;
    }

    ::-ms-input-placeholder {
        text-transform: capitalize;
    }
`;
