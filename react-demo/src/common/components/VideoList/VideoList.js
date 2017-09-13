import React from 'react';

import VideoItem from './VideoItem';

require('./VideoList.css');

const VideoList = (props) => {

    // let movieListContent = props.movies.map((movieItem, index) => {
    //     return (
    //         <MovieItem key={index} movie={movieItem}>
    //             <div className="movie__releaseYear">{movieItem.releaseYear}</div>
    //         </MovieItem>
    //     )
    // });

    return (
        <div className="video__list">
            {props.videos.map((movieItem, index) => {
                return (
                    <VideoItem key={index} movie={movieItem}>
                        <div className="video__releaseYear">{movieItem.releaseYear}</div>
                    </VideoItem>
                )
            })}
        </div>
    );

};



export default VideoList;
