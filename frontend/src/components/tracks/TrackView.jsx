import { NavLink, Outlet, useLoaderData, useParams } from "react-router-dom"
import './TrackView.css'
import { useDispatch, useSelector } from "react-redux";
import * as audioActions from '../../store/audioPlayer';
import { useEffect } from "react";

export default function TrackView() {
    const dispatch = useDispatch();
    const { username, title } = useParams();
    const track = useSelector(state => {
    let result
    Object.keys(state.tracks).forEach(id => {
        if(title === state.tracks[id].title && username === state.tracks[id].artist.username) {
            result = state.tracks[id];
        }
    })
    return result || false
   })
    
    async function handleClick (e) {
        const trackData = await dispatch(audioActions.loadTracks([track.id]))
        dispatch(audioActions.playTrack());
    }

    const dateTrack = timestamp => {
        const release = new Date(timestamp);
        const now = new Date();

        const timeAgoInSeconds = (now - release) / 1000;

        return "not implemented"
    }

    useEffect(() => {
        if(!track) {
                const getTrackInfo = async () => {
                const response = await fetch(`/api/users/${username}/tracks/${title}`);
                
                if(response.ok) {
                    const data = await response.json();

                    dispatch(trackActions.receiveTrack(data.track))
                }
            }
            getTrackInfo();
        }
    }, [])


    return (
            window.location.href.match(new RegExp('[^/]+(?=/$|$)'))[0] === 'update' ?
            
            <Outlet />
            :
            <div className="track-view container">
                <h1 className="track-view title">{title}</h1>
                <br />
                <div className="track-view body">
                    { track && (
                        <button className="play-track button" onClick={handleClick}>
                            <i className="fa-solid fa-play-circle" />
                            { track.photoUrl ? <img src={track.photoUrl} /> : <i className="fa-solid fa-compact-disc" />}
                        </button>
                    )}
                    <div className="track-view details">
                        <div className="track-view artist-info">
                            { track && <NavLink to={ `/${track.artist.username}`}><i className="fa-solid fa-user" /> {track.artist.username}</NavLink> }
                        </div>
                        <div className="track-view date">
                            <i className="fa-solid fa-clock" /> { track && dateTrack(track.createdAt) }
                        </div>
                        <br />
                        <div className="track-view description">
                            <p>{ track && track.description }</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}