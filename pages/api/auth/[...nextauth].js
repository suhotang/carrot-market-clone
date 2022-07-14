import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_ID,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "kakao") {
        console.log("id", profile.id);
        console.log("email", profile.email);
      }
      if (account.provider === "naver") {
        console.log("id", profile.response.id);
        console.log("email", profile.response.email);
      }
      if (account.provider === "google") {
        console.log("id", profile.id);
        console.log("email", profile.email);
        return profile.email_verified && profile.email.endsWith("@example.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});
