import { HeartOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Card, Space, Typography } from 'antd'
import { createStyles } from 'antd-style'

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    padding: ${token.padding}px;
    background: ${token.colorBgContainer};
    border-radius: ${token.borderRadius}px;
    box-shadow: ${token.boxShadow};
    max-width: 600px;
    margin: 0 auto;
  `,

  header: css`
    text-align: center;
    margin-bottom: ${token.marginLG}px;

    .ant-typography-title {
      color: ${token.colorPrimary};
      margin-bottom: ${token.marginSM}px;
    }
  `,

  content: css`
    margin-bottom: ${token.marginLG}px;

    .ant-typography {
      color: ${token.colorTextSecondary};
    }
  `,

  actions: css`
    display: flex;
    justify-content: center;
    gap: ${token.marginSM}px;

    .ant-btn {
      display: flex;
      align-items: center;
      gap: ${token.marginXS}px;

      &:hover {
        transform: translateY(-2px);
        transition: all 0.3s ease;
      }
    }
  `,

  card: css`
    margin-top: ${token.marginLG}px;

    .ant-card-body {
      background: linear-gradient(135deg, ${token.colorPrimaryBg}, ${token.colorBgContainer});
    }
  `,
}))

export default function Demo() {
  const { styles } = useStyles()

  const handleAction = (action: string) => {
    console.log(`执行操作: ${action}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography.Title level={2}>🎨 Antd-Style 组件示例</Typography.Title>
        <Typography.Paragraph>这是一个使用 antd-style 创建的组件模版</Typography.Paragraph>
      </div>

      <div className={styles.content}>
        <Typography.Paragraph>
          antd-style 是一个基于 CSS-in-JS 的样式解决方案，专为 Ant Design 组件库设计。
          它提供了强大的主题定制能力和类型安全的样式编写体验。
        </Typography.Paragraph>
      </div>

      <div className={styles.actions}>
        <Space size='middle'>
          <Button type='primary' icon={<LikeOutlined />} onClick={() => handleAction('点赞')}>
            点赞
          </Button>
          <Button icon={<StarOutlined />} onClick={() => handleAction('收藏')}>
            收藏
          </Button>
          <Button icon={<HeartOutlined />} onClick={() => handleAction('关注')}>
            关注
          </Button>
        </Space>
      </div>

      <Card className={styles.card} title='💡 特性展示' size='small'>
        <ul>
          <li>🎯 类型安全的样式编写</li>
          <li>🎨 自动主题适配（亮色/暗色）</li>
          <li>📱 响应式设计支持</li>
          <li>⚡ 运行时样式优化</li>
          <li>🔧 与 Ant Design Token 深度集成</li>
        </ul>
      </Card>
    </div>
  )
}
