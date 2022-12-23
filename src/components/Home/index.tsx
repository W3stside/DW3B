import { ArticleFadeInContainer } from 'components/Layout/Article'
import { Subheader } from 'components/Layout/Text'

export default function Home() {
  return (
    <ArticleFadeInContainer>
      <Subheader fontWeight={100} fontSize={'3rem'}>
        WELCOME TO DW3B!
      </Subheader>
      <h3>Now you can edit this to do all sorts of cool shit. Nice work.</h3>
    </ArticleFadeInContainer>
  )
}
