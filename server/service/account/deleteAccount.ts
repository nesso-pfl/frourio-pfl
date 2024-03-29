import { depend } from 'velona'
import { deleteFirebaseAdminUser } from '$/lib/firebase'
import { DeleteAccount } from '$/types/account'

const delete_ = async ({ firebaseUid }: DeleteAccount) => {
  return deleteFirebaseAdminUser(firebaseUid)
}
export const deleteAccount = depend({ delete_ }, async ({ delete_ }, deletingAccount: DeleteAccount) => {
  await delete_(deletingAccount)
})
