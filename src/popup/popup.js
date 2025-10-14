console.info("popup initialisation");

(async()=>{

	// Récupère l'onglet actif et quitte si on n'est pas sur linkedin.com
	const t=(await chrome.tabs.query({ active: true }))[0];
	if(!t?.url?.includes("linkedin.com")) return window.close();

	// Récupère le profil via le content script et demande au background de le sauvegarder
	const profile=await chrome.tabs.sendMessage(t.id,{ type:"collect",  url:t.url });
	chrome.runtime.sendMessage({ type:"save_profile",  data:profile });
	console.log(profile);

	// Utilitaires DOM et transformations courtes :
	// $	-> querySelector
	// setT -> set innerText (fallback "—")
	// setH -> set innerHTML (fallback "—")
	// init -> calcul des initiales
	// chips -> rendu des "chips" à partir d'un tableau ou d'une chaîne
	const $=s=>document.querySelector(s),
		setT=(s,v)=>{const e=$(s); if(e) e.innerText = v ?? "—"},
		setH=(s,v)=>{const e=$(s); if(e) e.innerHTML = v ?? "—"},
		init=(f,l)=>(((f?.[0]??"") + (l?.[0]??"")).toUpperCase()||"U"),
		chips=(sel,vals)=>{const c=$(sel); if(!c) return; c.innerHTML=""; 
			if(!vals) return void(c.innerHTML='<span class="muted">Non renseigné</span>');
			const items = typeof vals=="string" ? vals.split(",").map(x=>x.trim()).filter(Boolean) : vals;
			items.forEach(i=>{c.innerText=i});
		};

	// Header : avatar + nom
	const av=$("#avatar"); if(av) av.innerText = init(profile.firstname,profile.lastname);
	setT("#profile-id", "ID: " + profile.id);
	setT("#profile-firstname", profile.firstname);
	setT("#profile-lastname", profile.lastname);

	// Statistiques : relations et followers
	setT("#profile-relations", profile.relations);
	setT("#profile-followers", profile.followers);

	// Emplois : nombre, poste courant (ou premier historique) et liste complète
	const jobs = profile.jobs || [];
	setT("#profile-jobs-count", jobs.length);
	const curr = profile.job || jobs[0] || null;
	if(curr) setH("#profile-job", `${curr.job} <div class="company">${curr.company}</div>`);
	else setT("#profile-job", "Aucun");

	const jobsList = $("#profile-jobs");
	if(jobsList) {
		jobsList.innerHTML = "";
		if(jobs.length) jobs.forEach(j=>{ const li=document.createElement("li"); li.innerHTML = `${j.job} <div class="company">${j.company}</div>`; jobsList.appendChild(li) })
		else jobsList.innerHTML = '<li class="muted">Aucun historique d\'emploi</li>';
	}

	// Langues & compétences : affichage en chips
	chips("#profile-langs", profile.langs);
	chips("#profile-skills", profile.skills);
})();
