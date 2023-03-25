import { CityQuery } from '@/server/types'
import { Flex } from '@chakra-ui/react'
import { Badge } from '../ui'
import { showCategory } from './showCategory'

type Props = {
  formValues: Partial<CityQuery> | undefined
}

export const CitySearchTags: React.FC<Props> = ({ formValues }) => {
  return (
    <Flex gap={1} wrap="wrap">
      {formValues?.nameOrNameKana && <SearchTag>{`名前: ${formValues.nameOrNameKana}`}</SearchTag>}
      {formValues?.categories &&
        formValues.categories.map((item) => <SearchTag key={item}>{`町種別: ${showCategory(item)}`}</SearchTag>)}
    </Flex>
  )
}

type SearchTagProps = {
  children: React.ReactNode
}
const SearchTag: React.FC<SearchTagProps> = ({ children }) => {
  return (
    <Badge borderWidth="1px" borderColor="secondary" color="secondary" bg="white" h="20px">
      {children}
    </Badge>
  )
}
