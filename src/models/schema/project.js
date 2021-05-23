module.exports = {
  extends: 'ArticleModel',
  description: '',
  tebles: [
    {
      name: 'subtopic',
      type: String,
      default: '',
      description: '該筆案件的副標題',
    },
    {
      name: 'meta_title',
      type: String,
      default: '',
      description: '該筆案件 meta[title] 要顯示的資訊',
    },
    {
      name: 'meta_description',
      type: String,
      default: '',
      description: '該筆案件 meta[description] 要顯示的資訊',
    },
    {
      name: 'meta_keywords',
      type: String,
      default: '',
      description: '該筆案件 meta[keywords] 要顯示的資訊',
    },
    {
      name: 'video_link',
      type: String,
      default: '',
      description: '該筆案件的影片連結',
    },
    {
      name: 'cover_image',
      type: 'ImageModel',
      description: '該筆案件的封面圖片',
    },
    {
      name: 'banner_image',
      type: 'ImageModel',
      description: '主視覺圖片',
    },
    {
      name: 'images',
      type: Array,
      itemType: 'ArticleImageModel',
      description: '該筆案件的輪播圖片',
    },
  ],
}
