import { createStyles, useResponsive } from 'antd-style'
import { BaseReturnType } from 'antd-style/lib/types/genericUtils'
import { useEffect } from 'react'

const useStyles = createStyles((_utils, props: Partial<KimiLayoutProps> & { md?: boolean }) => {
  const { asideWidth, collapsed, md } = props

  const aside: BaseReturnType = {
    position: 'absolute',
    // zIndex: 20
    width: collapsed ? 0 : asideWidth,
    height: '100vh',
    flexShrink: 0,
    overflow: collapsed ? 'hidden' : 'visible',
  }
  const asideContent: BaseReturnType = {
    position: 'absolute',
    height: '100%',
    width: asideWidth,
    transform: 'translateX(0)',
    transition: 'transform .2s ease-in-out',
    boxShadow: '0 4px 16.4px #0000001a',
  }
  const asideMask: BaseReturnType = {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }
  const main: BaseReturnType = {
    flex: 1,
    display: 'flex',
    minWidth: 0,
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    margin: `6px 6px 6px ${collapsed ? 6 : asideWidth}px`,
    overflow: 'auto',
    border: '1px solid rgba(0, 0, 0, .05)',
    position: 'relative',
    flexDirection: 'column',
  }
  // 如果屏幕宽度小时，将 aside 设置为 fixed，侧边栏展开后显示全局遮罩，main宽度为 100%
  if (!md) {
    aside.width = 0
    aside.zIndex = 10
    aside.overflow = collapsed ? 'hidden' : 'visible'
    asideMask.display = collapsed ? 'none' : 'block'
    asideContent.position = 'fixed'
    asideContent.transform = collapsed ? 'translateX(-100%)' : 'translateX(0)'
    main.margin = 6
  }

  return {
    layout: {
      height: '100vh',
      minWidth: 375,
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
    },
    aside,
    asideContent,
    asideMask,
    main,
  }
})

type KimiLayoutProps = {
  style?: React.CSSProperties
  asideWidth?: number
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  aside: React.ReactNode
  main: React.ReactNode
}

// 类似 Kimi 首页的布局组件
export default function KimiLayout(props: KimiLayoutProps) {
  const { style, asideWidth = 240, aside, main, collapsed, setCollapsed } = props

  const { md } = useResponsive()
  useEffect(() => {
    if (md) {
      setCollapsed(false)
    }
  }, [md])
  const { styles } = useStyles({ asideWidth, collapsed, md })

  return (
    <div className={styles.layout} style={style}>
      <aside className={styles.aside}>
        <div className={styles.asideMask} onClick={() => setCollapsed(true)}></div>
        <div className={styles.asideContent}>{aside}</div>
      </aside>
      <main className={styles.main}>{main}</main>
    </div>
  )
}
