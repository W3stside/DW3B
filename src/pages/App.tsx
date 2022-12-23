import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import(/* webpackPrefetch: true,  webpackChunkName: "HOME" */ 'components/Home'))
const Popups = lazy(() => import(/* webpackPrefetch: true,  webpackChunkName: "POPUPS" */ 'components/Popups'))
const NotFound = lazy(() => import(/* webpackChunkName: "NOTFOUND" */ 'pages/Error/NotFound'))

import CookieBanner from 'components/Cookies/Banner'
import { FallbackLoader } from 'components/Loader'

export default function App() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <Popups />
      <Routes>
        <Route path={`/`} element={<Home />} />

        <Route path="/404" element={<NotFound />} />
      </Routes>

      <CookieBanner message={'COOKIE SETTINGS'} />
    </Suspense>
  )
}
