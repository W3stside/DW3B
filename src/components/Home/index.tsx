import { AsideWithVideo } from 'pages/SingleItem'
import HOME_ITEMS_LIST from 'mock/apparel'

export default function Home() {
  return (
    <>
      {HOME_ITEMS_LIST.map(({ key, ...restItemData }) => (
        <AsideWithVideo key={key} {...restItemData} />
      ))}
    </>
  )
}
