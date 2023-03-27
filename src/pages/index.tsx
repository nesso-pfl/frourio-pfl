import { AuthCheck } from '~/features/auth'
import { Layout } from '~/features/layout'

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
