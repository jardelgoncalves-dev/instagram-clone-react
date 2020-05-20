import React, { useState } from 'react';

import SuccessMessage from '../../components/SuccessMessage';

import './UserForm.scss';

import api from '../../services/api';

const UserForm = () => {
  const [state, setState] = useState({
    name: 'John Doe',
    avatar: '',
    username: 'johndoe',
    email: 'johndoe@gmail.com',
  })
  const [submit, setSubmit] = useState(false);

  const onInputChange = (event) => {
    const { value, name } = event.target;
    setState(old => ({
      ...old,
      [name]: value
    }))
  };


  const onAddUser = (event) => {
    event.preventDefault();

    const { name, email, username, avatar } = state;

    const postObject = JSON.stringify({
      name,
      avatar,
      username,
      email,
    });

    api('users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: postObject
    })
      .then(() => setSubmit(true));
  };

  return (
    <React.Fragment>
      <section className="profile" data-testid="user-form">
        <div className="container">
          <div className="profile-data">
            <div className="user">
              <div className="user__thumb">
                <img src={
                  state.avatar ||
                  'https://viniciusvinna.netlify.app/assets/api-instagram/profiles/profile-placeholder.png'
                  } alt=""
                />
              </div>

              {state.name && (
                <p className="user__name">
                  {state.name}
                  <span>@{state.username}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="post__form">
        <div className="container">
          <div className="post__form__wrapper">
            <label>Nome</label>
            <input
              type="text"
              value={state.name}
              name="name"
              placeholder="João Silva"
              onChange={onInputChange}
            />

            <label>Usuário</label>
            <input
              type="text"
              value={state.username}
              name="username"
              placeholder="Ex: fulano_da_silva"
              onChange={onInputChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={state.email}
              placeholder="Ex: fulano@provedor.com"
              onChange={onInputChange}
            />

            <label>Url da Imagem de Perfil (use a url da imagem do Linkedin)</label>
            <input
              type="text"
              name="avatar"
              placeholder="http://..."
              onChange={onInputChange}
            />

            <button
              type="button"
              onClick={onAddUser}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </section>

      {submit && (<SuccessMessage />)}
    </React.Fragment>
  );
};

export default UserForm;