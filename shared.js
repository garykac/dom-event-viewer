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
	console.log("preventDefault for " + etype + " ");
	console.log(preventDefault);
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
