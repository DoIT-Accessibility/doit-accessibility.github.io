chrome.action.onClicked.addListener(
	function(tab) {
		if (!tab.url.includes("chrome://") && !tab.url.includes("edge://")) {
			chrome.scripting.executeScript({ target: { tabId: tab.id }, func: removeRoleApplication });
		}
	}
);

function removeRoleApplication() {
	const selector = "[role='application']";
	const attribute = "role";
	const flagAttribute = "data-removed-role-application";
	let oldCount = document.querySelectorAll(selector).length;
	document.querySelectorAll(selector).forEach(element => {
		element.removeAttribute(attribute);
		element.setAttribute(flagAttribute, "true");
	})
	let newCount = document.querySelectorAll(selector).length;
	console.log(`Remove role=application; found: ${oldCount}; removed: ${oldCount - newCount}`);
}