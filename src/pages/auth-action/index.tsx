import { PasswordReset, VerifyEmail } from '@/src/features/auth'
import { Center, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { z } from 'zod'

const modes = ['resetPassword', 'verifyEmail'] as const

const querySchema = z.object({
  mode: z.enum(modes),
  oobCode: z.string(),
})

export default function Page() {
  const router = useRouter()
  const query = useMemo(() => {
    const result = querySchema.safeParse(router.query)
    return result.success ? result.data : undefined
  }, [router])
  switch (query?.mode) {
    case 'resetPassword':
      return <PasswordReset code={query.oobCode} />
    case 'verifyEmail':
      return <VerifyEmail code={query.oobCode} />
    default:
      return (
        <Center w="100vw" h="100vh">
          <Spinner size="xl" />
        </Center>
      )
  }
}
