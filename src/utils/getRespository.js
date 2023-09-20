import React from 'react'

export const getRespository = async(url) => {
    const res = await fetch(url)
    const data = await res.json()
    
  return data
}
