import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NavLink } from 'react-router-dom';
import useVideoList from '../../hooks/useVideoList';
import Video from '../video/Video';
import './videos.css';
const Videos = () => {
    const [page, setPage] = useState(1)
    const { loading, error, videos, hasMore } = useVideoList(page);
    // {`/quiz/${video.youtubeId}`}
    return (
        <div className="videos">
            {videos.length > 0 &&
                (<InfiniteScroll dataLength={videos.length} next={() => setPage(page + 8)} hasMore={hasMore} loader={<>loading....</>} endMessage>
                    {
                        videos.map((video) => video.noq > 0 ? (

                            <NavLink key={video.youtubeID} to={`quiz/${video.youtubeID}`} state={{ data: video.title }}  > <Video title={video.title} id={video.youtubeID} noq={video.noq} /></NavLink>
                        ) : (
                            <Video key={video.youtubeID} title={video.title} id={video.youtubeID} noq={video.noq} />
                        ))
                    }
                </InfiniteScroll>)
            }
            {
                !loading && videos.length === 0 && (
                    <div className="alert alert-danger">No data found</div>
                )
            }
            {error && <div className="alert alert-danger">There was an error</div>}
            {loading && <div className="alert alert-warning">Data Loading......</div>}
        </div >
    )
}

export default Videos