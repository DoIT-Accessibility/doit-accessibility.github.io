document.querySelectorAll("select[size]:not([multiple])").forEach((listbox) => {
	if (listbox.size > 1 && !listbox.multiple) {
		listbox.multiple = true;
		listbox.addEventListener("focus", (event) => {
			listbox.multiple = false;
		});
		listbox.addEventListener("blur", (event) => {
			listbox.multiple = true;
		});
		listbox.addEventListener("change", (event) => {
			if (listbox.selectedOptions.length > 1) {
				listbox.multiple = false;
			}
		});
	}
});