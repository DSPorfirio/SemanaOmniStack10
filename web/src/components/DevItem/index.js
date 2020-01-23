import React from 'react';

import './styles.css';

function DevItem({ dev }) {
    return (
        <li className="dev-item">
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                  <strong>{dev.name} }</strong>
                  <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <div className="git-link">
                <a href={`https://github.com/${dev.github_username}`} >Acessar perfil do Github</a>
              </div>
              <div className="alter">

                <button type="update">
                  <strong>Atualizar</strong>
                </button>

                <button type="delete">
                  <strong>Deletar</strong>
                </button>

              </div>
        </li>
    );
}

export default DevItem;