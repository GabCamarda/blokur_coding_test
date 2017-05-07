import React, { Component } from 'react';

class Song extends Component {

    render() {
        if(this.props.songs && this.props.songs.length > 0) {
            return (
                <div>
                    <h2>Songs Found</h2>
                    <div className="list-songs">
                        <ul>
                            {this.props.songs.map(song =>
                                <li key={song.Id}>{song.Artist} - {song.Title}</li>
                            )}
                        </ul>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <h2>No Songs Found</h2>
            </div>
        );
    }
}

export default Song;
