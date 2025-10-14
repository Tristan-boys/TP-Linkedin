import "./tools"

// Linkedin Scrapper Tool
// ----------------------
// Tested with this profiles:
// 	- https://www.linkedin.com/in/jeremy-ganem-b3200a63
// 	- https://www.linkedin.com/in/kevin-tran-59ab5b283
// 	- https://www.linkedin.com/in/lerirejaune
// 	- https://www.linkedin.com/in/jessica-alba
// ----------------------
class LinkedinScrapper {
	constructor() {
		// Fonction interne pour le formatage des données textuelles.
		function nbFormatter(e) { return e.match(/\d+/gm).join("") + (e.includes("Plus") ? "+" : "") }

		// Récupère le nom et le prénom de la personne du profil.
		[this.firstname, this.lastname] = qs("#ember706").innerText.split(" ")

		// Récupère le nombre d'abonnés et le nombre de relations.
		const FRDT = qs(".ph5.pb5 ul")[1].qs("span.t-bold")
		
		// Si le type de "FRDT" est une "NodeList",
		if (TrueTypeOf(FRDT) === NodeList) {

			// alors, Formate toute les informations.
			this.follower = nbFormatter(FRDT[0])
			this.relations = nbFormatter(FRDT[1])
		} else {

			// Sinon, défini une valeur générique.
			this.follower = this.relations = "0"

			// Récupère et formate la valeur en fonction du type de donnée que l'on a obtenu.
			if (FRDT.parentElement.innerText.includes("relation")) { this.relations = nbFormatter(FRDT) }
			else { this.follower = nbFormatter(FRDT) }
		}

		// .kUbUeMWFFRfEMZjUXbqITIadNMItFbqxpKNrA .pvs-navigation__text
		// .kUbUeMWFFRfEMZjUXbqITIadNMItFbqxpKNrA .pvs-navigation__text
	}
}


// le nom et prénom du profil => OK
// le poste actuel du profil
// le nombre d’abonnés => OK
// le nombre de relations => OK
// la liste des expériences professionnelles
// la liste des certifications et formations
// le nombre de compétences
// le nombre de langues