import ImageModel from './image'

/**
 * @extends ImageModel
 * @property {Number} status 該筆圖片的狀態碼
 * @property {String} created_user 該筆圖片建立的使用者
 * @property {String} updated_user 該筆圖片最後編輯的使用者
 * @property {String} deleted_user 該筆圖片刪除的使用者
 * @property {String} published_at 該筆圖片的公開時間
 * @property {String} finished_at 該筆圖片的下架時間
 */
export default class ArticleImageModel extends ImageModel {
  constructor(args) {
    super(args)
    const entity = args || {}
    this.status = entity.status || 1
    this.created_user = entity.created_user || ''
    this.updated_user = entity.updated_user || ''
    this.deleted_user = entity.deleted_user || ''
    this.published_at = entity.published_at || ''
    this.finished_at = entity.finished_at || ''
    // proto set
    this.api = entity.api || 'article-image'
  }
}
