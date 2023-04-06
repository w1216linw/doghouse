import { userState } from "@/atoms/userState";
import Main from "@/components/Main/Main";
import Login from "@/components/auth/Login";
import Head from "next/head";
import { useRecoilValue } from "recoil";

export default function Home() {
  const isLogin = useRecoilValue(userState);
  return (
    <>
      <Head>
        <title>DogHouse</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!isLogin ? <Login /> : <Main />}
    </>
  );
}
