class: center, middle

# Tests

---
# .center[Agenda]

- Testen?
- Funktionaler Code
- NodeJS testen
  - Mocha
  - Chai
  - SinonJS
  - spies
  - stubs
  - mocks
  - Asynchrones Testen
    - Callbacks
    - Promises
- Snapshot Tests mit Jest
---

# .center[Testen?]

- Warum sollte ich testen?
	- Sicherstellen der Programmfunktionalität
- Was für tests gibt es?
	- Unit tests -> prüft die funktionalität von isolierten Code
	- Integration tests -> prüft den fluss von Informationen zwischen Komponenten
	- Functional tests -> prüft das allgemeine Verhalten des Programmes
- Wann sollte ich testen?
	- Immer
	- Vor dem schreiben des eigentlichen Code

---

# .center[Funktionaler Code]

- Wie gut man testen kann ist abhängig davon wie gut der Code geschrieben wurde
- Funktionaler Code ist Code der so gekapselt wie möglich ist
	- Ohne große abhängigkeiten lässt sich Code leichter testen
	- Globale Variablen sollten vermieden werden
		- Abhängigkeiten werden erzeugt wenn mehrere Funktionen auf eine Variable zugreifen
- Nutzung "purer" Funktionen ist notwendig
	- Verlässt sich nicht auf externe Variablen
	- Verändert keine externen Variablen
	- Gibt immer den selben output für den selben input

---

# .center[Mocha]

- Mocha ist ein Testrunner, dieses Tool führt Tests aus (npm Installation)
- wenn es installiert ist, kann man eine Ordnerstruktur anlegen, worin man die Tests
ablegt
- dann kann man alle Tests in dieser Ordnerstruktur mit Mocha laufen lassen
- mit Mocha muss man bei ArrowFunctions aufpassen, wegen "this", welches von Mocha nicht
nach ES6 Standart behandelt wird

---
# .center[Chai]

- Chai ist eine Assertion Bibliothek
- sie erweitert das einfache Assert, welches in NodeJS enthalten ist um weitere Assertions

---
# .center[SinonJS]
mit SinonJS kann man zum Testen auf spies, stubs und mocks zurückgreifen

### spies
- kreieren Fakefunktionen um zu testen wie oft Aufrufe gemacht werden
- man kann sie aber auch auf reele Funktionen anwenden um ihre Aufrufe zu tracken
### stubs
- damit kann man Funktionen ersetzen und ihr Verhalten manipulieren
- so können wir das Verhalten genau kontrolieren um unsere Szenarien zu Testen
### mocks
- sind Fake Methoden mit vorprogrammiertem Verhalten
- damit kann man Klassen testen, welche andere Klassen aufrufen

---
# .center[spies]

Beispiel

```javascript
module.exports = {
  // A func that takes in two parameters `req` and `res` [request, response]
  getIndexPage: (req, res) => {
    res.send("Hey");
  }
}
```

---

# .center[spies]

```javascript
const chai = require("chai");
const expect = chai.expect;
// import sinon
const sinon = require("sinon");
const indexPage = require("../../controllers/app.controller.js");

describe("getIndexPage", function() {
  it("should send hey", function() {
    let req = {}
    // Have `res` have a send key with a function value coz we use `res.send()` in our func
    let res = {
      // replace empty function with a spy
      send: sinon.spy()
    }

    indexPage.getIndexPage(req, res);
    // let's see what we get on res.send
    console.log(res.send);
    // `res.send` called once
    expect(res.send.calledOnce).to.be.true;
    // expect to get argument `bla` on first call
    expect(res.send.firstCall.args[0]).to.equal("bla");
  });
});
```

---

# .center[stubs]
Beispiel

```JavaScript
module.exports = {
  // A func that takes in two parameters `req` and `res` [request, response]
  getIndexPage: (req, res) => {
    if (req.user.isLoggedIn()) {
      return res.send("Hey");
    }
    res.send("Ooops. You need to log in to access this page");
  }
}
```

---

# .center[stubs]

- zunächst werden die Module importiert

```javascript
const chai = require("chai");
const expect = chai.expect;
// import sinon
const sinon = require("sinon");
const indexPage = require("../../controllers/app.controller.js");

```

---

# .center[stubs]

- hier wird mittels stub immer isLoggedIn true zurückgegeben

```javascript
describe("AppController", function()  {
  describe("getIndexPage", function() {
    it("should send hey when user is logged in", function() {
      // instantiate a user object with an empty isLoggedIn function
      let user = {
        isLoggedIn: function(){}
      }

      // Stub isLoggedIn function and make it return true always
      const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(true);

      // pass user into the req object
      let req = {
        user: user
      }

      // Have `res` have a send key with a function value coz we use `res.send()` in our func
      let res = {
        // replace empty function with a spy
        send: sinon.spy()
      }
```

---

# .center[stubs]

- zuletzt überprüfen wir ob sich die Funktion verhält wie erwartet

```javascript
indexPage.getIndexPage(req, res);
// let's see what we get on res.send
// console.log(res.send);
// `res.send` called once
expect(res.send.calledOnce).to.be.true;
expect(res.send.firstCall.args[0]).to.equal("Hey");

// assert that the stub is logged in at least once
expect(isLoggedInStub.calledOnce).to.be.true;
    });
  });
});
```

---

# .center[mocks]

- Beispiel (Module müssen importiert werden)

```javascript
describe("AppController", function()  {
  describe("getIndexPage", function() {
    it("should send hey when user is logged in", function() {
      // instantiate a user object with an empty isLoggedIn function
      let user = {
        isLoggedIn: function(){}
      }

      // Stub isLoggedIn function and make it return true always
      const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(true);

      // pass user into the req object
      let req = {
        user: user
      }

      // Have `res` have a send key with a function value coz we use `res.send()` in our func
      let res = {
        send: function(){}
      }

```

---

# .center[mocks]

```javascript
      // mock res
      const mock = sinon.mock(res);
      // build how we expect it t work
      mock.expects("send").once().withExactArgs("Hey");

      indexPage.getIndexPage(req, res);
      expect(isLoggedInStub.calledOnce).to.be.true;

      // verify that mock works as expected
      mock.verify();
    });
  });
});
```

---

# .center[Asynchrones Testen]

## Callbacks
- Probleme bei asyncronem Code, der Test ist vielleicht schon fertig bevor alle
Callbacks wieder da sind
- Lösung mit **done** keyword in **it** Funktion

```JavaScript
...
it("should return `You get a sweet :)` if `true` is passed in", function(done) {
...
```

- damit weiß mocka, dass es auf die Funktion warten muss

---

```javascript
const chai = require("chai");
const expect = chai.expect;

// This is just an async func that takes in a bool
// and calls a callback that returns a some message
// depending on the bool value
function someMadeUpAyncFunc(boolValue, cb) {
  setTimeout(function() {
    cb(boolValue ? "You get a sweet :)" : "You get nothing!!")
  }, 0);
}

// Added the `only` tag to have only this set of tests to run
describe.only("AsyncTest", function()  {
  it("should return `You get a sweet :)` if `true` is passed in", function(done) {
    someMadeUpAyncFunc(true, function(sweetCheck){
      expect(sweetCheck).to.equal("You get a sweet :)");
      done();
    });
  });

  it("should return `You get nothing!!` if `false` is passed in", function(done) {
    someMadeUpAyncFunc(false, function(sweetCheck){
      // Let's fail it on purpose just to see what happens
      expect(sweetCheck).to.equal("You get a sweet :)");
      done();
    });
  });
});
```

---

# .center[Asynchrones Testen]

## Promises

- man braucht das Paket **chai-as-promised**
- wenn man dann einen Promises testet benutzt man dann eine neue Assertion: **eventually**

---

```javascript
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));

// This is just an async func that takes in a bool
// and that returns a promise
function someMadeUpAyncFunc(boolValue, cb) {
  return new Promise(function(resolve){
    setTimeout(function() {
      resolve(boolValue ? "You get a sweet :)" : "You get nothing!!")
    }, 0);
  })
}

// Added the `only` tag to have only this set of tests to run
describe.only("AsyncTest", function()  {
  it("should return `You get a sweet :)` if `true` is passed in", function() {
    return expect(someMadeUpAyncFunc(true)).to.eventually.equal("You get a sweet :)");
  });

  it("should return `You get nothing!!` if `false` is passed in", function() {
    return expect(someMadeUpAyncFunc(false)).to.eventually.equal("You get nothing!!");
  });
});
```

---

# .center[Jest]

Was sind Snapshot Tests?  - Mit Snapshot Tests kann man ein "Bild" des funktionierenden
Codes machen und nach den Änderungen, überprüfen ob der Code noch immer so funktioniert.

Wenn man einen Code hat, kann man ein Abbild davon erstellen. Wenn man den Code dann
ändert, testet man das mit dem Snapshot Test und wenn sich der Code anders verhält,
schlägt der Test fehl.

Dann kann man entweder zurück zu dem ursprünglichen Code wechseln oder aber den
neuen Code als neues Abbild setzen.

Snapshot Testing setzt voraus, das man funktionierenden Code hat und erst danach
anfängt zu testen. Das ist nicht test-driven-development.

Es ist nur ein Tool in der Sammlung, es nicht gedacht als Allzweckwerkzeug.

---

# .center[Jest]

- Jest ist ein Testrunner
- es kommt mit expectations, mocks und spies
- und es hat auch Snapshot Testing
- Jest testet nur die Dateien, die geändert wurden
- und es testet auch die Dateien, welche die geänderten benutzen
- Jest zeigt nicht nur das ein Test fehlschlägt, sondern auch was geändert wurde

---

class: center, middle

# Vielen Dank für die Aufmerksamkeit
(Artem Kul'bashny und Slavko Dick)
