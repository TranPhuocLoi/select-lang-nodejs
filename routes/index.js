var express = require("express");
const dotenv = require("dotenv");
var result = dotenv.config();
var i18n = require("i18n");
var router = express.Router();
var nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");
var RecaptchaV3 = require("express-recaptcha").RecaptchaV3;
var RECAPTCHA_SITE_KEY_V3 = "6Lci6soUAAAAAFXyJlozZQ4fdtIVJWgRcbOyzSj4";
var RECAPTCHA_SECRET_KEY_V3 = "6Lci6soUAAAAADY3waM54hEy1GjxrDol6MNTzCUl";
var recaptchaV3 = new RecaptchaV3(
  RECAPTCHA_SITE_KEY_V3,
  RECAPTCHA_SECRET_KEY_V3,
  { callback: "cb" }
);

router.post("/v3", recaptchaV3.middleware.verify, (req, res) => {
  res.render("contact", {
    post: "/v3",
    error: req.recaptcha.error,
    path: req.path,
    data: JSON.stringify(req.recaptcha.data)
  });
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.redirect("/ja");
});
router.get("/:lang(ja|en|kr|cn)", function(req, res, next) {
  // console.log(req.params.lang);
  i18n.setLocale(req, req.params.lang);
  res.render("index", {
    lang: req.params.lang || "ja",
    title: "Index",
    language: req.params.lang || "ja",
    i18n: res
  });
});
router.get("/:lang*?/rev-trading", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("2_rev_trading", {
    title: "Rev Trading",
    language: req.params.lang || "ja"
  });
});
router.get("/:lang*?/deposit-withdraw", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("3_deposit_withdraw", {
    title: "Deposit & Withdraw",
    language: req.params.lang || "ja"
  });
});
router.get("/:lang*?/trading-flatform", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("4_tranding_flatform", {
    title: "Trading platform",
    language: req.params.lang || "ja"
  });
});
router.get("/:lang*?/partner", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("5_partner", {
    title: "Partner",
    language: req.params.lang || "ja"
  });
});
router.get("/:lang*?/about-us", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("6_about", {
    title: "About us",
    language: req.params.lang || "ja"
  });
});

router.get("/:lang*?/contact", recaptchaV3.middleware.render, function(
  req,
  res,
  next
) {
  i18n.setLocale(req, req.params.lang);
  res.render("7_contact", {
    title: "Contact",
    captcha: res.recaptcha,
    language: req.params.lang || "ja"
  });
});

router.get("/:lang*?/trading-rule", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("8_trading_rule", {
    title: "Trading Rule",
    language: req.params.lang || "ja"
  });
});
router.get("/:lang*?/mt4", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("15_mt4", { title: "MT4", language: req.params.lang || "ja" });
});
router.get("/:lang*?/mt5", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("9_mt5", { title: "MT5", language: req.params.lang || "ja" });
});
router.get("/:lang*?/tradebook", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("10_tradebook", {
    title: "Tradebook",
    language: req.params.lang || "ja"
  });
});
router.get("/:lang*?/pamm-mam", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("11_pamm_mam", {
    title: "Pamm Mam",
    language: req.params.lang || "ja"
  });
});
router.get("/:lang*?/revollet", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("12_revollet", {
    title: "Revollet",
    language: req.params.lang || "ja"
  });
});
router.get("/:lang*?/prepaid-card", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("13_prepaid_card", {
    title: "Prepaid Card",
    language: req.params.lang || "ja"
  });
});
router.get("/:lang*?/my-bitwallet", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("14_my_bitwallet", {
    title: "My Bitwallet",
    language: req.params.lang || "ja"
  });
});
router.get("/:lang*?/thank-you", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("thankyou", {
    title: "Thank you",
    language: req.params.lang || "ja"
  });
});

// config mail
router.post("/contact", function(req, res, next) {
  recaptchaV3.verify(req, function(error, data) {
    console.log({ process });
    if (!error) {
      var options = {
        auth: {
          api_user: process.env.MAIL_USERNAME,
          api_key: process.env.MAIL_KEY
        }
      };
      var client = nodemailer.createTransport(sgTransport(options));

      var email = {
        from: "support@rev-trading.net",
        to: "support@rev-trading.net",
        replyTo: "support@rev-trading.net",
        // cc: "ttduongtran@gmail.com",
        subject: "Contact from 「Rev-Trading」",
        text: "You recieved message from " + req.body.email_contact,
        html:
          "<p>You have got a new message</b><ul><li>Name: " +
          req.body.name_contact +
          "</li><li>Option:　" +
          req.body.category_contact +
          "</li><li>Email: " +
          req.body.email_contact +
          "</li><li>Message: " +
          req.body.message_contact +
          "</li></ul>"
      };

      client.sendMail(email, function(err, info) {
        if (err) {
          res.render("7_contact", {
            title: "Contact",
            message: "送信できませんでした。時間を空けてお試しください。</a>"
          });
        } else {
          res.render("thankyou", {
            title: "Thank you",
            message:
              "お問合せ頂きありがとうございます。1-2営業日中に返信させて頂きますので、お待ちください。"
          });
        }
      });

      // var transporter = nodemailer.createTransport({
      //   // config mail server
      //   service: "Gmail",
      //   host: "smtp.gmail.com",
      //   port: 587,
      //   secure: false,
      //   requireTLS: true,
      //   auth: {
      //     user: "tech.mailcenter@gmail.com",
      //     pass: "senH5it@$X&8#SG1zf"
      //   }
      // });
      // var mailOptions = {
      //   from: "Rev-Trading",
      //   to: "support@rev-trading.net",
      //   cc: "ttduongtran@gmail.com",
      //   replyTo: "support@rev-trading.net",
      //   subject: "Contact from 「Rev-Trading」",
      //   text: "You recieved message from " + req.body.email_contact,
      //   html:
      //     "<p>You have got a new message</b><ul><li>Name: " +
      //     req.body.name_contact +
      //     "</li><li>Option:　" +
      //     req.body.category_contact +
      //     "</li><li>Email: " +
      //     req.body.email_contact +
      //     "</li><li>Message: " +
      //     req.body.message_contact +
      //     "</li></ul>"
      // };
      // transporter.sendMail(mailOptions, function(err, info) {
      //   console.log({ err });
      //   console.log({ info });
      // if (err) {
      //   res.render("7_contact", {
      //     title: "Contact",
      //     message: "送信できませんでした。時間を空けてお試しください。</a>"
      //   });
      // } else {
      //   res.render("thankyou", {
      //     title: "Thank you",
      //     message:
      //       "お問合せ頂きありがとうございます。1-2営業日中に返信させて頂きますので、お待ちください。"
      //   });
      // }
      // });
    } else {
      // error code
      res.render("7_contact", { title: "Contact" });
    }
  });
});

router.get("/:lang*?/*", function(req, res, next) {
  i18n.setLocale(req, req.params.lang);
  res.render("404", {
    title: "Page not found",
    language: req.params.lang || "ja"
  });
});

router.use(function(err, req, res, next) {
  // console.error(err.stack);
  res.status(500).send("Something broke!", err.stack);
});

module.exports = router;
