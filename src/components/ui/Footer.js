import styled from "styled-components";
import {CiSearch} from "react-icons/ci";

const Footer = () => {
    // 푸터 컴포넌트

    return (
        <>
            <TopWrapper>
                <FixedWrapper>
                    <SearchWrapper>
                        <SearchIcon />
                        <InputBox placeholder="Search Twitter" id="twitter-search"/>
                    </SearchWrapper>
                </FixedWrapper>
                <TrendsWrapper>
                    <Text>Trends for you</Text>
                </TrendsWrapper>
                <WhoWrapper>
                    <Text>Who to follow</Text>
                </WhoWrapper>
                <UpperFooterWrapper> {/* flex */}
                    <FooterText>Terms of Service</FooterText>
                    <FooterText>Privacy Policy</FooterText>
                    <FooterText>Cookie Policy</FooterText>
                </UpperFooterWrapper>
                <LowerFooterWrapper>
                    <FooterText>Accessibility</FooterText>
                    <FooterText>Ads info</FooterText>
                    <FooterText>More ⋯</FooterText>
                    <FooterText>© 2023 X Corp.</FooterText>
                </LowerFooterWrapper>
            </TopWrapper>
        </>
    );
}

const TopWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    width: 270px;
    position: absolute;
    right: 350px;
    padding-bottom: 50px;
    border-left: 1px solid lightgray;
`;

const SearchWrapper = styled.div`
    display: flex;
    padding: 0;
    margin: 5px 0;
    background-color: rgb(247, 249, 249);
    border-radius: 50px;
    height: 40px;
`;

const FixedWrapper = styled.div`
    height: 50px;
    width: 270px;
    position: fixed;
    background-color: white;
`;

const SearchIcon = styled(CiSearch)`
    //margin: auto 0;
    margin-left: 10px;
    margin-top: 12px;
`;

const InputBox = styled.input`
    margin-left: 5px;
    border: none;
    font-size: 15px;
    background-color: rgb(247, 249, 249);
    :focus {
        outline: none;
    }
    width: max-content;
`;

const TrendsWrapper = styled.div`
    height: 500px;
    background-color: rgb(247, 249, 249);
    margin: 15px 0;
    border-radius: 20px;
    margin-top: 75px;
`;

const WhoWrapper = styled.div`
    height: 300px;
    background-color: rgb(247, 249, 249);
    margin: 15px 0;
    border-radius: 20px;
`;

const Text = styled.p`
    font-size: 20px;
    font-weight: bolder;
    margin-top: 15px;
    margin-left: 15px;
`;

const UpperFooterWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const LowerFooterWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const FooterText = styled.p`
    font-size: 12px;
    color: gray;
    margin: 0;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;

export default Footer;