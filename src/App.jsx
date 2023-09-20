import React, { useState } from "react";
import "./reset.min.css"
import "./styles.css"
import { REQUEST_STATUS, useFetch } from "./utils/useFetch";
import { getRespository } from "./utils/getRespository";
export const App = () => {

const [value, setValue] = useState("")
const {status, info, getData} = useFetch({url: `https://api.github.com/users/${value}`, defaultVal: []})
const [repository, setRepository] = useState([])
const changeValue = (e) => {
setValue(e.target.value)

}

const searchUser = async(e)=> {
    e.preventDefault()
    if(value.trim() === "") return
    getData()
   
    const lastRepos = await  getRespository(`https://api.github.com/users/${value}/repos?per_page=4&order=desc&sort=created_at`)
    setRepository(lastRepos)
    
    setValue("")
    
    
}


  return (
    <div className="container">
      <form action="" onSubmit={searchUser}>
        <input type="search" disabled={status === REQUEST_STATUS.LOADING? true: false} value={value} onChange={changeValue} placeholder="Search a Github User"/>
      </form>
     <div className={`card ${status === REQUEST_STATUS.IDLE? "inactive": ""}`}>
        
        {status === REQUEST_STATUS.LOADING && <div className="loader"></div>}
        {status === REQUEST_STATUS.ERROR &&<h1 className="not-found">No profile with this username</h1>}

        {status === REQUEST_STATUS.SUCCESS && <><figure className="person-photo-container">
          <img className="person-photo" src={`${info.avatar_url}`} alt="" />
        </figure>
        <div className="person-info-container">
          <h2 className="name">{info.name === null? "null": info.name}</h2>
          <p className="description">{info.bio}</p>
          <div className="follows-container">
            <p className="followers">{info.followers} <span>Followers</span> </p>
            <p className="follows">{info.following} <span>Following</span></p>
            <p className="repos">{info.public_repos} <span>Repos</span></p>
          </div>
          <div className="lastest-projects-container">
            {repository.length > 0 && repository.map(repo => (
                <a
                key={repo.name}
                href="#"
                className="lastest-projects"
                target="_blank"
                rel="noopener noreferrer"
              >{repo.name}</a>
            ))}
           

          </div>
        </div></>}

        
      </div>
    </div>
  );
};
