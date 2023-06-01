import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import useAccount from "../hooks/useAccount";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import img from "../../img/img.jpg"

const PostWrite = () => {
    // 트윗 작성 컴포넌트

    const [content, setContent] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    // 사용자 계정 가져오기
    const [account] = useAccount();

    const navigate = useNavigate();

    const handleInputClick = () => {
        setIsVisible(true);
    };

    const textarea = useRef(null);

    const handleContentChange = (event) => {
        setContent(event.target.value);
        textarea.current = event.target;
        textarea.current.style.height = 'auto';
        textarea.current.style.height = textarea.current.scrollHeight + 'px';
    };


    const handlePostTweet = async () => {
        const requestBody = {
            content: content,
            accountId: account.accountId,
        };

        try {
            await axios.post("/api/tweets", requestBody);

            // 삭제 시 새로고침
            window.location.replace("/");
        } catch (err) {
            console.log("POST 에러 ", err);
        }
    };

    function clickProfile(event) {
        event.stopPropagation();
        const url = `/profile/${account.accountId}`; // 프로필 URL
        navigate(url);
    }


    return (
        <Wrapper>
            <Link
                to={account && `/profile/${account.accountId}`}
                state={{account:account}}
            >
                <ProfileImg src={img} onClick={clickProfile} />
            </Link>
            <InputWrapper>
                {isVisible && (
                    <UpperHiddenWrapper>
                        <UpperHiddenText>Everyone ∨</UpperHiddenText>
                    </UpperHiddenWrapper>
                )}
                <InputBox
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                    onClick={handleInputClick}
                    placeholder="What is happening?!"
                    rows="1"
                />
                {isVisible && (
                    <LowerHiddenWrapper>
                        <LowerHiddenText>🌎 Everyone can reply</LowerHiddenText>
                    </LowerHiddenWrapper>
                )}
                <TweetButton 
                    disabled={!content}
                    onClick={handlePostTweet}
                >
                    Tweet
                </TweetButton>
            </InputWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-top: 115px;
    padding: 15px;
    width: 570px;
    display: flex;
    border-bottom: 1px solid lightgray;;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
`;

const ProfileImg = styled.img`
    border-radius: 50%;
    height: 48px;
    :hover {
        background-color: rgba(26, 26, 26, 0.15);
    }
`;

const InputBox = styled.textarea`
    margin-top: 10px;
    border: none;
    resize: none;
    width: 500px;
    height: 30px;
    font-family: 'Arial', sans-serif;
    :focus {
        outline: none;
    }
    font-size: 20px;
`;

const UpperHiddenWrapper = styled.div``;
const LowerHiddenWrapper = styled.div`
    border-bottom: 1px solid lightgray;
`;
const UpperHiddenText = styled.p`
    margin-top: 0;
    color: #00acee;
    border: 1px solid lightgray;
    border-radius: 90px;
    width: max-content;
    padding: 1px 12px;
    font-weight: 600;
    cursor: pointer;
    :hover {
        background-color: rgba(0, 172, 238, 0.15);
    }
`;
const LowerHiddenText = styled.p`
    color: #00acee;
    border-radius: 90px;
    width: max-content;
    padding: 1px 10px;
    font-weight: 600;
    cursor: pointer;
    :hover {
        background-color: rgba(0, 172, 238, 0.15);
    }
`;

const TweetButton = styled.button`
    margin-left: 420px;
    margin-top: 15px;
    border: none;
    background-color: rgb(0, 172, 238);
    color: white;
    font-size: 15px;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 20px;
    width: max-content;
    cursor: pointer;
`;
export default PostWrite;