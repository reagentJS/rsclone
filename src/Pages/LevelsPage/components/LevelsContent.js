import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import LEVELS from './Game/levels/LEVELS';
import ItemLevelsPage from './ItemLevelsPage';
import stylesCommon from '../../../common/styles/stylesCommon';
import stylesLevelsPage from '../stylesLevelsPage';

export default function LevelsContent() {
  const commonStyles = stylesCommon();
  const useStyles = stylesLevelsPage();
  const buttonAndBig = `
    ${commonStyles.button}
    ${commonStyles.buttonBig}
    ${commonStyles.containerInlineCenter}
  `;

  const levelsQuantity = Object.entries(LEVELS).length;
  const levelsListComponents = Array(levelsQuantity)
    .fill(0)
    .map((item, index) => {
      return (
        <NavLink to={`/levels/${index + 1}`} key={index + 1}>
          <ItemLevelsPage
            name={index + 1}
            isCompleted={localStorage.getItem(`dweep-${index + 1}`)}
          />
        </NavLink>
      );
    });

  const clearPassedLevel = () => {
    for (let i = 1; i <= levelsQuantity; i++) {
      localStorage.removeItem(`dweep-${i}`);
    }
    window.location.reload(false);
  };

  return (
    <div>
      <div className={useStyles.buttonsLevelsWrapper}>
        {levelsListComponents}
      </div>
      <div className={commonStyles.containerInlineCenter}>
        <Button
          variant='contained'
          className={buttonAndBig}
          onClick={clearPassedLevel}
        >
          Reset progress
        </Button>
      </div>
    </div>
  );
}
