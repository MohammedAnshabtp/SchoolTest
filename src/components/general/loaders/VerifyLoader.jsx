import React from "react";
import Lottie from "react-lottie";
import loader from "../../../assets/lotties/auth/verify.json";

class VerifyLoader extends React.PureComponent {
    render() {
        const defaultOptions = {
            loop: false,
            autoplay: true,
            animationData: loader,
            rendererSettings: {},
        };
        return (
            <Lottie
                options={defaultOptions}
                height={this.props.height ? this.props.height : 50}
                width={this.props.width ? this.props.width : 50}
            />
        );
    }
}
export default VerifyLoader;
