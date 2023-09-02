import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from '@/components/Header'
import Feed from '@/components/Feed'
import Model from '../components/Model'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   
    <div className=''>
       <Head>
      <title>Instagram App</title>
      <link rel='icon' href='/favicon.ico'></link>
     </Head>

     {/* Header */}
     <Model />
     <Header />
     <Feed />
   
    </div>

  )
}
