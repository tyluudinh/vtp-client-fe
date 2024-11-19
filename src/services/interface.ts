interface IBodyAuthozire {
  sessionId: string;
  nonce: string;
  username: string;
  password: string;
  clientId: string;
  redirectUri: string;
  partnerUserId: string;
}

interface IAuthozire {
  sessionId: string;
  nonce: string;
  requiredConsent: boolean;
  requiredOtp: boolean;
  email: string;
  phone: string;
  state: string;
}

interface IVerifyOTP {
  nonce: string;
  sessionId: string;
  otp: string;
  state?: string;
}

interface IRequestOTP {
  nonce: string;
  channel: string;
  sessionId: string;
}

interface IConsentBody {
  sessionId: string;
  nonce: string;
  accepted: boolean;
}

export type {
  IAuthozire,
  IVerifyOTP,
  IBodyAuthozire,
  IConsentBody,
  IRequestOTP,
};
