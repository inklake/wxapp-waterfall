import {
  promiseNextTick,
  selectorQueryAllRect,
} from '../../utils/util'

Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
    width: {
      type: Number,
      value: 345
    },
    padding: {
      type: Number,
      value: 20
    }
  },
  data: {
    listLeft: [],
    listRight: []
  },
  methods: {
    clear() {
      this.setData({
        listLeft: [],
        listRight: []
      })
    },
    async append(data) {
      for (let i = 0; i < data.length; i++) {
        const rects = await selectorQueryAllRect('.col', this)

        if (!Array.isArray(rects) || rects.length !== 2) {
          continue
        }

        const listKey = rects[0].height <= rects[1].height ? `listLeft[${this.data.listLeft.length}]` : `listRight[${this.data.listRight.length}]`

        this.setData({
          [listKey]: data[i]
        })

        await promiseNextTick()
      }
    }
  },
})