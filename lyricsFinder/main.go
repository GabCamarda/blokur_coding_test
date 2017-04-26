package main

import (
	"flag"
	"fmt"
	SongFinder "github.com/GabCamarda/blokur_coding_test/lyricsFinder/songfinder"
	Server "github.com/GabCamarda/blokur_coding_test/lyricsFinder/server"
	"strconv"
)

var port = flag.Int("port", 1339, "config value to set which port should the server listen to")
var parserUrl = flag.String("parserUrl", "http://api.metrolyrics.com/v1//multisearch/all/X-API-KEY/196f657a46afb63ce3fd2015b9ed781280337ea7/format/xml?find=", "flag url value for scraping")
var parserDiv = flag.String("parserDiv", "div", "the div element tag to scrape")
var parserDivValue = flag.String("parserDivValue", "<div class=\"songs clearfix\">", "the div element to scrape")

func main() {
	finder := SongFinder.Parser{*parserUrl, *parserDiv, *parserDivValue}
	server := Server.Server{*port, finder}
	fmt.Println("Server listening on port " + strconv.Itoa(*port))

	server.Start()
}
