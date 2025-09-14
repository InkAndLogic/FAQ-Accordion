// FAQ Accordion Interaction
// - Accessible pattern using button[aria-expanded] and [hidden] panels
// - Only one item open at a time (per preview)

(function () {
	const triggers = Array.from(
		document.querySelectorAll('.accordion__trigger')
	);

	if (!triggers.length) return;

	const panels = triggers.map((btn) =>
		document.getElementById(btn.getAttribute('aria-controls'))
	);

	function closeAll(exceptBtn) {
		triggers.forEach((btn, idx) => {
			if (btn !== exceptBtn) {
				btn.setAttribute('aria-expanded', 'false');
				const panel = panels[idx];
				if (panel) panel.hidden = true;
			}
		});
	}

	function toggle(btn) {
		const expanded = btn.getAttribute('aria-expanded') === 'true';
		const panel = document.getElementById(btn.getAttribute('aria-controls'));
		if (!panel) return;

		if (expanded) {
			btn.setAttribute('aria-expanded', 'false');
			panel.hidden = true;
		} else {
			closeAll(btn);
			btn.setAttribute('aria-expanded', 'true');
			panel.hidden = false;
		}
	}

	triggers.forEach((btn) => {
		btn.addEventListener('click', () => toggle(btn));

		// Keyboard: Up/Down/Home/End to move between questions
		btn.addEventListener('keydown', (e) => {
			const i = triggers.indexOf(btn);
			if (i === -1) return;
			let nextIndex = null;
			switch (e.key) {
				case 'ArrowDown':
					nextIndex = (i + 1) % triggers.length;
					break;
				case 'ArrowUp':
					nextIndex = (i - 1 + triggers.length) % triggers.length;
					break;
				case 'Home':
					nextIndex = 0;
					break;
				case 'End':
					nextIndex = triggers.length - 1;
					break;
				default:
					break;
			}
			if (nextIndex !== null) {
				e.preventDefault();
				triggers[nextIndex].focus();
			}
		});
	});

	// Open first item by default to match preview
	const first = triggers[0];
	if (first) {
		first.setAttribute('aria-expanded', 'true');
		const panel = document.getElementById(first.getAttribute('aria-controls'));
		if (panel) panel.hidden = false;
	}
})();

