import ArticleModel from './article'
import { ImageModel } from './index'

/**
 * @extends ArticleModel
 * @property {ImageModel} image 該輪播圖的圖片資料
 */
export default class BannerModel extends ArticleModel {
  constructor(args) {
    super(args)
    const entity = args || {}
    this.image = new ImageModel(entity.image)
    // proto set
    this.api = entity.api || 'banner'
  }
}
