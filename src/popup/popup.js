console.info("popup initalisation")

;(async () => {
	let ID = (await chrome.tabs.query({ active: true }))[0].id
	let profile = await chrome.tabs.sendMessage(ID, { type: "collect" })
	console.log(profile)

	chrome.runtime.sendMessage({
		type: "save_profile_firstname",
		firstname: profile.firstname,
	})
	chrome.runtime.sendMessage({
		type: "save_profile_lastname",
		lastname: profile.lastname,
	})
	chrome.runtime.sendMessage({
		type: "save_profile_follower",
		follower: profile.follower,
	})
	chrome.runtime.sendMessage({
		type: "save_profile_relations",
		relations: profile.relations,
	})
	chrome.runtime.sendMessage({
		type: "save_profile_experiences",
		experiences: profile.experiences,
	})
	chrome.runtime.sendMessage({
		type: "save_profile_certifications",
		certifications: profile.certifications,
	})
	chrome.runtime.sendMessage({
		type: "save_profile_abilities",
		abilities: profile.abilities,
	})
	chrome.runtime.sendMessage({
		type: "save_profile_current_post",
		current_post: profile.current_post,
	})
})()
