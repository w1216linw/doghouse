import { userAccount } from "@/atoms/userState";
import { login } from "@/utility/loginAuth";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const AUTO_LOGIN_INTERVAL = 59 * 60 * 1000;

const useAutoLogin = (setError) => {
  const account = useRecoilValue(userAccount);
  if (!account) return;
  useEffect(() => {
    if (!account) return;
    const timer = setInterval(() => {
      login(account)
        .then((res) => {
          if (!res.ok) setError("Failed to login, wait");
        })
        .catch(() => {
          setError("Failed to login");
        });
    }, AUTO_LOGIN_INTERVAL);

    return () => clearInterval(timer);
  }, [account]);
};

export default useAutoLogin;
