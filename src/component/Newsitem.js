
import React from 'react'

const Newsitem =(props)=> {

    
      let  {title, description, imageurl, newsurl, author, date, source  } =props;
        return (
            <div className='my-1'>
                <div className="card" >
                    <div>

                <span className=" badge rounded-pill bg-danger" style={{
                    display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}} >{source}</span>
                    </div>
                    <img src={!imageurl?"https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-announcements/-476x249w4/gsmarena_00.jpg":imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unkown":author} On {new Date(date).toGMTString()} </small></p>
                        <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    
}

export default Newsitem
