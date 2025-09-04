// 方式3: 路径导入（最佳tree-shaking效果）
import Button from 'pkg-vue-ui/button'
import Card from 'pkg-vue-ui/card'
import type { ButtonProps } from 'pkg-vue-ui/button'
import type { CardProps } from 'pkg-vue-ui/card'

export default {
  components: {
    Button,
    Card
  },
  setup() {
    const buttonConfig: ButtonProps = {
      type: 'success',
      disabled: false
    }
    
    const cardConfig: CardProps = {
      title: '路径导入示例',
      hoverable: true
    }
    
    return {
      buttonConfig,
      cardConfig
    }
  }
}

// 在模板中使用：
// <Button v-bind="buttonConfig">路径导入的按钮</Button>
// <Card v-bind="cardConfig">具有最佳tree-shaking效果的组件导入</Card>