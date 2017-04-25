package main

import (
	"flag"
	"fmt"
	Scraper "github.com/GabCamarda/blokur_coding_test/lyricsFinder/scraper"
	Server "github.com/GabCamarda/blokur_coding_test/lyricsFinder/server"
	"strconv"
)

var port = flag.Int("port", 1339, "config value to set which port should the server listen to")
var parserUrl = flag.String("parserUrl", "http://www.metrolyrics.com/search.html?search=", "flag url value for scraping")
var parserDiv = flag.String("parserDiv", "div", "the div element tag to scrape")
var parserDivValue = flag.String("parserDivValue", "<div class=\"songs clearfix\">", "the div element to scrape")

func main() {
	scraper := Scraper.Parser{*parserUrl, *parserDiv, *parserDivValue}
	server := Server.Server{*port, scraper}
	fmt.Println("Server listening on port " + strconv.Itoa(*port))

	server.Start()
}
