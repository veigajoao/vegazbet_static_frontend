document.addEventListener("DOMContentLoaded", function(event) {

    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId),
            toggleup = document.getElementById("toggle-up")

        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
            toggleup.addEventListener('click', () => {
                // show navbar
                nav.classList.toggle('show-left-nav');
                //hide navbar buttons on sm
                document.getElementById("nav-buttons").classList.toggle('d-none');
                // change icon
                toggle.classList.toggle('fa-times');
                // add padding to body
                bodypd.classList.toggle('body-menu-pd');
                // add padding to header
                headerpd.classList.toggle('body-menu-pd');
            });
        }
        
    }

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');


    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link');

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink));

    // show chat
    const showChat = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId),
            closeChat = document.getElementById("close-chat")

        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
            const toggleFunc = () => {
                // show navbar
                document.getElementById("invisible-toggle-div").classList.toggle('invisible');
                nav.classList.toggle('invisible');
                nav.classList.toggle('show-right-nav');
                
                // change icon
                toggle.classList.toggle('invisible');
                // add padding to body
                bodypd.classList.toggle('body-chat-pd');
                // add padding to header
                headerpd.classList.toggle('body-chat-pd');
            }
            toggle.addEventListener('click', toggleFunc);
            closeChat.addEventListener('click', toggleFunc);
        }
        
    }

    showChat('chatButton', 'nav-bar-chat', 'body-pd', 'header');
    
});