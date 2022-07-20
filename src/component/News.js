import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import Newsitem from './Newsitem'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
    const [articles, setArticals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
  

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const  updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=dfb9e34d716f43c7b1d9aadd3281e8c4&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticals(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsBuddy`;
        updateNews();
    },[page,totalResults]);
 


//    const handleNextClick = async () => {
//         setPage(page + 1)
//         updateNews()
//     }



    // https://newsapi.org/v2/top-headlines?country=in&apiKey=dfb9e34d716f43c7b1d9aadd3281e8c4

    // const handlePrevClick = async () => {
       
    //     setPage(page - 1)
    //     updateNews()
    // }

     const fetchMoreData = async () => {
   
       
       const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=dfb9e34d716f43c7b1d9aadd3281e8c4&page=${page+1}&pageSize=${props.pageSize}`;
       setPage(page + 1)
       let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticals(articles.concat(parsedData.articles))
        setTotalResults( parsedData.totalResults)
        
    };

  
        return (
            <>
            
                <h1 className="text-center"  style={{ margin: '65px 0px', marginTop: '90px' }}>NewsBuddy - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Loading/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    // loader={<Loading/>}
                >
                    <div className="container">
                    <div className="row">
                        {!loading && articles.map((element) => {
                      return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 88) : " "} imageurl={element.urlToImage}
                                    newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                     </div>

                </InfiniteScroll>
                


           
            </>
        )
    

    
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}


export default News
