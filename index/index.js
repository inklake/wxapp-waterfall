import {
  componentMethod,
  // listImageInfos,
  featData,
} from '../utils/util'

Page({
  data: {},
  onShow() {
    this.getList()
  },
  async getList() {
    let list = await featData(10)

    wx.stopPullDownRefresh()

    if (!list) {
      return
    }

    // 实际项目中, 尽量与后端协商，在最开始就缓存并回传图片宽高, 极力避免在前端获取图片宽高。性能差异极大。
    // 去掉下方注释，可以在前端获取图片宽高
    // list = await listImageInfos(list)

    componentMethod(this, '#waterfall-index', 'append')(list)

  },
  onPullDownRefresh: function () {
    componentMethod(this, '#waterfall-index', 'clear')()

    this.getList()
  },
  onReachBottom: function () {
    this.getList()
  },
})