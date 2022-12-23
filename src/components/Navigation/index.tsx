import { Menu, X } from 'react-feather'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingRows from 'components/Loader/LoadingRows'
import useOnResize from 'hooks/useOnResize'
import { MobileNavOrb, NavigationStepsWrapper, InnerNavWrapper } from './styled'
import { WHITE } from 'theme/utils'
import { Column, Row } from 'components/Layout'
import ThemeToggleBar from 'components/ThemeToggler'
import { Subheader } from 'components/Layout/Text'

export type MobileNavProps = { menuSize?: number; bgColor?: string }

const NAV_ENTRIES_LIST = ['NAV_ITEM_1', 'NAV_ITEM_2']

export default function Navigation({
  navOrbProps,
  mobileHide,
  navTitle = 'NAV'
}: {
  navOrbProps?: MobileNavProps
  mobileHide?: boolean
  navTitle?: string
}) {
  const navigate = useNavigate()

  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = useCallback(() => {
    if (isNavOpen) {
      setIsNavOpen(false)
    } else {
      setIsNavOpen(true)
    }
  }, [isNavOpen])

  const NavToggleButton = useMemo(() => {
    return (
      <Row alignItems={'center'} gap="1rem">
        {isNavOpen ? <X size={20} /> : <Menu size={navOrbProps?.menuSize || 20} />}
      </Row>
    )
  }, [isNavOpen, navOrbProps?.menuSize])

  const handleNavMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, to: string) => {
      e.preventDefault()

      isNavOpen && toggleNav()

      navigate(to)
    },
    [navigate, isNavOpen, toggleNav]
  )

  // close open nav on resize
  useOnResize(() => setIsNavOpen(false), isNavOpen)

  return (
    <>
      <MobileNavOrb onClick={toggleNav} mobileHide={mobileHide} {...navOrbProps}>
        {NavToggleButton}
      </MobileNavOrb>
      <NavigationStepsWrapper isOpen={isNavOpen} minWidth="9vw" width="16.5rem">
        <InnerNavWrapper $width={isNavOpen ? '90%' : '100%'}>
          <Subheader color={WHITE} margin="0 0 1rem 0" padding={0}>
            <Row flexDirection={'row-reverse'} flexWrap={'wrap'} justifyContent="center" style={{ gap: '0.5rem' }}>
              <div style={{ fontWeight: 300, fontSize: '1.2rem' }}>{navTitle}</div>
            </Row>
          </Subheader>
          <Column>
            {NAV_ENTRIES_LIST ? (
              NAV_ENTRIES_LIST.map((entry, i) => (
                <Subheader
                  key={i}
                  color={WHITE}
                  padding="0"
                  margin="0.5rem 0 0.2rem 0"
                  fontSize={isNavOpen ? '4rem' : '1.6rem'}
                  fontWeight={100}
                  onClick={e => handleNavMove(e, entry)}
                >
                  {entry.toLocaleUpperCase()}
                </Subheader>
              ))
            ) : (
              <LoadingRows rows={6} />
            )}
          </Column>
        </InnerNavWrapper>
        <InnerNavWrapper
          margin="auto auto 1rem auto"
          padding="1.5rem 1rem"
          alignItems={'center'}
          bgColor="transparent"
          $width={isNavOpen ? '90%' : '100%'}
        >
          <div>
            <ThemeToggleBar themeToggleProps={{ width: '90%' }} />
          </div>
        </InnerNavWrapper>
      </NavigationStepsWrapper>
    </>
  )
}
