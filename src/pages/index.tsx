import { LoggedInLayout } from '~/features/layout'

function Home() {
  return <>home</>
}

export default Home
Home.getLayout = (page: React.ReactElement) => {
  return <LoggedInLayout>{page}</LoggedInLayout>
}
