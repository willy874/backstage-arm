module.exports = {
  extends: 'DataModel',
  tebles: [
    {
      name: 'id',
      type: Number,
      default: 0,
      description: '該Model的辨識索引',
    },
    {
      name: 'uuid',
      type: String,
      default: '',
      description: '該Model的辨識索引',
    },
    {
      name: 'name',
      type: String,
      default: '',
      description: '該圖片的檔案名稱',
    },
    {
      name: 'size',
      type: Number,
      default: 0,
      description: '該圖片的檔案大小',
    },
    {
      name: 'image_name',
      type: String,
      default: '',
      description: '該圖片的檔案名稱',
    },
    {
      name: 'image_ext',
      type: String,
      default: '',
      description: '該圖片的副檔名',
    },
    {
      name: 'sort',
      type: Number,
      default: 0,
      description: '該圖片的排序',
    },
    {
      name: 'type',
      type: String,
      default: '',
      description: '該圖片的儲存類型',
    },
    {
      name: 'image_url',
      type: Number,
      default: '',
      description: '該圖片的檔案路徑',
    },
    {
      name: 'image_alt',
      type: String,
      default: '',
      description: '該圖片的替代文字',
    },
    {
      name: 'image_title',
      type: String,
      default: '',
      description: '該圖片的標題文字',
    },
    {
      name: 'image_link',
      type: String,
      default: '',
      description: '該圖片的連結',
    },
    {
      name: 'image_blob',
      type: String,
      default: null,
      description: '該圖片的二進位檔案',
    },
    {
      name: 'image_base64',
      type: String,
      default: '',
      description: '該圖片的Base64字串',
    },
  ],
}
