import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='absolute pt-[18%] px-6 md:px-12 bg-gradient-to-r from-black w-screen aspect-video'>
        <h1 className='text-xl md:text-3xl font-bold w-1/2 text-white'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-lg w-1/2 text-white'>{overview}</p>
        <div>
            <button className='hidden md:inline-block bg-blue-500 text-white py-2 px-8 text-lg rounded-lg bg-opacity-80 font-bold cursor-default'>Keep Enjoying :)</button>
        </div>
    </div>
  )
}

export default VideoTitle