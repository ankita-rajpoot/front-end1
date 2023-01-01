import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { toast } from 'react-toastify';
import NewStory from '../newStory/NewStory';
import './story.css'

const Story = () => {

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    const [stories, setStories] = useState([]); //default is empty for post, no add post

    useEffect(() => {
        
        const fetchStories = async() => {
        const resultStories = await axios.get(`/api/story/all/${userInfo._id}`);
        setStories(resultStories.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }));
        console.log(resultStories.data);
        }
        fetchStories();

    }, [userInfo._id]);

    const [file, setFile] = useState(null);

    const shareHandler = async (e) => {
        e.preventDefault();

        const newStory = {
            userId: userInfo._id,
        };

        if(file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            newStory.image = fileName;
            try {
                await axios.post('/api/upload', data);
            } catch(err) {
                toast.error('Error adding image!');
            }
        }

        try {

            await axios.post('/api/story/add', newStory);
            window.location.reload();

        } catch(err) {
            toast.error('Error adding a new story!');
        }
    }

  return (
    <div className='story'>
        <Tabs>
            <TabList>
                <Tab>Story</Tab>
                <Tab>Reels</Tab>
                <Tab>Rooms</Tab>
            </TabList>

            <TabPanel>
                <div className="storyGroups">
                    <div className="storyGroup">
                        <form onSubmit={shareHandler}>
                            <div className="storyCard">
                                <label htmlFor="add">
                                    <div className="storyBody">
                                        <img src={`./assets/images/upload/${userInfo.imageprofile}`} className='storyBodyImg' alt={userInfo.username} />
                                    </div>
                                    <div className="storyFooter">
                                        <FontAwesomeIcon icon={faAdd} />
                                        <h4 className="storyTitle">Create a story</h4>
                                    </div>
                                </label>
                                <input type="file" id='add' accept='.png, .jpg, .jpeg' onChange={(e) => setFile(e.target.files[0])} className='hidden' />
                            </div>
                            {file && <button className='addStory'>Add</button>}
                        </form>
                    </div>
                    {stories.map((story) => (
                        <NewStory story={story} key={story._id} />
                    ))}
                    
                </div>
            </TabPanel>
            <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
                <h2>Any content 3</h2>
            </TabPanel>
        </Tabs>
    </div>
  )
}

export default Story