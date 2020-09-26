import React, { useState, useEffect, memo } from 'react';
import { getStory } from '../services/hnApi';
import { 
    StoryWrapper, 
    StoryTitle, 
    StoryMeta, 
    StoryMetaElement 
} from '../styles/StoryStyles';

import { mapTime } from '../mappers/mapTime';

export const Story = memo(function Story({ storyId }) { // memo allows you to hit the network once without re-rendering previously loaded stories
    const [story, setStory] = useState({});

    useEffect(() => {
        console.log('storyId', storyId);
        getStory(storyId)
        .then(data => data && data.url && setStory(data));
    }, []);
    
    return story && story.url ? (  
        // JSON.stringify(story)
        <StoryWrapper data-testid="story">
            
            <StoryTitle>
                <a href={story.url}>{story.title}</a>
            </StoryTitle>
            
            <StoryMeta>
                <span data-testid="story-by">
                    <StoryMetaElement color="black">By:</StoryMetaElement> {story.by}
                </span>
                <span data-testid="story-time">
                    <StoryMetaElement color="black">Posted:</StoryMetaElement> 
                    {` `} {mapTime(story.time)}
                </span>
            </StoryMeta>

        </StoryWrapper>
    ) : null;
});