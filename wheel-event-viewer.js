// Mouse event viewer - shared
// Gary Kacmarcik - garykac@{gmail|google}.com

var _wheel_event_info = [
	["mousedown", {
		'preventDefault': {'checked': false},
		'stopPropagation': {},
		'ShowEvents': {},
		'Highlight': {'checked': false},
		},
		"#ccffcc"],
	["mouseup", {
		'preventDefault': {'checked': false},
		'stopPropagation': {},
		'ShowEvents': {},
		'Highlight': {'checked': false},
		},
		"#ffcccc"],
	["wheel", {
		'preventDefault': {'checked': true},
		'stopPropagation': {},
		'ShowEvents': {},
		'Highlight': {},
		},
		"#e0e0e0"],
];

var _wheel_table_info = [
	// Unlabeled group
	["", "etype", [
		["#", "etype", "text"],
		["Event type", "etype", "html"],
	], {
		'grouplabel': false,
		'header-background': "#e0e0e0"
	}],

	// Event
	["Event", "event", [
		["eventPhase", "event", "text"],
		["bubbles", "event", "bool"],
		["cancelable", "event", "bool"],
		["defaultPrevented", "event", "bool"],
		["composed", "event", "bool"],
		["isTrusted", "event", "bool"],
		["timeStamp", "event", "text"],
	], {
		'checked': false,
		'header-background': "#a0ffff"
	}],

	// UIEvent
	["UIEvent", "uievent", [
		["view", "uievent", "text"],
		["detail", "uievent", "text"],
	], {
		'checked': false,
		'header-background': "#ffffff"
	}],

	// MouseEvent - UI Events
	["MouseEvent", "mouseevent", [
		["screenX", "mouseevent", "text"],
		["screenY", "mouseevent", "text"],
		["clientX", "mouseevent", "text"],
		["clientY", "mouseevent", "text"],
	], {
		'checked': true,
		'header-background': "#ffffc0"
	}],

	// MouseEvent - UI Events
	["Buttons", "buttons", [
		["button", "buttons", "text"],
		["buttons", "buttons", "text"],
	], {
		'checked': true,
		'header-background': "#e0e0e0"
	}],

	// WheelEvent - UI Events
	["Wheel", "wheel", [
		["deltaX", "wheel", "text"],
		["deltaY", "wheel", "text"],
		["deltaZ", "wheel", "text"],
		["deltaMode", "wheel", "text"],
	], {
		'checked': true,
		'header-background': "#c0f0c0"
	}],

	// KeyboardEvent - Modifiers
	["Modifiers", "modifiers", [
		["getModifierState", "modifiers", "text"],
		["shift", "modifiers", "bool"],
		["ctrl", "modifiers", "bool"],
		["alt", "modifiers", "bool"],
		["meta", "modifiers", "bool"],
	], {
		'checked': true,
		'header-background': "#ffc0c0"
	}],
];

function setUserAgentText() {
	var userAgent = navigator.userAgent;
	uaDiv = document.getElementById("useragent");
	setText(uaDiv, userAgent);
}

function resetTable() {
	clearTable();
	initOutputTable(_wheel_table_info);
}

function init() {
	setUserAgentText();
	var extra_options = [
		["text", "Note: Options apply to new events only."],
		["text", "Press 'c' to Clear Table."],
	];
	createOptions(document.getElementById("options"), _wheel_event_info, _wheel_table_info, extra_options);
	injectCustomCSS(_wheel_event_info, _wheel_table_info);
	resetTable();

	var target = document.getElementById("target");
	addEventListener(target, "mousedown", onMouseDown);
	addEventListener(target, "mouseup", onMouseUp);
	addEventListener(target, "wheel", onWheel);

	addEventListener(document.getElementById("body"), "keydown", onKeyDown);
	addEventListener(target, "contextmenu", onContextMenu);
}

function onKeyDown(e) {
	if (e.code == "KeyC") {
		resetTable();
	}
}

function onContextMenu(e) {
	e.preventDefault();
	e.stopPropagation();
}

function onMouseDown(e) {
	handleMouseEvent("mousedown", e);
}

function onMouseUp(e) {
	handleMouseEvent("mouseup", e);
}

function onWheel(e) {
	handleMouseEvent("wheel", e);
}

function handleMouseEvent(etype, e) {
	var show = document.getElementById("show_" + etype);
	if (show.checked) {
		addMouseEvent(etype, e);
	}
	handleDefaultPropagation(etype, e);
}

function addMouseEvent(etype, e) {
	if (!e) {
		e = window.event;
	}
	var target = e.target.id;
	var eventinfo = {};
	eventinfo["Event type"] = calcHilightString(etype, e.type, true);

	eventinfo["eventPhase"] = getEventPhase(e);
	eventinfo["bubbles"] = e.bubbles;
	eventinfo["cancelable"] = e.cancelable;
	eventinfo["defaultPrevented"] = e.defaultPrevented;
	eventinfo["composed"] = e.composed;
	eventinfo["isTrusted"] = e.isTrusted;
	eventinfo["timeStamp"] = e.timeStamp;

	eventinfo["view"] = calcString(e.view !== null ? e.view.name : "null");
	eventinfo["detail"] = e.detail;

	eventinfo["screenX"] = e.screenX;
	eventinfo["screenY"] = e.screenY;
	eventinfo["clientX"] = e.clientX;
	eventinfo["clientY"] = e.clientY;

	var button = "-";
	if (etype == "mousedown" || etype == "mouseup") {
		button = e.button;
	}
	eventinfo["button"] = button;
	eventinfo["buttons"] = e.buttons;

	eventinfo["getModifierState"] = getModifierState(e);
	eventinfo["shift"] = e.shiftKey;
	eventinfo["ctrl"] = e.ctrlKey;
	eventinfo["alt"] = e.altKey;
	eventinfo["meta"] = e.metaKey;

	eventinfo["deltaX"] = e.deltaX;
	eventinfo["deltaY"] = e.deltaY;
	eventinfo["deltaZ"] = e.deltaZ;
	
	var deltaMode = "-";
	if (etype == "wheel") {
		if (e.deltaMode == 0)
			deltaMode = "PIXEL";
		else if (e.deltaMode == 1)
			deltaMode = "LINE";
		else if (e.deltaMode == 2)
			deltaMode = "PAGE";
		else
			deltaMode = "??? (" + e.deltaMode + ")";
	}
	eventinfo["deltaMode"] = deltaMode;

	addEventToOutput(eventinfo);
}
