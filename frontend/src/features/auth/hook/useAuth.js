import { useDispatch } from "react-redux";
import { getMe, login, register } from "../service/auth.api";
import { setLoading, setUser } from "../state/auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async ({
    email,
    contact,
    password,
    fullname,
    isSeller = false,
  }) => {
    try {
      dispatch(setLoading(true));
      const data = await register({
        email,
        contact,
        password,
        fullname,
        isSeller,
      });
      dispatch(setUser(data.user));
    } catch (error) {
      throw new Error("registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      dispatch(setLoading(true));
      const data = await login({ email, password });
      dispatch(setUser(data.user));
    } catch (error) {
      throw new Error("login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
  };
};
