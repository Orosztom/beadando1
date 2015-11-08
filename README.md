#1. beadandó dokumentációja

##1. Követelmény analízis

**Funkcionális elvárások:**

A webes alkalmazás amit készítünk egy egyszerű családok számára használható TODO (tennivalók kigyűjtése) program. Az alkalmazás használatához a család tagonknak először regisztrálniuk kell (jelszó és felhasználónév választás után), majd be kell lépniük a saját felhasználói adataikkal. Ezután el kell tudni érniük az aktuális tennivalók listáját, ezeket tudniuk kell szerkeszteni és törölni. 

**Nem funkcionális követelmények:**

A perzisztálásnak file-ba kell történnie és a program közzétételére a HERUKO platformot kell használni.

**Szakterületi fogalomjegyzék:**

- user: Az adatbázisban tárolt felhasználók (a hozzájuk tartozó felhasználói adatokkal)
- todo: Az adatbázisban tárolt tennivalók elnevezése.

**Használati eset modell:**

Szerep körök:

A program user típusú adatokat tárol, nekik van jogosultságok megtekinteni és szerkeszteni, valamint törölni todo-kat. Amikor elkezdjük használni a programot, akkor a usernek lehetősége van meglévő adatokkal belélpni, vagy regisztrálni. Mind a kettő után a felhasználó eléri az összes todo-t. Ezek után lehetősége van szerkeszteni ezeket, törölni őket, vagy újakat létrehozni, vagy kilépni.  

Használati eset diagram:
![Kép felirata](images/database.png)
