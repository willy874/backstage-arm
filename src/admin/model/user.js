import AuthModel from './auth'
import { DataModel } from '@/models'

export default class UserModel extends DataModel {
  constructor(args) {
    super(args)
    const entity = args || {}
    this.id = entity.id || 0
    this.name = entity.name || ''
    this.email = entity.email || ''
    this.account = entity.account || ''
    this.password = entity.password || ''
    this.login_at = entity.login_at || ''
    this.auth = entity.auth ? entity.auth.map((p) => new AuthModel(p)) : []
    // 暫存參數
    this.password_check = ''
    this.api = 'users'
  }
}
