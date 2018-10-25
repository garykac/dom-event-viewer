// Shared helper
// Gary Kacmarcik - garykac@{gmail|google}.com

function clearChildren(e) {
	while (e.firstChild !== null) {
		e.removeChild(e.firstChild);
	}
}

function setText(e, text) {
	clearChildren(e);
	e.appendChild(document.createTextNode(text));
}

function addEventListener(obj, etype, handler) {
	if (obj.addEventListener) {
		obj.addEventListener(etype, handler, false);
	} else if (obj.attachEvent) {
		obj.attachEvent("on" + etype, handler);
	} else {
		obj["on" + etype] = handler;
	}
}

function handleDefaultPropagation(etype, e) {
	var preventDefault = document.getElementById("pd_" + etype);
	if (preventDefault.checked && e.preventDefault) {
		e.preventDefault();
	}
	var stopPropagation = document.getElementById("sp_" + etype);
	if (stopPropagation.checked && e.stopPropagation) {
		e.stopPropagation();
	}
	// Always prevent default for Tab.
	if (e.keyCode == 9 || e.code == "Tab") {
		e.preventDefault();
	}
}

function getModifierState(e) {
	Modifiers = [
		"Alt", "AltGraph", "Control", "Shift", "Meta",
		// Locking keys
		"CapsLock", "NumLock", "ScrollLock",
		// Linux
		"Hyper", "Super",
		// Virtual keyboards
		"Symbol", "SymbolLock",
		// Not valid, but check anyway
		"Fn", "FnLock",
		];

	// Safari doesn't define getModifierState for mouse events.
	if (e.getModifierState === undefined) {
		return "Undefined";
	}

	mods = undefined;
	for (var mod of Modifiers) {
		if (e.getModifierState(mod)) {
			if (!mods) {
				mods = mod;
			} else {
				mods += ", " + mod;
			}
		}
	}
	return mods;
}

function getEventPhase(e) {
	var p = e.eventPhase;
	var phase = '?';
	if (p == 0)
		phase = 'None';
	else if (p == 1)
		phase = 'Capturing';
	else if (p == 2)
		phase = 'AtTarget';
	else if (p == 3)
		phase = 'Bubbling';
	return phase;
}

function calcString(data) {
	if (data === undefined) {
		return data;
	}
	return "'" + data + "'";
}

function calcHilightString(eventType, data, addArrow) {
	if (data === undefined) {
		return null;
	}

	var keySpan = document.createElement("span");
	var enableHilight = document.getElementById("hl_" + eventType);
	if (enableHilight && enableHilight.checked) {
		keySpan.classList.add("event_hilight");
		keySpan.classList.add(eventType.toLowerCase() + "_hilight");

		// Extra classes for keyboard event viewer.
		if (addArrow && (eventType == "keydown" || eventType == "keyup")) {
			keySpan.classList.add(eventType + "_arrow");
		}
	}
	keySpan.textContent = data;
	return keySpan;
}

// CSS Stylesheet management

function injectCustomCSS(event_info, table_info) {
	// Find style sheet to inject into.
	var sheet = undefined;
	for (var i = 0; i < document.styleSheets.length; i++) {
		if (document.styleSheets[i].title == "inject") {
			sheet = document.styleSheets[i];
		}
	}

	if (sheet) {
		for (var event of event_info) {
			var ename = event[0];
			var options = event[1][name];
			var background = event[2];
			if (background != "") {
				sheet.insertRule("." + ename.toLowerCase() + "_hilight { background: " + background + "; }", 0);
			}
		}

		for (var group of table_info) {
			var name = group[0];
			var type = group[1];
			var options = group[3];
			if (options && options['header-background']) {
				var background = options['header-background'];
				var cssRule = "." + type + "_header { background-color: " + background + "; font-weight: bold; border: 1px solid black; }";
				sheet.insertRule(cssRule, 0);
			}
		}
	}
}
