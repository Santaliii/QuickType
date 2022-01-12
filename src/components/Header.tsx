import React from "react";
import Options from "./Options";

interface IHeaderProps {
  updateNumOfWords: (numOfWords: number) => void
}

const Header: React.FC<IHeaderProps> = ({updateNumOfWords}) => {

  return(
    <header className="header-container">
      <div className="title-wrapper">
        <h1>Camel Typer</h1>
      </div>
      <Options updateNumOfWords={updateNumOfWords}/>
    </header>
  )
}


export default Header