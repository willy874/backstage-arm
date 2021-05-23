import ArticleModel from './article'
import { ImageModel } from './index'

/**
 * @extends ArticleModel
 * @property {String} meta_title 該筆文章 meta[title] 要顯示的資訊
 * @property {String} meta_description 該筆文章 meta[description] 要顯示的資訊
 * @property {String} meta_keywords 該筆文章 meta[keywords] 要顯示的資訊
 * @property {Array.<ImageModel>} images 該筆文章所屬的圖片
 */
export default class MessageModel extends ArticleModel {
  constructor(args) {
    super(args)
    const entity = args || {}
    this.meta_title = entity.meta_title || ''
    this.meta_description = entity.meta_description || ''
    this.meta_keywords = entity.meta_keywords || ''
    this.images = entity.images ? entity.images.map((p) => new ImageModel(p)) : []
    this.arrayModel.images = ImageModel
    // proto set
    this.api = entity.api || 'message'
  }
}
