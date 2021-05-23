import Dashboard from '@/views/Dashboard.vue'
import BannerPage from '@/views/Banner/Index.vue'
import BannerDetailPage from '@/views/Banner/Detail.vue'
import MessagePage from '@/views/Message/Index.vue'
import MessageDetailPage from '@/views/Message/Detail.vue'
import ProjectPage from '@/views/Project/Index.vue'
import ProjectDetailPage from '@/views/Project/Detail.vue'
import ProjectImageListPage from '@/views/Project/ImageList.vue'
import ProjectImageDetailPage from '@/views/Project/ImageDetail.vue'
import ActivityPage from '@/views/Activity/Index.vue'
import ActivityDetailPage from '@/views/Activity/Detail.vue'
import ActivityImageListPage from '@/views/Activity/ImageList.vue'
import ActivityReservationListPage from '@/views/Activity/ReservationList.vue'
import ActivityImageDetailPage from '@/views/Activity/ImageDetail.vue'
import UserPage from '@/views/User/Index.vue'
import UserDetailPage from '@/views/User/Detail.vue'
import ErrorPage from '@/layout/Error.vue'
import Login from '@/admin/Login.vue'

export default function getRoutes() {
  const siteMap = [
    {
      path: '/',
      name: 'Dashboard',
      default: true,
      component: Dashboard,
    },
    {
      path: '/login',
      name: 'Login',
      default: true,
      component: Login,
    },
    {
      path: '/banner',
      name: 'Banner',
      props: {
        title: '首頁管理',
        authName: 'Banner',
      },
      groupName: 'Home',
      component: BannerPage,
      children: [
        {
          path: ':id',
          name: 'BannerDetail',
          props: {
            title: '首頁管理',
            authName: 'Banner',
          },
          component: BannerDetailPage,
        },
      ],
    },
    {
      path: '/message',
      name: 'Message',
      props: {
        title: '快訊管理',
        authName: 'Message',
      },
      groupName: 'News',
      component: MessagePage,
      children: [
        {
          path: ':id',
          name: 'MessageDetail',
          props: {
            title: '快訊管理',
            authName: 'Message',
          },
          component: MessageDetailPage,
        },
      ],
    },
    {
      path: '/project',
      name: 'Project',
      props: {
        title: '案件管理',
        authName: 'Project',
      },
      groupName: 'Product',
      component: ProjectPage,
      children: [
        {
          path: ':id/image/:img',
          name: 'ProjectImageDetail',
          props: {
            title: '案件管理-圖片',
            authName: 'Project',
          },
          component: ProjectImageDetailPage,
        },
        {
          path: ':id/image',
          name: 'ProjectImageList',
          props: {
            title: '案件管理-圖片',
            authName: 'Project',
          },
          component: ProjectImageListPage,
        },
        {
          path: ':id',
          name: 'ProjectDetail',
          props: {
            title: '案件管理',
            authName: 'Project',
          },
          component: ProjectDetailPage,
        },
      ],
    },
    {
      path: '/activity',
      name: 'Activity',
      props: {
        title: '活動頁面',
        authName: 'Activity',
      },
      groupName: 'Article',
      component: ActivityPage,
      children: [
        {
          path: ':id/image/:img',
          name: 'ActivityImageDetail',
          props: {
            title: '活動頁面-圖片',
            authName: 'Activity',
          },
          component: ActivityImageDetailPage,
        },
        {
          path: ':id/reservation',
          name: 'ActivityReservationList',
          props: {
            title: '活動頁面-預約',
            authName: 'Activity',
          },
          component: ActivityReservationListPage,
        },
        {
          path: ':id/image',
          name: 'ActivityImageList',
          props: {
            title: '活動頁面-圖片',
            authName: 'Activity',
          },
          component: ActivityImageListPage,
        },
        {
          path: ':id',
          name: 'ActivityDetail',
          props: {
            title: '活動頁面',
            authName: 'Activity',
          },
          component: ActivityDetailPage,
        },
      ],
    },
    {
      path: '/user',
      name: 'User',
      props: {
        title: '帳號管理',
        authName: 'User',
      },
      groupName: 'System',
      component: UserPage,
      children: [
        {
          path: ':id',
          name: 'UserDetail',
          props: {
            title: '帳號管理',
            authName: 'User',
          },
          component: UserDetailPage,
        },
      ],
    },
    {
      path: '/error',
      name: 'Error',
      default: true,
      component: ErrorPage,
    },
  ]
  return siteMap
}
