import { Grid, GridItem } from '@chakra-ui/react'

type DefItem = {
  key: string
  term: React.ReactNode
  desc: React.ReactNode
}

type Props = {
  items: DefItem[]
}

export const DefList: React.FC<Props> = ({ items }) => {
  return (
    <Grid as="dl" templateColumns="auto 1fr" columnGap={2}>
      {items.map(({ key, term, desc }) => (
        <>
          <GridItem key={key} as="dt" display="flex" alignItems="center">
            {term}
          </GridItem>
          <GridItem key={key} as="dd" display="flex" alignItems="center" fontSize="sm">
            {desc}
          </GridItem>
        </>
      ))}
    </Grid>
  )
}
