// Mouse event viewer
// Gary Kacmarcik - garykac@{gmail|google}.com

var _mouse_table_info = [
	// Unlabeled group
	["", "etype", [
		["#", "etype", "text"],
		["Event type", "etype", "html"],
		["Count", "etype", "text"],
	], {
		'grouplabel': false,
		'header-background': "#e0e0e0"
	}],

	// MouseEvent - Target
	["Target", "target", [
		["A", "target", "text", {'style': 'hilite_div_a'}],
		["B", "target", "text", {'style': 'hilite_div_b'}],
		["C", "target", "text", {'style': 'hilite_div_c'}],
	], {
		'checked': true,
		'header-background': "#ffffff"
	}],

	// MouseEvent - Handler
	["Handler", "handler", [
		["hA", "handler", "text", {'style': 'hilite_handler_a'}],
		["hB", "handler", "text", {'style': 'hilite_handler_b'}],
		["hC", "handler", "text", {'style': 'hilite_handler_c'}],
	], {
		'checked': false,
		'header-background': "#c0c0ff"
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

	// PointerLock
	["PointerLock", "plock", [
		["movementX", "plock", "text"],
		["movementY", "plock", "text"],
	], {
		'checked': true,
		'header-background': "#e0a0e0"
	}],

	// CSSOM
	["CSSOM", "cssom", [
		["offsetX", "cssom", "text"],
		["offsetY", "cssom", "text"],
		["pageX", "cssom", "text"],
		["pageY", "cssom", "text"],
		["x", "cssom", "text"],
		["y", "cssom", "text"],
	], {
		'checked': true,
		'header-background': "#c0f0c0"
	}],

	// MouseEvent - UI Events
	["Buttons", "buttons", [
		["button", "buttons", "text"],
		["buttons", "buttons", "text"],
	], {
		'checked': true,
		'header-background': "#e0e0e0"
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

function init() {
	init_shared();

	var div_a = document.getElementById("div_a");
	var div_b = document.getElementById("div_b");
	var div_c = document.getElementById("div_c");
	for (var div of [div_a, div_b, div_c]) {
		addEventListener(div, "mousedown", onMouseDown.bind(null, div));
		addEventListener(div, "mouseenter", onMouseEnter.bind(null, div));
		addEventListener(div, "mouseleave", onMouseLeave.bind(null, div));
		addEventListener(div, "mousemove", onMouseMove.bind(null, div));
		addEventListener(div, "mouseout", onMouseOut.bind(null, div));
		addEventListener(div, "mouseover", onMouseOver.bind(null, div));
		addEventListener(div, "mouseup", onMouseUp.bind(null, div));
	}

	addEventListener(document.getElementById("body"), "keydown", onKeyDown);
	addEventListener(div_a, "contextmenu", onContextMenu);
}
