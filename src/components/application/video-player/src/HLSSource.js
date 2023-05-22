import React, { Component } from "react";
import Hls from "hls.js";

export default class HLSSource extends Component {
    constructor(props, context) {
        super(props, context);
        this.hls = new Hls();
    }

    componentDidMount() {
        const { src, video } = this.props;
        if (Hls.isSupported()) {
            this.hls.loadSource(src);
            this.hls.attachMedia(video);

            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                // video.play();
                this.hls.nextLevel = this.props.qualityLevel;
                this.props.updateQuality(this.hls.levels);
            });
        }
    }

    componentDidUpdate(prevProps) {
        const { src, video } = this.props;
        if (prevProps.qualityLevel !== this.props.qualityLevel) {
            this.hls.nextLevel = this.props.qualityLevel;
        }

        if (src !== prevProps.src) {
            if (Hls.isSupported()) {
                this.hls.loadSource(src);
                this.hls.attachMedia(video);

                this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play();
                    this.hls.nextLevel = this.props.qualityLevel;
                    this.props.updateQuality(this.hls.levels);
                });
            }
        }
    }

    componentWillUnmount() {
        // destroy hls video source
        if (this.hls) {
            this.hls.destroy();
        }
    }

    render() {
        return (
            <source
                src={this.props.src}
                type={this.props.type || "application/x-mpegURL"}
            />
        );
    }
}
