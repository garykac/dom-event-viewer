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
		["sD", "target", "text", {'style': 'hilite_div_d'}],
		["sE", "target", "text", {'style': 'hilite_div_e'}],
	], {
		'checked': true,
		'header-background': "#ffffff"
	}],

	// MouseEvent - relatedTarget
	["relatedTarget", "relatedTarget", [
		["rA", "relatedTarget", "text", {'style': 'hilite_related_a'}],
		["rB", "relatedTarget", "text", {'style': 'hilite_related_b'}],
		["rC", "relatedTarget", "text", {'style': 'hilite_related_c'}],
		["srD", "relatedTarget", "text", {'style': 'hilite_related_d'}],
		["srE", "relatedTarget", "text", {'style': 'hilite_related_e'}],
	], {
		'checked': true,
		'header-background': "#ffffff"
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
		'header-background': "#e0e0e0"
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

	const shadow_root = div_c.attachShadow({ mode: 'open'});
	shadow_root.innerHTML =
		'<style>' +
			'div { ' +
				'margin: 10px 0 10px 10px;' +
				'padding: 10px 0 10px 10px;' +
				'border-left: 1px solid black;' +
				'border-top: 1px solid black;' +
				'border-bottom: 1px solid black;' +
				'display: inline-block;' +
			'} ' +
			'#div_d { background-color: #c0c0c0; color: white; } ' +
			'#div_e { background-color: #808080; color: white; 	min-width: 200px;} ' +
		'</style>' +
		'C (sHost)' +
		'<div id="div_d">sD' +
			'<div id="div_e">sE</div>' +
		'</div>';
	var div_d = shadow_root.getElementById("div_d");
	var div_e = shadow_root.getElementById("div_e");

	for (var div of [div_a, div_b, div_c, div_d, div_e]) {
		addEventListener(div, "mousedown", onMouseDown.bind(null, div));
		addEventListener(div, "mouseenter", onMouseEnter.bind(null, div));
		addEventListener(div, "mouseleave", onMouseLeave.bind(null, div));
		addEventListener(div, "mousemove", onMouseMove.bind(null, div));
		addEventListener(div, "mouseout", onMouseOut.bind(null, div));
		addEventListener(div, "mouseover", onMouseOver.bind(null, div));
		addEventListener(div, "mouseup", onMouseUp.bind(null, div));
		addEventListener(div, "auxclick", onAuxClick.bind(null, div));
		addEventListener(div, "click", onClick.bind(null, div));
		addEventListener(div, "dblclick", onDblClick.bind(null, div));
		addEventListener(div, "contextmenu", onContextMenu.bind(null, div));
	}

	addEventListener(document.getElementById("body"), "keydown", onKeyDown);
	addEventListener(div_a, "contextmenu", onContextMenu);
}
