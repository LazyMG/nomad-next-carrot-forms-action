import Link from "next/link";
import React from "react";

const Info = () => {
  return (
    <div className="flex flex-col gap-2 px-6">
      <h2 className="text-5xl font-semibold">Info</h2>
      <ul className="list-none flex flex-col gap-1">
        <li className="flex flex-col">
          <span className="text-xl font-semibold">1. /log-in</span>
          <span className="text-lg">사용자가 로그인 하는 페이지</span>
          <span className="text-lg">DB 정보와 비교하여 로그인</span>
        </li>
        <li className="flex flex-col">
          <span className="text-x font-semiboldl">2. /create-account</span>
          <span className="text-lg">사용자가 계정을 생성하는 페이지</span>
          <span className="text-lg">유효성 검사를 진행하여 계정 생성</span>
        </li>
        <li className="flex flex-col ">
          <span className="text-xl font-semibold">3. /</span>
          <span className="text-lg">
            Tweet을 올리거나 전체 Tweet 목록을 보는 페이지
          </span>
          <span className="text-lg">
            Tweet이 6개 이상일 경우 화살표로 페이지 이동
          </span>
        </li>
        <li className=" flex flex-col ">
          <span className="text-xl font-semibold">4. /tweets/[id]</span>
          <span className="text-lg">
            Tweet의 정보를 보거나 답글을 올리는 페이지
          </span>
          <span className="text-lg">자신이 올린 Tweet의 경우 삭제 가능</span>
          <span className="text-lg">
            답글을 올린 사용자의 페이지로 이동 가능
          </span>
        </li>
        <li className=" flex flex-col">
          <span className="text-xl font-semibold">5. /search</span>
          <span className="text-lg">Tweet을 검색하여 결과를 보는 페이지</span>
          <span className="text-lg">
            / 페이지에서 검색하여 해당 페이지로 이동
          </span>
        </li>
        <li className=" flex flex-col">
          <span className="text-xl font-semibold">6. /users/[username]</span>
          <span className="text-lg">
            사용자의 정보와 올린 Tweet의 목록을 보는 페이지
          </span>
          <span className="text-lg">Tweet을 클릭하여 Tweet 페이지로 이동</span>
        </li>
        <li className=" flex flex-col">
          <span className="text-xl font-semibold">
            7. /users/[username]/edit
          </span>
          <span className="text-lg">
            로그인 한 사용자의 정보를 수정할 수 있는 페이지
          </span>
          <span className="text-lg">비밀번호 확인 후 정보 수정 가능</span>
        </li>
        <li className=" flex flex-col">
          <span className="text-xl font-semibold">8. /profile</span>
          <span className="text-lg">자신의 정보를 확인하는 페이지</span>
          <span className="text-lg">자신이 올린 Tweet 목록 확인 가능</span>
          <span className="text-lg">로그아웃 및 정보 수정 가능</span>
        </li>
      </ul>
      <Link
        href="/log-in"
        className="bg-white rounded-full flex justify-center text-2xl p-4 hover:bg-neutral-100"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Info;
