import React, { Component, Fragment } from "react";

class QuoteMachine extends Component {
  constructor() {
    super();
    this.state = {
      quote: {
        author: "",
        cat: "",
        quote: ""
      },
      hasQuote: false
    };
    this.END_POINT = `https://talaikis.com/api/quotes/random/`;
  }

  getRandomQuote = e => {
    fetch(this.END_POINT)
      .then(response => response.json())
      .then(data => {
        if (data.author && data.cat && data.quote) {
          let { quote, hasQuote } = this.state;
          quote.author = data.author;
          quote.cat = data.cat;
          quote.quote = data.quote;
          this.setState({ quote }, () => {
            if (hasQuote === false) {
              this.setState({ hasQuote: true });
            }
          });
        } else {
          return console.error("No quote has been found");
        }
      });
  };

  renderQuote = () => {
    const { author, cat, quote } = this.state.quote;
    let capitalize = str => {
      let newStr = str.slice(0, 1).toUpperCase() + str.slice(1);
      return newStr;
    };
    return (
      <div onClick={this.shareOnTwitter}>
        <h1>{capitalize(cat)}</h1>
        <p>{quote}</p>
        <h3>{author}</h3>
      </div>
    );
  };

  shareOnTwitter = () => {
    const url = "http://google.com";
    const text = "Replace this with your text";
    window.open(
      "http://twitter.com/share?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(text),
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
  };

  render() {
    const { hasQuote, quote } = this.state;
    return (
      <Fragment>
        <h1> Quote Machine </h1>
        <button onClick={this.getRandomQuote}> Click for New Quote</button>
        {hasQuote === true ? this.renderQuote() : "No quote yet"}
      </Fragment>
    );
  }
}

export default QuoteMachine;
