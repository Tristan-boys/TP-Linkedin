console.info("background initalisation");

//const supabase_Project_Password = "SzPa0vo2409siPc3";
const SUPABASE_URL = "https://zfkjqjkngtitltsrjcnb.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpma2pxamtuZ3RpdGx0c3JqY25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MDUyNjEsImV4cCI6MjA3NTk4MTI2MX0.m43llp6m26CSOzb0n3bcBq5W2hIxX3eXRKwuMfhxrTs";
const SUPABASE_TABLE = "Profiles";

async function fetchSupabase(data) {
	const response = await fetch(
		`${SUPABASE_API_KEY}/rest/v1/${SUPABASE_TABLE}`,
		{
			method: "POST",
			headers: {
				apikey: SUPABASE_API_KEY,
				Authorization: `Bearer ${SUPABASE_API_KEY}`,
				"Content-Type": "application/json",
				Prefer: "return=representation",
			},
			body: JSON.stringify(data),
		}
	);
	if (!response.ok) {
		throw new Error(`Supabase error: ${response.statusText}`);
	}

	return await response.json();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	switch (message.type) {
		case "save_profile_firstname":
			fetchSupabase(message.firstname)
				.then((response) => {
					console.log("Firstname sauvegardé :", response);
					sendResponse({ status: "success", response });
				})
				.catch((error) => {
					console.error("Erreur lors de la sauvegarde :", error);
					sendResponse({ status: "error", error });
				});
			break;
		case "save_profile_lastname":
			fetchSupabase(message.lastname)
				.then((response) => {
					console.log("Lastname sauvegardé :", response);
					sendResponse({ status: "success", response });
				})
				.catch((error) => {
					console.error("Erreur lors de la sauvegarde :", error);
					sendResponse({ status: "error", error });
				});
			break;
		case "save_profile_follower":
			fetchSupabase(message.follower)
				.then((response) => {
					console.log("Follower sauvegardé :", response);
					sendResponse({ status: "success", response });
				})
				.catch((error) => {
					console.error("Erreur lors de la sauvegarde :", error);
					sendResponse({ status: "error", error });
				});
			break;
		case "save_profile_relations":
			fetchSupabase(message.relations)
				.then((response) => {
					console.log("Relations sauvegardé :", response);
					sendResponse({ status: "success", response });
				})
				.catch((error) => {
					console.error("Erreur lors de la sauvegarde :", error);
					sendResponse({ status: "error", error });
				});
			break;
		case "save_profile_experiences":
			fetchSupabase(message.experiences)
				.then((response) => {
					console.log("Experiences sauvegardé :", response);
					sendResponse({ status: "success", response });
				})
				.catch((error) => {
					console.error("Erreur lors de la sauvegarde :", error);
					sendResponse({ status: "error", error });
				});
			break;
		case "save_profile_certifications":
			fetchSupabase(message.certifications)
				.then((response) => {
					console.log("Certifications sauvegardé :", response);
					sendResponse({ status: "success", response });
				})
				.catch((error) => {
					console.error("Erreur lors de la sauvegarde :", error);
					sendResponse({ status: "error", error });
				});
			break;
		case "save_profile_abilities":
			fetchSupabase(message.abilities)
				.then((response) => {
					console.log("Abilities sauvegardé :", response);
					sendResponse({ status: "success", response });
				})
				.catch((error) => {
					console.error("Erreur lors de la sauvegarde :", error);
					sendResponse({ status: "error", error });
				});
			break;
		case "save_profile_current_post":
			fetchSupabase(message.current_post)
				.then((response) => {
					console.log("Current_Post sauvegardé :", response);
					sendResponse({ status: "success", response });
				})
				.catch((error) => {
					console.error("Erreur lors de la sauvegarde :", error);
					sendResponse({ status: "error", error });
				});
			break;
		case "default":
			break;
	}
});
