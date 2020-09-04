(function($) {
  "use strict";

  /* Preload*/
  $(window).on("load", function() {
    // makes sure the whole site is loaded
    "use strict";
    $('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
    $("#preloader")
      .delay(350)
      .fadeOut("slow"); // will fade out the white DIV that covers the website.
    $("body")
      .delay(350)
      .css({
        overflow: "visible"
      });
  });

  /* Animating the navbar toggle*/
  $(".cmn-toggle-switch").on("click", function() {
    $(this).toggleClass("active");
  });

  /* Tooltip*/
  $(".tooltip-1").tooltip({
    html: true
  });

  // /* Footer reveal*/
  // $('footer').footerReveal({
  // 	shadow: false,
  // 	zIndex: -101
  // });

  /* Accordion*/
  function toggleChevron(e) {
    $(e.target)
      .prev(".panel-heading")
      .find("i.indicator")
      .toggleClass("icon_plus_alt2 icon_minus_alt2");
  }
  $(".panel-group").on("hidden.bs.collapse shown.bs.collapse", toggleChevron);

  /* Video modal*/
  $(".video_modal").magnificPopup({
    type: "iframe"
  });

  /* Parallax header*/
  $(".parallax_window_in").parallax({});

  /*  Image popups */
  $(".magnific-gallery").each(function() {
    $(this).magnificPopup({
      delegate: "a",
      type: "image",
      gallery: {
        enabled: true
      }
    });
  });

  /*Aside panel*/
  $(".aside-panel-bt").on("click", function() {
    $("#aside_panel").toggleClass("show");
    $(".layer").toggleClass("layer-is-visible");
  });
  $("#login-form-link").on("click", function() {
    $("#login-form")
      .delay(100)
      .fadeIn(100);
    $("#register-form").fadeOut(100);
    $("#register-form-link").removeClass("active");
    $(this).addClass("active");
    e.preventDefault();
  });
  $("#register-form-link").on("click", function() {
    $("#register-form")
      .delay(100)
      .fadeIn(100);
    $("#login-form").fadeOut(100);
    $("#login-form-link").removeClass("active");
    $(this).addClass("active");
    e.preventDefault();
  });

  /* Carousels*/
  $(".case_studies").owlCarousel({
    items: 3,
    loop: false,
    dots: true,
    margin: 10,
    nav: false,
    autoplay: false,
    responsiveClass: false,
    responsive: {
      320: {
        items: 1
      },
      768: {
        items: 3
      },
      1000: {
        items: 3
      }
    }
  });

  $(".carousel_project").owlCarousel({
    items: 1,
    loop: true,
    autoplay: false,
    animateIn: "fadeIn",
    margin: 0,
    stagePadding: 0,
    smartSpeed: 100,
    responsiveClass: true,
    responsive: {
      600: {
        items: 1
      },
      1000: {
        items: 1,
        nav: false
      }
    }
  });

  $(".carousel_testimonials").owlCarousel({
    items: 1,
    loop: true,
    autoplay: false,
    animateIn: "flipInX",
    margin: 30,
    stagePadding: 30,
    smartSpeed: 100,
    responsiveClass: true,
    responsive: {
      600: {
        items: 1
      },
      1000: {
        items: 1,
        nav: false
      }
    }
  });

  /* Input incrementer*/
  $(".numbers-row").append(
    '<div class="inc button_inc">+</div><div class="dec button_inc">-</div>'
  );
  $(".button_inc").on("click", function() {
    var $button = $(this);
    var oldValue = $button
      .parent()
      .find("input")
      .val();
    if ($button.text() == "+") {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 1) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button
      .parent()
      .find("input")
      .val(newVal);
  });
  var width = $(window).width();
  if (width > 769) {
    $('.navbar-nav .dropdown > a:not(a[href="#"])').on("click", function() {
      self.location = $(this).attr("href");
    });
  }
  setTimeout(() => {
    $("#contact_message").hide();
  }, 20000);

  // if ($("#g-recaptcha-response").val() != "") {
  //   $("#recaptcha_message").hide("300");
  // }

  $("#contactform").on("submit", function(e) {
    e.preventDefault();
    var formData = $("#contactform").serialize();
    var recaptcha = $("#g-recaptcha-response").val();
    if (recaptcha == "") {
      e.preventDefault();
      $("#recaptcha_message").show() ;
      // alert("Please complete the captcha");
    } else {
      $.ajax({
        type: "POST",
        url: "/contact",
        data: formData, // serializes the form's elements.
        success: function(data) {
          // alert("Submission was successful.");
          window.location.href = "thank-you";
        },
        error: function(data) {
          // alert("An error occurred.");
        }
      });
    }
  });
})(window.jQuery); // JavaScript Document
