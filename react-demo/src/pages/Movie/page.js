import React from 'react';

import {browserHistory} from 'react-router';

require('./style.css');

import VideoList from '../../common/components/VideoList';

export default class MoviePage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            videos: []
        };

        this.reload = this.getMoviesFromApiAsync.bind(this);
    }

    componentDidMount() {
        console.log("Component did mount");
        fetch('http://facebook.github.io/react-native/movies.json')
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                this.setState({
                    videos: responseJson.movies
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getMoviesFromApiAsync() {
        console.debug("Start to get videos from facebook");

        return fetch('http://facebook.github.io/react-native/movies.json')
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                this.setState({
                    videos: responseJson.movies
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {
        return (
            <div>
                <button onClick={this.reload}>click me</button>
                <VideoList videos={this.state.videos}></VideoList>
            </div>
        );
    }
}