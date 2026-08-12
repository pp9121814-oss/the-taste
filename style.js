/* =====================================================
   THE TASTEE — JAVASCRIPT
   ===================================================== */


/* =========================
   RESTAURANT SETTINGS
   ========================= */

const RESTAURANT_NAME = "The Tastee Resort & Cafe";

/*
   Yahan baad me restaurant ka actual WhatsApp number daalna.

   Example:
   const WHATSAPP_NUMBER = "919876543210";

   +, spaces ya brackets mat lagana.
*/

const WHATSAPP_NUMBER = "";


/* =========================
   NAVBAR SCROLL EFFECT
   ========================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        header.style.background = "rgba(8, 9, 8, 0.96)";

    } else {

        header.style.background = "rgba(11, 12, 11, 0.75)";

    }

});


/* =========================
   SMOOTH NAVIGATION
   ========================= */

document.querySelectorAll(".navbar a").forEach(function (link) {

    link.addEventListener("click", function () {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =========================
   GALLERY LIGHTBOX
   ========================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const lightbox = document.createElement("div");

lightbox.className = "lightbox";

lightbox.innerHTML = `
    
    <button class="lightbox-close">
        ×
    </button>

    <img
        class="lightbox-image"
        src=""
        alt="Gallery Image"
    >

`;


document.body.appendChild(lightbox);


const lightboxImage =
    lightbox.querySelector(".lightbox-image");

const lightboxClose =
    lightbox.querySelector(".lightbox-close");


galleryItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const image =
            this.querySelector("img");

        lightboxImage.src = image.src;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


lightboxClose.addEventListener("click", closeLightbox);


lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================
   ESCAPE KEY
   ========================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeLightbox();

    }

});


/* =========================
   MENU DATA
   ========================= */

const menuItems = [

    {
        name: "Veg Momos",
        price: 120
    },

    {
        name: "Paneer Tikka",
        price: 220
    },

    {
        name: "Crispy Corn",
        price: 160
    },

    {
        name: "Butter Chicken",
        price: 320
    },

    {
        name: "Paneer Butter Masala",
        price: 260
    },

    {
        name: "Veg Fried Rice",
        price: 180
    },

    {
        name: "Cold Coffee",
        price: 140
    },

    {
        name: "Fresh Lime Soda",
        price: 90
    }

];


/* =========================
   RESERVATION FORM
   ========================= */

const reservationForm =
    document.querySelector(".reservation-form");


reservationForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const inputs =
            reservationForm.querySelectorAll(
                "input, select"
            );


        const name = inputs[0].value;

        const phone = inputs[1].value;

        const date = inputs[2].value;

        const time = inputs[3].value;

        const guests = inputs[4].value;


        if (
            name === "" ||
            phone === "" ||
            date === "" ||
            time === ""
        ) {

            alert(
                "Please fill all required details."
            );

            return;

        }


        /* =========================
           SAVE RESERVATION
           ========================= */

        const reservation = {

            name: name,

            phone: phone,

            date: date,

            time: time,

            guests: guests,

            createdAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            "tasteeReservation",
            JSON.stringify(reservation)
        );


        /* =========================
           SUCCESS MESSAGE
           ========================= */

        alert(
            "✨ Reservation request saved!\n\n" +
            "Thank you, " +
            name +
            "!"
        );


        /* =========================
           WHATSAPP
           ========================= */

        if (WHATSAPP_NUMBER !== "") {

            const message =
                `Hello ${RESTAURANT_NAME}!%0A%0A` +

                `I would like to reserve a table.%0A%0A` +

                `Name: ${name}%0A` +

                `Phone: ${phone}%0A` +

                `Date: ${date}%0A` +

                `Time: ${time}%0A` +

                `Guests: ${guests}`;


            const whatsappURL =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }


        reservationForm.reset();

    }
);


/* =========================
   SAVE LAST RESERVATION
   ========================= */

const savedReservation =
    localStorage.getItem(
        "tasteeReservation"
    );


if (savedReservation) {

    console.log(
        "Previous reservation:",
        JSON.parse(savedReservation)
    );

}


/* =========================
   MENU HOVER EFFECT
   ========================= */

const menuRows =
    document.querySelectorAll(".menu-item");


menuRows.forEach(function (item) {

    item.addEventListener(
        "mouseenter",
        function () {

            this.style.borderColor =
                "rgba(201,161,90,0.4)";

        }
    );


    item.addEventListener(
        "mouseleave",
        function () {

            this.style.borderColor =
                "rgba(255,255,255,0.12)";

        }
    );

});


/* =========================
   SCROLL REVEAL ANIMATION
   ========================= */

const revealElements =
    document.querySelectorAll(
        ".about-content, " +
        ".about-image, " +
        ".experience-card, " +
        ".menu-item, " +
        ".gallery-item, " +
        ".reservation-content, " +
        ".reservation-form, " +
        ".location-content, " +
        ".location-image"
    );


revealElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

});


const revealObserver =
    new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================
   HERO PARALLAX
   ========================= */

const heroImage =
    document.querySelector(".hero-image");


window.addEventListener("scroll", function () {

    const scrollPosition =
        window.scrollY;


    if (
        heroImage &&
        scrollPosition < window.innerHeight
    ) {

        heroImage.style.transform =
            `scale(1.02) translateY(${scrollPosition * 0.12}px)`;

    }

});


/* =========================
   CURRENT YEAR
   ========================= */

const copyright =
    document.querySelector(".copyright");


if (copyright) {

    copyright.innerHTML =
        `© ${new Date().getFullYear()} The Tastee Resort & Cafe`;

}


/* =========================
   CONSOLE MESSAGE
   ========================= */

console.log(
    "%c THE TASTEE RESORT & CAFE ",
    "color:#c9a15a;font-size:20px;font-weight:bold;"
);

console.log(
    "%c Website loaded successfully ✨ ",
    "color:#aaa;font-size:13px;"
);