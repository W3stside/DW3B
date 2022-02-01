import { useCallback, useMemo } from 'react'
import { AppState, useAppSelector, useAppDispatch } from 'state'
import { checkedTransaction, finalizeTransaction } from '../transactions/reducer'
import { addPopup, ApplicationModal, PopupContent, removePopup, setOpenModal } from './reducer'

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector(state => state.application.openModal)
  return openModal === modal
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal)
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open])
}

export function useOpenModal(modal: ApplicationModal): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenModal(modal)), [dispatch, modal])
}

export function useCloseModals(): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenModal(null)), [dispatch])
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET)
}

export function useToggleSettingsMenu(): () => void {
  return useToggleModal(ApplicationModal.SETTINGS)
}

export function useShowClaimPopup(): boolean {
  return useModalOpen(ApplicationModal.CLAIM_POPUP)
}

export function useToggleShowClaimPopup(): () => void {
  return useToggleModal(ApplicationModal.CLAIM_POPUP)
}

export function useToggleSelfClaimModal(): () => void {
  return useToggleModal(ApplicationModal.SELF_CLAIM)
}

export function useToggleDelegateModal(): () => void {
  return useToggleModal(ApplicationModal.DELEGATE)
}

export function useToggleVoteModal(): () => void {
  return useToggleModal(ApplicationModal.VOTE)
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }))
    },
    [dispatch]
  )
}

// returns a function that allows removing a popup via its key
export function useRemovePopup() {
  const dispatch = useAppDispatch()
  return useCallback(
    (payload: Parameters<typeof removePopup>[0]) => {
      dispatch(removePopup(payload))
    },
    [dispatch]
  )
}

export function useFinalizeTransaction() {
  const dispatch = useAppDispatch()
  return useCallback(
    (payload: Parameters<typeof finalizeTransaction>[0]) => {
      dispatch(finalizeTransaction(payload))
    },
    [dispatch]
  )
}

export function useCheckedTransaction() {
  const dispatch = useAppDispatch()
  return useCallback(
    (payload: Parameters<typeof checkedTransaction>[0]) => {
      dispatch(checkedTransaction(payload))
    },
    [dispatch]
  )
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useAppSelector(state => state.application.popupList)
  return useMemo(() => list.filter(item => item.show), [list])
}
