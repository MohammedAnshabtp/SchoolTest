import React from "react";
import Lottie from "react-lottie";
import styled from "styled-components";
import partypopper from "../../../assets/lotties/Succes.json";

class Success extends React.PureComponent {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: partypopper,
            rendererSettings: {},
        };
        return (
            <Container>
                <Lottie
                    options={defaultOptions}
                    height={this.props.height ? this.props.height : "100vh"}
                    width={this.props.width ? this.props.width : 1000}
                />
            </Container>
        );
    }
}
export default Success;
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`;
