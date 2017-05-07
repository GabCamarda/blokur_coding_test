import React, { Component } from 'react';

export default class SearchSongForm extends Component {

    constructor(props) {
        super(props);

        this.state = { lyrics: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ lyrics: event.target.value });
    }

    hideErrorContainer() {
        let errorElem = document.getElementById('error');
        errorElem.className = '';
        errorElem.innerHTML = '';
    }

    showErrorContainer(msg) {
        let errorElem = document.getElementById('error');
        errorElem.className = 'error';
        errorElem.innerHTML = msg;
    }

    handleSubmit(event) {
        event.preventDefault();
        if(!this.state.lyrics) {
            this.showErrorContainer('Lyrics cannot be empty');

            return;
        }

        this.hideErrorContainer();
        this.submitValue(this.state.lyrics);
    }

    submitValue(lyrics) {
        this.props.setLyrics(lyrics);
    }

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={ this.handleSubmit }>
                    <label>
                        <h1>Search a song</h1>
                        <div id="error"> </div>
                        <input type="text" value={ this.state.lyrics } onChange={ this.handleChange } placeholder="Type the lyrics you remember here" />
                    </label>
                    <button className="btn primary-btn">Search</button>
                </form>
            </div>
        )
    }
}

