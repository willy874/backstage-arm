import DataModel from '../proto/data'

/**
 * @extends DataModel
 * @property {String} name 該筆預約人的姓名
 * @property {String} email 該筆預約人的電子郵件
 * @property {String} address 該筆預約人的住址
 * @property {String} phone 該筆預約人的電話
 * @property {Number} activity_id 該預約所屬的活動
 * @property {String} reservation_datetime 該預約的時間
 */
export default class ReservationModel extends DataModel {
  constructor(args) {
    super(args)
    const entity = args || {}
    this.name = entity.name || ''
    this.email = entity.email || ''
    this.address = entity.address || ''
    this.phone = entity.phone || ''
    this.activity_id = entity.activity_id || 0
    this.reservation_datetime = entity.reservation_datetime || 0
    // proto set
    this.api = entity.api || 'reservation'
  }
}
