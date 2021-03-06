import Head from 'next/head'
import axios from 'axios'
import Nav from '../components/nav'

import { useState, useEffect } from "react"

export default function Login() {
  const [ postData , setPostData ] = useState([])

  async function getPost () {
    try {
      const {data} = await axios.get(`https://dummyapi.io/data/v1/post`, 
        {headers: {'app-id': '61c01b4eaec39b388ea1b47b'}},
      )
      setPostData(data.data)
    }
    catch(err) {
      console.log(err.response, '<--- masuk error')
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <>
      <Head>
        <title>Post | Halosis</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" passHref="/favicon.ico" />
      </Head>
      <div className="mt-28 px-20 md:p-5">
        <Nav />

        <h1 className="text-3xl mb-10">Halosis Post</h1>
        <div className="flex flex-wrap">
          {postData.map((e, index) => (
            <div key={e.id} className="w-[25%] py-5 lg:w-1/2 md:w-full">
              <img src={e.image} alt="" className="w-full h-[200px] object-cover object-center transition duration-200  hover:scale-110" />
              <h2 className="text-md px-2 py-1">{e.text}</h2>
              <p className="px-2 text-xs">by: {e.owner.firstName}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}