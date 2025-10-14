console.info("content initialisation");

// Récupère le signale de l'extension pour effectuer une action.
chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {

	// Extrait l'identifiant du profil depuis l'URL.
	let ID = msg.url.split("/").slice(-2, -1)[0]

	// Si le type d'action souhaité est d'effectuer la récupération,
	// Alors, lance la collecte d'informations et retourne le résultat.
	if (msg.type == "collect") sendResponse(new LinkedinScrapper(ID))
})

class LinkedinScrapper {
	constructor(ID) {

		// Liste les variables qui contiendra les données récoltable du profile.
		this.id, this.firstname, this.lastname, this.relations, this.followers
		this.jobs, this.job, this.langs, this.skills

		// ------------------------------------------------------------

		// Récupère l'identifiant unique du profil.
		this.id = ID;

		// Récupère le nom et le prénom du profil.
		[this.firstname, this.lastname] = qs("h1")[0].innerText.split(" ")

		// ------------------------------------------------------------

		// Récupère le nombre d'abonnés et le nombre de relations.
		const FRDT = qs(".ph5.pb5 ul")[1].qs("span.t-bold")

		// Si on possède ces 2 informations,
		if (FRDT.length == 2) {

			// Alors, Formate-les et enregistre-les.
			this.relations = this.nbFormatter(FRDT[1])
			this.followers = this.nbFormatter(FRDT[0])
		} else {

			// Sinon, enregistre une valeur générique.
			this.relations = this.followers = "0"

			// Formate et enregistre l'information récupérer en fonction de ça catégorie.
			if (FRDT[0].parentElement.innerText.includes("relation")) {
				this.relations = this.nbFormatter(FRDT[0])
			} else {
				this.followers = this.nbFormatter(FRDT[0])
			}
		}

		// ------------------------------------------------------------

		// Récupère les accès au différentes sections de la page.
		const section = Object.fromEntries(
			[...document.querySelectorAll(".artdeco-card")]
				.filter(x => x.querySelector("h2"))
				.map(x => [x.innerText.split("\n")[0].toLowerCase(), x])
		)

		// Récupère les sections qui nous seront utile.
		const [jobs, skills, langs] = [
			section["expérience"],
			section["compétences"],
			section["langues"]
		]

		// ------------------------------------------------------------

		// Si la sections des expériences professionnel existe,
		// Alors, parcours celle-ci et récupère leurs données.
		this.jobs = jobs ? (function () {
			let result = []

			for (let job of jobs.qs("a.full-width")) {
				let data = [...job.qs("span")].map(x => x.innerText)
				result.push({ job: data[1], company: data[3], period: data[6], city: data[9] })
			}

			return result
		})() : null

		// Récupère le poste actuel du profil.
		this.job = this.jobs ? this.jobs[0] : null

		// ------------------------------------------------------------

		// Si la sections des compétences professionnel existe,
		// Alors, récupère le nombre de compétences qu'il possède.
		this.skills = skills ? this.nbFormatter(
			skills.qs(".pvs-navigation__text")[0]
		) : null

		// Si la sections des languges maîtrisé existe,
		// Alors, récupère le nombre de languges qu'il parle.
		this.langs = langs ? this.nbFormatter(
			langs.qs(".pvs-navigation__text")[0]
		) : null
	}

	// Fonction formattant textuellement les nombres.
	nbFormatter(e) {
		if (e?.innerText) e = e.innerText
		return e.match(/\d+/gm).join("") + (e.includes("Plus") ? "+" : "")
	}
}
