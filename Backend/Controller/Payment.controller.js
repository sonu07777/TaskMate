import user from "../Schema/User.schema.js";
import AppError from "../Utils/All_error.js";
import { razorpay } from "../index.js";
import crypto from "crypto";
import Payment from "../Schema/Payment.schema.js";

export const getRazorpayApiKey = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "razerpay API key",
    key: process.env.RAZORPAY_KEY_ID,
  });
};

export const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const User = await user.findById(id);
    if (!User) {
      return next(new AppError("unauthorized please login", 400));
    }
    if ((user.role)?.toUpperCase() == "ADMIN") {
      return next(new AppError("you are admin", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 12,
    });
    console.log("31", subscription);
    User.subscription.id = subscription.id;
    User.subscription.status = subscription.status;
    await User.save();
    res.status(200).json({
      success: true,
      message: "successfully done",
      subscription_id: subscription.id,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "the error is " + error,
    });
  }
};
// export const buySubscription = async (req, res, next) => {
//   try {
//     const { id } = req.user;
//     const User = await user.findById(id);

//     if (!User) {
//       return next(new AppError("Unauthorized. Please login", 401));
//     }

//     if ((User.role)?.toUpperCase() === "ADMIN") {
//       return next(new AppError("Admins are not allowed to subscribe", 403));
//     }

//     const subscription = await razorpay.subscriptions.create({
//       plan_id: process.env.RAZORPAY_PLAN_ID,
//       customer_notify: 1,
//       total_count: 12,
//       quantity: 1, // optional but often needed
//     });

//     User.subscription.id = subscription.id;
//     User.subscription.status = subscription.status;
//     await User.save();

//     res.status(200).json({
//       success: true,
//       message: "Subscription created successfully",
//       subscription_id: subscription.id,
//     });
//   } catch (error) {
//     console.error("Subscription Error:", error);
//     res.status(400).json({
//       success: false,
//       message: "Subscription creation failed",
//       error: error?.error || error, // handle Razorpay error format
//     });
//   }
// };

export const verifySubscription = async (req, res, next) => {
  const { id } = req.user;
  const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } =
    req.body;
  const User = await user.findById(id);
  // console.log("the user is", User);

  if (!User) {
    return next(new AppError("unauthorized please login", 400));
  }

  const subscriptionId = User.subscription.id;
  // now the
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpay_payment_id}|${subscriptionId}`)
    .digest("hex");

  if (generatedSignature != razorpay_signature) {
    return next(new AppError("payment not verified", 400));
  }

  await Payment.create({
    razorpay_payment_id,
    razorpay_signature,
    razorpay_subscription_id,
  });
  User.subscription.status = "active";
  await User.save();
  res.status(200).json({
    success: true,
    message: "successfully payment done",
    User,
  });
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const User = await user.findById(id);
    if (!User) {
      return next(new AppError("unauthorized please login", 400));
    }
    if (user.role === "admin") {
      return next(new AppError("you are admin", 400));
    }

    const subscriptionId = User.subscription.id;

    const subscription = await razorpay.subscriptions.cancel(subscriptionId);

    User.subscription.status = subscription.status;
    await User.save();
    res.status(200).json({
      success: true,
      message: "successful cancel done",
      User,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 400));
  }
};

export const allPayments = async (req, res, next) => {
  try {
    // --------------------------------------------------
    // const { count } = req.query;

    // const subscriptions = await razorpay.subscriptions.all({
    //   count: count | 100,
    // });
    // console.log(subscriptions);

    // res.status(200).json({
    //   success: true,
    //   message: "done the process",
    //   subscriptions,
    // });
    // ----------------------------------------------------
    const { count, skip } = req.query;

    // Find all subscriptions from razorpay
    const allPayments = await razorpay.subscriptions.all({
      count: count ? count : 10, // If count is sent then use that else default to 10
      skip: skip ? skip : 0, // // If skip is sent then use that else default to 0
    });

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const finalMonths = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    const monthlyWisePayments = allPayments.items.map((payment) => {
      // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
      const monthsInNumbers = new Date(payment.start_at * 1000);

      return monthNames[monthsInNumbers.getMonth()];
    });

    monthlyWisePayments.map((month) => {
      Object.keys(finalMonths).forEach((objMonth) => {
        if (month === objMonth) {
          finalMonths[month] += 1;
        }
      });
    });

    const monthlySalesRecord = [];

    Object.keys(finalMonths).forEach((monthName) => {
      monthlySalesRecord.push(finalMonths[monthName]);
    });

    res.status(200).json({
      success: true,
      message: "All payments",
      allPayments,
      finalMonths,
      monthlySalesRecord,
    });
  } catch (error) {
    console.log(error);

    return next(new AppError("something happen", 400));
  }
};
