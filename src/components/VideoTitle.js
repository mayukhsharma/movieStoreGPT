import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='absolute pt-[18%] px-12 bg-gradient-to-r from-black w-screen aspect-video'>
        <h1 className='text-3xl font-bold w-1/2 text-white'>{title}</h1>
        <p className='py-6 text-lg w-1/2 text-white'>{overview}</p>
        <div>
            {/* <button className='bg-white text-black py-2 px-8 text-lg rounded-lg mr-3 hover:bg-opacity-80'>▶Play</button> */}
            <button className='bg-blue-500 text-white py-2 px-8 text-lg rounded-lg bg-opacity-80 hover:bg-opacity-50 font-bold border-white border-2'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle