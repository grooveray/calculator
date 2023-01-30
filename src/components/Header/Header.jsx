import React from "react";

export default function Header({
  mainLists,
  mainList,
  setMainList,
  setShowResult,
}) {
  const onClick = (list) => {
    setMainList(list);
    setShowResult(false);
  };
  return (
    <header>
      <ul>
        {mainLists.map((list, index) => (
          <li key={index}>
            <button onClick={() => onClick(list)}>{list}</button>
          </li>
        ))}
      </ul>
    </header>
  );
}
