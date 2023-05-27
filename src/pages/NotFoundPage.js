import styled from "styled-components";
import {BiArrowBack} from "react-icons/bi";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
    // account에 존재하지 않는 계정 프로필 클릭 시 보여주는 화면
    const navigate = useNavigate();

    return (
        <>
            <TopWrapper>
                <HeaderWrapper>
                    <BackIcon onClick={() => navigate(-1)}/>
                    <ProfileText onClick={() => window.scrollTo({top:0})}>Profile</ProfileText>
                </HeaderWrapper>
                <ContentWrapper>
                    <NotExistText>This account doesn't exist</NotExistText>
                    <TryText>Try searching for another.</TryText>
                </ContentWrapper>
            </TopWrapper>
        </>
    );
}

const TopWrapper = styled.div`
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

const ProfileText = styled.p`
    font-size: 20px;
    font-weight: bold;
    padding: 13px 0;
    padding-left: 30px;
    margin: 0;
    display: block;
    cursor: pointer;
`;

const ContentWrapper = styled.div`
    width: 600px;
    padding-top: 53px;
    display: flex;
    flex-direction: column;
`;

const NotExistText = styled.p`
    font-size: 30px;
    font-weight: bold;
    margin: auto;
    padding-top: 100px;
`;

const TryText = styled.p`
    color: gray;
    margin: auto;
`;

export default NotFoundPage;