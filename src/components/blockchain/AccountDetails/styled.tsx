import styled, { css, keyframes } from 'styled-components/macro'
import { transparentize } from 'polished'
import { X } from 'react-feather'

import { CopyIcon } from 'components/blockchain/AccountDetails/Copy'
import { ExternalLink, LinkStyledButton } from 'theme'
import { StyledSVG } from 'components/Loader'

import { RowFixed, YellowCard } from 'components/Layout'
import Logo from 'components/Logo'
import Button from 'components/Button'

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background: radial-gradient(white 50%, #ffffff00 calc(75% + 1px), #ffffff00 100%);
  border-radius: 50%;
  -mox-box-shadow: 0 0 1px black;
  -webkit-box-shadow: 0 0 1px black;
  box-shadow: 0 0 1px black;
  border: 0px solid rgba(255, 255, 255, 0);
`

export const TransactionWrapper = styled.div`
  width: 100%;
  margin: 0 auto 1.2rem;
  border-radius: 1.2rem;
  font-size: initial;
  display: flex;
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.black};
  position: relative;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-flow: column wrap;
    padding: 2rem;
  `};

  ${RowFixed} {
    width: 100%;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
`

export const IconType = styled.div`
  flex: 0 0 36px;
  height: 36px;
  width: 36px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
`};

  &::before {
    content: '';
    display: block;
    background: ${({ color }) => color};
    position: absolute;
    top: 0;
    left: 0;
    height: inherit;
    width: inherit;
    border-radius: 36px;
    opacity: 0.1;
  }
  svg {
    display: flex;
    margin: auto;
  }
  svg > path {
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin: auto;
    display: block;
    fill: ${({ color }) => color};
  }
  // Loader
  ${StyledSVG} {
    > path {
      fill: transparent;
      stroke: ${({ color }) => color};
    }
  }
`

export const Summary = styled.div`
  display: grid;
  flex-flow: row wrap;
  width: 100%;
  grid-template-rows: 1fr;
  grid-template-columns: 80px max-content;
  color: ${({ theme }) => theme.text1};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: flex;
    grid-template-rows: initial;
    grid-template-columns: initial;
  `};

  > span {
    display: flex;
    flex-flow: column wrap;
    align-items: flex-start;
    margin: 0;
    justify-content: flex-start;
  }

  > span > a {
    font-size: 1.3rem;
    margin: 0;

    ${({ theme }) => theme.mediaWidth.upToSmall`
      order: 2;
      display: flex;
      justify-content: flex-end;
      flex: 1 1 max-content;
    `}
  }
`

export const SummaryInner = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: auto;
  margin: 0;
  opacity: 1;
  font-size: 1.3rem;
  word-break: break-word;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 1.6rem 0 0;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0 18px;
    justify-items: flex-start;
    align-items: flex-start;
  `};

  > b {
    font-weight: bold;
    line-height: 1;
    font-size: 1.6rem;
    color: inherit;
    text-transform: capitalize;
    margin: 0 0 1.6rem;
    flex: 0 0 auto;

    ${({ theme }) => theme.mediaWidth.upToSmall`
      font-size: 18px;
      grid-column: 1 / -1;
    `}
  }
`

export const SummaryInnerRow = styled.div<{ isExpired?: boolean; isCancelled?: boolean }>`
  display: grid;
  color: inherit;
  grid-template-rows: 1fr;
  grid-template-columns: 100px 1fr;
  width: 100%;
  margin: 0 0 0.4rem;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr; 
    grid-template-rows: max-content max-content; 
    margin: 0 0 1.6rem 0;
  `};

  > b,
  > i {
    position: relative;
    font-size: inherit;
    margin: 0;
    color: inherit;
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: normal;
  }

  > b {
    padding: 0;
    opacity: 0.85;
  }

  > i {
    word-break: break-word;
    white-space: break-spaces;
    text-decoration: ${({ isExpired, isCancelled }) => (isExpired || isCancelled) && 'line-through'};

    ${({ theme }) => theme.mediaWidth.upToSmall`
      font-weight: 600;
      margin: 0.6rem 0 0;
    `};

    &.cancelled {
      text-decoration: line-through;
    }
  }
`

export const TransactionStatusText = styled.div`
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-flow: column wrap;
  align-items: flex-start;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 0 auto 0 0;
  `};

  &.copied,
  &:hover {
    text-decoration: none;
  }
`

export const StatusLabelWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 0 1 auto;
  justify-content: center;
  margin: 0 0 auto auto;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 16px auto 0;
    width: 100%;
  `};
`

export const StatusLabel = styled.div<{
  isTransaction: boolean
  isPending: boolean
  isCancelling: boolean
  isPresignaturePending: boolean
  color: string
}>`
  height: 28px;
  width: 100px;
  ${({ isPending, isPresignaturePending, isCancelling, theme }) =>
    !isCancelling && (isPending || isPresignaturePending) && `border:  1px solid ${theme.black};`}
  color: ${({ isPending, isPresignaturePending, theme, color }) =>
    isPending || isPresignaturePending ? theme.text1 : color === 'success' ? theme.green1 : theme.warningLight};
  position: relative;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  overflow: hidden;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    font-size: 1.3rem;
    height: 3.2rem;
    padding: 0 1.2rem;
  `};

  &::before {
    content: '';
    background: ${({ color, isTransaction, isPending, isPresignaturePending, isCancelling, theme }) =>
      !isCancelling && isPending
        ? 'transparent'
        : isPresignaturePending || (isPending && isTransaction)
        ? theme.warningLight
        : color === 'success'
        ? theme.green1
        : theme.warningLight};
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 0.4rem;
    opacity: 0.15;
  }

  ${({ theme, isCancelling, isPresignaturePending, isTransaction, isPending }) =>
    (isCancelling || isPresignaturePending || (isPending && isTransaction)) &&
    css`
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0,
          ${transparentize(0.3, theme.bg1)} 20%,
          ${theme.bg1} 60%,
          rgba(255, 255, 255, 0)
        );
        animation: shimmer 2s infinite;
        content: '';
      }
    `}

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  > svg {
    margin: 0 5px 0 0;
    max-height: 1.3rem;
    max-width: 18px;
    object-fit: contain;
  }

  > svg > path {
    fill: ${({ theme, color, isPending, isPresignaturePending }) =>
      isPending || isPresignaturePending ? theme.text1 : color === 'success' ? theme.green1 : theme.warningLight};
  }
`

export const StatusLabelBelow = styled.div<{ isCancelling?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  line-height: 1.1;
  margin: 7px auto 0;
  color: ${({ isCancelling, theme }) => (isCancelling ? theme.primary1 : 'inherit')};

  > ${LinkStyledButton} {
    margin: 2px 0;
    opacity: 1;
    color: ${({ theme }) => theme.primary1};
  }
`

// override the href, pending and success props
// override mouse actions via CSS when we dont want a clickable row
export const TransactionState = styled(ExternalLink).attrs(
  (props): { href?: string; disableMouseActions?: boolean; pending?: boolean; success?: boolean } => props
)`
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
  font-weight: 500;
  color: ${({ theme }) => theme.primary1};

  ${(props): string | false => !!props.disableMouseActions && `pointer-events: none; cursor: none;`}
  width: 100%;
  border-radius: 0;
  display: flex;
  padding: 0;
  font-size: 1.4rem;
  margin: 0.6rem 0 0;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 18px auto 0;
    position: absolute;
    top: 0;
    right: 16px;
    width: auto;
  `};

  ${RowFixed} {
    width: 100%;
  }
`

export const CancellationSummary = styled.span`
  padding: 1.2rem;
  margin: 0;
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.bg4};
`

export const TransactionAlertMessage = styled.div<{ type?: string }>`
  display: flex;
  justify-content: center;
  color: ${({ theme, type }) => (type === 'attention' ? theme.warningLight : theme.red1)};
  margin: 2.4rem 0 0;
  padding: 0.8rem 1.2rem;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  line-height: 1.4;
  background: ${({ theme, type }) =>
    type === 'attention' ? transparentize(0.9, theme.warningLight) : transparentize(0.9, theme.red1)};
  width: 100%;
  height: auto;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-column: 1 / -1;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    padding: 1.6rem 3.2rem;
    margin: 1.2rem 0 0;
  `};

  > svg,
  > img {
    margin: 0 0.6rem 0 0;
    fill: ${({ theme, type }) => (type === 'attention' ? theme.warningLight : theme.red1)};

    ${({ theme }) => theme.mediaWidth.upToSmall`
      margin: 0 0 1.2rem;
    `};
  }
`

export const TransactionInnerDetail = styled.div`
  display: flex;
  flex-flow: column wrap;
  border-radius: 1.2rem;
  padding: 2rem;
  color: ${({ theme }) => theme.text1};
  margin: 2.4rem auto 0 0;
  border: 1px solid ${({ theme }) => theme.black};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 2.4rem auto 1.2rem;
    width: 100%;
    max-width: 100%;
    grid-column: 1 / -1;
  `};

  > span {
    flex: 1 1 auto;
    margin: 0;
  }

  > span:last-of-type {
    margin: 3px 0 1.2rem;
  }

  > a {
    text-align: left;
    display: block;
    margin: 0;
    font-size: 1.4rem;
    font-weight: 500;
  }

  > a:focus {
    text-decoration: none;
  }
`

export const TextAlert = styled.div<{ isPending: boolean; isExpired: boolean; isCancelled: boolean }>`
  background: ${({ theme, isPending }) =>
    isPending ? transparentize(0.85, theme.warningLight) : transparentize(0.85, theme.green1)};
  margin: 0.6rem 0 1.6rem;
  padding: 0.8rem 1.2rem;
  color: ${({ theme, isPending }) => (isPending ? theme.warningLight : theme.green1)};
  text-decoration: ${({ isExpired, isCancelled }) => (isExpired || isCancelled) && 'line-through'};
  border-radius: 0.8rem;
  text-align: center;
  font-weight: 600;
`

export const CreationDateText = styled.div`
  padding: 1.2rem 0;
  font-size: 1.4rem;
  font-weight: 500;
`

export const CreationTimeText = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  opacity: 0.8;
  padding: 0 0 1.2rem;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const ActivityVisual = styled.div`
  display: flex;
  margin: 0 0 0.6rem;

  ${StyledLogo} {
    padding: 2px;
    box-sizing: content-box;
    box-shadow: none;
    background: ${({ theme }) => theme.bg1};
    color: ${({ theme }) => theme.black}!important; // TODO: Fix MOD file to not require this !important property value.
    border: 2px solid ${({ theme }) => theme.black};
  }

  ${StyledLogo}:not (:first-child):last-child {
    margin: 0 0 0 -9px;
  }

  &:hover ${StyledLogo} {
    animation: ${rotate360} 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
    transform: translateZ(0);
  }
`

export const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
  padding: 1rem;
`};
`

export const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
  flex: 1 1 auto;
  width: 100%;
`

export const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`

export const AccountSection = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  padding: 0rem 1rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0rem 1rem 1.5rem 1rem;`};
`

export const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`

export const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`

export const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 1.4rem;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

export const CloseColor = styled(X)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

export const WalletName = styled.div`
  width: initial;
  font-size: 0.825rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text3};
`

export const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 0.8rem;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '3.2rem')};
    width: ${({ size }) => (size ? size + 'px' : '3.2rem')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
  align-items: flex-end;
`};
`

export const WalletActions = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 1rem 0 0;
`

export const WalletSecondaryActions = styled.div``

export const WalletNameAddress = styled.div`
  width: 100%;
  font-size: 23px;
  font-weight: 500;
  margin: 0 0 0 0.8rem;
`

export const AccountDetailsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  color: ${({ theme }) => theme.text1};
  padding: 0;
  height: 100%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1.2rem 0 0;
  `};

  ${WalletName},
  ${AddressLink},
  ${CopyIcon} {
    color: ${({ theme }) => theme.text1};
    opacity: 0.85;
    transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 1.4rem;
    font-weight: normal;

    &:focus,
    &:hover {
      opacity: 1;
      transform: none;
      box-shadow: none;
      border: 0;
    }
  }

  ${IconWrapper} {
    margin: 0;
  }

  ${TransactionStatusText} {
    order: 2;
    margin: 0 0 0 0.8rem;
    align-self: center;
    font-size: 21px;
  }

  ${WalletName} {
    width: 100%;
    text-align: center;
    justify-content: center;
    margin: 0;
    font-size: 1.2rem;
  }

  

  ${AccountControl} {
    ${({ theme }) => theme.mediaWidth.upToSmall`
        align-items: center;
    `};
  }

  ${AccountControl} ${WalletSecondaryActions} {
    width: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.8rem;
    justify-items: flex-end;

    ${({ theme }) => theme.mediaWidth.upToSmall`
      justify-items: center;
      margin: 1.2rem auto 0;
    `};

    > a {
      align-items: center;
    }

    > a:not(:last-child) {
      margin: 0 0 5px;
    }
  }

  ${AccountControl} ${WalletActions} {
    ${({ theme }) => theme.mediaWidth.upToSmall`
        width: 100%;
        flex-flow: row wrap;
        justify-content: center;
        margin: 1.2rem auto;
    `};
  }
`

export const WalletWrapper = styled.div`
  > div > img[alt='Gnosis Safe Multisig logo'] {
    filter: invert(1);
  }
`

export const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 2rem;
  position: relative;
  display: grid;
  grid-row-gap: 1.2rem;
  margin-bottom: 2rem;
`

export const LowerSection = styled.div`
  border-radius: 0;
  height: 100%;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 2.4rem;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0 1.6rem;
  `};

  > span {
    display: flex;
    color: ${({ theme }) => theme.text1};
    justify-content: space-between;
    padding: 0 0 1.2rem;

    ${({ theme }) => theme.mediaWidth.upToMedium`
      top: 4.2rem;
    `};
  }

  > div {
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    background-color: inherit;
    padding: 0 0 4.8rem;
  }

  h5 {
    margin: 0;
    font-weight: 500;
    color: inherit;
    line-height: 1;
    display: flex;
    align-items: center;
    > span {
      opacity: 0.6;
      margin: 0 0 0 0.4rem;
    }
  }

  ${LinkStyledButton} {
    opacity: 0.7;
    color: ${({ theme }) => theme.text1};

    text-decoration: underline;
    font-size: 1.4rem;

    &:hover {
      color: ${({ theme }) => theme.blue1};
    }
  }
`

export const LowerSectionSimple = styled(LowerSection)`
  padding: 0 1.2rem;
  > div {
    padding: 0;

    ${TransactionWrapper} {
      padding: 1.5rem;

      // target the activity comp
      > div > ${TransactionStatusText} > ${Summary} {
        grid-template-columns: auto;

        > span {
          display: none;
        }

        > ${SummaryInner} {
          // Gnosis safe
          > ${TransactionInnerDetail} {
            padding: 0;
            border: none;
            margin-top: 1rem;
            > a {
              align-self: flex-start;
            }
            > span:last-of-type {
              margin: 0.3rem 0 0px;
            }
            > ${TextAlert} {
              margin: 1rem 0 0.6rem;
            }
          }
          ${({ theme }) => theme.mediaWidth.upToSmall`
            margin: 1.6rem 0;
          `}

          > b {
            display: none;
          }
        }
      }

      > ${StatusLabelWrapper} {
        margin: auto;
      }
    }
  }
`

const NetworkCardUni = styled(YellowCard)`
  border-radius: 1.2rem;
  padding: 0.8rem 1.2rem;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

export const NetworkCard = styled(NetworkCardUni)`
  background-color: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.black};
  padding: 0.6rem 0.8rem;
  font-size: 1.3rem;
  margin: 0 0.8rem 0 0;
  letter-spacing: 0.7px;
  min-width: initial;
  flex: 0 0 fit-content;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0 auto 1.2rem;
  `};
`

export const WalletAction = styled(Button)`
  width: fit-content;
  font-weight: 400;
  margin-left: 0.8rem;
  font-size: 0.825rem;
  padding: 0.4rem 0.6rem;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
