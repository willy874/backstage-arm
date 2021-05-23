import DataModel from '../proto/data'

/**
 * @extends DataModel
 * @property {Number} id 該Model的辨識索引
 * @property {String} uuid 該Model的辨識索引
 * @property {String} name 該圖片的檔案名稱
 * @property {Number} size 該圖片的檔案大小
 * @property {String} image_name 該圖片的檔案名稱
 * @property {String} image_ext 該圖片的副檔名
 * @property {Number} sort 該圖片的排序
 * @property {String} type 該圖片的儲存類型
 * @property {Number} image_url 該圖片的檔案路徑
 * @property {String} image_alt 該圖片的替代文字
 * @property {String} image_title 該圖片的標題文字
 * @property {String} image_link 該圖片的連結
 * @property {String} image_blob 該圖片的二進位檔案
 * @property {String} image_base64 該圖片的Base64字串
 */
export default class ImageModel extends DataModel {
  constructor(args) {
    super(args)
    const entity = args || {}
    this.id = entity.id || 0
    this.uuid = entity.uuid || ''
    this.name = entity.name || ''
    this.size = entity.size || 0
    this.image_name = entity.image_name || ''
    this.image_ext = entity.image_ext || ''
    this.sort = entity.sort || 0
    this.type = entity.type || ''
    this.image_url = entity.image_url || ''
    this.image_alt = entity.image_alt || ''
    this.image_title = entity.image_title || ''
    this.image_link = entity.image_link || ''
    this.image_blob = entity.image_blob || null
    this.image_base64 = entity.image_base64 || ''
    // proto set
    this.api = entity.api || 'image'
  }
}
