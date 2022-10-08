/**
 * 获取所有选择器对应的节点元素数组
 * @param {String[]} selectors
 * @param {WechatMiniprogram.Wx} context
 * @return Promise<WechatMiniprogram.BoundingClientRectCallbackResult[] | any[]>
 */
export const selectorQueryAllRect = (selectors, context = wx) =>
  new Promise((resolve, reject) => {
    if (!selectors) {
      resolve([])
      return
    }

    context
      .createSelectorQuery()
      .selectAll(selectors)
      .boundingClientRect((res) => {
        if (Array.isArray(res)) {
          resolve(res)
        } else {
          reject(selectors + ' not found')
        }
      })
      .exec()
  })

/**
 * 获取子组件内部方法
 * @param {WechatMiniprogram.Component} context 执行上下文, 通常为 page 或
 * @param {String} selector  选择器名称
 * @param {String} method    子组件内部方法名
 * @return {Function}        返回子组件内部方法
 */
export const componentMethod = (context, selector = '', method = '') => {
  if (!context || typeof context.selectComponent !== 'function') {
    return () => {}
  }

  const component = context.selectComponent(selector)
  if (!component || typeof component[method] !== 'function') {
    return () => {}
  }

  return component[method].bind(component)
}

/**
 * wx.nextTick 转 Promise
 * @return {Promise<wx.nextTick>}
 */
export const promiseNextTick = () => new Promise((resolve) => wx.nextTick(resolve))

/**
 * 便利数组获取每个元素的图片宽高信息
 * 本方法对性能影响较大
 * 非万不得已, 不要使用本方法
 * 尽量要求后端提供缓存过后的图片宽高
 * @param {Array}  list       原始数组
 * @param {String} key        图片键名
 * @param {String} width_key  图片宽度键名
 * @param {String} height_key 图片高度键名
 * @return {Array}
 */
export const listImageInfos = async (list, key = 'image', width_key = 'image_width', height_key = 'image_height') => {
  const data = []
  for (let i = 0; i < list.length; i++) {
    const v = list[i]
    if (!v[key]) {
      data.push(v)
      continue
    }

    const image = await wx.getImageInfo({
        src: v[key],
      })
      .catch(console.log)

    if (!image) {
      continue
    }

    data.push({
      ...v,
      [width_key]: image.width,
      [height_key]: image.height,
    })
  }

  return data
}

/**
 * 产生随机整数，包含下限值，包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
export const random = (lower, upper) => Math.floor(Math.random() * (upper - lower + 1)) + lower

/**
 * @return {String} 放回图片地址
 */
export const randomImage = () => {
  const images = [
    'https://tva1.sinaimg.cn/large/87c01ec7gy1frmmnduv7lj21hc0u0x6p.jpg',
    'https://tva4.sinaimg.cn/large/87c01ec7gy1frmmyljiepj21kw0w0qvf.jpg',
    'https://tva1.sinaimg.cn/large/87c01ec7gy1frmrxuzha8j21hc0u0gur.jpg',
    'https://tva3.sinaimg.cn/large/0060lm7Tly1ftg6x22sgcj31hc0u0qh8.jpg',
    'https://tva3.sinaimg.cn/large/87c01ec7gy1frmrtnq32hj21hc0u0wnl.jpg',
    'https://tva4.sinaimg.cn/large/87c01ec7gy1frmrpcifo0j21hc0u0wn2.jpg',
    'https://tva1.sinaimg.cn/large/0060lm7Tly1ftg6xaqdu6j31hc0u0x4k.jpg',
    'https://tva3.sinaimg.cn/large/87c01ec7gy1frmr3hgu9hj21hc0xcb2b.jpg',
    'https://tva1.sinaimg.cn/large/87c01ec7gy1frmrx49dasj21hc0u0wnm.jpg',
    'https://tva4.sinaimg.cn/large/87c01ec7gy1frmrxozej7j21hc0u0gur.jpg',
    'https://tva4.sinaimg.cn/large/87c01ec7gy1frmmzutd3fj21kw0w0kju.jpg',
    'https://tva3.sinaimg.cn/large/87c01ec7gy1frmmmr8twvj21hc0u0x6q.jpg',
    'https://tva4.sinaimg.cn/large/87c01ec7gy1frmmz605z4j21kw0w0qvh.jpg',
    'https://tva4.sinaimg.cn/large/87c01ec7gy1frmroo4iggj21hc0u0th9.jpg',
    'https://tva4.sinaimg.cn/large/87c01ec7gy1frmrtcq1lfj21hc0u0qc1.jpg',
    'https://tva4.sinaimg.cn/large/87c01ec7gy1frmmihp11yj21hc0u0hdu.jpg',
    'https://tva1.sinaimg.cn/large/87c01ec7gy1frmmt281h4j21hc0u07wj.jpg',
    'https://tva4.sinaimg.cn/large/87c01ec7gy1frmmodoqiej21hc0u0x6q.jpg'
  ]
  const index = random(0, images.length - 1)
  return images[index]
}

/**
 * 生成 mock 商品列表
 * @param {Number} length  数据长度
 * @return {Product[]} 返回商品列表
 */
export const createMockList = (length = 100) => {
  const list = new Array(length).fill(1)
  return list.map((_v, index) => {
    const id = index + 1
    const image = randomImage()

    const image_width = 345
    let image_height = image_width * Math.random()
    if (image_height < 200) {
      image_height = 200
    } else if (image_height > 400) {
      image_height = 400
    }

    return {
      id,
      name: `商品${id}`,
      price: random(1, 100),
      image,
      image_width,
      image_height,
    }
  })
}

/**
 * 模拟获取 mock 信息
 * @param {Number} total
 * @return {Array}
 */
export const featData = (total = 10) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const mockData = createMockList(total)
      resolve(mockData)
    }, 300)
  })