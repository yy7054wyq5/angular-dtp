// import { JwtHelperService } from "@auth0/angular-jwt";
// const jwtHelper = new JwtHelperService();

// function tokenIsValid(token: string, seconds: number): boolean {
//   if (Utils.isNullOrUndefined(token) && Utils.isNullOrUndefined(seconds)) {
//     console.error("请传入有效参数");
//     return;
//   }
//   if (!token) {
//     return false;
//   }
//   const isExpired = jwtHelper.isTokenExpired(token);
//   if (isExpired) {
//     return false;
//   }
//   const expiredStamp = Date.parse(
//     jwtHelper.getTokenExpirationDate(token).toString()
//   );
//   const nowStamp = Date.now();
//   // console.log(jwtHelper.getTokenExpirationDate(token).toString(), new Date(Date.now()));
//   // console.log(expiredStamp, nowStamp);
//   // console.log((expiredStamp - nowStamp) / 1000);
//   if ((expiredStamp - nowStamp) / 1000 < seconds) {
//     return false;
//   }
//   return true;
// }