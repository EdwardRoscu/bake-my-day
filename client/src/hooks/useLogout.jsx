import {useNavigate} from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        navigate("/auth/login");
    };

    return {logout};
};
