import { fakerZH_CN as faker } from '@faker-js/faker'
import type { TableDataRow } from './types'

/**
 * 生成模拟数据源
 * @param length 生成的数据条数
 * @returns 数据数组
 */
export function generateDataSource(length: number = 10): TableDataRow[] {
  return Array.from({ length }, (_, index) => {
    // 基础人员信息
    const sex_type = faker.person.sexType()
    const firstName = faker.person.firstName(sex_type)
    const lastName = faker.person.lastName(sex_type)
    const age = faker.number.int({ min: 18, max: 81 })
    const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
    
    // 地址信息（关联生成）
    const province = faker.location.state()
    const city = faker.location.city()
    const county = faker.location.county()
    const zipCode = faker.location.zipCode('######')
    const streetAddress = faker.location.streetAddress(true)
    const fullAddress = `${province}${city}${county}${streetAddress}`
    
    // 公司和工作信息（关联生成）
    const companyName = faker.company.name()
    const jobTitle = faker.person.jobTitle()
    const jobArea = faker.person.jobArea()
    const jobType = faker.person.jobType()
    const jobDescriptor = faker.person.jobDescriptor()
    
    // 联系方式（关联生成）
    const mobile = `1${faker.string.numeric({ length: 10 })}`
    const phone = faker.phone.number({ style: 'international' })
    const email = faker.internet.email({ firstName, lastName, provider: 'example.com' })
    const username = faker.internet.username({ firstName, lastName })
    
    // 时间戳（关联生成）
    const created_at = faker.date.past({ years: 2 })
    const updated_at = faker.date.between({ from: created_at, to: new Date() })
    const lastLogin = faker.date.recent()
    
    // 金融信息（关联生成）
    const salary = faker.number.float({ min: 5000, max: 50000, fractionDigits: 2 })
    const balance = faker.number.float({ min: 0, max: 1000000, fractionDigits: 2 })
    const creditScore = faker.number.int({ min: 300, max: 850 })
    
    // 订单/交易信息
    const orderAmount = faker.number.float({ min: 10, max: 10000, fractionDigits: 2 })
    const orderQuantity = faker.number.int({ min: 1, max: 100 })
    const discount = faker.number.float({ min: 0, max: 0.5, fractionDigits: 2 })
    const finalAmount = orderAmount * (1 - discount)
    
    // 状态枚举（更真实的业务状态）
    const orderStatus = faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
    const paymentStatus = faker.helpers.arrayElement(['unpaid', 'paid', 'refunding', 'refunded', 'failed'])
    const userStatus = faker.helpers.arrayElement(['active', 'inactive', 'suspended', 'banned'])
    const verificationStatus = faker.helpers.arrayElement(['verified', 'unverified', 'pending', 'rejected'])
    
    return {
      id: index + 1,
      person: {
        firstName,
        lastName,
        cname: faker.person.fullName({ firstName, lastName, sex: sex_type }),
        sex: faker.person.sex(),
        sex_type,
        gender: faker.person.gender(),
        bio: faker.person.bio(),
        age,
        birthDate,
        nationality: faker.location.country(),
        language: faker.helpers.arrayElement(['zh-CN', 'en-US', 'ja-JP', 'ko-KR']),
        zodiac: faker.person.zodiacSign(),
      },
      contact: {
        mobile,
        phone,
        email,
        alternateEmail: faker.internet.email({ firstName, lastName }),
        wechat: faker.internet.username(),
        qq: faker.string.numeric({ length: 9 }),
        imei: faker.phone.imei(),
        imsi: faker.phone.imei(),
        emergencyContact: {
          name: faker.person.fullName(),
          relation: faker.helpers.arrayElement(['父亲', '母亲', '配偶', '子女', '朋友']),
          phone: `1${faker.string.numeric({ length: 10 })}`,
        },
      },
      address: {
        province,
        city,
        county,
        district: faker.location.county(),
        street: streetAddress,
        streetAddress,
        secondaryAddress: faker.location.secondaryAddress(),
        fullAddress,
        zipCode,
        coordinates: {
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
        timezone: faker.location.timeZone(),
      },
      work: {
        company: companyName,
        companySuffix: faker.company.buzzNoun(),
        catchPhrase: faker.company.catchPhrase(),
        bs: faker.company.buzzPhrase(),
        jobTitle,
        jobDescriptor,
        jobArea,
        jobType,
        department: faker.commerce.department(),
        employeeId: `EMP${faker.string.alphanumeric(8).toUpperCase()}`,
        workEmail: faker.internet.email({ firstName, lastName, provider: companyName.toLowerCase().replace(/\s+/g, '') + '.com' }),
        workPhone: faker.phone.number(),
        startDate: faker.date.past({ years: 5 }),
        salary,
        currency: 'CNY',
      },
      account: {
        username,
        displayName: faker.person.fullName(),
        avatar: faker.image.avatar(),
        password: faker.internet.password({ length: 12, memorable: false }),
        passwordHash: faker.string.alphanumeric(64),
        accountNumber: faker.finance.accountNumber(16),
        routingNumber: faker.finance.routingNumber(),
        iban: faker.finance.iban(),
        bic: faker.finance.bic(),
        pin: faker.string.numeric(6),
        lastLogin,
        loginCount: faker.number.int({ min: 0, max: 10000 }),
        isVerified: faker.datatype.boolean(),
        verificationStatus,
        userStatus,
      },
      finance: {
        balance,
        currency: 'CNY',
        creditScore,
        creditLimit: faker.number.float({ min: 10000, max: 100000, fractionDigits: 2 }),
        availableCredit: faker.number.float({ min: 0, max: 50000, fractionDigits: 2 }),
        totalIncome: faker.number.float({ min: 100000, max: 1000000, fractionDigits: 2 }),
        totalExpense: faker.number.float({ min: 50000, max: 800000, fractionDigits: 2 }),
        transactionType: faker.finance.transactionType(),
        creditCard: {
          number: faker.finance.creditCardNumber(),
          cvv: faker.finance.creditCardCVV(),
          issuer: faker.finance.creditCardIssuer(),
          expiryDate: faker.date.future({ years: 5 }),
        },
        bankAccount: {
          accountName: faker.person.fullName(),
          bankName: faker.helpers.arrayElement(['中国工商银行', '中国建设银行', '中国农业银行', '中国银行', '招商银行']),
          accountType: faker.helpers.arrayElement(['储蓄账户', '支票账户', '信用卡账户']),
        },
      },
      order: {
        orderId: `ORD${faker.string.alphanumeric(12).toUpperCase()}`,
        orderNumber: faker.string.numeric(10),
        orderAmount,
        orderQuantity,
        discount,
        discountAmount: orderAmount * discount,
        finalAmount,
        currency: 'CNY',
        orderStatus,
        paymentStatus,
        paymentMethod: faker.helpers.arrayElement(['alipay', 'wechat', 'credit_card', 'bank_transfer', 'cash']),
        paymentTime: paymentStatus === 'paid' ? faker.date.recent() : null,
        shippingAddress: fullAddress,
        shippingMethod: faker.helpers.arrayElement(['standard', 'express', 'overnight', 'pickup']),
        trackingNumber: faker.string.alphanumeric(15).toUpperCase(),
        estimatedDelivery: faker.date.future(),
        actualDelivery: orderStatus === 'delivered' ? faker.date.recent() : null,
      },
      product: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        price: faker.commerce.price({ min: 10, max: 1000, dec: 2, symbol: '' }),
        originalPrice: faker.commerce.price({ min: 100, max: 1500, dec: 2, symbol: '' }),
        sku: faker.string.alphanumeric(10).toUpperCase(),
        barcode: faker.commerce.isbn(),
        brand: faker.company.name(),
        color: faker.color.human(),
        colorHex: faker.color.rgb(),
        size: faker.commerce.productAdjective(),
        material: faker.commerce.productMaterial(),
        weight: faker.number.float({ min: 0.1, max: 50, fractionDigits: 2 }),
        dimensions: {
          length: faker.number.float({ min: 10, max: 200, fractionDigits: 1 }),
          width: faker.number.float({ min: 10, max: 200, fractionDigits: 1 }),
          height: faker.number.float({ min: 10, max: 200, fractionDigits: 1 }),
        },
        inStock: faker.datatype.boolean(),
        stockQuantity: faker.number.int({ min: 0, max: 1000 }),
        rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        reviewCount: faker.number.int({ min: 0, max: 10000 }),
      },
      network: {
        ipv4: faker.internet.ipv4(),
        ipv6: faker.internet.ipv6(),
        mac: faker.internet.mac(),
        userAgent: faker.internet.userAgent(),
        httpMethod: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
        httpStatusCode: faker.helpers.arrayElement([200, 201, 301, 302, 400, 401, 403, 404, 500, 502, 503]),
        url: faker.internet.url(),
        domain: faker.internet.domainName(),
        domainWord: faker.internet.domainWord(),
        protocol: faker.helpers.arrayElement(['http', 'https']),
        port: faker.internet.port(),
      },
      timestamps: {
        created_at,
        updated_at,
        deleted_at: faker.datatype.boolean({ probability: 0.1 }) ? faker.date.recent() : null,
        lastLogin,
        lastActive: faker.date.recent(),
        emailVerifiedAt: faker.datatype.boolean({ probability: 0.8 }) ? faker.date.past({ years: 1 }) : null,
        phoneVerifiedAt: faker.datatype.boolean({ probability: 0.7 }) ? faker.date.past({ years: 1 }) : null,
      },
      content: {
        title: faker.lorem.sentence({ min: 3, max: 8 }),
        sentence: faker.lorem.sentence({ min: 5, max: 15 }),
        paragraph: faker.lorem.paragraph({ min: 2, max: 5 }),
        paragraphs: faker.lorem.paragraphs({ min: 2, max: 5 }),
        text: faker.lorem.text(),
        description: faker.lorem.sentence({ min: 10, max: 30 }),
        summary: faker.lorem.sentences({ min: 1, max: 3 }),
        slug: faker.lorem.slug({ min: 3, max: 6 }),
        words: faker.lorem.words({ min: 5, max: 15 }),
      },
      identifiers: {
        uuid: faker.string.uuid(),
        nanoid: faker.string.nanoid(10),
        cuid: faker.string.alphanumeric(25),
        hash: faker.string.alphanumeric(32),
        token: faker.string.alphanumeric(64),
        sessionId: faker.string.uuid(),
        requestId: faker.string.uuid(),
      },
      visual: {
        color: faker.color.human(),
        colorHex: faker.color.rgb(),
        colorRgb: faker.color.rgb({ prefix: '', casing: 'lower' }),
        colorHsl: faker.color.hsl(),
        colorCssSupportedSpace: faker.color.cssSupportedSpace(),
        imageUrl: faker.image.url(),
        imageUrlLoremFlickr: faker.image.urlLoremFlickr({ width: 640, height: 480 }),
        avatar: faker.image.avatar(),
        image: faker.image.url({ width: 800, height: 600 }),
      },
      flags: {
        active: faker.datatype.boolean(),
        enabled: faker.datatype.boolean(),
        verified: faker.datatype.boolean({ probability: 0.7 }),
        subscribed: faker.datatype.boolean({ probability: 0.6 }),
        premium: faker.datatype.boolean({ probability: 0.3 }),
        vip: faker.datatype.boolean({ probability: 0.2 }),
        deleted: faker.datatype.boolean({ probability: 0.1 }),
        archived: faker.datatype.boolean({ probability: 0.15 }),
      },
      status: faker.helpers.arrayElement(['success', 'error', 'warning', 'info', 'pending', 'processing']),
      orderStatus,
      paymentStatus,
      userStatus,
      verificationStatus,
      statistics: {
        viewCount: faker.number.int({ min: 0, max: 1000000 }),
        likeCount: faker.number.int({ min: 0, max: 100000 }),
        shareCount: faker.number.int({ min: 0, max: 50000 }),
        commentCount: faker.number.int({ min: 0, max: 10000 }),
        downloadCount: faker.number.int({ min: 0, max: 50000 }),
        rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
        score: faker.number.int({ min: 0, max: 100 }),
        percentage: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),
        progress: faker.number.int({ min: 0, max: 100 }),
      },
      misc: {
        word: faker.word.sample(),
        words: faker.word.words({ count: { min: 3, max: 8 } }),
        sentence: faker.lorem.sentence({ min: 5, max: 10 }),
        lorem: faker.lorem.word(),
        emoji: faker.internet.emoji(),
        fileName: faker.system.fileName(),
        filePath: faker.system.filePath(),
        directoryPath: faker.system.directoryPath(),
        fileExtension: faker.system.commonFileExt(),
        mimeType: faker.system.mimeType(),
        commonFileName: faker.system.commonFileName(),
        commonFileExtension: faker.system.commonFileExt(),
        contentType: faker.system.commonFileType(),
      },
      metadata: {
        tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.word.noun()),
        categories: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.commerce.department()),
        labels: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => faker.word.adjective()),
        notes: faker.lorem.sentence({ min: 5, max: 15 }),
        remarks: faker.lorem.paragraph({ min: 1, max: 2 }),
        version: faker.system.semver(),
        gitCommitSha: faker.git.commitSha(),
        gitBranch: faker.git.branch(),
      },
    }
  })
}
