import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-scroll";
import SchoolTest from "../../../../assets/images/schooltest.png";

function Header() {
    return (
        <OutletBox>
            <MainContainer>
                <WrapperBox>
                    <ContentBox>
                        <LogoBox to="/">
                            <LogoImage
                                src={
                                   SchoolTest
                                        
                                }
                                alt="creatorclub-logo"
                            />
                        </LogoBox>
                        <NavBox>
                            <RightNav>
                                {/* <RightSide>
                                    <a
                                        href="../../../../assets/images/talrop.svg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ImgContainer>
                                            <img
                                                src={
                                                    require("../../../../assets/images/talrop.svg")
                                                        .default
                                                }
                                                alt="talrop"
                                            />
                                        </ImgContainer>
                                    </a>
                                </RightSide> */}
                            </RightNav>
                        </NavBox>
                    </ContentBox>
                </WrapperBox>
            </MainContainer>
            <Outlet />
        </OutletBox>
    );
}

export default Header;

const OutletBox = styled.div`
    position: relative;
`;
const MainContainer = styled.section`
    padding: 20px 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: #fff;
    z-index: 100;
`;
const WrapperBox = styled.section`
    width: 95%;
    margin: 0 auto;
    max-width: 1325px;
`;
const ContentBox = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const RightNav = styled.section`
    display: flex;
    gap: 48px;
    align-items: center;
    @media all and (max-width: 768px) {
        gap: 28px;
    }
`;
const LogoBox = styled(Link)`
    width: 170px;
    cursor: pointer;
    @media all and (max-width: 1080px) {
        width: 150px;
    }
    @media all and (max-width: 980px) {
        /* width: 115px; */
    }
    @media all and (max-width: 768px) {
        /* width: 105px; */
    }
    @media all and (max-width: 640px) {
        width: 120px;
    }
    @media all and (max-width: 480px) {
        /* width: 85px; */
    }
    @media all and (max-width: 360px) {
        width: 80px;
    }
`;
const LogoImage = styled.img`
    width: 100%;
    display: block;
`;
const RightSide = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media all and (max-width: 480px) {
    }
`;
const ImgContainer = styled.div`
    width: 190px;
    cursor: pointer;
    @media all and (max-width: 1080px) {
        width: 150px;
    }
    @media all and (max-width: 980px) {
        /* width: 210px; */
    }
    @media all and (max-width: 768px) {
        /* width: 210px; */
    }
    @media all and (max-width: 640px) {
        width: 120px;
    }
    @media all and (max-width: 480px) {
        /* width: 95px; */
    }
    @media all and (max-width: 360px) {
        width: 80px;
    }
`;
const NavBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media all and (max-width: 480px) {
        /* display: none; */
    }
`;
const NavItem = styled(Link)`
    cursor: pointer;
    margin-right: 65px;
    font-size: 24px;
    font-family: "gordita_medium";
    &:last-child {
        margin-right: 0;
        &:hover {
            color: #32bcad;
        }
    }
    &.active {
        color: #32bcad;
    }
    &:hover {
        color: #32bcad;
    }
    &.inactive {
        color: #666666;
    }
    @media all and (max-width: 1500px) {
        font-size: 20px;
    }

    @media all and (max-width: 1280px) {
        margin-right: 30px;
        font-size: 18px;
    }
    @media all and (max-width: 980px) {
        margin-right: 18px;
    }
    @media all and (max-width: 680px) {
        font-size: 16px;
    }
    @media all and (max-width: 640px) {
    }
    @media all and (max-width: 480px) {
        display: none;
    }
`;
const LoginButton = styled.div`
    color: #fff;
    background: linear-gradient(98.46deg, #32bcad -24.84%, #289a8e 144.56%);
    cursor: pointer;
    border-radius: 8px;
    /* padding: 13px 42px; */
    width: 174px;
    height: 60px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-family: "gordita_medium";
    @media all and (max-width: 1500px) {
        font-size: 18px;
    }
    @media all and (max-width: 1280px) {
        font-size: 17px;
        /* padding: 14px 43px; */
    }
    @media all and (max-width: 980px) {
    }
    @media all and (max-width: 768px) {
        /* padding: 13px 40px; */
        font-size: 16px;
    }
    @media all and (max-width: 680px) {
        font-size: 15px;
        /* padding: 11px 37px; */
        /* padding: 11px 18px; */
    }
    @media all and (max-width: 480px) {
        width: 126px;
        height: 42px;
    }
    @media all and (max-width: 360px) {
        /* padding: 10px 36px; */
        font-size: 14px;
    }
    &.login-button {
        width: 135px;
        height: 45px;
        background: linear-gradient(98.46deg, #32bcad -24.84%, #289a8e 144.56%);
        @media all and (max-width: 1500px) {
            font-size: 15px;
            /* padding: 15px 18px; */
        }
        @media all and (max-width: 1280px) {
            font-size: 17px;
            /* padding: 14px 18px; */
        }
        @media all and (max-width: 980px) {
        }
        @media all and (max-width: 768px) {
            /* padding: 11px 19px; */
            font-size: 16px;
        }
        @media all and (max-width: 680px) {
            font-size: 15px;
            /* padding: 11px 16px; */
            /* padding: 11px 18px; */
        }
        @media all and (max-width: 480px) {
            width: 126px;
            height: 42px;
        }
        @media all and (max-width: 360px) {
            /* padding: 11px 18px; */
            font-size: 14px;
        }
    }
`;
