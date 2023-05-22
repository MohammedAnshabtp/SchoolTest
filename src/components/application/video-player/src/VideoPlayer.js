import React from "react";
import {
    Player,
    BigPlayButton,
    ControlBar,
    Shortcut,
    ProgressControl,
} from "video-react";
import HLSSource from "./HLSSource";
import styled from "styled-components";
import "video-react/dist/video-react.css";
import "../../assets/css/styles.css";

var playing = true;

class VideoPlayer extends React.PureComponent {
    nplayerSettings = localStorage.getItem("playerSettings");
    nplayerSettings = JSON.parse(this.nplayerSettings);
    constructor(props, context) {
        super(props, context);

        this.state = {
            clickingInside: false,
            clickingInsideControls: false,
            hideControlBar: true,
            src: this.props.source,
            quality: [],
            qualityLevel: this.nplayerSettings?.qualityLevel
                ? this.nplayerSettings.qualityLevel
                : "0",
            currentQuality: this.nplayerSettings?.quality.height
                ? this.nplayerSettings.quality.height
                : "",
            selectedQulaity: "",
            isQualities: false,
            isQuality: false,

            playing: true,
            muted: false,
            isFull: false,
            duration: 0,
            currentTime: "",
            formattedCurrentTime: "",
            isSettings: false,
            isItems: true,

            icon_title: "",
            height: 300,
            isSpeed: false,
            currentSpeed: 1,
            volumeValues: [1],
        };

        this.containerRef = React.createRef();
        this.topBarRef = React.createRef();
        this.midBarRef = React.createRef();
        this.bottomBarRef = React.createRef();
    }

    qualitySwitchSelect = (q) => {
        this.setState({
            currentQuality: q.height,
        });
    };

    changeTrack = (q) => {
        this.setState({
            qualityLevel: q,
            isQualities: !this.state.isQualities,
            isItems: !this.state.isItems,
            isSettings: !this.state.isSettings,
        });
    };

    autoClick = () => {
        localStorage.setItem(
            "playerSettings",
            JSON.stringify({
                ...this.playerSettings,
                quality: { height: "Auto" },
            })
        );
        this.setState({
            selectedQulaity: "",
            isQualities: !this.state.isQualities,
            isItems: !this.state.isItems,
            isSettings: !this.state.isSettings,
            qualityLevel: -1,
            currentQuality: "Auto",
        });
    };

    changeCurrentQuality = (e, q) => {
        this.qualitySwitchSelect(q);
    };

    goFull = () => {
        this.setState({ isFull: !this.state.isFull });
        this.toggleFullscreen();
        if (window.innerHeight > window.innerWidth) {
            window.screen.orientation.lock("landscape");
        }
    };

    seek = (seconds) => {
        return () => {
            this.player.seek(seconds);
        };
    };

    toggleFullscreen = () => {
        this.player.toggleFullscreen();
    };

    play = () => {
        this.player.play();
        playing = true;
        this.setState({ playing: true });
    };

    pause = () => {
        this.player.pause();
        this.setState({ playing: false });
    };

    updateQuality = (quality) => {
        this.setState({ quality });
    };

    hideQulaityBoxes = () => {
        this.setState({
            isQualities: !this.state.isQualities,
            isItems: !this.state.isItems,
            isSettings: !this.state.isSettings,
        });
    };

    changeCurrentTime(seconds) {
        return () => {
            const { player } = this.player.getState();
            this.player.seek(player.currentTime + seconds);
        };
    }

    setMuted = (muted) => {
        return () => {
            this.setState({ muted: muted });
            this.player.muted = muted;
        };
    };

    changeVolume = (steps) => {
        return () => {
            const { player } = this.player.getState();
            this.player.volume = player.volume + steps;
        };
    };

    selectedQulaityWidth = (q, index) => {
        localStorage.setItem(
            "playerSettings",
            JSON.stringify({
                ...this.playerSettings,
                quality: { height: q.height },
                qualityLevel: index,
            })
        );
        this.setState({ selectedQulaity: index });
    };

    load() {
        this.player.load();
        this.setState({ loading: true });
    }

    changePlaybackRate = (q) => {
        return () => {
            this.player.playbackRate = q;

            this.setState({ currentSpeed: q });
            localStorage.setItem(
                "playerSettings",
                JSON.stringify({
                    qualityLevel: this.state.qualityLevel,
                    quality: { height: this.state.currentQuality },
                    currentSpeed: q,
                })
            );
        };
    };

    visualizeQuality = () => {
        return this.state.quality.map((q, index) => (
            <div
                className={`parent ${
                    this.state.currentQuality === q.height ? "selected" : ""
                }`}
                key={index}
                onClick={(e) => {
                    this.changeCurrentQuality(e, q);
                    this.selectedQulaityWidth(q, index);
                    this.changeTrack(index);
                }}
            >
                <div>
                    <div className="line" />
                </div>
                <div>
                    {index + 1 === this.state.quality.length ? null : (
                        <div className="line two" />
                    )}
                    <span />
                    <p>{q.height}p</p>
                </div>
            </div>
        ));
    };

    handleStateChange(state, prevState) {
        let formattedCurrentTime = this.formatTime(state.currentTime);
        let duration = this.formatTime(state.duration);

        this.setState({
            playing: !state.paused,
            currentTime: state.currentTime,
            formattedCurrentTime: formattedCurrentTime,
            duration: duration,
            videoDuration: state.duration,
        });
    }

    toggleSettings = () => {
        this.setState({ isSettings: !this.state.isSettings, icon_title: "" });
    };

    showQualities = () => {
        if (this.state.isSettings) {
            this.setState({
                isItems: !this.state.isItems,
                isQualities: !this.state.isQualities,
            });
        }
    };

    setHeight = () => {
        const width = this.containerRef.current.offsetWidth;
        const height = (width * 9) / 16;
        this.setState({ height });
    };

    keyPress = (e) => {
        if (e.keyCode === 27) {
            this.setState({ isFull: false });
        }
    };

    playerSettings = {
        currentSpeed: 1,
        qualityLevel: -1,
        quality: {
            height: "Auto",
        },
    };

    componentDidMount() {
        let hplayerSettings = localStorage.getItem("playerSettings");
        hplayerSettings = JSON.parse(hplayerSettings);

        if (!hplayerSettings) {
            localStorage.setItem(
                "playerSettings",
                JSON.stringify(this.playerSettings)
            );
        } else {
            this.setState({
                currentSpeed: hplayerSettings.currentSpeed,
            });
        }

        this.player.subscribeToStateChange(this.handleStateChange.bind(this));
        const { player } = this.player.getState();
        if (player.readyState) {
            this.setState({ duration: player.duration });
        }

        document.addEventListener("mousedown", this.handleClickOutside);
        document.addEventListener("touchend", this.handleClickOutside);
        document.addEventListener("mouseover", this.handleClickOutside, false);
        document.addEventListener("mouseout", this.handleClickOutside, false);
        this.setHeight();
    }

    componentDidUpdate(prevProps) {
        if (this.state.currentSpeed !== prevProps.currentSpeed) {
            this.player.playbackRate = this.state.currentSpeed;
        }

        const { source } = this.props;

        if (source !== prevProps.source) {
            this.setState({ src: source });
        }

        if (
            !isNaN(this.state.videoDuration) &&
            parseInt(this.state.currentTime) ===
                parseInt(this.state.videoDuration - 5)
        ) {
            // this.props.handleMarkViewed();
        }
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
        document.removeEventListener("touchend", this.handleClickOutside);
        document.removeEventListener(
            "mouseover",
            this.handleClickOutside,
            false
        );
        document.removeEventListener(
            "mouseout",
            this.handleClickOutside,
            false
        );
    }

    handleClickOutside = (event) => {
        if (
            this.containerRef &&
            !this.containerRef.current.contains(event.target)
        ) {
            this.setState({
                hideControlBar: true,
                clickingInsideControls: true,
            });
        } else {
            this.setState({
                hideControlBar: false,
            });
        }
    };

    handleClickInsidePlayer = (event) => {
        if (
            this.topBarRef &&
            !this.topBarRef.current.contains(event.target) &&
            this.midBarRef &&
            !this.midBarRef.current.contains(event.target)
        ) {
            this.setState({
                hideControlBar: !this.state.hideControlBar,
            });
        }
    };

    formatTime = (seconds) => {
        var guide = seconds;
        var s = Math.floor(seconds % 60);
        var m = Math.floor((seconds / 60) % 60);
        var h = Math.floor(seconds / 3600);
        var gm = Math.floor((guide / 60) % 60);
        var gh = Math.floor(guide / 3600); // handle invalid times

        if (isNaN(seconds) || seconds === Infinity) {
            h = "-";
            m = "-";
            s = "-";
        }

        h = h > 0 || gh > 0 ? "".concat(h, ":") : "";

        m = "".concat((h || gm >= 10) && m < 10 ? "0".concat(m) : m, ":");

        s = s < 10 ? "0".concat(s) : s;
        return h + m + s;
    };

    render() {
        let { cover, isPrime, handlePlayNextCard } = this.props;
        const soundData = [
            {
                id: 1,
                speed: 0.75,
            },
            {
                id: 2,
                speed: 1,
            },
            {
                id: 3,
                speed: 1.25,
            },
            {
                id: 4,
                speed: 1.5,
            },
        ];

        return (
            <MainWrapper
                className={`${
                    this.state.hideControlBar || this.state.clickingInside
                        ? "hidden"
                        : ""
                }`}
                id="video-player"
                ref={this.containerRef}
                style={this.styles.mainContainer}
            >
                <div
                    className="playerContainer"
                    style={this.styles.playerContainer}
                >
                    <Player
                        ref={(player) => {
                            this.player = player;
                        }}
                        // poster={cover && cover}
                        autoPlay={true}
                        muted={true}
                        playsInline={true}
                        webkitPlaysinline={true}
                        fluid={true}
                        onEnded={this.props.handleMarkViewed}
                    >
                        <Shortcut clickable={false} />
                        <BigPlayButton position="center" />
                        <ControlBar
                            autoHide={true}
                            disableDefaultControls={true}
                        >
                            <PlainOverlay
                                className={`${
                                    this.state.clickingInsideControls
                                        ? "upper"
                                        : ""
                                }`}
                                onClick={() =>
                                    this.setState({
                                        clickingInside:
                                            !this.state.clickingInside,
                                        clickingInsideControls: false,
                                    })
                                }
                            />
                            <TopControls
                                ref={this.topBarRef}
                                className={`hello-player ${
                                    this.state.isSpeed || this.state.isQuality
                                        ? "hide-player"
                                        : ""
                                } ${
                                    this.state.hideControlBar ||
                                    this.state.clickingInside
                                        ? "hide"
                                        : ""
                                }`}
                                onClick={() =>
                                    this.setState({
                                        clickingInsideControls: false,
                                    })
                                }
                            >
                                <TopLeftControls>
                                    <TopContentContainer
                                        onClick={this.setMuted(
                                            !this.state.muted
                                        )}
                                    >
                                        <TopTitle>Sound </TopTitle>

                                        {!this.state.muted ? (
                                            <TopBox
                                                className="icon-selected sound-icon"
                                                onClick={this.setMuted(true)}
                                            >
                                                <img
                                                    alt=""
                                                    src={
                                                        require("../../assets/images/speaker.svg")
                                                            .default
                                                    }
                                                />
                                            </TopBox>
                                        ) : (
                                            <TopBox
                                                className="icon-selected sound-icon"
                                                onClick={this.setMuted(false)}
                                            >
                                                <img
                                                    alt=""
                                                    src={
                                                        require("../../assets/images/mute.svg")
                                                            .default
                                                    }
                                                />
                                            </TopBox>
                                        )}
                                    </TopContentContainer>
                                </TopLeftControls>
                                <TopRightControls>
                                    <TopContentContainer
                                        className="top-right"
                                        onClick={() =>
                                            this.setState({ isSpeed: true })
                                        }
                                    >
                                        <TopTitle>Speed</TopTitle>
                                        <TopBox className="icon-selected">
                                            {this.state.currentSpeed}x
                                        </TopBox>
                                    </TopContentContainer>
                                    {this.state.quality.length > 0 && (
                                        <TopContentContainer
                                            className="top-right"
                                            onClick={() =>
                                                this.setState({
                                                    isQuality: true,
                                                })
                                            }
                                        >
                                            {" "}
                                            <TopTitle>Quality </TopTitle>
                                            <TopBox className="icon-selected">
                                                {!this.state.currentQuality
                                                    ? this.state.quality[0]
                                                          .height
                                                    : this.state.currentQuality}
                                                {this.state.currentQuality !==
                                                    "Auto" && "p"}
                                            </TopBox>
                                        </TopContentContainer>
                                    )}
                                    <TopContentContainer
                                        className="top-right"
                                        onClick={() => this.goFull()}
                                    >
                                        <TopTitle>
                                            {!this.state.isFull
                                                ? "Full Screen"
                                                : "Exit"}
                                        </TopTitle>
                                        <TopBox className="full icon-selected">
                                            {!this.state.isFull ? (
                                                <img
                                                    alt=""
                                                    src={
                                                        require("../../assets/images/max.svg")
                                                            .default
                                                    }
                                                />
                                            ) : (
                                                <img
                                                    alt=""
                                                    src={
                                                        require("../../assets/images/mini.svg")
                                                            .default
                                                    }
                                                />
                                            )}
                                        </TopBox>
                                    </TopContentContainer>
                                </TopRightControls>
                            </TopControls>

                            <SoundContainer
                                className={
                                    this.state.isSpeed ? "speed-active" : ""
                                }
                                onClick={() =>
                                    this.setState({ isSpeed: false })
                                }
                            >
                                <SoundHeaderContainer
                                    className={
                                        this.state.isSpeed ? "active" : ""
                                    }
                                >
                                    <h3>Speed</h3>
                                </SoundHeaderContainer>
                                <SoundControlsContainer
                                    className={
                                        this.state.isSpeed ? "active" : ""
                                    }
                                >
                                    <SpeedBar>
                                        <SpeedBarLine>
                                            {soundData.map((data, index) => (
                                                <div
                                                    key={data.id}
                                                    className={`parent ${
                                                        this.state
                                                            .currentSpeed ===
                                                        data.speed
                                                            ? "selected"
                                                            : ""
                                                    }`}
                                                    onClick={this.changePlaybackRate(
                                                        data.speed
                                                    )}
                                                >
                                                    <div
                                                        className={
                                                            index === 0
                                                                ? "first"
                                                                : ""
                                                        }
                                                    >
                                                        <div className="line" />
                                                    </div>
                                                    <div>
                                                        {index + 1 ===
                                                        soundData.length ? null : (
                                                            <div className="line two" />
                                                        )}
                                                        <span />
                                                        <p>{data.speed}x</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </SpeedBarLine>
                                    </SpeedBar>
                                    <CloseButton
                                        onClick={() =>
                                            this.setState({
                                                isSpeed: false,
                                            })
                                        }
                                    >
                                        <img
                                            alt=""
                                            src={
                                                require("../../assets/images/close.svg")
                                                    .default
                                            }
                                        />
                                    </CloseButton>
                                </SoundControlsContainer>
                            </SoundContainer>
                            {this.state.quality.length > 0 && (
                                <SoundContainer
                                    className={
                                        this.state.isQuality
                                            ? "quality-active"
                                            : ""
                                    }
                                    onClick={() =>
                                        this.setState({ isQuality: false })
                                    }
                                >
                                    <SoundHeaderContainer
                                        className={
                                            this.state.isQuality ? "active" : ""
                                        }
                                    >
                                        <h3>Quality</h3>
                                    </SoundHeaderContainer>
                                    <SoundControlsContainer
                                        className={
                                            this.state.isQuality ? "active" : ""
                                        }
                                    >
                                        <SpeedBar>
                                            <SpeedBarLine>
                                                <div
                                                    className={`parent ${
                                                        this.state
                                                            .currentQuality ===
                                                        "Auto"
                                                            ? "selected"
                                                            : ""
                                                    }`}
                                                    onClick={this.autoClick}
                                                >
                                                    <div className="first">
                                                        <div className="line" />
                                                    </div>
                                                    <div>
                                                        <div className="line two" />

                                                        <span />
                                                        <p>Auto</p>
                                                    </div>
                                                </div>
                                                {this.visualizeQuality()}
                                            </SpeedBarLine>
                                        </SpeedBar>
                                        <CloseButton
                                            onClick={() =>
                                                this.setState({
                                                    isQuality: false,
                                                })
                                            }
                                        >
                                            <img
                                                alt=""
                                                src={
                                                    require("../../assets/images/close.svg")
                                                        .default
                                                }
                                            />
                                        </CloseButton>
                                    </SoundControlsContainer>
                                </SoundContainer>
                            )}

                            <MidControls
                                ref={this.midBarRef}
                                className={`hello-player ${
                                    this.state.isSpeed || this.state.isQuality
                                        ? "hide-player"
                                        : ""
                                } ${
                                    this.state.hideControlBar ||
                                    this.state.clickingInside
                                        ? "hide"
                                        : ""
                                }`}
                            >
                                <ControlIcon
                                    onClick={this.changeCurrentTime(-10)}
                                >
                                    <img
                                        alt="Icon"
                                        src={
                                            require("../../assets/images/backward.svg")
                                                .default
                                        }
                                    />
                                </ControlIcon>

                                <ControlIcon
                                    style={{
                                        display: this.state.playing
                                            ? "block"
                                            : "none",
                                    }}
                                    onClick={this.pause}
                                    className="pause"
                                >
                                    <img
                                        alt="Icon"
                                        src={
                                            require("../../assets/images/pause.svg")
                                                .default
                                        }
                                    />
                                </ControlIcon>
                                <ControlIcon
                                    style={{
                                        display: this.state.playing
                                            ? "none"
                                            : "block",
                                    }}
                                    onClick={this.play}
                                    className="play"
                                >
                                    <img
                                        alt="Icon"
                                        src={
                                            require("../../assets/images/play.svg")
                                                .default
                                        }
                                    />
                                </ControlIcon>
                                <ControlIcon
                                    onClick={this.changeCurrentTime(+10)}
                                >
                                    <img
                                        alt="Icon"
                                        src={
                                            require("../../assets/images/forward.svg")
                                                .default
                                        }
                                    />
                                </ControlIcon>
                            </MidControls>

                            <ProgressControl
                                className={`progress-control ${
                                    this.state.isSpeed || this.state.isQuality
                                        ? "hide-player"
                                        : ""
                                } ${
                                    this.state.hideControlBar ||
                                    this.state.clickingInside
                                        ? "hide"
                                        : ""
                                }`}
                            />
                            <ButtonContainer
                                className={` hello-player ${
                                    this.state.isSpeed || this.state.isQuality
                                        ? "hide-player"
                                        : ""
                                } ${
                                    this.state.hideControlBar ||
                                    this.state.clickingInside
                                        ? "hide"
                                        : ""
                                }`}
                            >
                                <div className="left">
                                    <span className="time">
                                        {this.state.formattedCurrentTime}{" "}
                                    </span>
                                </div>
                                <div
                                    className="right"
                                    style={this.styles.rightContainer}
                                >
                                    <span className="time">
                                        {this.state.duration}
                                    </span>
                                </div>
                            </ButtonContainer>
                        </ControlBar>

                        {this.props.source && (
                            <HLSSource
                                isVideoChild
                                qualityLevel={this.state.qualityLevel}
                                updateQuality={this.updateQuality}
                                alt=""
                                src={this.props.source}
                            />
                        )}
                    </Player>
                </div>
            </MainWrapper>
        );
    }

    styles = {
        mainContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${this.props.thumbnail})`,
            backgroundSize: "cover",
        },
        buttonsAlign: {
            display: "flex",
            alignItems: "center",
        },
        button: {
            height: "17px",
            width: "17px",
        },
        forwindbutton: {
            height: "22px",
            width: "22px",
        },
        buttonImage: {
            height: "100%",
            maxWidth: "17px",
        },
        playerContainer: {
            position: "relative",
            width: "100%",
        },

        controls: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "60px",
            backgroundColor: "rgba(0,0,0,.4)",
            zIndex: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 30px",
        },
        controls_left_container: {
            display: "flex",
            alignItems: "center",
        },
        play_button: {
            display: playing === true ? "block" : "none",
        },
        rightContainer: {
            display: "flex",
            alignItems: "flex-start",
            position: "relative",
        },
    };
}

export default VideoPlayer;

const MainWrapper = styled.div`
    transition: ease 0.4s;
    overflow: hidden;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 34px;
    width: 100%;
    position: absolute;
    bottom: 30px;
    font-family: gordita_medium;
    font-size: 14px;
    transition: all ease 0.5s;
    opacity: 1;

    &.hide {
        opacity: 0;
        transition: all ease 0.2s;
    }
    @media all and (max-width: 640px) {
        bottom: 13px;
        font-size: 13px;
    }
    @media only screen and (max-width: 480px) {
        font-size: 12px;

        padding: 0 12px;
        bottom: 12px;
    }
`;
const PlainOverlay = styled.div`
    position: absolute;
    z-index: 10;
    width: 100%;
    /* background-color: green; */
    height: calc(100% - 70px);
    &.upper {
        z-index: 50;
    }
`;

const TopControls = styled.div`
    position: absolute;
    left: 4%;
    top: 7%;
    /* transform: translate(-50%, -50%); */
    display: flex;
    min-width: 92%;
    align-items: center;
    justify-content: space-between;
    /* transition: ease 0.4s; */
    z-index: 51;
    transition: all 0.3s ease;
    opacity: 1;

    &.hide {
        top: 5%;

        z-index: 46;

        opacity: 0;
        transition: all 0.3s ease;
    }

    @media all and (max-width: 640px) {
        top: 10%;
    }
`;
const TopLeftControls = styled.div``;
const TopContentContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    &.top-right {
        margin-right: 20px;
        &:last-child {
            margin-right: unset;
        }
    }
    &:hover {
        div.icon-selected {
            transform: scale(1.1);
            transition: ease 0.4s;
        }
        div.icon {
            transform: scale(1.1);
            transition: ease 0.4s;
        }
    }
    @media all and (max-width: 640px) {
        &.top-right {
            margin-right: 15px;
            &:last-child {
                margin-right: unset;
            }
        }
    }
`;
const TopTitle = styled.div`
    font-size: 13px;
    font-family: "gordita_medium";
    margin-right: 10px;
    padding-top: 3px;
    @media all and (max-width: 640px) {
        display: none;
    }
`;

const TopBox = styled.div`
    font-size: 13px;
    font-family: "gordita_medium";
    border: 2px solid #fff;
    border-radius: 3px;
    padding: 5px 5px 3px 5px;
    transform: scale(1);
    transition: ease 0.4s;
    &.sound-icon {
        width: 22px;
        height: 22px;
        border: unset;
        border-radius: unset;
        padding: unset;
        vertical-align: middle;
        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    &.full {
        border: unset;
        border-radius: unset;
        padding: unset;
        width: 22px;
        vertical-align: middle;
        transform: scale(1);
        transition: ease 0.4s;

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    &:hover {
        transform: scale(1.1);
        transition: ease 0.4s;
    }
    @media all and (max-width: 640px) {
        margin-right: 10px;
    }
    @media all and (max-width: 480px) {
        font-size: 10px;
        font-family: "gordita_medium";

        padding: 2px 5px 0 5px;
        line-height: 1.3em;
        &.full {
            width: 18px;
        }
        &.sound-icon {
            width: 18px;
            height: 18px;
        }
    }
`;
const TopRightControls = styled.div`
    display: flex;
    align-items: center;
`;
const MidControls = styled.div`
    display: block;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    min-width: 47%;
    align-items: center;
    justify-content: space-between;
    z-index: 51;
    transition: all 0.5s ease;
    opacity: 1;

    &.hide {
        display: none;
        opacity: 0;
        transition: all 0.5s ease;
    }
`;
const ControlIcon = styled.div`
    width: 50px;
    height: 50px;
    cursor: pointer;
    transform: scale(1);
    transition: ease 0.4s;
    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    &:hover {
        transform: scale(1.1);
        transition: ease 0.4s;
    }
    @media all and (max-width: 980px) {
        width: 45px;
        height: 45px;
    }
    @media all and (max-width: 640px) {
        width: 40px;
        height: 40px;
    }
    @media all and (max-width: 480px) {
        width: 35px;
        height: 35px;
    }
`;

// Speed Section
const SoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: ease 0.4s;
    z-index: 9;

    &.speed-active {
        z-index: 51;
    }
    &.quality-active {
        z-index: 51;
    }
`;
const SoundHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 100%;
    background-color: rgba(36, 36, 36, 0.7);
    opacity: 0;
    transform: translateY(-50px);
    transition: all 0.4s ease;
    &.active {
        opacity: 1;
        transform: unset;
    }
    h3 {
        color: #fff;
        text-align: center;
        font-size: 18px;
        font-family: "gordita_medium";
    }
    @media all and (max-width: 640px) {
        height: 60px;
        h3 {
            color: #fff;
            text-align: center;
            font-size: 14px;
            font-family: "gordita_medium";
        }
    }
    @media all and (max-width: 480px) {
        /* height: 60px; */
        h3 {
            color: #fff;
            text-align: center;
            font-size: 13px;
            font-family: "gordita_medium";
        }
    }
`;
const SoundControlsContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100px;
    width: 100%;
    padding-top: 25px;
    background-color: rgba(36, 36, 36, 0.7);
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.4s ease;
    &.active {
        opacity: 1;
        transform: unset;
    }
    @media all and (max-width: 640px) {
        height: 60px;
        padding-top: 15px;
    }
    @media all and (max-width: 480px) {
        /* height: 60px; */
        padding-top: 15px;
    }
`;
const SpeedBar = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const CloseButton = styled.div`
    width: 20px;
    position: absolute;
    top: 15%;
    right: 5%;
    cursor: pointer;
    transform: scale(1);
    transition: ease 0.4s;
    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    &:hover {
        transform: scale(1.1);
        transition: ease 0.4s;
    }
    @media all and (max-width: 480px) {
        width: 17px;
    }
`;
const SpeedBarLine = styled.div`
    display: flex;

    align-items: flex-start;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    div.parent {
        width: 100%;
        display: flex;
        align-items: flex-start;
        div {
            width: 100%;
            display: flex;
            flex-direction: column;
            div.line {
                width: 100%;
                height: 3px;
                background-color: #b1b1b1;
                &:last-child {
                    width: auto;
                }
            }
            span {
                margin-top: -9px;
                margin-left: -8px;
                width: 15px;
                height: 15px;
                border-radius: 100px;
                background-color: #b1b1b1;
                transition: ease 0.4s;
                transform: scale(1);
            }
            p {
                font-size: 14px;
                font-family: "gordita_medium";
                color: #b1b1b1;
                margin-left: -100%;
                margin-top: 5px;
                text-align: center;
                transform: scale(1);
                transition: ease 0.4s;
            }
        }
        div.first {
            div.line {
                display: none;
            }
        }
        &:last-child {
            span {
                margin-top: -6px;
                transform: scale(1);
                transition: ease 0.4s;
            }
        }
        &:hover {
            span {
                transform: scale(1.1);
                transition: ease 0.4s;
                background-color: #15bf81;
                margin-bottom: 6px;
            }
            p {
                transform: scale(1.1);
                transition: ease 0.4s;
                color: #fff;
            }
        }
        &.selected {
            span {
                background-color: #15bf81;
            }
            p {
                color: #fff;
            }
        }
    }
    @media all and (max-width: 640px) {
        div.parent {
            &:last-child {
                span {
                    margin-top: -4px;
                }
            }
            div {
                div.line {
                    height: 2px;
                }

                span {
                    margin-top: -6px;
                    margin-left: -8px;
                    width: 10px;
                    height: 10px;
                }
                p {
                    font-size: 12px;
                    font-family: "gordita_medium";
                    margin-top: 4px;
                }
            }
        }
    }
    @media all and (max-width: 480px) {
        div.parent {
            &:last-child {
                span {
                    margin-top: -4px;
                }
            }
            div {
                div.line {
                    height: 2px;
                }

                span {
                    margin-top: -6px;
                    margin-left: -8px;
                    width: 10px;
                    height: 10px;
                }
                p {
                    font-size: 11px;
                    font-family: "gordita_medium";
                    margin-top: 4px;
                }
            }
        }
    }
`;
const VolumeBarContainer = styled.div`
    margin-left: 10px;
    width: 100px;
`;
