import './video.css'
const Video = ({ title, id, noq }) => {
    return (
        <div className="video">
            <img src={`http://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt="" />
            <p>{title}</p>
            <div className="qmeta">
                <p>{noq} Questions</p>
                <p>Total Points : {noq * 5}</p>
            </div>
        </div>

    )
}

export default Video