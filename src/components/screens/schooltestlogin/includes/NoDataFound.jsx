import React from "react";
import styled from "styled-components";

function NoDataFound() {
    return (
        <ImageBox>
            <CardImage
                src="https://s3.ap-south-1.amazonaws.com/talrop.com-react-assets-bucket/yiaai/01-02-2022/images/not_loaded.svg"
                alt="Image"
            />
            <p>No data found</p>
        </ImageBox>
    );
}
const ImageBox = styled.div`
    width: 20%;
    margin: 170px auto;
    height: calc(100% - 80px);
    @media all and (max-width: 980px) {
        width: 200px;
    }
    p {
        color: #fff;
        font-size: 18px;
        font-family: "gordita_medium";
        text-align: center;
        margin-top: 15px;
    }
`;
const CardImage = styled.img`
    width: 100%;
    display: block;
`;
export default NoDataFound;
