document.addEventListener("DOMContentLoaded", () => {
	const button = document.querySelector("button")!;
	button.addEventListener("click", async () => {
		const txtAreaElement = document.querySelector("textarea")!;
		const text = txtAreaElement.value;
		if (text === "") {
			alert("don't leave text area empty");
			return;
		}
		await doREquest(text);
	});
});

async function doREquest(payload: string) {
	try {
		const response = await fetch("../post/create", {
			method: "POST",
			headers: { "Content-Type": "text/plain" },
			body: payload,
		});
		if (response.status === 200) {
			showSuccess();
			console.log(await response.text());
		}
	} catch (error) {
		showFailure();
	}
}

function showSuccess() {
	alert("success");
}
function showFailure() {
	alert("failed");
}
