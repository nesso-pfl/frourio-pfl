import { ChevronLeftIcon, ChevronRightIcon } from './icons'
import { Button, IconButton } from './Button'
import { ButtonGroup, Icon } from '@chakra-ui/react'
import { useMemo } from 'react'

type Props = {
  currentPage: number
  lastPage: number
  onChange: (page: number) => void
}

export const Pagination: React.FC<Props> = ({ currentPage, lastPage, onChange }) => {
  const pageOptions = useMemo(
    () =>
      [...new Array(5).keys()].map((index) => currentPage - 2 + index).filter((page) => page > 0 && page <= lastPage),
    [currentPage, lastPage],
  )

  const handleChangePage = (page: number) => onChange(page)
  const handlePrevPage = () => onChange(currentPage - 1)
  const handleNextPage = () => onChange(currentPage + 1)

  return (
    <ButtonGroup borderRadius="4px" spacing={3}>
      <IconButton
        aria-label="前のページ"
        variant="secondary"
        isDisabled={currentPage <= 1}
        onClick={handlePrevPage}
        w="33px"
        h="33px"
        icon={<Icon as={ChevronLeftIcon} />}
      />
      {pageOptions.map((page) => (
        <Button
          key={page}
          variant="secondary"
          w="33px"
          h="33px"
          isDisabled={currentPage === page}
          onClick={() => handleChangePage(page)}
        >
          {page}
        </Button>
      ))}
      <IconButton
        aria-label="次のページ"
        variant="secondary"
        isDisabled={currentPage >= lastPage}
        onClick={handleNextPage}
        w="33px"
        h="33px"
        icon={<Icon as={ChevronRightIcon} />}
      />
    </ButtonGroup>
  )
}
