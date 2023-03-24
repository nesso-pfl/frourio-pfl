import { Link, List, ListItem, ListItemProps, ListProps } from '@chakra-ui/react'
import { UrlObject } from 'url'
import { useRouter } from 'next/router'
import { NextLink } from './NextLink'

type Link = {
  label: string
  href: UrlObject
}

type Props<T extends Link> = {
  links: T[]
  itemProps?: (link: T) => ListItemProps
} & ListProps

export const HLinks = <T extends Link>({ links, itemProps, ...restProps }: Props<T>) => {
  const router = useRouter()
  return (
    <List display="flex" {...restProps}>
      {links.map((link) => (
        <ListItem
          key={link.label}
          borderTopWidth="2px"
          borderBottomWidth="2px"
          borderTopColor="transparent"
          borderBottomColor={router.asPath.replace(/#/, '') === link.href.pathname ? 'white' : 'transparent'}
          transition="all 0.2s"
          _hover={{ opacity: 0.8 }}
          fontSize="sm"
          {...itemProps?.(link)}
        >
          <NextLink href={link.href} w="100%" height="100%" display="flex" alignItems="center" padding="0 20px">
            <Link as="span" _hover={{ textDecoration: 'none' }}>
              {link.label}
            </Link>
          </NextLink>
        </ListItem>
      ))}
    </List>
  )
}
