import {
  Breadcrumb as Breadcrumb_,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps,
  forwardRef,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { UrlObject } from 'url'

type LinkInfo = {
  href: UrlObject | '#'
  label: string
}

type Props = {
  links: LinkInfo[]
} & BreadcrumbProps

export const Breadcrumb = forwardRef<Props, 'nav'>(({ links, ...breadcrumbProps }, ref) => {
  return (
    <Breadcrumb_ ref={ref} separator=">" {...breadcrumbProps}>
      {links.map((link) => (
        <BreadcrumbItem key={link.label}>
          <NextLink href={link.href}>
            <BreadcrumbLink as="span" _hover={{ textDecoration: 'none' }} fontSize="sm">
              {link.label}
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb_>
  )
})
