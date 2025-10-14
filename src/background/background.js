console.info("background initalisation");

// Défini les identifiants de la BDD supabase.
const SUPABASE_TAB = "Profiles"
const SUPABASE_PWD = "SzPa0vo2409siPc3"
const SUPABASE_URL = "https://zfkjqjkngtitltsrjcnb.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpma2pxamtuZ3RpdGx0c3JqY25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MDUyNjEsImV4cCI6MjA3NTk4MTI2MX0.m43llp6m26CSOzb0n3bcBq5W2hIxX3eXRKwuMfhxrTs"

async function fetchSupabase(data) {
	return fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TAB}`, {
		method: "POST",
		headers: {
			apikey: SUPABASE_KEY,
			Authorization: `Bearer ${SUPABASE_KEY}`,
			"Content-Type": "application/json",
			Prefer: "return=representation",
		},
		body: JSON.stringify(data),
	})
	.then(response => {
		if (!response.ok) throw new Error(`Erreur provenant de Supabase : ${response.status}`)
		return response.json()
	})
}

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
	fetchSupabase(msg.data).then(response => {
			console.log("Le profile a été sauvegardé : ", response)
			sendResponse({ status: "success", response })
		}).catch((error) => {
			console.error("Erreur lors de la sauvegarde : ", error)
			sendResponse({ status: "error", error })
		})
})
