import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

const POPUP_REMOVE_TIME = 15000

export type PopupContent = React.ReactNode
export type TxPopupContent = {
  txn: {
    hash: string
    success: boolean
    summary?: string
  }
}
export enum ApplicationModal {
  WALLET,
  SETTINGS,
  MENU,
  ITEM_LARGE_IMAGE
}

type PopupList = Array<{
  key: string
  show: boolean
  content: TxPopupContent | PopupContent
  removeAfterMs: number | null
}>

export interface ModalsAndPopupsState {
  readonly popupList: PopupList
  readonly openModal: ApplicationModal | null
}

const initialState: ModalsAndPopupsState = {
  popupList: [],
  openModal: null
}

const modalsAndPopupsSlice = createSlice({
  name: 'modalsAndPopups',
  initialState,
  reducers: {
    setOpenModal(state, action: PayloadAction<ApplicationModal | null>) {
      state.openModal = action.payload
    },
    addAnyPopup(
      state,
      {
        payload: { content, key, removeAfterMs = POPUP_REMOVE_TIME }
      }: PayloadAction<{ content: PopupContent; key?: string; removeAfterMs?: number }>
    ) {
      state.popupList = (key ? state.popupList.filter(popup => popup.key !== key) : state.popupList).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs
        }
      ])
    },
    addTxPopup(
      state,
      {
        payload: { content, key, removeAfterMs = POPUP_REMOVE_TIME }
      }: PayloadAction<{ content: TxPopupContent; key?: string; removeAfterMs?: number }>
    ) {
      state.popupList = (key ? state.popupList.filter(popup => popup.key !== key) : state.popupList).concat([
        {
          key: key || nanoid(),
          show: true,
          content,
          removeAfterMs
        }
      ])
    },
    removePopup(state, { payload: key }: PayloadAction<string>) {
      state.popupList.forEach(p => {
        if (p.key === key) {
          p.show = false
        }
      })
    }
  }
})

export const { setOpenModal, addAnyPopup, addTxPopup, removePopup } = modalsAndPopupsSlice.actions
export const modalsAndPopups = modalsAndPopupsSlice.reducer
