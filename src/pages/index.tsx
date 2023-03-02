import { NextPage } from 'next'
import { AuthCheck } from '../features/account'

const Home: NextPage = () => {
  return <AuthCheck>home</AuthCheck>
}

export default Home
