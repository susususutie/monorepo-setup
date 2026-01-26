import type { TableColumnsType } from 'antd'
import type { TableColumnsTypePlus } from '@monorepo-setup/pkg-react-ui'
import { Typography, Tag, Space } from 'antd'
import type { TableDataRow } from '../types'

export const contentManagementColumnsPlus: TableColumnsTypePlus<TableDataRow> = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
    valueType: 'number',
  },
  {
    title: '内容信息',
    key: 'contentInfo',
    children: [
      {
        title: '标题',
        dataIndex: ['content', 'title'],
        width: 250,
        valueType: 'text',
      },
      {
        title: '摘要',
        dataIndex: ['content', 'summary'],
        width: 300,
        valueType: 'text',
        valueParams: { multiple: true },
      },
      {
        title: 'Slug',
        dataIndex: ['content', 'slug'],
        width: 150,
        valueType: 'text',
      },
    ],
  },
  {
    title: '统计信息',
    key: 'statistics',
    children: [
      {
        title: '浏览量',
        dataIndex: ['statistics', 'viewCount'],
        width: 120,
        valueType: 'number',
      },
      {
        title: '点赞数',
        dataIndex: ['statistics', 'likeCount'],
        width: 100,
        valueType: 'number',
      },
      {
        title: '分享数',
        dataIndex: ['statistics', 'shareCount'],
        width: 100,
        valueType: 'number',
      },
      {
        title: '评论数',
        dataIndex: ['statistics', 'commentCount'],
        width: 100,
        valueType: 'number',
      },
      {
        title: '下载数',
        dataIndex: ['statistics', 'downloadCount'],
        width: 100,
        valueType: 'number',
      },
      {
        title: '评分',
        dataIndex: ['statistics', 'rating'],
        width: 100,
        render: (rating: number) => (
          <Space>
            <span>{rating.toFixed(1)}</span>
            <Tag color='gold'>⭐</Tag>
          </Space>
        ),
      },
      {
        title: '完成度',
        dataIndex: ['statistics', 'progress'],
        width: 100,
        render: (progress: number) => (
          <Space>
            <span>{progress}%</span>
            <Tag color={progress === 100 ? 'green' : progress >= 50 ? 'orange' : 'red'}>
              {progress === 100 ? '完成' : progress >= 50 ? '进行中' : '未开始'}
            </Tag>
          </Space>
        ),
      },
    ],
  },
  {
    title: '分类标签',
    key: 'tags',
    children: [
      {
        title: '标签',
        dataIndex: ['metadata', 'tags'],
        width: 200,
        render: (tags: string[]) => (
          <Space wrap>
            {tags?.map((tag, index) => (
              <Tag key={index} color='blue'>{tag}</Tag>
            ))}
          </Space>
        ),
      },
      {
        title: '分类',
        dataIndex: ['metadata', 'categories'],
        width: 150,
        render: (categories: string[]) => (
          <Space wrap>
            {categories?.map((cat, index) => (
              <Tag key={index} color='green'>{cat}</Tag>
            ))}
          </Space>
        ),
      },
    ],
  },
  {
    title: '状态信息',
    key: 'statusInfo',
    children: [
      {
        title: '发布状态',
        dataIndex: 'status',
        width: 100,
        valueType: 'status',
        valueParams: {
          success: '已发布',
          error: '已下架',
          warning: '待审核',
          info: '草稿',
          pending: '待发布',
          processing: '处理中',
        },
        render: (status: string) => {
          const colorMap: Record<string, string> = {
            success: 'green',
            error: 'red',
            warning: 'orange',
            info: 'blue',
            pending: 'default',
            processing: 'cyan',
          }
          return <Tag color={colorMap[status]}>{status}</Tag>
        },
      },
      {
        title: '是否启用',
        dataIndex: ['flags', 'enabled'],
        width: 100,
        valueType: 'boolean',
        render: (enabled: boolean) => (
          <Tag color={enabled ? 'green' : 'red'}>{enabled ? '启用' : '禁用'}</Tag>
        ),
      },
      {
        title: '是否VIP',
        dataIndex: ['flags', 'vip'],
        width: 100,
        valueType: 'boolean',
        render: (vip: boolean) => (vip ? <Tag color='gold'>VIP</Tag> : '-'),
      },
    ],
  },
  {
    title: '时间信息',
    key: 'timeInfo',
    children: [
      {
        title: '创建时间',
        dataIndex: ['timestamps', 'created_at'],
        width: 160,
        valueType: 'date',
        valueParams: { format: 'YYYY-MM-DD HH:mm:ss' },
      },
      {
        title: '更新时间',
        dataIndex: ['timestamps', 'updated_at'],
        width: 160,
        valueType: 'date',
        valueParams: { format: 'YYYY-MM-DD HH:mm:ss' },
      },
      {
        title: '最后活跃',
        dataIndex: ['timestamps', 'lastActive'],
        width: 160,
        valueType: 'date',
        valueParams: { format: 'YYYY-MM-DD HH:mm:ss' },
      },
    ],
  },
  {
    title: '备注',
    dataIndex: ['metadata', 'notes'],
    width: 200,
    valueType: 'text',
    valueParams: { multiple: true },
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    width: 200,
    render: (_value: unknown, record: TableDataRow) => (
      <Space>
        <Typography.Link>查看</Typography.Link>
        <Typography.Link>编辑</Typography.Link>
        {record.flags.enabled ? (
          <Typography.Link type='warning'>禁用</Typography.Link>
        ) : (
          <Typography.Link>启用</Typography.Link>
        )}
        <Typography.Link type='danger'>删除</Typography.Link>
      </Space>
    ),
  },
]

export const contentManagementColumns: TableColumnsType<TableDataRow> = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '内容信息',
    key: 'contentInfo',
    children: [
      {
        title: '标题',
        dataIndex: ['content', 'title'],
        width: 250,
      },
      {
        title: '摘要',
        dataIndex: ['content', 'summary'],
        width: 300,
        render: (summary: string) => (
          <Typography.Text ellipsis={{ tooltip: summary }}>{summary}</Typography.Text>
        ),
      },
      {
        title: 'Slug',
        dataIndex: ['content', 'slug'],
        width: 150,
      },
    ],
  },
  {
    title: '统计信息',
    key: 'statistics',
    children: [
      {
        title: '浏览量',
        dataIndex: ['statistics', 'viewCount'],
        width: 120,
      },
      {
        title: '点赞数',
        dataIndex: ['statistics', 'likeCount'],
        width: 100,
      },
      {
        title: '分享数',
        dataIndex: ['statistics', 'shareCount'],
        width: 100,
      },
      {
        title: '评论数',
        dataIndex: ['statistics', 'commentCount'],
        width: 100,
      },
      {
        title: '下载数',
        dataIndex: ['statistics', 'downloadCount'],
        width: 100,
      },
      {
        title: '评分',
        dataIndex: ['statistics', 'rating'],
        width: 100,
        render: (rating: number) => (
          <Space>
            <span>{rating.toFixed(1)}</span>
            <Tag color='gold'>⭐</Tag>
          </Space>
        ),
      },
      {
        title: '完成度',
        dataIndex: ['statistics', 'progress'],
        width: 100,
        render: (progress: number) => (
          <Space>
            <span>{progress}%</span>
            <Tag color={progress === 100 ? 'green' : progress >= 50 ? 'orange' : 'red'}>
              {progress === 100 ? '完成' : progress >= 50 ? '进行中' : '未开始'}
            </Tag>
          </Space>
        ),
      },
    ],
  },
  {
    title: '分类标签',
    key: 'tags',
    children: [
      {
        title: '标签',
        dataIndex: ['metadata', 'tags'],
        width: 200,
        render: (tags: string[]) => (
          <Space wrap>
            {tags?.map((tag, index) => (
              <Tag key={index} color='blue'>{tag}</Tag>
            ))}
          </Space>
        ),
      },
      {
        title: '分类',
        dataIndex: ['metadata', 'categories'],
        width: 150,
        render: (categories: string[]) => (
          <Space wrap>
            {categories?.map((cat, index) => (
              <Tag key={index} color='green'>{cat}</Tag>
            ))}
          </Space>
        ),
      },
    ],
  },
  {
    title: '状态信息',
    key: 'statusInfo',
    children: [
      {
        title: '发布状态',
        dataIndex: 'status',
        width: 100,
        render: (status: string) => {
          const colorMap: Record<string, string> = {
            success: 'green',
            error: 'red',
            warning: 'orange',
            info: 'blue',
            pending: 'default',
            processing: 'cyan',
          }
          const textMap: Record<string, string> = {
            success: '已发布',
            error: '已下架',
            warning: '待审核',
            info: '草稿',
            pending: '待发布',
            processing: '处理中',
          }
          return <Tag color={colorMap[status]}>{textMap[status] || status}</Tag>
        },
      },
      {
        title: '是否启用',
        dataIndex: ['flags', 'enabled'],
        width: 100,
        render: (enabled: boolean) => (
          <Tag color={enabled ? 'green' : 'red'}>{enabled ? '启用' : '禁用'}</Tag>
        ),
      },
      {
        title: '是否VIP',
        dataIndex: ['flags', 'vip'],
        width: 100,
        render: (vip: boolean) => (vip ? <Tag color='gold'>VIP</Tag> : '-'),
      },
    ],
  },
  {
    title: '时间信息',
    key: 'timeInfo',
    children: [
      {
        title: '创建时间',
        dataIndex: ['timestamps', 'created_at'],
        width: 160,
        render: (date: Date) => new Date(date).toLocaleString('zh-CN'),
      },
      {
        title: '更新时间',
        dataIndex: ['timestamps', 'updated_at'],
        width: 160,
        render: (date: Date) => new Date(date).toLocaleString('zh-CN'),
      },
      {
        title: '最后活跃',
        dataIndex: ['timestamps', 'lastActive'],
        width: 160,
        render: (date: Date) => new Date(date).toLocaleString('zh-CN'),
      },
    ],
  },
  {
    title: '备注',
    dataIndex: ['metadata', 'notes'],
    width: 200,
    render: (notes: string) => (
      <Typography.Text ellipsis={{ tooltip: notes }}>{notes}</Typography.Text>
    ),
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    width: 200,
    render: (_value: unknown, record: TableDataRow) => (
      <Space>
        <Typography.Link>查看</Typography.Link>
        <Typography.Link>编辑</Typography.Link>
        {record.flags.enabled ? (
          <Typography.Link type='warning'>禁用</Typography.Link>
        ) : (
          <Typography.Link>启用</Typography.Link>
        )}
        <Typography.Link type='danger'>删除</Typography.Link>
      </Space>
    ),
  },
]
