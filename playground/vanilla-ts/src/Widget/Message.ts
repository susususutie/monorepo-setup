import { IdMessageModal, IMessageModal } from '../Modal/MessageModal'

type MessageItem = { id: number; severity: string; message: string; sticky: boolean }

// 全局 message 控件（仅 UI）
export default class Message {
  static deps = [IdMessageModal]

  private service: IMessageModal
  private container: HTMLElement
  private styleId: string

  private constructor(messageModal: IMessageModal) {
    this.service = messageModal
    this.container = document.createElement('div')
    this.styleId = 'message-widget-style-' + Math.random().toString(36).slice(2)
    this.container.id = 'message-container'
    document.body.appendChild(this.container)
    this.installStyles()

    this.render()
  }
  private render() {
    this.service.onDidChange(
      item => this.add(item),
      id => this.remove(id)
    )
  }

  /* 动态生成 <style> 并插入 <head> */
  private installStyles() {
    const style = document.createElement('style')
    style.id = this.styleId
    style.textContent = `
      #${this.container.id} {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .message-item-${this.styleId} {
        padding: 10px 14px;
        border-radius: 4px;
        min-width: 240px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation: slide-${this.styleId} 0.3s ease;
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      .message-item-${this.styleId}.info {
        background: #0e639c;
        color: #fff;
      }
      .message-item-${this.styleId}.error {
        background: #f14c4c;
        color: #fff;
      }
      .message-item-${this.styleId}.hide {
        opacity: 0;
        transform: translateY(-50%);
      }
      .message-close-${this.styleId} {
        cursor: pointer;
        margin-left: 12px;
        font-weight: bold;
      }
      @keyframes slide-${this.styleId} {
        from { transform: translateX(120%); }
        to { transform: translateX(0); }
      }
    `
    document.head.appendChild(style)
  }

  private add(item: MessageItem) {
    const msg = document.createElement('div')
    msg.id = `message-${item.id}`
    msg.className = `message-item-${this.styleId} ${item.severity}`
    msg.innerHTML = `
          <span>${item.message}</span>
          <span class="message-close-${this.styleId}">✕</span>
          `

    const closeBtn = msg.querySelector<HTMLSpanElement>('.message-close-' + this.styleId)
    if (closeBtn) {
      closeBtn.onclick = (e: MouseEvent) => {
        e.stopPropagation()
        this.service.hide(item.id)
      }
    }
    this.container.appendChild(msg)

    return item.id
  }

  private remove(id: number) {
    const node = document.getElementById(`message-${id}`)
    if (node) {
      node.classList.add('hide')
      setTimeout(() => {
        node.remove()
      }, 300)
    }
  }
}
