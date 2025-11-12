import { KimiLayout } from '@monorepo-setup/pkg-react-ui'
import { Button } from 'antd'
import { useState } from 'react'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'

export default function Demo() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <KimiLayout
      style={{ backgroundColor: '#f3f5f6' }}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      //
      aside={
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: 8,
            boxSizing: 'border-box',
            overflow: 'auto',
            backgroundColor: '#f3f5f6',
          }}
        >
          <Button
            style={{ position: 'absolute', top: 24, right: 24 }}
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />

          {new Array(30).fill(0).map((_, index) => (
            <div
              key={index}
              style={{
                width: '100%',
                height: 40,
                lineHeight: '40px',
                textAlign: 'center',
                backgroundColor: '#fff',
                borderRadius: 8,
                overflow: 'hidden',
                marginBottom: 8,
              }}
            >
              {index}
            </div>
          ))}
        </div>
      }
      main={
        <>
          <div style={{ height: '100%', padding: 8, borderRadius: 8, boxSizing: 'border-box', overflow: 'auto' }}>
            <div style={{ paddingTop: 36 }}>main;{collapsed ? 'collapsed' : ''}</div>
            {new Array(30).fill(0).map((_, index) => (
              <div
                key={index}
                style={{
                  width: '100%',
                  height: 60,
                  lineHeight: '60px',
                  textAlign: 'center',
                  backgroundColor: '#eee',
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginBottom: 8,
                  flexShrink: 0,
                }}
              >
                {index}
              </div>
            ))}
          </div>
          <Button
            style={{ position: 'absolute', top: 16, left: 16 }}
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </>
      }
    />
  )
}
