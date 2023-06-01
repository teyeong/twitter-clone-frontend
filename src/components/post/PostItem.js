import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {IoIosMore} from "react-icons/io";
import img from "../../img/img.jpg"
import {HiOutlineChatBubbleOvalLeft} from "react-icons/hi2";
import {AiOutlineRetweet, AiOutlineHeart} from "react-icons/ai";
import {IoShareOutline} from "react-icons/io5";
import {RiMenu3Line} from "react-icons/ri";

const PostItem = (props) => {
    // 트윗 아이템 컴포넌트

    const { id, userId, nickname, content, createDate } = props;
    const [isExpanded, setIsExpanded] = useState(false);
    
    const navigate = useNavigate();

    function handleMenuToggle(event) {
        event.stopPropagation(); // "/status/id" 페이지로 가는 것 방지
        setIsExpanded(!isExpanded);
    }

    function handleTweetClick() {
        const url = `/status/${id}`; // 새로운 URL
        navigate(url);
        window.scrollTo({top:0});
    }

    function handleButtonClick(event) {
        event.stopPropagation(); // "/status/id" 페이지로 가는 것 방지
    }

    function formatCreatedAt(createDate) {
        const currentDate = new Date();
        const tweetDate = new Date(createDate);
    
        // 경과 시간 계산 (분 단위)
        const timeDiff = Math.floor((currentDate - tweetDate) / 1000 / 60);
        
        if (timeDiff < 1) {
            return 'Now';
        } else if (timeDiff < 60) {
            return `${timeDiff}m`;
        } else if (timeDiff < 1440) {
            const hours = Math.floor(timeDiff / 60);
            return `${hours}h`;
        } else {
            const options = {
                month: 'short',
                day: 'numeric',
            };
    
            const formattedDate = tweetDate.toLocaleString('en-US', options);
            return formattedDate;
        }
    }
    
    const handleDelete = async () => {
        try {
            // 트윗 삭제 요청 보내기
            await axios.delete(`/tweets/${id}?accountId=${userId}`);

            // 삭제가 성공한 경우 페이지 리로드
            window.location.reload();
        } catch (error) {
            console.error('트윗 삭제 오류:', error);
        }
    };

    function clickProfile(event) {
        event.stopPropagation(event); // "/status/id" 페이지로 가는 것 방지
        const url = `/profile/${userId}`; // profile url
        navigate(url);
    }

    const handleClickDelete = (event) => {
        event.stopPropagation(); // "/status/id" 페이지로 가는 것 방지
        handleDelete();
    }

    return (
        <Wrapper onClick={() => handleTweetClick()}>
            <ProfileImg onClick={(event) => clickProfile(event)} src={img}/>
            <ContentWrapper>
                <UserWrapper>
                    <NickName onClick={(event) => clickProfile(event)}>{nickname}</NickName>
                    <InfoWrapper>
                        <Userid onClick={(event) => clickProfile(event)}>@{userId}</Userid>
                        <Dot>·</Dot>
                        <Time>{formatCreatedAt(createDate)}</Time>
                    </InfoWrapper>
                    <MoreWrapper>
                        <MoreButton // svg
                            onClick={(event) => handleMenuToggle(event)}
                            aria-expanded={isExpanded}
                            aria-haspopup="true"
                            
                            />
                        {isExpanded && (
                            <Menu>
                                <MenuItem onClick={handleClickDelete} className="delete">Delete</MenuItem>
                                <MenuItem onClick={(event) => handleButtonClick(event)}>Pin to your profile</MenuItem>
                                <MenuItem onClick={(event) => handleButtonClick(event)}>Add/remove @{userId} from Lists</MenuItem>
                                <MenuItem onClick={(event) => handleButtonClick(event)}>Change whe can reply</MenuItem>
                                <MenuItem onClick={(event) => handleButtonClick(event)}>Embed Tweet</MenuItem>
                                <MenuItem onClick={(event) => handleButtonClick(event)}>View Tweet analytics</MenuItem>
                            </Menu>
                        )}
                    </MoreWrapper>
                </UserWrapper>
                <Content>{content}</Content>
                <ButtonWrapper>
                    <ReplyButton onClick={(event) => handleButtonClick(event)} />
                    <RetweetButton onClick={(event) => handleButtonClick(event)} />
                    <HearButton onClick={(event) => handleButtonClick(event)} />
                    <ViewButton onClick={(event) => handleButtonClick(event)} />
                    <ShareButton onClick={(event) => handleButtonClick(event)} />
                </ButtonWrapper>
            </ContentWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 570px;
    padding: 10px 15px;
    border-bottom: 0.1px solid lightgray;
    cursor: pointer;
    display: flex;
    :hover {
        background-color: rgba(211,211,211,0.15);
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    padding-left: 10px;
`;

const UserWrapper = styled.div`
    display: flex;
    height: 24px;
`;
const InfoWrapper = styled.div`
    display: flex;
    width: 100%;
`;

const ProfileImg = styled.img`
    border-radius: 50%;
    height: 48px;
`;

const MoreWrapper = styled.div``;

const MoreButton = styled(IoIosMore)`
    margin: 0;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    padding: 7px;
    :hover {
        background-color: rgba(0, 172, 238, 0.15);
        color: rgb(0, 172, 238);
    }
`;

const NickName = styled.p`
    width: max-content;
    font-weight: bold;
    margin: 0;
    margin-right: 5px;
    white-space: nowrap;
    :hover {
        text-decoration: underline;
    }
`;

const Userid = styled.p`
    margin: 0;
    margin-right: 5px;
    width: max-content;
    white-space: nowrap;
`;

const Dot = styled.p`
    margin: 0;
    margin-right: 5px;
`;

const Time = styled.p`
    margin: 0;
    :hover {
        text-decoration: underline;
    }
`;

const Content = styled.p`
    margin: 0;
    margin-bottom: 5px;
`;

const MenuItem = styled.button`
    border: none;
    background-color: white;
    padding: 15px 20px;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
    cursor: pointer;
    :hover {
        background-color: rgba(211,211,211,0.15);
    }
`;
const Menu = styled.div`
    z-index: 1;
    right: 670px;
    position: absolute;
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 300px;
    box-shadow: 0px 0px 10px 2px rgba(211,211,211,0.3);
    border-radius: 20px;
    overflow: hidden;
    .delete {
        color: red;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 450px;
`;
const ReplyButton = styled(HiOutlineChatBubbleOvalLeft)`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    padding: 7px;
    margin: 0;
    :hover {
        background-color: rgba(0, 172, 238, 0.15);
        color: rgb(0, 172, 238);
        cursor: pointer;
    }
`;

const RetweetButton = styled(AiOutlineRetweet)`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    padding: 7px;
    margin: 0;
    :hover {
        background-color: rgba(83, 183, 129, 0.15);
        color: rgb(83, 183, 129);
        cursor: pointer;
    }
`;

const HearButton = styled(AiOutlineHeart)`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    padding: 7px;
    margin: 0;
    :hover {
        background-color: rgba(229, 57, 127, 0.15);
        color: rgb(229, 57, 127);
        cursor: pointer;
    }
`;

const ViewButton = styled(RiMenu3Line)`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    padding: 7px;
    margin: 0;
    transform: rotate(90deg);
    :hover {
        background-color: rgba(0, 172, 238, 0.15);
        color: rgb(0, 172, 238);
        cursor: pointer;
    }
`;

const ShareButton = styled(IoShareOutline)`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    padding: 7px;
    margin: 0;
    :hover {
        background-color: rgba(0, 172, 238, 0.15);
        color: rgb(0, 172, 238);
        cursor: pointer;
    }
`;

export default PostItem;