import React, { useState } from "react";

import Story from '../../components/Story';

import './Stories.scss';

const Stories = ({ stories, getUserHandler }) => {

  const [visibleStory, toggleVisibleStory] = useState(false);
  const [selectedStory, setSelectedStory] = useState({});
  const [selectedProfile, setSelectedProfile] = useState({});

  const findStoryById = (id) => stories.find(story => story.id === id);

  const handleStory = (story) => {
    const findStory = findStoryById(story.id);
    const profileData = getUserHandler(story.userId);

    setSelectedProfile(profileData);
    setSelectedStory(findStory);
    toggleVisibleStory(!visibleStory);
  };

  return (
    <React.Fragment>
      <section className="stories" data-testid="stories">
        <div className="container">
          {stories.map((story, index) => {
            const profileData = getUserHandler(story.userId);

            return (
              <button
                key={story.id}
                onClick={() => handleStory(story)}
                className={`user__thumb ${index === 0 && 'user__thumb--hasNew'}`}
              >
                <div className="user__thumb__wrapper">
                  <img src={profileData.avatar} alt={profileData.name} />
                </div>
              </button>
            )})
          }
        </div>
      </section>

      {visibleStory && (
        <Story
          story={selectedStory}
          user={selectedProfile}
          onClose={() => toggleVisibleStory(!visibleStory)}
        />
        )}
    </React.Fragment>
  );
};

export default Stories;
