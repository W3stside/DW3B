import { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'

import ThemeViewer from 'components/ThemeViewer'
import Popups from 'components/Popups'
import Web3ReactManager from 'components/blockchain/Web3ReactManager'

import Header from 'components/Header'
// import Footer from 'components/Footer'

import Home from 'components/Home'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;

  overflow-x: hidden;
`

const SectionWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: auto;

  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    // padding: 16px;
    // padding-top: 2rem;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  return (
    <Suspense fallback={null}>
      <AppWrapper>
        <SectionWrapper>
          <Header />
        </SectionWrapper>
        <BodyWrapper>
          <Popups />
          <Web3ReactManager>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/theme" component={ThemeViewer} />
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </BodyWrapper>
        {/* <SectionWrapper>
          <Footer />
        </SectionWrapper> */}
      </AppWrapper>
    </Suspense>
  )
}
