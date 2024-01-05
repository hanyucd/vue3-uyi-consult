export type User = {
  // token
  token: string
  refreshToken: string
  // 头像
  avatar: string
  // 脱敏手机号
  mobile: string
  // 用户名
  account: string
  // 用户id
  id: string
}

// 验证码类型
export type CodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile'
