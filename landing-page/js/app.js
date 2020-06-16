/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */

const nav = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */



/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav

const navigation = () => {

    let navUI = '';

    // loop over section elements
    sections.forEach(section => {

        navUI += `<li><a class="menu__link" href="#${section.id}">${section.dataset.nav}</a></li>`;
    });

    // add list elements to navigation
    nav.innerHTML = navUI;

}

navigation();

// Add class 'active' to section when near top of viewport

// Check if the section is in the viewport
const activeInViewPort = (section) => {

    // return true if in the viewport
    return (section.getBoundingClientRect().top < 150 && section.getBoundingClientRect().top > -125);
}

// Change the section's class list
const changeActiveClass = () => {
    sections.forEach((section) => {
        if (activeInViewPort(section)) {
            // if the section is in viewport and does not contain the active class, add the active class
            if (!section.classList.contains('your-active-class')) {
                section.classList.add('your-active-class');
                section.firstElementChild.firstElementChild.innerText = `${section.dataset.nav} Currently Active`;
            }
        // if the section is not in viewport and contains the active class, remove it
        } else if (section.classList.contains('your-active-class')) {
            section.classList.remove('your-active-class');
            section.firstElementChild.firstElementChild.innerText = `${section.dataset.nav}`;
        }
    });
};

// activate changeActiveClass everytime user scrolls
window.addEventListener("scroll", changeActiveClass);

// Scroll to anchor ID using scrollTO event

const anchorScroll = () => {

    // get the html of the nav links
    const navLinks = document.querySelectorAll('.navbar__menu a');

    // for each navlink add an event listener to clicks
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', () => {
            // get the id of the intended target
            const sectionId = navLink.href.slice(-8);
            // get the x, y location of the intended target
            const {x, y} = document.getElementById(sectionId).getBoundingClientRect();
            // scroll to target
            window.scrollTo({
                top: x,
                left: y,
            });

        });
    });
};

anchorScroll();

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 

// Scroll to section on link click

// Set sections as active