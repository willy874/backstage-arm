module.exports = {
  extends: 'DataModel',
  description: '',
  tebles: [
    {
      name: 'name',
      type: String,
      default: '',
      description: '該筆預約人的姓名',
    },
    {
      name: 'email',
      type: String,
      default: '',
      description: '該筆預約人的電子郵件',
    },
    {
      name: 'address',
      type: String,
      default: '',
      description: '該筆預約人的住址',
    },
    {
      name: 'phone',
      type: String,
      default: '',
      description: '該筆預約人的電話',
    },
    {
      name: 'activity_id',
      type: Number,
      default: 0,
      description: '該預約所屬的活動',
    },
    {
      name: 'reservation_datetime',
      type: String,
      default: 0,
      description: '該預約的時間',
    },
  ],
}
