import { faLocation, faPhotoFilm, faSmile, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import './share.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const Share = () => {

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    const desc = useRef();

    const [file, setFile] = useState(null);

    const shareHandler = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: userInfo._id,
            description: desc.current.value
        };

        if(file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName);
            data.append('file', file);
            newPost.image = fileName;
            try {
                await axios.post('/api/upload', data);
            } catch(err) {
                toast.error('Error adding image!');
            }
        }

        try {

            await axios.post('/api/posts/add', newPost);
            window.location.reload();

        } catch(err) {
            toast.error('Error adding a new post!');
        }
    }

  return (
    <div className='share'>
        <div className="shareGroups">
            <div className="shareGroup">
                <div className="shareGroupLeft">
                    <img src={`./assets/images/upload/${userInfo.imageprofile}`} alt="" />
                </div>
                <div className="shareGroupRight">
                    <input type="text" placeholder={'What do you think about, ' + userInfo.username + '?'} ref={desc} />
                </div>
            </div>
            <form className="shareGroup" onSubmit={shareHandler}>
                <div className="shareGroupIcons">
                    <label htmlFor='file' className="shareGroupIcon">
                        <FontAwesomeIcon icon={faPhotoFilm} />
                        <span className="iconTitle">Photo or Video</span>
                        <input type="file" id='file' hidden accept='.png, .jpg, .jpeg' onChange={(e) => setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareGroupIcon">
                        <FontAwesomeIcon icon={faTag} />
                        <span className="iconTitle">Tags</span>
                    </div>
                    <div className="shareGroupIcon">
                        <FontAwesomeIcon icon={faLocation} />
                        <span className="iconTitle">Location</span>
                    </div>
                    <div className="shareGroupIcon">
                        <FontAwesomeIcon icon={faSmile} />
                        <span className="iconTitle">Feelings</span>
                    </div>
                </div>
                <div className="shareGroupShareBtn">
                    <button>Share</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Share