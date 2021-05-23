module.exports = {
  extends: 'ArticleModel',
  description: '',
  tebles: [
    {
      name: 'paragraph_subject',
      type: String,
      default: '',
      description: '該筆活動的住址',
    },
    {
      name: 'paragraph_subtopic',
      type: String,
      default: '',
      description: '該筆活動的電話',
    },
    {
      name: 'activity_id',
      type: Number,
      default: 0,
      description: '該段落所屬的活動',
    },
    {
      name: 'image',
      type: 'ImageModel',
      description: '該筆活動的圖片',
    },
  ],
}
