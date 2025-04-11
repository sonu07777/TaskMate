
A. The Frontend API that I provide ,

API's:-
1. USER (Access without login):-

   1. homePage:-"http://localhost:5173/"
   2. signup:-"http://localhost:5173/signup"
   3. login:-"http://localhost:5173/login"
   4. contactUs:-"http://localhost:5173/contactUs"
   5. aboutUs:-"http://localhost:5173/aboutUs"
   6. forgetPassword:-"http://localhost:5173/forgetPassword"
   7. resetPassword:-"http://localhost:5173/resetPassword/:token"
   8. denied:-"http://localhost:5173/denied"
   9. NotFoundPage:-"http://localhost:5173/<ANY UNKNOWN ROUTE>"

2. ADMIN AND USER (after login can access):-

   1. profile:-"http://localhost:5173/user/profile"
   2. editProfile:-"http://localhost:5173/user/editProfile"
   3. changePassword:-"http://localhost:5173/changePassword"

3. ADMIN (after login only admin can access the)

   1. adminDashboard:-"http://localhost:5173/adminDashboard"
   2. Also admin can delete the user value i.e only admin can do it found in the  

B. The backend API that I provide,

API's:-
   1. Sign Up :- "http://localhost:5020/api/v1/user/register"
   2. login :- "http://localhost:5020/api/v1/user/login"
   3. logout:- "http://localhost:5020/api/v1/user/logout"
   4. profile :- "http://localhost:5020/api/v1/user/profile"
   5. resetPasswordToken :- "http://localhost:5020/api/v1/user/reset/:resetToke"
   6. forgetPassword :- "http://localhost:5020/api/v1/user/forgetPassword"
   7. UpdateProfile :- "http://localhost:5020/api/v1/user/updateProfile/:id"
   8. deleteAccount :- "http://localhost:5020/api/v1/user/delete"
   9. ChangePassword:- "http://localhost:5020/api/v1/user/changePassword"
   10. contactUs:- "http://localhost:5020/api/v1/contact/contactUs"