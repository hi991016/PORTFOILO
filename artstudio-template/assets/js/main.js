$(document).ready(function() {
    // CURSOR
    let $mouseX = 0,
        $mouseY = 0,
        $left = 0,
        $top = 0;
    
    $(document).mousemove(e => {
        $mouseX = e.clientX;
        $mouseY = e.clientY;
    });

    setInterval(() => {
        $left += ($mouseX - $left) / 12;
        $top += ($mouseY - $top) / 12;
        $("#cursor").css({left: $left + "px", top: $top + "px"});
    }, 15)
    // backgroundColor: "#fff"

    linkHoverTl = new TimelineMax({ paused: true});
    linkHoverTl.to("#cursor", 0.3, { scale: 2});

    $("nav ul li a, .toggler, #brand a, .social-media ul li a").hover(
        () => {
            linkHoverTl.play();
        },
        () => {
            linkHoverTl.reverse();
        }
    )
    
    let seeMoreHover = new TimelineMax({ paused: true })
        .to('#cursor', 0.3, { scale: 2 })
        .to(".more", 0.3, { opacity: 1, color: '#000' });

    $(".img-container").each(function(i, el) {
        let imgHoverTl = new TimelineMax({ paused: true });
        imgHoverTl
            .to($(this).find("img"), 0.3, { opacity: 0.4 })
            .to($(this).find("h4"), 0.3, {opacity: 1, y: "50px"});
        el.animation = imgHoverTl;
    });

    $(".img-container").hover(
        function() {
            this.animation.play()
            seeMoreHover.play()
        },
        function() {
            this.animation.reverse();
            seeMoreHover.reverse();
        }
    );


    $(".link").each(function(i, el) {
        let footerAnimation = new TimelineMax({ repeat: -1 });

        footerAnimation.fromTo($(this), 2, {rotation: "-45"}, { ease: Power0.easeNone, rotation: "45"})
            .to($(this), 2, {ease: Power0.easeNone, rotation: "-45"});

        el.footerLinkAni = footerAnimation;

        let footerHoverTl = new TimelineMax({ paused: true });
        footerHoverTl.to($(this), 0.3, {
            boxShadow: "0 0 50px #ff5d73"
        });
        el.footerHoverAni = footerHoverTl;
    })

    $('.link').hover(
        function() {
            this.footerLinkAni.pause();
            this.footerHoverAni.play();
        },
        function() {
            this.footerLinkAni.resume();
            this.footerHoverAni.reverse();
        }
    )

    
    // LOADER
    $(".loader h6").html(
        $(".loader h6")
        .html()
        .replace(/./g, "<span>$&</span>")
        .replace(/\s/g, "&nbsp;")
    );

    loadingTl = new TimelineMax();
    loadingTl
        .staggerFrom(".loader h6 span", 0.5, {
        ease: Power4.easeIn,
        opacity: 0,
        y: -50
    }, 0.1)

    .to(".loader h6", 0.3, {y: -420})
    .to(".loader", 0.6, {height: 0})
    .from("#hero-section .hero-img", 0.4, { height: 0 })
    .staggerFrom("#hero-section h2 span", 0.5, { x: "-20px", opacity: 0 }, 0.1)
    .from("#hero-section h1", 0.5, {y: "100px", opacity: 0 })
    .staggerFrom(
        "#brand, nav, nav .toggler, .social-media ul li a ion-icon", 
        0.5, 
        {y: "-20px", opacity: 0}, 
        0.2
    )
    
    .eventCallback("onComplete", () => {
        menuTl.play();
    });

    // MENU
    let menuTl = new TimelineMax({ paused: true });

    menuTl.from("nav ul li", 0, {display: "none"})
            .staggerFrom("nav ul li", 0.3, {x: 40, opacity: 0}, 0.1)
            .to(".toggler .open", 0.1, {opacity: 0})
            .to(".toggler .close", 0.1, {opacity: 1})

    // menuTl.play();
            
    $(".toggler").click(() => {
        menuTl.reversed() ? menuTl.play() : menuTl.reverse();
    });

    $(document).scroll(function() {
        $(this).scrollTop() > 100 ? menuTl.reverse() : menuTl.play();
    })
})