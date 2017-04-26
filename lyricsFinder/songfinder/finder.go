package songfinder

import (
	"encoding/json"
	"encoding/xml"
	"log"
	"net/http"
	"time"
)

type Parser struct {
	Url              string
	ElementNode      string
	ElementNodeValue string
}

type XmlPage struct {
	Songs []Song `xml:"results>songs>d>item"`
}

type Song struct {
	Id   string `xml:"q"`
	Name string `xml:"p"`
	Url  string `xml:"u"`
}

func (parser *Parser) GetSongs(lyrics string) ([]byte, error) {
	var httpClient = &http.Client{Timeout: 10 * time.Second}
	res, err := httpClient.Get(parser.Url + lyrics)

	var contents XmlPage
	err = xml.NewDecoder(res.Body).Decode(&contents)

	jsonContent, err := json.Marshal(contents)
	if err != nil {
		log.Fatalln(err)
		return nil, err
	}

	defer res.Body.Close()

	return jsonContent, err
}
