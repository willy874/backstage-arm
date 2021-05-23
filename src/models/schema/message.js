module.exports = {
  extends: 'ArticleModel',
  tebles: [
    {
      name: 'meta_title',
      type: String,
      default: '',
      description: '該筆文章 meta[title] 要顯示的資訊',
    },
    {
      name: 'meta_description',
      type: String,
      default: '',
      description: '該筆文章 meta[description] 要顯示的資訊',
    },
    {
      name: 'meta_keywords',
      type: String,
      default: '',
      description: '該筆文章 meta[keywords] 要顯示的資訊',
    },
    {
      name: 'images',
      type: Array,
      itemType: 'ImageModel',
      default: [],
      description: '該筆文章所屬的圖片',
    },
  ],
}
