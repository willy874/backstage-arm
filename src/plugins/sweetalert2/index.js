import Swal from 'sweetalert2'

export default {
  install(Vue) {
    Vue.prototype.$swal = Swal
    Vue.prototype.$alert = {
      delete: () => {
        return Swal.fire({
          title: '是否要刪除?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#ff0000',
          cancelButtonColor: '#999',
          confirmButtonText: '刪除',
          cancelButtonText: '取消',
        })
      },
    }
  },
}
