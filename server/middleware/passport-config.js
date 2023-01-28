// import { Strategy } from "passport-local";
// import bcrypt from "bcrypt";
// import User from "../models/User.js";

// export function initialize(passport) {
//   console.log("🚀 ~ file: passport-config.js:6 ~ initialize ~ passport");

//   const authenticateUser = async (email, password, done) => {
//     console.log("🚀 ~ file: passport-config.js:7 ~ authenticateUser ~ email", email);

//     const user = await getUserByEmail(email);
//     console.log("🚀 ~ file: passport-config.js:8 ~ authenticateUser ~ user", user);

//     if (user == null) {
//       return done(null, false, { message: "No user with that email" });
//     }

//     try {
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: "Password incorrect" });
//       }
//     } catch (e) {
//       return done(e);
//     }
//   };

//   passport.use(new Strategy({ usernameField: "email" }, authenticateUser));
//   passport.serializeUser((user, done) => done(null, user.id));
//   passport.deserializeUser((id, done) => {
//     done(null, getUserById(id));
//   });
//   console.log("🚀 ~ file: passport-config.js:6 ~ end ~ passport");
// }

// console.log("ENTERING");
// passport.use(
//   new Strategy(
//     ({ usernameField: "email", password: "password" },
//     (done) => {
//       User.findOne({ email: email }, (err, user) => {
//         console.log("REEEEEEEEEEEEEEEEEEE\n", user);
//         if (err) throw err;
//         if (!user) return done(null, false);
//         bcrypt.compare(password, user.password, (err, result) => {
//           if (err) throw err;
//           if (result === true) {
//             return done(null, user);
//           } else {
//             return done(null, false);
//           }
//         });
//       });
//     })
//   )
// );

// passport.serializeUser((user, cb) => cb(null, user.id));

// passport.deserializeUser((id, cb) => {
//   User.findOne({ _id: id }, (err, user) => {
//     const userInformation = {
//       email: user.email,
//     };
//   });
// });
