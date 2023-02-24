import React from 'react'

const Newsitem =(props)=> {
 
    let {title,description,imageurl,newsUrl,author,date} = props;
    return (
      <div className="my-3">
        <div className="card">
        <img src={imageurl} className="card-img-top" alt="..."/>
        <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {date}</small></p>
    <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
} 

export default Newsitem