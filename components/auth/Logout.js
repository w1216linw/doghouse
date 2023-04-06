import { isSearchedState } from "@/atoms/pageState";
import { likedDogsState, userAccount, userState } from "@/atoms/userState";
import { useResetFilter } from "@/hooks/useResetFilter";
import { options, url } from "@/lib/info";
import { useResetRecoilState } from "recoil";

const Logout = () => {
  const resetFilter = useResetFilter();
  const resetIsLogin = useResetRecoilState(userState);
  const resetIsSearched = useResetRecoilState(isSearchedState);
  const resetAccount = useResetRecoilState(userAccount);
  const resetLiked = useResetRecoilState(likedDogsState);
  const handleLogout = () => {
    fetch(url("/auth/logout"), {
      method: "POST",
      ...options,
    });
    resetLiked();
    resetFilter();
    resetIsSearched();
    resetAccount();
    resetIsLogin();
  };

  return (
    <button
      className="bg-slate-400 rounded-full px-3 py-1 absolute top-4 right-4 font-semibold shadow-lg hover:scale-105 active:scale-95 transition"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
