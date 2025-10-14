// Créer un raccouci pour les querySelector permettant de retourner soit une liste d'élément, soit l'élément lui-même.
HTMLDocument.prototype.qs = HTMLElement.prototype.qs = NodeList.prototype.qs = function(q) {
	r = this.querySelectorAll(q); return (r.length > 1) ? r : r[0]
}

// Raccouci DOM pour les commandes communes.
qs = (r) => document.qs(r)
log = console.log

// Fonction permettant de connaitre le vrai type d'un object.
function TrueTypeOf(obj) {
	if (obj instanceof Function) return obj
	return (obj?.constructor) ? obj.__proto__.constructor : obj
}
