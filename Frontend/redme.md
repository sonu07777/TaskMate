The Frontend API that I provide ,

API:-

1. Everyone (Access without login):-

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
