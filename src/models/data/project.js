import ArticleModel from './article'
import { ImageModel, ArticleImageModel } from './index'

/**
 * @extends ArticleModel
 * @property {String} subtopic 該筆案件的副標題
 * @property {String} meta_title 該筆案件 meta[title] 要顯示的資訊
 * @property {String} meta_description 該筆案件 meta[description] 要顯示的資訊
 * @property {String} meta_keywords 該筆案件 meta[keywords] 要顯示的資訊
 * @property {String} video_link 該筆案件的影片連結
 * @property {ImageModel} cover_image 該筆案件的封面圖片
 * @property {ImageModel} banner_image 主視覺圖片
 * @property {Array.<ArticleImageModel>} images 該筆案件的輪播圖片
 */
export default class ProjectModel extends ArticleModel {
  constructor(args) {
    super(args)
    const entity = args || {}
    this.subtopic = entity.subtopic || ''
    this.meta_title = entity.meta_title || ''
    this.meta_description = entity.meta_description || ''
    this.meta_keywords = entity.meta_keywords || ''
    this.video_link = entity.video_link || ''
    this.cover_image = new ImageModel(entity.cover_image)
    this.banner_image = new ImageModel(entity.banner_image)
    this.images = entity.images ? entity.images.map((p) => new ArticleImageModel(p)) : undefined
    this.arrayModel.images = ArticleImageModel
    // proto set
    this.api = entity.api || 'project'
  }
}
