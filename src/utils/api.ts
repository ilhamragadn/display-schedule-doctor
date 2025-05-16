import { useEffect } from "react";
import { UseTokenAPIContext } from "../contexts/TokenAPIContext";

export const baseUrl = "http://192.168.10.6:8888";

export const username = "ITDev";
const password = "Lock97531";

const headersAPI = new Headers();
headersAPI.append("x-username", username);
headersAPI.append("x-password", password);

const requestOptions: RequestInit = {
    method: "GET",
    headers: headersAPI,
    redirect: "follow",
};

export const authAPI = async (setTokenAPI: (token: string) => void) => {
    try {
        const response = await fetch(`${baseUrl}/api/auth`, requestOptions);

        const data = await response.json();

        if (data?.response?.token) {
            const token = data.response.token;
            console.log("Token berhasil diambil:", token);
            setTokenAPI(token); // simpan ke context
        } else {
            console.error("Token tidak ditemukan dalam respons:", data);
        }
    } catch (error) {
        console.error(error);
    }
};

export const TokenAPICheck = () => {
    const { tokenAPI, setTokenAPI } = UseTokenAPIContext();
    // const navigate = useNavigate();
    useEffect(() => {
        if (!tokenAPI) {
            setTokenAPI(null);
            // navigate("/rsmkl/self-enroll");
        }
    }, [setTokenAPI, tokenAPI]);
};
