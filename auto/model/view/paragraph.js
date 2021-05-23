import ArticleModel from './article'
import { ImageModel } from './index'

/**
 * @extends ArticleModel
 * @property {String} paragraph_subject 該筆活動的住址
 * @property {String} paragraph_subtopic 該筆活動的電話
 * @property {Number} activity_id 該段落所屬的活動
 * @property {ImageModel} image 該筆活動的圖片
 */
export default class ParagraphModel extends ArticleModel {
  constructor(args) {
    super(args)
    const entity = args || {}
    this.paragraph_subject = entity.paragraph_subject || ''
    this.paragraph_subtopic = entity.paragraph_subtopic || ''
    this.activity_id = entity.activity_id || 0
    this.image = new ImageModel(entity.image)
    // proto set
    this.api = entity.api || 'paragraph'
  }
}
