import React from 'react';
import ItemTeamPage from './ItemTeamPage';
import FooterTeam from './FooterTeam';
import stylesTeamPage from '../stylesTeamPage';
import TEAM_MEMBERS from '../TEAM_MEMBERS';

export default function TeamPage() {
  const useStylesTeamPage = stylesTeamPage();

  const addItemTeamMembers = (item) => {
    return (
      <ItemTeamPage
        key={item.id}
        photoName={item.photoName}
        name={item.name}
        role={item.role}
        gitHub={item.gitHub}
        about={item.about}
      />
    );
  }

  return (
    <div>
      <div className={useStylesTeamPage.contentWrapper}>
        {TEAM_MEMBERS.map((item) => addItemTeamMembers(item))}
      </div>
      <FooterTeam />
    </div>
  );
}
