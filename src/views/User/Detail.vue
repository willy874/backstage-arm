<template>
  <PageLayout>
    <template slot="header">
      <ArticelDetailHeader class="border-bottom" v-bind="headerProps" />
    </template>
    <div class="container-fluid d-flex flex-column flex-fill">
      <div class="d-flex flex-column flex-fill bg-light rounded-lg">
        <form class="py-3" @submit="submit">
          <div class="d-flex">
            <div class="col-auto form-title py-2">帳號</div>
            <div class="col py-2">
              <input
                name="account"
                :readonly="$route.params.id !== '0'"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': Model.hasError('account') }"
                v-model="Model.account"
              />
              <ErrorMessage class="text-danger small" :model="Model" field="account" />
            </div>
          </div>
          <div class="d-flex">
            <div class="col-auto form-title py-2">名稱</div>
            <div class="col py-2">
              <input
                name="name"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': Model.hasError('name') }"
                v-model="Model.name"
              />
              <ErrorMessage class="text-danger small" :model="Model" field="name" />
            </div>
          </div>
          <div class="d-flex">
            <div class="col-auto form-title py-2">電子信箱</div>
            <div class="col py-2">
              <input
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': Model.hasError('email') }"
                v-model="Model.email"
              />
              <ErrorMessage class="text-danger small" :model="Model" field="email" />
            </div>
          </div>
          <div v-if="isFixPassword || $route.params.id === '0'">
            <div class="d-flex">
              <div class="col-auto form-title py-2">密碼</div>
              <div class="col py-2">
                <input
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': Model.hasError('password') }"
                  v-model="Model.password"
                />
                <ErrorMessage class="text-danger small" :model="Model" field="password" />
              </div>
            </div>
            <div class="d-flex">
              <div class="col-auto form-title py-2">再次確認密碼</div>
              <div class="col py-2">
                <input
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': Model.hasError('password_check') }"
                  v-model="Model.password_check"
                />
                <ErrorMessage class="text-danger small" :model="Model" field="password_check" />
              </div>
            </div>
            <div class="container-fluid py-3" v-if="$route.params.id !== '0'">
              <button type="button" class="btn btn-secondary" @click="isFixPassword = false">取消修改密碼</button>
            </div>
          </div>
          <div class="container-fluid py-3" v-else>
            <button type="button" class="btn btn-primary text-white" @click="isFixPassword = true">修改密碼</button>
          </div>
        </form>
      </div>
    </div>
    <template slot="footer">
      <div class="container-fluid py-2 border-top">
        <div class="d-flex align-items-center">
          <div class="px-3">
            <button type="button" class="btn btn-success" @click="submit">確認</button>
          </div>
          <div v-if="submitError" class="text-danger">表單填寫不完整或填寫錯誤</div>
        </div>
      </div>
    </template>
  </PageLayout>
</template>
<script>
import { mapState } from 'vuex'
import { ListModel } from '@/models'
import UserModel from '@/admin/model/user'
import DeleteButton from '@/components/DeleteButton.vue'

export default {
  name: 'UserDetail',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      ListModel: new ListModel(),
      Model: new UserModel(),
      isFixPassword: false,
      submitError: false,
      backRouter: '/user',
    }
  },
  computed: {
    ...mapState({
      Users: (state) => state.model.db.UserModel,
      Admin: (state) => state.admin,
    }),
    headerProps() {
      return {
        ...this.$props,
        plugins: [DeleteButton],
        TargetModel: this.Model,
        ListModel: this.Activities,
        backRoute: this.backRouter,
      }
    },
    accountValidate() {
      if (this.$route.params && this.$route.params.id === '0') {
        return {
          account: {
            presence: {
              allowEmpty: false,
              message: '^請填寫帳號',
            },
          },
        }
      }
      return {}
    },
    passwordValidate() {
      if (this.isFixPassword || this.$route.params.id === '0') {
        return {
          password: {
            presence: {
              allowEmpty: false,
              message: '^請填寫密碼',
            },
            length: {
              minimum: 8,
              tooShort: '^密碼長度過短，最少8碼',
            },
            password: {
              message: '^請填寫包含英文與數字的密碼',
            },
          },
          password_check: {
            presence: {
              allowEmpty: false,
              message: '^請填寫確認密碼',
            },
            equality: {
              attribute: 'password_reset',
              message: '^密碼與確認密碼必須相同',
            },
          },
        }
      }
      return {}
    },
  },
  async created() {
    await this.$root.login
    this.updatePage()
  },
  watch: {
    $route() {
      this.updatePage()
    },
  },
  methods: {
    async updatePage() {
      if (!this.Users) {
        return
      }
      try {
        const id = Number(this.$route.params.id)
        if (id) {
          const target = this.Users.cache.find((p) => Number(p.id) === Number(id))
          if (target) {
            this.Model.set(target)
          } else {
            const res = await this.Users.readListById(id)
            this.Model.set(res.handle)
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    async submit() {
      this.submitError = false
      const errorMessage = this.Model.validate({
        email: {
          presence: {
            allowEmpty: false,
            message: '^請填寫電子郵件',
          },
        },
        name: {
          presence: {
            allowEmpty: false,
            message: '^請填寫名稱',
          },
        },
        ...this.accountValidate,
        ...this.passwordValidate,
      })
      if (this._isModelError(errorMessage).length) {
        this.submitError = true
        return
      }
      try {
        await this._saveModel(this.Model, this.ListModel, Number(this.$route.params.id))
      } catch (error) {
        console.error(error)
      }
      this.$router.push(this.backRouter)
    },
    changeStatus() {
      this.Model.status = this.Model.status ? 0 : 1
    },
  },
}
</script>

<style lang="scss" scoped>
.form-title {
  width: 140px;
  margin-top: 7px;
}
</style>
