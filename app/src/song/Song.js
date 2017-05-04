import React, { Component } from 'react';
import axios from 'axios';

class Song extends Component {
    constructor(props) {
        super(props);

        this.state = {
            songs: []
        }
    }

    componentDidMount() {
        let xmlHttpReq = this.createCorsRequest('GET', 'http://localhost:1337/find/just+the+way+you+are');
        if(!xmlHttpReq) {
            throw new Error('Cannot request data from API due to CORS incompatibility with the browser in use');
        }

        xmlHttpReq.onload = () => {
            const data = JSON.parse(xmlHttpReq.responseText);
            this.setState({songs: data.Songs});
            console.log(this.state.songs);
        };
        xmlHttpReq.send();
    }

    createCorsRequest(method, url) {
        let xmlHttpReq = new XMLHttpRequest();
        if(xmlHttpReq && "withCredentials" in xmlHttpReq) {
            xmlHttpReq.open(method, url, true);
            return xmlHttpReq;
        }

        if(typeof XDomainRequest !== "undefined") {
            xmlHttpReq = new XDomainRequest();
            xmlHttpReq.open(method, url);
            return xmlHttpReq;
        }

        return undefined;
    }

    render() {
        return (
            <div>
                <h2>Songs</h2>
                <div className="list-songs">
                    <ul>
                        {this.state.songs.map(song =>
                            <li key={song.Id}>{song.Title}</li>
                        )}
                    </ul>
                </div>
            </div>

        );
    }
}

export default Song;
