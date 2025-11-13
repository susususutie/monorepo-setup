export interface IThemeModal {
  theme: string
  toggleTheme: () => void
}

export const ID_THEME_MODAL = Symbol('ThemeModal')

export default class ThemeModal implements IThemeModal {
  _theme: string = 'light'
  constructor() {}
  toggleTheme() {
    this._theme = this._theme === 'light' ? 'dark' : 'light'
  }
  get theme() {
    return this._theme
  }
  set theme(value: string) {
    this._theme = value
  }
}
