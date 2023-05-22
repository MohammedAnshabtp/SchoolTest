import React from "react";
import Lottie from "react-lottie";
import loader from "../../../assets/lotties/single-loader.json";
import styled from "styled-components";

export default function Loader() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };
    return (
        <Container>
            <Lottie options={defaultOptions} height={90} width={90} />
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`;
