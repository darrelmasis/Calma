import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import classNames from 'classnames'
import { Fragment } from 'react'

export const TabsCards = ({ tabs, activeTab }) => {
  const isAllActive = activeTab === 'all'
  return (
    <Fragment>
      {isAllActive
        ? tabs.map((tab) => tab.content)
        : tabs.filter((tab) => tab.id === activeTab).map((tab) => tab.content)}
    </Fragment>
  )
}
