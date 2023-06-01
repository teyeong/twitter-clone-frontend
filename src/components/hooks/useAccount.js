import { useState, useEffect } from "react";
import axios from "axios";

const useAccount = () => {
    // 사용자 계정 불러오는 컴포넌트

    const [account, setAccount] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAccount = async () => {
            setLoading(true);
            try {         
                const response = await axios.get("/accounts/1");
                setAccount(response.data);

            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        }
        getAccount();
    }, []);

    return ([account, loading]);
}

export default useAccount;