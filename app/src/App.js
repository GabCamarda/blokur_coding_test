import React, { Component } from 'react';

import Song from './song/Song';
import SearchSongForm from "./song/SearchSongForm";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { songs: '' };
    }

    setLyrics(userLyrics) {
        this.fetchSongs(userLyrics);
    }

    fetchSongs(lyrics) {
        if(!lyrics) {
            return;
        }

        let xmlHttpReq = this.createCorsRequest('GET', 'http://localhost:1337/find/' + lyrics);
        if(!xmlHttpReq) {
            throw new Error('Cannot request data from API due to CORS incompatibility with the browser in use');
        }

        xmlHttpReq.onload = () => {
            const data = JSON.parse(xmlHttpReq.responseText);
            if(data) {
                this.setState({songs: data.Songs});
            }
        };
        xmlHttpReq.send();
    }

    createCorsRequest(method, url) {
        let xmlHttpReq = new XMLHttpRequest();
        if(xmlHttpReq && "withCredentials" in xmlHttpReq) {
            xmlHttpReq.open(method, url, true);
            return xmlHttpReq;
        }

        if(xmlHttpReq && typeof XDomainRequest !== "undefined") {
            xmlHttpReq = new XDomainRequest();
            xmlHttpReq.open(method, url);
            return xmlHttpReq;
        }
    }

    render() {
        return (
            <div>
                <header className="project-title">
                    <div>
                        <h1>SongFinder</h1>
                        <h2>Find a song by its lyrics</h2>
                    </div>
                </header>
                <div className="App">
                    <SearchSongForm setLyrics={ this.setLyrics.bind(this) } />
                    <Song songs={ this.state.songs } />
                </div>
            </div>
        );
    }
}


export default App;
