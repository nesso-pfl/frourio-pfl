import { Modal as Modal_, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => unknown
}

export const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => {
  return (
    <Modal_ isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={3}>
        <ModalCloseButton _focus={{ outlineColor: 'transparent' }} zIndex={5} />
        <ModalBody p={5}>{children}</ModalBody>
      </ModalContent>
    </Modal_>
  )
}
