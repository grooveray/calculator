import React from "react";

export default function Select({ onSelect }) {
  return (
    <div>
      <select name="company" onChange={onSelect}>
        <option defaultValue="" hidden>
          사료회사명을 선택해주세요
        </option>
        <option value="수원">수원</option>
        <option value="양주">양주</option>
        <option value="안양">안양</option>
        <option value="미래부">미래부</option>
        <option value="서부">서부</option>
        <option value="천하제일">천하제일</option>
        <option value="사조">사조</option>
        <option value="카길">카길</option>
        <option value="퓨리나">퓨리나</option>
        <option value="중앙">중앙</option>
        <option value="우성">우성</option>
        <option value="무지개">무지개</option>
        <option value="기타">기타</option>
      </select>
    </div>
  );
}
