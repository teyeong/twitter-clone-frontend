import PostList from "../components/post/PostList.js"
import styled from "styled-components";

const HomePage = (props) => {
  // 메인페이지
  const {tweets, loading} = props;
  return (
    <>
        <Wrapper> {/* flex */}
          <PostList tweets={tweets} loading={loading} />
        </Wrapper>
      </>
  );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    border-right: 0.1px solid lightgray;
    border-left: 0.1px solid lightgray;
`;

export default HomePage;