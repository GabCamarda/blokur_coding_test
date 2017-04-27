package songfinder

import (
	"encoding/json"
	"encoding/xml"
	"log"
	"net/http"
	"regexp"
	"strings"
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
	Id       string `xml:"q"`
	FullName string `xml:"p"`
	Url      string `xml:"u"`
	Artist   string
	Title    string
}

func (parser *Parser) GetSongs(lyrics string) ([]byte, error) {
	var httpClient = &http.Client{Timeout: 10 * time.Second}
	res, err := httpClient.Get(parser.Url + lyrics)

	var contents XmlPage
	err = xml.NewDecoder(res.Body).Decode(&contents)

	//replace html tags left in content
	for k, v := range contents.Songs {
		re, _ := regexp.Compile("<[\\S\\s]+?>")
		fullName := strings.Replace(v.FullName, "<br />", "-", -1)
		fullName = re.ReplaceAllString(fullName, "")
		arr := strings.Split(fullName, "-")
		contents.Songs[k].FullName = fullName
		contents.Songs[k].Artist = string(arr[0])
		contents.Songs[k].Title = string(arr[1])
	}

	jsonContent, err := json.Marshal(contents)
	if err != nil {
		log.Fatalln(err)
		return nil, err
	}

	defer res.Body.Close()

	return jsonContent, err
}
