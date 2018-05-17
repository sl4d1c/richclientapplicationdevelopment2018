class: center, middle

# ES6

---

# Agenda

* Einführung
* Pfeil Funktionen
* Erweiterte Objektliterale
* Destrukturierung
* Standart Parameter
* Let + Const
* Promises
* Rest + Spread
* Vorlage Strings

---

# Einführung

ES6 ist die aktuellste Version des ECMAScript Standarts. ES6 hat einge signifikante Änderungen
erfahren. Es bringt einige neue Features.

Hier gehen wir auf einige der vielen neuen features ein.

---

# Pfeil Funktionen

Pfeile sind eine Funktion mit der Syntax **=>**. Sie sind syntaktisch ähnlich wie die entsprechenden
Funktionen in C#, Java 8 und CoffeeScript. Sie unterstützen sowohl Anweisungsblockkörper
als auch Ausdruckskörper, die den Wert des Ausdrucks zurückgeben.

```javascript
let array = [1,7,98,5,4,2]

// ES5 way
var moreThan20 = array.filter(function (num) {
  return num > 20
})

// ES6 way
let moreThan20 = array.filter(num => num > 20)
```

---

name: eo

# Erweiterte Objektliterale

In ES6 wurden Objektliterale erweitert um:
  1. Eigenschaft:Wert Kurzchreibweise
  2. Methoden Kurzschreibweise
  3. Möglichkeit berechnete Eigenschaftsnamen zu verwenden

---

template: eo

```javascript
//Eigenschaft:Wert Kurzchreibweise
const fullName = 'Zell Liew'

// ES6 way
const Zell = {
  fullName
}

// Underneath the hood, ES6 does this:
const Zell = {
  fullName: fullName
}
```

---

template: eo

```javascript
//Methoden Kurzschreibweise
const anObject = {
  // ES6 way
  aShorthandMethod (arg1, arg2) {},
  // ES5
  aLonghandMethod: function (arg1, arg2) {},
}
```

---

template: eo

```javascript
//Möglichkeit berechnete Eigenschaftsnamen zu verwenden
const newPropertyName = 'smile'
// ES5 Create an object first
const anObject = { aProperty: 'a value' }
// Then assign the property
anObject[newPropertyName] = ':D'
// Adding a slightly different property and assigning it
anObject['bigger ' + newPropertyName] = 'XD'
// ES6 way.
const anObject = {
  aProperty: 'a value',
  // Dynamic property names!
  [newPropertyName]: ':D',
  ['bigger ' + newPropertyName]: 'XD',
}
// Result the same for both
// {
//   aProperty: 'a value',
//   'bigger smile': 'XD'
//   smile: ':D',
// }
```

---

# Destrukturierung

Die Destrukturierung ermöglicht das Binden mittels Pattern-Matching, für Arrays und Objekte.
Die Destrukturierung ist Fail-Soft, sie erzeugt undefinierte Werte, wenn sie nicht matchen kann.

```javascript
const Zell = {
  firstName: 'Zell',
  lastName: 'Liew'
}

//ES5
let firstName = Zell.firstName // Zell
let lastName = Zell.lastName // Liew

//ES6
let { firstName, lastName } = Zell

console.log(firstName) // Zell
console.log(lastName) // Liew

//arrays
let scores = ['98', '95', '93', '90', '87', '85']
let [first, second, third, ...rest] = scores

console.log(first) // 98
console.log(second) // 95
console.log(third) // 93
console.log(rest) // [90, 87, 85]
```

---

# Standart Parameter

Man kann default Parameter in Funktionen setzen, falls sie nicht immer mitgegeben werden können

```javascript
const announcePlayer = (firstName, lastName, teamName = 'unaffiliated') => {
  console.log(firstName + ' ' + lastName + ', ' + teamName)

}

announcePlayer('Zell', 'Liew')
// Zell Liew, unaffiliated

announcePlayer('Stephen', 'Curry', 'Golden State Warriors')
// Stephen Curry, Golden State Warriors
```

---

# Let + Const

Blockbedingter Geltungsbereich für Bindungskonstrukte. **let** ist die neue **var**.
**const** ist eine Einzelzuordnung und ist immutable.

```javascript
function f() {
  {
    let x;
    {
      // okay, block scoped name
      const x = "sneaky";
      // error, const
      x = "foo";
    }
    // error, already declared in block
    let x = "inner";
  }
}
```

---

#	Promises
Mit Promises kann man asynchron programmieren.

```javascript
//ES5
function doSecond() {
    console.log('Do second.');
}
function doFirst(callback) {
    setTimeout(function() {
        console.log('Do first.');

        callback();
    }, 500);
}
doFirst(doSecond);
//ES6
let doSecond = () => {
    console.log('Do second.');
}
let doFirst = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Do first.');

        resolve();
    }, 500);
});
doFirst.then(doSecond);
```

---

# Rest + Spread

Mit **rest** bekommt man eine kommaseparierte Liste und packt sie in ein
Array.

**spread** macht das Gegenteil, man bekommt ein Array und es wird eine kommaseparierte
Liste erstellt.

```javascript
//rest
let scores = ['98', '95', '93', '90', '87', '85']
let [first, second, third, ...restOfScores] = scores

console.log(restOfScores) // [90, 97, 95]

//spread
let array = ['one', 'two', 'three']

// These two are exactly the same
console.log(...array) // one two three
console.log('one', 'two', 'three') // one two three
```

---

# Vorlage Strings

**template strings** sind toll für den Aufbau von Strings. Dies ist vergleichbar mit
Stringinterpolationsfunktionen in Perl, Python und mehr. Optional kann ein **tag** hinzugefügt
werden, um die Stringkonstruktion anzupassen, um Injektionsangriffe zu vermeiden oder aus
Stringinhalten übergeordnete Datenstrukturen aufzubauen.

```javascript
const firstName = 'Zell'
const lastName = 'Liew'
const teamName = 'unaffiliated'

const theString = `${firstName} ${lastName}, ${teamName}`

console.log(theString)
// Zell Liew, unaffiliated
```

---

# .center[Ende]

.center[Vielen Dank für die Aufmerksamkeit]
