interface Window {
  _AMapSecurityConfig: {
    securityJsCode: string;
  };

  // QC: {
  //   Login: {
  //     check(): boolean;
  //     getMe(cb: (openId: string) => void): void;
  //   };
  // };
}

type QCType = {
  Login: {
    check(): boolean;
    getMe(cb: (openId: string) => void): void;
  };
};

declare const QC: QCType;
