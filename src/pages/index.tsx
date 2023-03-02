import { NextPage } from 'next'
import { AuthCheck } from '../features/account'
import { Layout } from '../features/ui'

const Home: NextPage = () => {
  return (
    <AuthCheck>
      <Layout>home</Layout>
    </AuthCheck>
  )
}

export default Home
