module.exports = {
  extends: 'ArticleModel',
  description: '',
  tebles: [
    {
      name: 'address',
      type: String,
      default: '',
      description: '該筆活動的住址',
    },
    {
      name: 'phone',
      type: String,
      default: '',
      description: '該筆活動的電話',
    },
    {
      name: 'ga_code',
      type: String,
      default: '',
      description: '該筆活動專用的 GA 碼',
    },
    {
      name: 'images',
      type: Array,
      itemType: 'ArticleImageModel',
      default: [],
      description: '該筆活動的圖片',
    },
    {
      name: 'banner_image',
      type: 'ImageModel',
      description: '主視覺圖片',
    },
    {
      name: 'paragraphs',
      type: Array,
      itemType: 'ParagraphModel',
      default: [],
      description: '該筆活動的段落',
    },
    {
      name: 'reservations',
      type: Array,
      itemType: 'ReservationModel',
      default: [],
      description: '該筆活動的預約',
    },
  ],
}
