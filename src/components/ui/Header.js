import { NavLink } from "react-router-dom";
import useAccount from "../hooks/useAccount";
import styled from "styled-components";
import {RiNotification2Line, RiFileList3Line} from "react-icons/ri";
import {BiHash, BiHomeCircle} from "react-icons/bi";
import {BsPerson, BsTwitter} from "react-icons/bs";
import {CiCircleMore} from "react-icons/ci";
import {AiOutlineMail} from "react-icons/ai";
import {IoIosMore} from "react-icons/io";
import {RxBookmark} from "react-icons/rx";
import img from "../../img/img.jpg";

const Header = () => {
    // 헤더 컴포넌트

    // 사용자 계정 가져오기
    const [account] = useAccount();

    return (
        <>
            <FlexDiv>
                <TopWrapper>
                    <MenuWrapper>
                        <TwitterIconWrapper>
                            <NavLink to="/">
                                <TwitterIcon/>
                            </NavLink>
                        {/* 사이드바 메뉴 버튼 */}
                        </TwitterIconWrapper>
                        <LinkWrapper>
                            <StyledNavLink to="/">
                                <IconWrapper>
                                    <BiHomeCircle size="30"/>
                                    <IconText className="text">Home</IconText>
                                </IconWrapper>
                            </StyledNavLink>
                            <IconWrapper>
                                <BiHash size="30"/>  
                                <IconText>Explore</IconText>
                            </IconWrapper>
                            <IconWrapper>
                                <RiNotification2Line size="30"/>    
                                <IconText>Notification</IconText>
                            </IconWrapper>
                            <IconWrapper>
                                <AiOutlineMail size="30"/>
                                <IconText>Messages</IconText>
                            </IconWrapper>
                            <IconWrapper>
                                <RiFileList3Line size="30"/>
                                <IconText>Lists</IconText>
                            </IconWrapper>
                            <IconWrapper>
                                <RxBookmark size="30"/>
                                <IconText>Bookmarks</IconText>
                            </IconWrapper>
                            <StyledNavLink 
                                to={account && `/profile/${account.accountId}`} 
                                state={{account:account}}
                            >
                                <IconWrapper>
                                    <BsPerson size="30"/>
                                    <IconText className="text">Profile</IconText>
                                </IconWrapper>
                            </StyledNavLink>
                            <IconWrapper>
                                <CiCircleMore size="30"/>  
                                <IconText>More</IconText>
                            </IconWrapper>
                        </LinkWrapper>
                        <TweetButton>Tweet</TweetButton>
                    </MenuWrapper>
                    {/* 로그인된 프로필 창 */}
                    <ProfileWrapper>
                        <ProfileImg src={img}/>
                        <ButtonWrapper>
                        <UserWrapper>
                            <NickName>{account.nickname}</NickName>
                            <UserId>@{account.accountId}</UserId>
                        </UserWrapper>
                            <MoreButton />
                        </ButtonWrapper>
                    </ProfileWrapper>
                </TopWrapper>
                <Div />
            </FlexDiv>
        </>
    );
}

const TwitterIconWrapper = styled.div`
    margin-top: 10px;
    width: max-content;
    border-radius: 50%;
    :hover {
        background-color: lightgray;
    }
`;
const TwitterIcon = styled(BsTwitter)`
    width: 30px;
    height: 30px;
    color: rgb(0, 172, 238);
    padding: 10px;

`;

const ProfileImg = styled.img`
    border-radius: 50%;
    height: 40px;
    width: 40px;
`;

const TopWrapper = styled.div`
    height: 100vh;
    width: 270px;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 380px;
`;
const FlexDiv = styled.div`
    display: flex;
    height: 100vh;
`;
const Div = styled.div`
    z-index: 3;
    position: fixed;
    height: 100vh;
    padding-left: 1px;
    background-color: lightgray;
`;
const MenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const IconWrapper = styled.div`
    display: flex;
    color: black;
    padding: 10px;
    margin: 10px;
    margin-left: 0;
    border-radius: 50px;
    width: max-content;
    cursor: pointer;
    :hover {
        background-color: lightgray;
    }
    .icon {
        color: black;
    }
`;

const LinkWrapper = styled.div``;

const IconText = styled.p`
    font-size: 20px;
    font-weight: 400;
    margin: 0;
    margin-left: 10px;
`;

const TweetButton = styled.button`
    margin: 10px 20px;
    margin-left: 0;
    border: none;
    padding: 15px;
    border-radius: 50px;
    font-size: 20px;
    font-weight: 600;
    background-color: rgb(0, 172, 238);
    color: white;
    cursor: pointer;
`;

const ProfileWrapper = styled.div`
    display: flex;
    position: fixed;
    bottom: 20px;
    padding: 10px;
    border-radius: 50px;
    margin-right: 10px;
    :hover {
        background-color: lightgray;
    }
`;

const UserWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 200px;
`;
const NickName = styled.p`
    margin: 0;
    font-weight: 600;
`;
const UserId = styled.p`
    margin: 0;
    color: gray;
`;
const MoreButton = styled(IoIosMore)`
    size: 24px;
    margin-top: 14px;
`;

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    &.active {
        .text {
            font-weight: bolder;
        }
    }
`;

export default Header;