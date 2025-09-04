// 方式2: 按需导入组件
import { Button, Card } from 'pkg-vue-ui'
import type { ButtonProps, CardProps } from 'pkg-vue-ui'

export default {
  components: {
    Button,
    Card
  },
  setup() {
    const handleClick = () => {
      console.log('按钮被点击')
    }
    
    return { handleClick }
  }
}

// 在模板中使用：
// <Button type="primary" @click="handleClick">按需导入的按钮</Button>
// <Card title="按需导入的卡片">这是通过按需导入使用的组件</Card>