import styled from "styled-components";
import {BiArrowBack} from "react-icons/bi";
import { useNavigate } from "react-router";
import PostItem from "../post/PostItem";
import React from "react";
import img from "../../img/img.jpg";

const Profile = (props) => {
    // account에 있는 유저 프로필 컴포넌트

    const {account, tweets, loading} = props;
    const navigate = useNavigate();
    let tweetcount = 0;


    tweets.map((tweet) => {
        if (tweet.writerId === account.accountId) {
            tweetcount = tweetcount + 1;
        }
        return null;
    });

    return (
        <>
            <TopWrapper>
                <HeaderWrapper>
                    <BackIcon onClick={() => navigate(-1)} />
                    <UserWrapper onClick={() => window.scrollTo({top:0})}>
                        <HeaderNickName>{account.nickname}</HeaderNickName>
                        <TweetCount>{tweetcount} Tweets</TweetCount>
                    </UserWrapper>
                </HeaderWrapper>
                <Wrapper>
                    <Background />
                    <ProfileWrapper>
                        <ProfileImg src={img}/>
                        <EditButton>Edit profile</EditButton>
                    </ProfileWrapper>
                    <InfoWrapper>
                        <NickName>{account.nickname}</NickName>
                        <UserId>@{account.accountId}</UserId>
                        <FollowWrapper>
                            <Following>0 Following</Following>
                            <Followers>0 Followers</Followers>
                        </FollowWrapper>
                    </InfoWrapper>
                    <TabWrapper>
                        <ActiveWrapper>
                            <ActiveText>Tweets</ActiveText>
                            <ActiveLine />
                        </ActiveWrapper>
                        <TabText>Replies</TabText>
                        <TabText>Media</TabText>
                        <TabText>Likes</TabText>
                    </TabWrapper>
                </Wrapper>
                <TweetWrapper>
                    {loading ? (
                        <p>loading...</p>
                    ) : (
                        tweets.map((tweet) => {
                            if (tweet.writerId === account.accountId) {

                                return (
                                    <PostItem
                                        key={tweet.tweetId}
                                        id={tweet.tweetId}
                                        userId={tweet.writerId}
                                        nickname={tweet.writer}
                                        content={tweet.content}
                                        createDate={tweet.createDate}
                                    />
                                );
                            }
                            return null;
                        })
                    )}
                </TweetWrapper>
            </TopWrapper>
        </>
    );
}
const TopWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const Wrapper = styled.div`
    width: 600px;
    padding-top: 53px;
    display: flex;
    flex-direction: column;
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
    height: 24px;
    width: 24px;
    margin-top: 10px;
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
    :hover {
        background-color: rgba(211,211,211,0.5);
    }
`;

const TweetCount = styled.p`
    margin: 0;
    padding-left: 3px;
    font-size: 13px;
    color: gray;
`;
const HeaderNickName = styled.p`
    margin: 0;
    font-size: 20px;
`;
const UserWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 550px;
    cursor: pointer; 
    padding-left: 30px;
`;
const ProfileWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    height: 40px;
    margin: 10px 15px;
`;
const InfoWrapper = styled.div`
    padding: 0 15px;
`;
const TabWrapper = styled.div`
    padding: 0;
    margin: 0;
    width: 600px;
    display: flex;
    border-bottom: 1px solid lightgray;
`;
const ActiveText = styled.p`
    padding: 15px 0px;
    width: 150px;
    text-align: center;
    cursor: pointer;
    margin: 0;
`;
const ActiveWrapper = styled.div`
    :hover {
        background-color: rgba(211,211,211,0.3);
    }
`;
const ActiveLine = styled.div`
    padding: 2px 16px;
    border-radius: 20px;
    width: 20px;
    margin: auto;
    background-color: rgb(0, 172, 238);
`;

const TweetWrapper = styled.div`
    width: 600px;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
`;
const NickName = styled.p`
    font-size: 22px;
    font-weight: bold;
    margin: 0;
`;
const UserId = styled.p`
    margin-top: 0;
    color: gray;
`;
const FollowWrapper = styled.div`
    display: flex;
    margin-bottom: 10px;
`;
const Following = styled.p`
    margin: 0;
    margin-right: 10px;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;
const Followers = styled.p`
    margin: 0;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;

const EditButton = styled.button`
    height: 35px;
    font-size: 15px;
    font-weight: bold;
    border: 1px solid lightgray;
    background-color: white;
    margin: 0;
    padding: 0 15px;
    border-radius: 40px;
    cursor: pointer;
    :hover {
        background-color: rgba(211,211,211,0.5);;
    }
`;

const ProfileImg = styled.img`
    border-radius: 50%;
    height: 130px;
    border: 5px solid white;
    top: -90px;
    position: relative;
    cursor: pointer;
`;

const Background = styled.div`
    background-color: rgb(209, 217, 221);
    width: 600px;
    height: 200px;
    margin: 0;
`;
const TabText = styled.p`
    padding: 15px 0px;
    :hover {
        background-color: rgba(211,211,211,0.5);
    }
    width: 150px;
    text-align: center;
    cursor: pointer;
    margin: 0;
`;

export default Profile;