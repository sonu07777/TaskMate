import { Router } from "express";
import {
  getRazorpayApiKey,
  allPayments,
  buySubscription,
  cancelSubscription,
  verifySubscription,
} from "../Controller/Payment.controller.js";
import {
  authorizedRoles,
  isLogged_in,
  authorizedSubscriber,
} from "../Middleware/Authentication.middleware.js";

const router = Router();

router.route("/razorpay-key").get(isLogged_in, getRazorpayApiKey);

router.route("/subscribe").post(isLogged_in, buySubscription);
router.route("/verify").post(isLogged_in, verifySubscription);
router
  .route("/unsubscribe")
  .post(isLogged_in, authorizedSubscriber, cancelSubscription);
router
  .route("/")
  .get(isLogged_in, authorizedRoles("admin", "ADMIN"), allPayments);

export default router;
