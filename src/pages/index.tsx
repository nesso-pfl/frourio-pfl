import { AuthCheck } from '../features/account'
import { Layout } from '../features/ui'

function Home() {
  return <>home</>
}

export default Home
Home.getLayout = (page: React.ReactElement) => {
  return (
    <AuthCheck>
      <Layout>{page}</Layout>
    </AuthCheck>
  )
}
