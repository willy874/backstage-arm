import ArticleModel from './article'
import { ImageModel, ArticleImageModel, ParagraphModel, ReservationModel } from './index'

/**
 * @extends ArticleModel
 * @property {String} address 該筆活動的住址
 * @property {String} phone 該筆活動的電話
 * @property {String} ga_code 該筆活動專用的 GA 碼
 * @property {Array.<ArticleImageModel>} images 該筆活動的圖片
 * @property {ImageModel} banner_image 主視覺圖片
 * @property {Array.<ParagraphModel>} paragraphs 該筆活動的段落
 * @property {Array.<ReservationModel>} reservations 該筆活動的預約
 */
export default class ActivityModel extends ArticleModel {
  constructor(args) {
    super(args)
    const entity = args || {}
    this.address = entity.address || ''
    this.phone = entity.phone || ''
    this.ga_code = entity.ga_code || ''
    this.images = entity.images ? entity.images.map((p) => new ArticleImageModel(p)) : []
    this.arrayModel.images = ArticleImageModel
    this.banner_image = new ImageModel(entity.banner_image)
    this.paragraphs = entity.paragraphs ? entity.paragraphs.map((p) => new ParagraphModel(p)) : []
    this.arrayModel.paragraphs = ParagraphModel
    this.reservations = entity.reservations ? entity.reservations.map((p) => new ReservationModel(p)) : []
    this.arrayModel.reservations = ReservationModel
    // proto set
    this.api = entity.api || 'activity'
  }
}
