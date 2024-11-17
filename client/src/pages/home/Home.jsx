import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import SearchBar from '../../components/searchBar/SearchBar'

const Home = () => {
  return (
    <>
    <Navbar />
    <div className="mid-section">
        G Technologies
    </div>
    <SearchBar />
    </>
  )
}

export default Home