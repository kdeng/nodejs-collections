import React from 'react';

export default (props) => {
    return (
        <div className="video__item">
            <div className="video__title">{props.movie.title}</div>
            {props.children}
        </div>
    );
}