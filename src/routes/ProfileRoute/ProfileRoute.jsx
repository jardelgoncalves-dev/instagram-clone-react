import React, { useState, useEffect } from 'react';

import UserProfile from '../../containers/UserProfile';
import UserPosts from '../../containers/UserPosts';

import Loading from '../../components/Loading';

import api from '../../services/api';

const ProfileRoute = () => {
  const [state, setState] = useState({
    id: '',
    name: '',
    avatar: '',
    username: '',
    email: '',
    userPosts: [],
  })
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
    const { pathname } = window.location;
    const param = pathname.split("/")[2];

    api(`users?search=${param}`)
      .then(response => response.json())
      .then(profileData => {
        setState({
          id: profileData[0].id,
          name: profileData[0].name,
          avatar: profileData[0].avatar,
          username: profileData[0].username,
          email: profileData[0].email,
        })
      });
  }, []);

  useEffect(() => {
    if (state.id) {
      api(`users/${state.id}/posts`)
        .then(response => response.json())
        .then(posts => {
          setState(old => ({
            ...old,
            userPosts: posts
          }));
          setIsLoading(false)
        });
    }
  }, [state.id]);

  return (
    <div data-testid="profile-route">
      <UserProfile
        name={state.name}
        avatar={state.avatar}
        username={state.username}
        email={state.email}
      />

      {isLoading
        ? (<Loading />)
        : <UserPosts posts={state.userPosts} />
      }
    </div>
  );
};

export default ProfileRoute;