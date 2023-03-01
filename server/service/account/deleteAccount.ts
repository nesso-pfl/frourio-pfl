import { depend } from 'velona'
import { deleteFirebaseUser } from '$/lib/firebase'

type DeleteAccount = {
  firebaseUid: string
}

const delete_ = async ({ firebaseUid }: DeleteAccount) => {
  return deleteFirebaseUser(firebaseUid)
}
export const deleteAccount = depend({ delete_ }, async ({ delete_ }, deletingAccount: DeleteAccount) => {
  await delete_(deletingAccount)
})
