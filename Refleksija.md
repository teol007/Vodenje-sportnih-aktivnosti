# Refleksija

Z uporabo DataDogs (https://www.datadoghq.com) sem grafično prikazal metrike mojega cevovoda (tokov) projekta.

Cevovod sem že med izdelavo poskušal optimizirati, kar se je prikazalo v metrikah: relativno kratki časi celotne izvedbe (za tastiranje, dokeriziranje, deployment na strežnike...). Prav tako navadno ne prihaja do težav med izvajanjem tokov.

Opazil sem, da je Backend CI/CD tok malo daljši od Frontend CI/CD toka. Dodatno sem Backend CI/CD optimiziral tako, da sem v Dockerfile datoteki nastavil, da se namesto nameščanja node:20 slike namesti raje node:node:20-alpine, ki je manjša. Tako se je čas za izvedbo Backend toka v povprečju nekoliko skrajšal (glej spodnji sliki za primerjavo). Manjša bo tudi velikost Docker kontejnerja.

![Povprečno trajanje tokov pred optimizacijo](docs/DataDogs%20slika%20meritev%20-%20zacetna.PNG)
*Povprečno trajanje tokov pred optimizacijo*

![Povprečno trajanje tokov po optimizaciji](docs/DataDogs%20slika%20meritev%20-%20koncna.PNG)
*Povprečno trajanje tokov po optimizaciji*

Na DataDog-u sem nastavil tudi 2 alarma za obveščanje. Če izvedba katerega izmed tokov traja več kot 3 minute in če pride v katerem izmed tokov do napake med izvajanjem.
