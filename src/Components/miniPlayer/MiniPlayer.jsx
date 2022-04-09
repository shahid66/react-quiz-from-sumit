import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import './miniPlayer.css';

const MiniPlayer = ({ youtubeID, title }) => {
    const [miniPlay, setMiniPlay] = useState(false);
    const [vidB, setVidB] = useState(false);
    const toggleMiniPlayer = useRef();
    const videoButtonHandel = useRef();
    // https://www.youtube-nocookie.com/embed/i8eBBG46H8A
    const url = `https://www.youtube-nocookie.com/embed/${youtubeID}`
    function toogleButton() {
        if (!miniPlay) {

            toggleMiniPlayer.current.classList.remove('floatingBtn');
            setMiniPlay(true);
            videoButtonHandel.current.wrapper.classList.add("player")
            videoButtonHandel.current.wrapper.classList.remove("player2")
            setVidB(true);
        } else {

            toggleMiniPlayer.current.classList.add('floatingBtn');
            setMiniPlay(false);
            videoButtonHandel.current.wrapper.classList.add("player2")
            videoButtonHandel.current.wrapper.classList.remove("player")
            setVidB(false);

        }
    }


    return (
        <div className="miniPlayer floatingBtn" ref={toggleMiniPlayer} onClick={toogleButton}>
            <span className="material-icons-outlined open" > play_circle_filled </span>
            <span className="material-icons-outlined close" onClick={toogleButton} > close </span>
            <ReactPlayer className="player player2" ref={videoButtonHandel} url={url} width="300px" height="168px" playing={miniPlay} controls={true} />

            <p>{title}</p>
        </div>
    )
}

export default MiniPlayer