import type { TableColumnsType } from 'antd'
import type { TableColumnsTypePlus } from '@monorepo-setup/pkg-react-ui'

// 人员信息类型
export interface PersonInfo {
  firstName: string
  lastName: string
  cname: string
  sex: string
  sex_type: string
  gender: string
  bio: string
  age: number
  birthDate: Date
  nationality: string
  language: string
  zodiac: string
}

// 联系方式类型
export interface EmergencyContact {
  name: string
  relation: string
  phone: string
}

export interface ContactInfo {
  mobile: string
  phone: string
  email: string
  alternateEmail: string
  wechat: string
  qq: string
  imei: string
  imsi: string
  emergencyContact: EmergencyContact
}

// 地址信息类型
export interface Coordinates {
  latitude: string
  longitude: string
}

export interface AddressInfo {
  province: string
  city: string
  county: string
  district: string
  street: string
  streetAddress: string
  secondaryAddress: string
  fullAddress: string
  zipCode: string
  coordinates: Coordinates
  timezone: string
}

// 工作信息类型
export interface WorkInfo {
  company: string
  companySuffix: string
  catchPhrase: string
  bs: string
  jobTitle: string
  jobDescriptor: string
  jobArea: string
  jobType: string
  department: string
  employeeId: string
  workEmail: string
  workPhone: string
  startDate: Date
  salary: number
  currency: string
}

// 账户信息类型
export interface AccountInfo {
  username: string
  displayName: string
  avatar: string
  password: string
  passwordHash: string
  accountNumber: string
  routingNumber: string
  iban: string
  bic: string
  pin: string
  lastLogin: Date
  loginCount: number
  isVerified: boolean
  verificationStatus: string
  userStatus: string
}

// 金融信息类型
export interface CreditCard {
  number: string
  cvv: string
  issuer: string
  expiryDate: Date
}

export interface BankAccount {
  accountName: string
  bankName: string
  accountType: string
}

export interface FinanceInfo {
  balance: number
  currency: string
  creditScore: number
  creditLimit: number
  availableCredit: number
  totalIncome: number
  totalExpense: number
  transactionType: string
  creditCard: CreditCard
  bankAccount: BankAccount
}

// 订单信息类型
export interface OrderInfo {
  orderId: string
  orderNumber: string
  orderAmount: number
  orderQuantity: number
  discount: number
  discountAmount: number
  finalAmount: number
  currency: string
  orderStatus: string
  paymentStatus: string
  paymentMethod: string
  paymentTime: Date | null
  shippingAddress: string
  shippingMethod: string
  trackingNumber: string
  estimatedDelivery: Date
  actualDelivery: Date | null
}

// 产品信息类型
export interface ProductDimensions {
  length: number
  width: number
  height: number
}

export interface ProductInfo {
  name: string
  description: string
  category: string
  price: string
  originalPrice: string
  sku: string
  barcode: string
  brand: string
  color: string
  colorHex: string
  size: string
  material: string
  weight: number
  dimensions: ProductDimensions
  inStock: boolean
  stockQuantity: number
  rating: number
  reviewCount: number
}

// 网络信息类型
export interface NetworkInfo {
  ipv4: string
  ipv6: string
  mac: string
  userAgent: string
  httpMethod: string
  httpStatusCode: number
  url: string
  domain: string
  domainWord: string
  protocol: string
  port: number
}

// 时间戳类型
export interface Timestamps {
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  lastLogin: Date
  lastActive: Date
  emailVerifiedAt: Date | null
  phoneVerifiedAt: Date | null
}

// 内容信息类型
export interface ContentInfo {
  title: string
  sentence: string
  paragraph: string
  paragraphs: string
  text: string
  description: string
  summary: string
  slug: string
  words: string
}

// 标识符类型
export interface Identifiers {
  uuid: string
  nanoid: string
  cuid: string
  hash: string
  token: string
  sessionId: string
  requestId: string
}

// 视觉信息类型
export interface VisualInfo {
  color: string
  colorHex: string
  colorRgb: string
  colorHsl: string
  colorCssSupportedSpace: string
  imageUrl: string
  imageUrlLoremFlickr: string
  avatar: string
  image: string
}

// 标志类型
export interface Flags {
  active: boolean
  enabled: boolean
  verified: boolean
  subscribed: boolean
  premium: boolean
  vip: boolean
  deleted: boolean
  archived: boolean
}

// 统计信息类型
export interface Statistics {
  viewCount: number
  likeCount: number
  shareCount: number
  commentCount: number
  downloadCount: number
  rating: number
  score: number
  percentage: number
  progress: number
}

// 杂项类型
export interface MiscInfo {
  word: string
  words: string
  sentence: string
  lorem: string
  emoji: string
  fileName: string
  filePath: string
  directoryPath: string
  fileExtension: string
  mimeType: string
  commonFileName: string
  commonFileExtension: string
  contentType: string
}

// 元数据类型
export interface Metadata {
  tags: string[]
  categories: string[]
  labels: string[]
  notes: string
  remarks: string
  version: string
  gitCommitSha: string
  gitBranch: string
}

// 完整的数据类型
export interface TableDataRow {
  id: number
  person: PersonInfo
  contact: ContactInfo
  address: AddressInfo
  work: WorkInfo
  account: AccountInfo
  finance: FinanceInfo
  order: OrderInfo
  product: ProductInfo
  network: NetworkInfo
  timestamps: Timestamps
  content: ContentInfo
  identifiers: Identifiers
  visual: VisualInfo
  flags: Flags
  status: string
  orderStatus: string
  paymentStatus: string
  userStatus: string
  verificationStatus: string
  statistics: Statistics
  misc: MiscInfo
  metadata: Metadata
}

// 场景配置类型
export interface ScenarioConfig {
  key: string
  label: string
  columnsPlus: TableColumnsTypePlus<TableDataRow>
  columns: TableColumnsType<TableDataRow>
}

// 场景键类型
export type ScenarioKey = 'user' | 'order' | 'product' | 'finance' | 'content'
