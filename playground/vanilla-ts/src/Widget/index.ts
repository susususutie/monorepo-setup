// 普通 Widget 级纯 UI 默认不是单例；
// 每次需要就 new Button() 或 this._register(new Button(...))，用完即销毁；
// 带全局状态的 Widget 是单例，如 MessageModal 负责所有全局消息
// 通用 Widget 统一放在 src/Widget/ 目录，无 DI、无 Service，纯 class。
export { default as Button } from './Button'
