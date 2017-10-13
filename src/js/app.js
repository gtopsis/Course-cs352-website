import 'bootstrap';
import _ from 'lodash';
var sha256 = require('sha-256-js');
import 'jquery.easing';
// useless for now
// import './jqBootstrapValidation'; 

import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../scss/agency.scss'; // all sass styles

const data = require('../content/data.json'); // data of the course

// assets
import '../img/material/bibliography.jpg';
import '../img/material/usefullLinks.jpg';

window.lang = 'Gr';
var pendingFile = '';

function isRequired(name) {
	throw new Error(name + 'is required');
}

window.changeLang = function (e) {
	window.lang = (window.lang !== "Gr") ? "Gr" : "En";
	console.log(window.lang);
	$("a.selected-lang").removeClass('selected-lang');
	$(e).addClass("selected-lang");
}

window.clearErrorMsg = function () {
	$(".wrong-password-msg")[0].innerHTML = '';
}

window.downloadFile = function (filePath) {
	let userPassword = $("input[name=password]")[0].value || '';

	let postData = {
		filePath
	};

	if (userPassword) {
		postData.password = sha256(userPassword);
	}

	$.ajax({
			method: 'POST',
			url: '/~hy352/new-site/authentication.php',
			data: postData
		}).then(
			function (data) {
				$('.wrong-password-msg')[0].innerHTML = '';
				$("input[name=password]")[0].value = '';
				$('#passwordModal').modal('hide');

				if (filePath == 'default') {
					window.location = "/~hy352/new-site//download.php?filePath=" + pendingFile;
				} else {
					window.location = "/~hy352/new-site//download.php?filePath=" + filePath;
				}
			}
		)
		.catch(function (data) {
			if (userPassword) {
				$("input[name=password]")[0].value = '';
				$('.wrong-password-msg').text('Wrong password. Please try again!');
			} else {
				pendingFile = filePath;
				$('.wrong-password-msg')[0].innerHTML = '';
				$('#passwordModal').modal('show');
			}
		});
}


function loadHeader() {
	let tpl = _.template($('#headerTpl').html());
	let intro = data.Header.Intro;
	$('.course-intro').html(tpl({
		introList: [intro.Lead, intro.Heading, intro.Details]
	}));
}

function loadMenu() {
	let tpl = _.template($('#menuTpl').html());
	let menuList = data.Header.Menu;
	$('.course-menu').html(tpl({
		menuList
	}));
}

function loadMainInformation() {
	let tpl = _.template($('#mainInfoTpl').html());

	let header = data.MainInfo.Header;
	let description = data.MainInfo.Description;

	let scheduleList = data.MainInfo.Schedule;
	let contactList = data.MainInfo.Contact;

	$('.course-main-info').html(tpl({
		header,
		description,
		scheduleList,
		contactList
	}));
}

function loadLectures() {
	let tpl = _.template($('#lecturesTpl').html());
	let lecturesList = data.Lectures;

	$('.course-lectures-container').html(tpl({
		lecturesList
	}));
}

function loadExtraMaterial() {
	let tpl = _.template($('#extraMaterialTpl').html());

	let tutorialsList = data.ExtraMaterial.Tutorials;
	let supplementaryMaterialList = data.ExtraMaterial.SupplementaryMaterial;
	let header = data.ExtraMaterial.Header;

	$('.course-extra-material-container').html(tpl({
		header,
		tutorialsList,
		supplementaryMaterialList
	}));
}

function loadProject() {
	let tpl = _.template($('#projectTpl').html());
	let projectList = data.Project;
	$('.course-project-container').html(tpl({
		projectList
	}));
}

function loadResources() {
	let tpl = _.template($('#resourcesTpl').html());
	let resourcesList = data.Resources;
	$('.course-resources-container').html(tpl({
		resourcesList
	}));
}

function loadBibliography() {
	let tpl = _.template($('#bibliographyTpl').html());

	let header = data.Bibliography.Header;
	let intro = data.Bibliography.Intro;
	let resources = data.Bibliography.Resources;

	$('.course-bibliography').html(tpl({
		header,
		intro,
		resources
	}));
}

function loadUsefulLinks() {
	let tpl = _.template($('#usefulLinksTpl').html());
	let header = data.UsefulLinks.Header;
	let links = data.UsefulLinks.Links;

	$('.course-useful-links').html(tpl({
		header,
		links
	}));
}

export function render() {
	loadHeader();
	loadMenu();
	loadMainInformation();

	// Content
	loadLectures();
	loadExtraMaterial();
	loadProject();

	// Resources Grid 
	loadResources();

	// Modals
	loadBibliography();
	loadUsefulLinks();
}
render();



// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
			$('html, body').animate({
				scrollTop: (target.offset().top - 50)
			}, 1000, "easeInOutExpo");
			return false;
		}
	}
});

// Closes responsive menu when a scroll trigger link is clicked
$('.js-scroll-trigger').click(function () {
	$('.navbar-collapse').collapse('hide');
});

// Activate scrollspy to add active class to navbar items on scroll
$('body').scrollspy({
	target: '#mainNav',
	offset: 170
});

// Collapse the navbar when page is scrolled
$(window).scroll(function () {
	if ($("#mainNav").offset().top > 100) {
		$("#mainNav").addClass("navbar-shrink");
	} else {
		$("#mainNav").removeClass("navbar-shrink");
	}
});


// MODAL EVENTS


// Every time a modal is shown, if it has an autofocus element, focus on it.
$('.modal').on('shown.bs.modal', function () {
	$("input[name=password]")[0].focus();
	$("input[name=password]")[0].value = '';
	$(".wrong-password-msg")[0].innerHTML = '';
});

// Clear password every time that modal closed
$('.modal').on('hidden.bs.modal', function () {
	$("input[name=password]")[0].value = '';
	$(".wrong-password-msg")[0].innerHTML = '';
});