import {
  ArticleModel,
  ArticleImageModel,
  MessageModel,
  ProjectModel,
  ActivityModel,
  ParagraphModel,
  ReservationModel,
} from '../models/data'
import UserModel from '../admin/model/user'

export default {
  dataSchema: {},
  authDataSchema: {
    ArticleModel: {
      model: ArticleModel,
      api: 'article',
    },
    ParagraphModel: {
      model: ParagraphModel,
      api: 'paragraph',
    },
    ReservationModel: {
      model: ReservationModel,
      api: 'reservation',
    },
    BannerModel: {
      model: ArticleImageModel,
      api: 'banner',
    },
    MessageModel: {
      model: MessageModel,
      api: 'message',
    },
    ProjectModel: {
      model: ProjectModel,
      api: 'project',
    },
    ActivityModel: {
      model: ActivityModel,
      api: 'activity',
    },
    UserModel: {
      model: UserModel,
      api: 'users',
    },
  },
}
