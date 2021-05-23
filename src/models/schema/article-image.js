module.exports = {
  extends: 'ImageModel',
  description: '',
  tebles: [
    {
      name: 'status',
      type: Number,
      default: 1,
      description: '該筆圖片的狀態碼',
    },
    {
      name: 'created_user',
      type: String,
      default: '',
      description: '該筆圖片建立的使用者',
    },
    {
      name: 'updated_user',
      type: String,
      default: '',
      description: '該筆圖片最後編輯的使用者',
    },
    {
      name: 'deleted_user',
      type: String,
      default: '',
      description: '該筆圖片刪除的使用者',
    },
    {
      name: 'published_at',
      type: String,
      default: '',
      description: '該筆圖片的公開時間',
    },
    {
      name: 'finished_at',
      type: String,
      default: '',
      description: '該筆圖片的下架時間',
    },
  ],
}
