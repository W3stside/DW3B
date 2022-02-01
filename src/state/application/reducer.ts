import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

export type PopupContent = React.ReactNode

export enum ApplicationModal {
  WALLET,
  SETTINGS,
  SELF_CLAIM,
  ADDRESS_CLAIM,
  CLAIM_POPUP,
  MENU,
  DELEGATE,
  VOTE
}

type PopupList = Array<{ key: string; show: boolean; content: PopupContent; removeAfterMs: number | null }>

export interface ApplicationState {
  readonly popupList: PopupList
  readonly openModal: ApplicationModal | null
}

const initialState: ApplicationState = {
  popupList: [],
  openModal: null
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setOpenModal(state, action: PayloadAction<ApplicationModal | null>) {
      state.openModal = action.payload
    },
    addPopup(
      state,
      {
        payload: { content, key, removeAfterMs = 15000 }
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
    removePopup(state, { payload: key }: PayloadAction<string>) {
      state.popupList.forEach(p => {
        if (p.key === key) {
          p.show = false
        }
      })
    }
  }
})

export const { setOpenModal, addPopup, removePopup } = applicationSlice.actions
export const application = applicationSlice.reducer
