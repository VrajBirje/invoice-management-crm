import React from 'react'
import "./search.css"

export const Search = ({handleSearch , searchTerm} ) => {
    return (
        <div className='searchBox'>
            <input
                // type="search" placeholder='Search' className='searchInput' onChange={handlechange}
                type="text"
                placeholder='Search'
                className='searchInput'
                value={searchTerm}
                onChange={handleSearch}
            />
        </div>
    )
}