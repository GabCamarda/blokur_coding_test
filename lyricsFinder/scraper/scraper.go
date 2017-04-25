package scraper

import (
	"fmt"
	"golang.org/x/net/html"
	"log"
	"net/http"
	"go/token"
)

type Parser struct {
	Url              string
	ElementNode      string
	ElementNodeValue string
}

func (parser *Parser) Scrape(lyrics string) (html string, err error) {
	//content, err := parser.getDivContent()
	parser.getDivContent()

	return
}

func (parser *Parser) getUrlContent() (res *http.Response, err error) {
	res, err = http.Get(parser.Url)
	if err != nil {
		log.Fatal(err)
		return
	}

	return
}

func (parser *Parser) getDivContent() (content string, err error) {
	res, err := parser.getUrlContent()
	tokenizer := html.NewTokenizer(res.Body)
	//
	//for {
	//	token := tokenizer.Next()
	//	if token == html.ErrorToken {
	//		return
	//	}
	//
	//	if token == html.StartTagToken {
	//
	//	}
	//
	//}
	//
	//node, err := html.Parse(r.Body)
	//fmt.Print(node.Data)
	//if node.Type == html.ElementNode {
	//	fmt.Println(node)
	//}


	depth := 0
	for {
		tt := tokenizer.Next()
		switch tt {
		case html.ErrorToken:
			err = tokenizer.Err()
			return
		case html.TextToken:
			if depth > 0 {
				content = string(tokenizer.Text()[:])
				return
			}
		case html.StartTagToken, html.EndTagToken:
			tn, _ := tokenizer.TagName()
			tagName := string(tn[:])
			if tagName == parser.ElementNode {

				parser.parseElementClass(tokenizer)

				if tt == html.StartTagToken {
					depth++
				} else {
					depth--
				}
			}
		}
	}

	defer res.Body.Close()
	return
}

func (parser *Parser) parseElementClass(token *html.Tokenizer) {
	//tagAttribue, tagAttributeValue, tagMoreAttributes := token.TagAttr()
	//parse div class to get all the songs
}
