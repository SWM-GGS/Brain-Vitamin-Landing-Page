"use client";

import Image from "next/image";
import LogoSymbol from "/public/assets/images/logo-symbol.svg";
import LogoText from "/public/assets/images/logo-text.svg";
import MailIcon from "/public/assets/images/mail-icon.svg";
import GooglePlay from "/public/assets/images/google-play.png";
import ScreeningTest from "/public/assets/images/screening-test.png";
import Game1 from "/public/assets/images/game1.png";
import Game2 from "/public/assets/images/game2.png";
import CustomGame1 from "/public/assets/images/custom-game1.png";
import CustomGame2 from "/public/assets/images/custom-game2.png";
import { useEffect, useState } from "react";

export default function Home() {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", updateViewportHeight);

    return () => {
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between font-pretendard-regular">
      <header className="flex justify-between w-full fixed z-10 md:px-24 px-7 md:py-[69px] py-[43px]">
        <div className="flex gap-2">
          <Image className="md:w-[90px] w-[40px]" alt="" src={LogoSymbol} />
          <Image className="md:w-[190px] w-[120px]" alt="" src={LogoText} />
        </div>
        <Image className="md:w-[40px] w-[30px]" alt="" src={MailIcon} />
      </header>
      <section
        className="flex flex-col bg-senior w-full bg-no-repeat bg-center bg-cover
        md:px-24 px-7 md:py-[200px] py-[178px] text-white md:gap-[55px] gap-[200px]"
        style={{ height: `${viewportHeight}px` }}
      >
        <div className="flex flex-col md:text-6xl text-4xl md:gap-3 gap-2 font-pretendard-bold text-right">
          <span>치매 예방</span>
          <span>두뇌 훈련</span>
          <span>경도인지장애 케어</span>
        </div>
        <div className="flex flex-col md:text-3xl text-1xl gap-2 font-pretendard-medium md:items-end items-center">
          <span className="text-[20px]">앱 다운로드</span>
          <button className="bg-white w-[233px] py-[14px] px-[33px] rounded-[100px]">
            <Image className="w-[167px]" alt="" src={GooglePlay} />
          </button>
        </div>
      </section>
      <section
        className="flex items-center justify-center md:flex-row md:justify-between flex-col w-full md:px-24 px-7 bg-orange-50 gap-5"
        style={{ height: `${viewportHeight}px` }}
      >
        <Image
          className="lg:w-[500px] md:w-[360px] w-[250px]"
          alt=""
          src={ScreeningTest}
        />
        <div
          className="flex flex-col gap-6 lg:text-6xl md:text-5xl text-4xl font-pretendard-bold
        break-keep md:text-right text-center"
        >
          <div className="flex flex-col gap-2">
            <span>한 달에 한 번</span>
            <span>CIST</span>
            <span>인지선별검사</span>
          </div>
          <span className="text-xs font-pretendard-regular">
            매달 주기적으로 나의 인지능력 상태를 확인해요.
          </span>
        </div>
      </section>
      <section
        className="flex items-center justify-center md:flex-row md:justify-between flex-col w-full md:px-24 px-7 bg-orange-100 gap-5"
        style={{ height: `${viewportHeight}px` }}
      >
        <div className="flex flex-col gap-3 md:w-[360px] w-[250px]">
          <Image className="w-full" alt="" src={Game1} />
          <Image className="w-full" alt="" src={Game2} />
        </div>
        <div className="flex flex-col gap-6 lg:text-6xl md:text-5xl text-4xl font-pretendard-bold break-keep md:text-right text-center">
          <div className="flex flex-col gap-2">
            <span>식후 30분</span>
            <span>두뇌비타민</span>
          </div>
          <span className="text-xs font-pretendard-regular">
            40여종의 다양한 인지향상 게임을 즐겨요.
          </span>
        </div>
      </section>
      <section
        className="flex items-center justify-center md:flex-row md:justify-between flex-col w-full md:px-24 px-7 bg-orange-200 gap-5"
        style={{ height: `${viewportHeight}px` }}
      >
        <div className="flex gap-3">
          <Image
            className="lg:w-[500px] md:w-[360px] w-[250px]"
            alt=""
            src={CustomGame1}
          />
          <Image
            className="lg:w-[240px] md:w-[200px] w-[100px]"
            alt=""
            src={CustomGame2}
          />
        </div>
        <div
          className="flex flex-col gap-6 lg:text-6xl md:text-5xl text-4xl font-pretendard-bold
        break-keep md:text-right text-center"
        >
          <div className="flex flex-col gap-2">
            <span>하루에 하나</span>
            <span>우리가족</span>
            <span>비타민</span>
          </div>
          <span className="text-xs font-pretendard-regular">
            우리 가족만의 문제를 만들고 풀어보아요
          </span>
        </div>
      </section>
      <footer
        className="flex flex-col justify-end"
        style={{ height: `${viewportHeight}px` }}
      >
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <span>이용약관</span>
            <span className="font-pretendard-bold">개인정보처리방침</span>
          </div>
          <div className="flex flex-col gap-3">
            <span>(주)GGS</span>
            <span>
              서울특별시 강남구 테헤란로 311 아남타워빌딩 7층 (우편번호 : 06151)
            </span>
            <span>TEL : </span>
            <span>MAIL : </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
