package server

import (
	"fmt"
	"github.com/GabCamarda/blokur_coding_test/lyricsFinder/scraper"
	"net/http"
	"strconv"
)

type Server struct {
	Port    int
	Scraper scraper.Parser
}

func homeHandler(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintln(res, req.URL.Path)
}

func (server *Server) findHandler(res http.ResponseWriter, req *http.Request) {
	lyrics := req.URL.Query().Get("q")
	fmt.Fprintln(res, lyrics)
	//fmt.Println(server.Scraper.Scrape(lyrics))
	server.Scraper.Scrape(lyrics)
}

func (server *Server) Start() {
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/find", server.findHandler)
	http.ListenAndServe(":"+strconv.Itoa(server.Port), nil)
}
