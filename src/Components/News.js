import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: '9',
    category: 'genral'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  articles = [
    // 20220918020109
    // https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=976f22d4d4384753ab8cb27e742fa8ef
    {
      "source": {
        "id": "google-news",
        "name": "Google News"
      },
      "author": null,
      "title": "The doctor is in: Root of hair fall - The Financial Express",
      "description": null,
      "url": "https://news.google.com/__i/rss/rd/articles/CBMiXWh0dHBzOi8vd3d3LmZpbmFuY2lhbGV4cHJlc3MuY29tL2xpZmVzdHlsZS9oZWFsdGgvdGhlLWRvY3Rvci1pcy1pbi1yb290LW9mLWhhaXItZmFsbC8yNjcxODM1L9IBYmh0dHBzOi8vd3d3LmZpbmFuY2lhbGV4cHJlc3MuY29tL2xpZmVzdHlsZS9oZWFsdGgvdGhlLWRvY3Rvci1pcy1pbi1yb290LW9mLWhhaXItZmFsbC8yNjcxODM1L2xpdGUv?oc=5",
      "urlToImage": null,
      "publishedAt": "2022-09-17T19:40:00Z",
      "content": null
    }
  ]

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults:0,

    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Monekey `;

  }
  /*  async updatenews(){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=976f22d4d4384753ab8cb27e742fa8ef&page=${this.State.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults, loading: false })
    }
*/
  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=976f22d4d4384753ab8cb27e742fa8ef&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(35);
    let parsedata = await data.json();
    console.log(parsedata);
    this.props.setProgress(65);
    this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults, loading: false })
    this.props.setProgress(100);
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=976f22d4d4384753ab8cb27e742fa8ef&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading: false,
    })
  }

  handleNextClick = async () => {
    this.props.setProgress(10);
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResult / 20))) {
      let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=976f22d4d4384753ab8cb27e742fa8ef&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedata = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedata.articles,
        loading: false,
      })
    }
    this.props.setProgress(100);
  }
 /* fetchMoreData = async () => {
 
    this.setState({page:this.state.page +1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=976f22d4d4384753ab8cb27e742fa8ef&page=${this.props.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({ 
      articles: this.state.articles.concat(parsedata.articles), totalResults: parsedata.totalResults, loading: false })
     
  }; */
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">Cric News - Top Headline </h1>
        {/*this.state.loading && <Spinner/>*/}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title} description={element.description} imageurl={element.urlToImage}
                  newsUrl={element.url} author={element.author} date={element.publishedAt} />
              </div>
            })}
          </div>
          </div> 
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page < 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News