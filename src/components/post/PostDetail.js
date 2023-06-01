import { useParams, useNavigate } from "react-router";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

import {BiArrowBack} from "react-icons/bi";
import {IoIosMore} from "react-icons/io";
import img from "../../img/img.jpg";
import {HiOutlineChatBubbleOvalLeft} from "react-icons/hi2";
import {AiOutlineRetweet, AiOutlineHeart} from "react-icons/ai";
import {IoShareOutline} from "react-icons/io5";
import {RxBookmark} from "react-icons/rx";


const PostDetail = (props) => {
    // 트윗 상세보기 컴포넌트

    const {tweets} = props;
    const navigate = useNavigate();
    const { id } = useParams();
    const findTweet = tweets.find((tweet) => {
        // eslint-disable-next-line eqeqeq
        return tweet.tweetId == id;
    });

    // MoreButton이 클릭됐는지 확인하는 state
    const [isExpanded, setIsExpanded] = useState(false);

    // MoreButton 클릭 시 호출하는 함수
    function handleMenuToggle() {
        setIsExpanded(!isExpanded);
    }

    // createDate 포맷 맞추는 함수
    function formatCreatedAt(createDate) {
        const options = {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        };
      
        const date = new Date(createDate);
        const formattedDate = date.toLocaleString('en-US', options);
        const formattedYear = formattedDate.split(', ')[1].split(' at ')[0];
        const formattedTime = formattedDate.split(', ')[1].split(' at ')[1];
        const formattedDateTime = formattedTime + ' · ' + formattedDate.split(', ')[0] + ', ' + formattedYear;
  
        return formattedDateTime;
    }

    const handleDelete = () => {
        try {
            // 트윗 삭제 요청 보내기
            axios.delete(`/tweets/${findTweet.tweetId}?accountId=${findTweet.writerId}`)
            .then(() => {
                // 삭제가 성공한 경우 메인페이지로
                window.location.replace("/");
            })
            .catch((error) => {
                console.error('트윗 삭제 오류:', error);
            });
        } catch (error) {
            console.error('트윗 삭제 오류:', error);
        }
    };

    function clickProfile() {
        const url = `/profile/${findTweet.writerId}`; // 프로필 URL
        navigate(url);
    }
    
    const handleClickDelete = () => {
        handleDelete();
    }

    return (
        <>
            <TopWrapper>
                <HeaderWrapper onClick={() => window.scrollTo({top:0})}>
                    <BackIcon onClick={() => navigate(-1)} />
                    <HeaderText>Tweet</HeaderText>
                </HeaderWrapper>
                <BottomWrapper>
                    <article>
                        {findTweet ? (
                        <ContentWrapper>
                            <Wrapper>
                                <ProfileImg onClick={(event) => clickProfile(event)} src={img}/>
                                <Wrapper>
                                    <InfoWrapper>
                                        <NickName>{findTweet.writer}</NickName>
                                        <UserId>@{findTweet.writerId}</UserId>
                                    </InfoWrapper>
                                    <MoreWrapper>
                                        <MoreButton 
                                            onClick={(event) => handleMenuToggle(event)}
                                            aria-expanded={isExpanded}
                                            aria-haspopup="true"
                                        />
                                        {isExpanded && (
                                            <Menu>
                                                <MenuItem onClick={handleClickDelete} className="delete">Delete</MenuItem>
                                                <MenuItem>Pin to your profile</MenuItem>
                                                <MenuItem>Add/remove @{findTweet.writerId} from Lists</MenuItem>
                                                <MenuItem>Change whe can reply</MenuItem>
                                                <MenuItem>Embed Tweet</MenuItem>
                                                <MenuItem>View Tweet analytics</MenuItem>
                                            </Menu>
                                        )}
                                    </MoreWrapper>
                                </Wrapper>
                            </Wrapper>
                            <InsideWrapper>
                                <div>
                                    <Content>{findTweet.content}</Content>
                                    <TransText>Translate Tweet</TransText>
                                </div>
                                <Time>{formatCreatedAt(findTweet.createDate)}</Time>
                                <ButtonWrapper>
                                    <ReplyButton />
                                    <RetweetButton />
                                    <HearButton />
                                    <BookmarkButton />
                                    <ShareButton />
                                </ButtonWrapper>
                            </InsideWrapper>
                        </ContentWrapper>
                        ) : (
                            <LoadingText>loading...</LoadingText>
                        )}
                    </article>
                </BottomWrapper>
            </TopWrapper>
        </>
    );
}

const TopWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const BottomWrapper = styled.div`
    margin-top: 53px;
`;
const HeaderWrapper = styled.div`
    position: fixed;
    top: 0;
    width: 580px;
    height: 50px;
    padding: 0 10px;
    color: black;
    background: white;
    font-weight: 600;
    display: flex;
    opacity: 0.9;
    z-index: 1;
`;
const BackIcon = styled(BiArrowBack)`
    height: 22px;
    width: 22px;
    margin-top: 11px;
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
    :hover {
        background-color: rgba(211,211,211,0.5);
    }
`;
const HeaderText = styled.p`
    font-size: 20px;
    font-weight: bold;
    padding: 13px 0;
    padding-left: 30px;
    margin: 0;
    display: block;
    cursor: pointer;
`;

const ContentWrapper = styled.div`
    width: 570px;
    padding: 10px 15px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
`;

const InsideWrapper = styled.div`
    display: flex;
    flex-direction: column;
    cursor: default;
`;

const ProfileImg = styled.img`
    border-radius: 50%;
    height: 48px;
    width: 48px;
    cursor: pointer;
`;

const Wrapper = styled.div`
    display: flex;
    cursor: default;
    margin-top: 5px;
`;

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    width: max-content;
    margin-right: 430px;
`;
const NickName = styled.p`
    margin: 0;
    font-weight: 600;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;
const UserId = styled.p`
    margin: 0;
    color: gray;
    cursor: pointer;
`;

const MoreWrapper = styled.div``;

const MoreButton = styled(IoIosMore)`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    padding: 7px;
    cursor: pointer;
    :hover {
        background-color: rgba(0, 172, 238, 0.15);
        color: rgb(0, 172, 238);
    }
`;
const Content = styled.p`
    margin-bottom: 0;
    font-size: 20px;
    cursor: auto;
    margin-top: 15px;
`;
const TransText = styled.p`
    font-size: 13px;
    color: #00acee;
    margin-top: 5px;
    margin-bottom: 0;
    cursor: pointer;
    display: block;
    :hover {
        text-decoration: underline;
    }
`;
const Time = styled.p`
    color: gray;
    width: max-content;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
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
    right: 660px;
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
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    cursor: default;
`;

const ReplyButton = styled(HiOutlineChatBubbleOvalLeft)`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    padding: 7px;
    margin: 5px 30px;
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
    margin: 5px 30px;
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
    margin: 5px 30px;
    :hover {
        background-color: rgba(229, 57, 127, 0.15);
        color: rgb(229, 57, 127);
        cursor: pointer;
    }
`;

const BookmarkButton = styled(RxBookmark)`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    padding: 7px;
    margin: 5px 30px;
    :hover {
        background-color: rgba(83, 183, 129, 0.15);
        color: rgb(83, 183, 129);
        cursor: pointer;
    }
`;

const ShareButton = styled(IoShareOutline)`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    padding: 7px;
    margin: 5px 30px;
    :hover {
        background-color: rgba(0, 172, 238, 0.15);
        color: rgb(0, 172, 238);
        cursor: pointer;
    }
`;

const LoadingText = styled.p`
    text-align: center;
    font-size: 15px;
`;
export default PostDetail;