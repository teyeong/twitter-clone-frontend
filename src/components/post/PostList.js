import React from "react";
import PostItem from "./PostItem";
import styled from "styled-components";
import PostWrite from "./PostWrite";

const PostList = (props) => {
    const {tweets, loading} = props;
    // 시간순 정렬 (최근 트윗 먼저)
    const sortedTweets = tweets.length > 1 ? [...tweets].sort(
        (a, b) => new Date(b.createDate) - new Date(a.createDate)
    ) : tweets;

    return (
        <>
            <MainWrapper>
                    <HeaderWrapper>
                        <HomeText onClick={() => window.scrollTo({top:0})}>Home</HomeText>
                        <HomeWrapper>
                            <ActiveWrapper>
                                <ActiveText>For you</ActiveText>
                                <ActiveLine />
                            </ActiveWrapper>
                            <TabText>Following</TabText>
                        </HomeWrapper>
                    </HeaderWrapper>

                <PostWrite />
                <Wrapper>
                    {loading ? (
                        <LoadingText>Loading...</LoadingText>
                    ) : (
                        sortedTweets.map((tweet) => {
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
                        })
                    )}
                </Wrapper>
            </MainWrapper>
        </>
    );
}

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const HomeWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;
const HomeText = styled.p`
    font-size: 20px;
    font-weight: bold;
    padding: 13px 0;
    padding-left: 20px;
    margin: 0;
    display: block;
    cursor: pointer;
`;
const TabText = styled.p`
    padding: 20px 90px;
    :hover {
        background-color: rgba(211,211,211,0.3);
    }
    width: 120px;
    text-align: center;
    cursor: pointer;
    margin: 0;
`;
const ActiveText = styled.p`
    padding: 20px 90px;
    width: 120px;
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
    padding: 2px 20px;
    border-radius: 20px;
    width: 20px;
    margin: auto;
    background-color: rgb(0, 172, 238);
`;

const Wrapper = styled.div`
    width: 600px;
    margin: 0;
    padding: 0;
`;

const LoadingText = styled.p`
    font-size: 20px;
    text-align: center;
`;

const HeaderWrapper = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    width: 600px;
    padding: 0;
    color: black;
    background: white;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid lightgray;
    opacity: 0.98;
`;

export default PostList;