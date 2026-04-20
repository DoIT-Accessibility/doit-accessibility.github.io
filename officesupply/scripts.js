OrderTable = function(table) {
	const tbody = table.querySelector("tbody");
	const template = tbody.querySelector("tr");
	const productSelects = table.querySelectorAll(".productSelect");
	const priceInputs = table.querySelectorAll(".priceInput");
	const quantityInputs = table.querySelectorAll(".quantityInput");
	const removeRowButtons = table.querySelectorAll(".removeRowButton");
	const addRowButtons = table.parentElement.querySelectorAll(".addRowButton");

	function setPrice() {
		const productSelect = this;
		const row =  productSelect.closest("tr");
		const priceInput = row.querySelector(".priceInput");
		priceInput.value = productSelect.selectedOptions[0].getAttribute("data-price");
		priceInput.onchange();
	}
	productSelects.forEach((productSelect) => { productSelect.onchange = setPrice; });

	function setTotal() {
		const row = this.closest("tr");
		const price = parseFloat(row.querySelector(".priceInput").value) || 0;
		const quantity = parseFloat(row.querySelector(".quantityInput").value) || 0;
		row.querySelector(".totalInput").value = (price * quantity) || "";
	}
	priceInputs.forEach((priceInput) => { priceInput.onchange = setTotal; });
	quantityInputs.forEach((quantityInput) => { quantityInput.onchange = setTotal; });

	function addRow() {
		const clone = template.cloneNode(true);
		copyHandlers(clone);
		clearValues(clone);
		tbody.appendChild(clone);
		renumberRows(tbody);
		setFocus(clone);
	}
	addRowButtons.forEach((addRowButton) => { addRowButton.onclick = addRow; });

	function removeRow() {
		const removeRowButton = this;
		const row = removeRowButton.closest("tr");
		if (row) {
			if (tbody.rows.length == 1) {
				clearValues(row);
				setFocus(row);
			}
			else {
				var nextRow = row.nextElementSibling || row.previousElementSibling;
				tbody.removeChild(row);
				renumberRows(tbody);
				setFocus(nextRow);
			}
		}
	}
	removeRowButtons.forEach((removeRowButton) => { removeRowButton.onclick = removeRow; });

	function copyHandlers(row) {
		const handlers = ["onchange","onclick"];
		const templateElements = template.querySelectorAll("input,select,button,.icon");
		const copyElements = row.querySelectorAll("input,select,button,.icon");
		templateElements.forEach((templateElement, i) => {
			handlers.forEach((handler) => {
				copyElements[i][handler] = templateElements[i][handler];
			});
		});
	}

	function clearValues(row) {
		const controls = row.querySelectorAll("input[type=text],select");
		controls.forEach((control) => {
			control.value = "";
		});
	}

	function setFocus(row) {
		const control = row.querySelector("input,select,button");
		control.focus();
	}

	function renumberRows() {
		const oldId = /\d+$/;
		const rows = tbody.querySelectorAll("tr");
		rows.forEach((row, i) => {
			const elements = row.querySelectorAll("tr>*:first-child,input,select,button");
			const attributes = ["id","alt","aria-label","aria-labelledby","title"];
			const newId = (i + 1).toString();
			elements.forEach((element) => {
				attributes.forEach((attribute) => {
					if (element.getAttribute(attribute) != null) {
						element.setAttribute(attribute, element.getAttribute(attribute).replace(oldId, newId));
					}
				});
				if (element.children.length == 0 && element.innerHTML.length > 0) {
					element.innerHTML = element.innerHTML.replace(oldId, newId);
				}
			});
		});
	}
}
window.addEventListener("load", function() { 
	document.querySelectorAll(".orderTable").forEach((table) => { new OrderTable(table)})
});

