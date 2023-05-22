import React from "react";
import Lottie from "react-lottie";
import loader from "../../../assets/lotties/auth/cautionn.json";

class FailedLoader extends React.PureComponent {
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
                height={this.props.height ? this.props.height : 35}
                width={this.props.width ? this.props.width : 35}
            />
        );
    }
}
export default FailedLoader;
