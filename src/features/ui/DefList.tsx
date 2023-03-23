import { forwardRef, Grid, GridItem, GridProps } from '@chakra-ui/react'
import React from 'react'

type DefItem = {
  key: string
  term: React.ReactNode
  desc: React.ReactNode
}

type Props = {
  items: DefItem[]
} & GridProps

export const DefList = forwardRef<Props, 'dl'>(({ items }, ref) => {
  return (
    <Grid as="dl" ref={ref} templateColumns="auto 1fr" columnGap={2}>
      {items.map(({ key, term, desc }) => (
        <React.Fragment key={key}>
          <GridItem as="dt" display="flex" alignItems="center">
            {term}
          </GridItem>
          <GridItem as="dd" display="flex" alignItems="center" fontSize="sm">
            {desc}
          </GridItem>
        </React.Fragment>
      ))}
    </Grid>
  )
})
