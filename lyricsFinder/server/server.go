package server

import (
	"fmt"
	"github.com/GabCamarda/blokur_coding_test/lyricsFinder/songfinder"
	"log"
	"net/http"
	"strconv"
)

type Server struct {
	Port       int
	SongFinder songfinder.Parser
}

func homeHandler(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintln(res, req.URL.Path)
}

func (server *Server) findHandler(res http.ResponseWriter, req *http.Request) {
	lyrics := req.URL.Query().Get("q")
	fmt.Fprintln(res, lyrics)
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
