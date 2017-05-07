package server

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"github.com/GabCamarda/songfinder/lyricsFinder/finder"
)

type Server struct {
	Port       int
	SongFinder finder.Parser
}

func homeHandler(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintln(res, req.URL.Path)
}

func (server *Server) findHandler(res http.ResponseWriter, req *http.Request) {
	lyrics := req.URL.Query().Get("q")
	songs, err := server.SongFinder.GetSongs(lyrics)
	if err != nil {
		log.Fatal(err)
		res.Write([]byte("An error occurred, please try again"))
		return
	}

	res.Write(songs)
}

func (server *Server) Start() {
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/find", server.findHandler)
	http.ListenAndServe(":"+strconv.Itoa(server.Port), nil)
}
