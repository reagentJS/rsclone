import React from "react";
import {NavLink, Route} from "react-router-dom";
import {Button} from '@material-ui/core';
import * as MESSAGES from "../MESSAGES.json";
import stylesGameLevelPage from "../stylesGameLevelPage";
import GameLevelPage from "../GameLevelPage";
import LIST_LEVELS from "../../LevelsPage/LIST_LEVELS"

export default function messageWin({level}) {
  const {title, description} = MESSAGES.win;
  const maxLevel = LIST_LEVELS.length;
  const nextLevel = (Number(level) === maxLevel) ? '' : (Number(level) + 1);
  const useStylesGameLevelPage = stylesGameLevelPage();
  const styleModal = `${useStylesGameLevelPage.modal} ${useStylesGameLevelPage.win}`

  return (
    <div>
      <div className={styleModal}>
        <h1 className={useStylesGameLevelPage.title}>{title}</h1>
        <p className={useStylesGameLevelPage.description}>{description}</p>
        <div className={useStylesGameLevelPage.btnWrapper}>
          <NavLink to={`/levels/${nextLevel}`} key={nextLevel}>
            <Button
              variant='outlined'
              className={useStylesGameLevelPage.btnClose}
            >OK
            </Button>
          </NavLink>
        </div>
      </div>
      <Route exact path='/levels/:{nextLevel}' component={(props) => <GameLevelPage  {...props}/>}/>
    </div>
  );
}