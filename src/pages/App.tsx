import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { X } from 'react-feather'
import ThemeViewer from '@src/components/ThemeViewer'
import Popups from 'components/Popups'
import Web3ReactManager from 'components/Web3ReactManager'

import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import Header from '@src/components/Header'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;

  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  width: 90%;
  margin: auto;
  padding-top: 100px;

  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)

  if (!open) return null

  return (
    <div>
      <X onClick={toggle} />
      MODAL
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <Popups />
          <TopLevelModals />
          <Web3ReactManager>
            <Switch>
              <Route exact path="/" component={ThemeViewer} />
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  )
}
