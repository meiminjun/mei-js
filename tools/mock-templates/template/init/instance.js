import { createAPI } from '{{$$.relative("util")}}'
import config from '{{$$.relative("config")}}'

const baseUrl = {
  mock: '{{$$.joinUrl(config.host, "mock", data.project._id, data.project.url)}}',
  dev: '', // 开发
  stg: '', // 测试
  pre: '', // 内测
  prd: '' // 生产
}[config.env]

export default createAPI(baseUrl)
