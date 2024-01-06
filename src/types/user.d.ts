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
};

// 验证码类型
export type CodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile';

type OmitUser = Omit<User, 'token' | 'refreshToken'>;

export type UserInfo = OmitUser & {
  /** 关注 */
  likeNumber: number
  /** 收藏 */
  collectionNumber: number
  /** 积分 */
  score: number
  /** 优惠券 */
  couponNumber: number
  orderInfo: {
    /** 待付款 */
    paidNumber: number
    /** 待发货 */
    receivedNumber: number
    /** 待收货 */
    shippedNumber: number
    /** 已完成 */
    finishedNumber: number
  }
}
