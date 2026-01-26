import type { TableColumnsType } from 'antd'
import type { TableColumnsTypePlus } from '@monorepo-setup/pkg-react-ui'
import { Typography, Tag, Avatar, Space } from 'antd'
import type { TableDataRow } from '../types'

export const userManagementColumnsPlus: TableColumnsTypePlus<TableDataRow> = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
    valueType: 'number',
  },
  {
    title: '用户信息',
    key: 'userInfo',
    children: [
      {
        title: '头像',
        dataIndex: ['account', 'avatar'],
        width: 80,
        render: (url: string) => <Avatar src={url} />,
      },
      {
        title: '用户名',
        dataIndex: ['account', 'username'],
        width: 120,
        valueType: 'text',
      },
      {
        title: '显示名称',
        dataIndex: ['account', 'displayName'],
        width: 120,
        valueType: 'text',
      },
      {
        title: '中文姓名',
        dataIndex: ['person', 'cname'],
        width: 100,
        valueType: 'text',
      },
    ],
  },
  {
    title: '联系方式',
    key: 'contact',
    children: [
      {
        title: '手机号',
        dataIndex: ['contact', 'mobile'],
        width: 130,
        valueType: 'text',
      },
      {
        title: '邮箱',
        dataIndex: ['contact', 'email'],
        width: 180,
        valueType: 'text',
      },
      {
        title: '微信',
        dataIndex: ['contact', 'wechat'],
        width: 120,
        valueType: 'text',
      },
    ],
  },
  {
    title: '个人信息',
    key: 'personInfo',
    children: [
      {
        title: '年龄',
        dataIndex: ['person', 'age'],
        width: 80,
        valueType: 'number',
      },
      {
        title: '性别',
        dataIndex: ['person', 'sex'],
        width: 80,
        valueType: 'status',
        valueParams: { male: '男', female: '女' },
      },
      {
        title: '生日',
        dataIndex: ['person', 'birthDate'],
        width: 120,
        valueType: 'date',
        valueParams: { format: 'YYYY-MM-DD' },
      },
    ],
  },
  {
    title: '账户状态',
    dataIndex: ['account', 'userStatus'],
    width: 100,
    valueType: 'status',
    valueParams: {
      active: '正常',
      inactive: '未激活',
      suspended: '已暂停',
      banned: '已封禁',
    },
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        active: 'green',
        inactive: 'default',
        suspended: 'orange',
        banned: 'red',
      }
      return <Tag color={colorMap[status]}>{status}</Tag>
    },
  },
  {
    title: '验证状态',
    dataIndex: 'verificationStatus',
    width: 100,
    valueType: 'status',
    valueParams: {
      verified: '已验证',
      unverified: '未验证',
      pending: '待审核',
      rejected: '已拒绝',
    },
  },
  {
    title: '最后登录',
    dataIndex: ['account', 'lastLogin'],
    width: 160,
    valueType: 'date',
    valueParams: { format: 'YYYY-MM-DD HH:mm:ss' },
  },
  {
    title: '登录次数',
    dataIndex: ['account', 'loginCount'],
    width: 100,
    valueType: 'number',
  },
  {
    title: '注册时间',
    dataIndex: ['timestamps', 'created_at'],
    width: 160,
    valueType: 'date',
    valueParams: { format: 'YYYY-MM-DD HH:mm:ss' },
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    width: 150,
    valueType: 'actions',
    render: (_value: unknown, record: TableDataRow) => (
      <Space>
        <Typography.Link>编辑</Typography.Link>
        <Typography.Link type='danger'>删除</Typography.Link>
        {record.account.userStatus === 'active' && (
          <Typography.Link type='warning'>禁用</Typography.Link>
        )}
      </Space>
    ),
  },
]

export const userManagementColumns: TableColumnsType<TableDataRow> = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    fixed: 'left',
  },
  {
    title: '用户信息',
    key: 'userInfo',
    children: [
      {
        title: '头像',
        dataIndex: ['account', 'avatar'],
        width: 80,
        render: (url: string) => <Avatar src={url} />,
      },
      {
        title: '用户名',
        dataIndex: ['account', 'username'],
        width: 120,
      },
      {
        title: '显示名称',
        dataIndex: ['account', 'displayName'],
        width: 120,
      },
      {
        title: '中文姓名',
        dataIndex: ['person', 'cname'],
        width: 100,
      },
    ],
  },
  {
    title: '联系方式',
    key: 'contact',
    children: [
      {
        title: '手机号',
        dataIndex: ['contact', 'mobile'],
        width: 130,
      },
      {
        title: '邮箱',
        dataIndex: ['contact', 'email'],
        width: 180,
      },
      {
        title: '微信',
        dataIndex: ['contact', 'wechat'],
        width: 120,
      },
    ],
  },
  {
    title: '个人信息',
    key: 'personInfo',
    children: [
      {
        title: '年龄',
        dataIndex: ['person', 'age'],
        width: 80,
      },
      {
        title: '性别',
        dataIndex: ['person', 'sex'],
        width: 80,
        render: (sex: string) => (sex === 'male' ? '男' : '女'),
      },
      {
        title: '生日',
        dataIndex: ['person', 'birthDate'],
        width: 120,
        render: (date: Date) => new Date(date).toLocaleDateString('zh-CN'),
      },
    ],
  },
  {
    title: '账户状态',
    dataIndex: ['account', 'userStatus'],
    width: 100,
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        active: 'green',
        inactive: 'default',
        suspended: 'orange',
        banned: 'red',
      }
      const textMap: Record<string, string> = {
        active: '正常',
        inactive: '未激活',
        suspended: '已暂停',
        banned: '已封禁',
      }
      return <Tag color={colorMap[status]}>{textMap[status]}</Tag>
    },
  },
  {
    title: '验证状态',
    dataIndex: 'verificationStatus',
    width: 100,
    render: (status: string) => {
      const textMap: Record<string, string> = {
        verified: '已验证',
        unverified: '未验证',
        pending: '待审核',
        rejected: '已拒绝',
      }
      return textMap[status] || status
    },
  },
  {
    title: '最后登录',
    dataIndex: ['account', 'lastLogin'],
    width: 160,
    render: (date: Date) => new Date(date).toLocaleString('zh-CN'),
  },
  {
    title: '登录次数',
    dataIndex: ['account', 'loginCount'],
    width: 100,
  },
  {
    title: '注册时间',
    dataIndex: ['timestamps', 'created_at'],
    width: 160,
    render: (date: Date) => new Date(date).toLocaleString('zh-CN'),
  },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    width: 150,
    render: (_value: unknown, record: TableDataRow) => (
      <Space>
        <Typography.Link>编辑</Typography.Link>
        <Typography.Link type='danger'>删除</Typography.Link>
        {record.account.userStatus === 'active' && (
          <Typography.Link type='warning'>禁用</Typography.Link>
        )}
      </Space>
    ),
  },
]
