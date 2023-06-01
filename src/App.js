import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PostDetail from "./components/post/PostDetail";
import useAccount from "./components/hooks/useAccount";
import Profile from "./components/profile/Profile";
import HomePage from "./pages/HomePage";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import styled from "styled-components";
import NotFoundPage from "./pages/NotFoundPage";
import axios from "axios";

function App() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [account] = useAccount();

  useEffect(() => {
      const getPostList = async () => {
          setLoading(true);
          try {
              const response = await axios.get("/api/tweets");
              setTweets(response.data);
          } catch (e) {
              console.log(e);
          }
          setLoading(false);
      }
      getPostList();
  }, []);

  return (
      <>
        <Wrapper>
          <Header />
            <Routes>
              <Route path="/" element={<HomePage tweets={tweets} loading={loading}/>} />
              <Route path={`/status/:id`} element={<PostDetail tweets={tweets} loading={loading}/>} />
              <Route path={`/profile/${account.accountId}`} element={<Profile account={account} tweets={tweets} loading={loading}/>} />
              <Route path="/profile/*" element={<NotFoundPage />}/>
            </Routes>
          <Footer />
        </Wrapper>
      </>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default App;