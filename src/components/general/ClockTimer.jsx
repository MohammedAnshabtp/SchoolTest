import React from "react";
import Lottie from "react-lottie";
import clockTimer from "../../assets/lotties/school-scientist/clock-timer.json";
class ClockTimer extends React.PureComponent {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: clockTimer,
            rendererSettings: {},
        };
        return (
            <Lottie
                options={defaultOptions}
                height={this.props.height ? this.props.height : 60}
                width={this.props.width ? this.props.width : 60}
            />
        );
    }
}
export default ClockTimer;
