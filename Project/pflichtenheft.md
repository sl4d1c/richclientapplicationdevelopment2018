# Anforderungs- und Entwurfsspezifikation ("Pflichtenheft")

Titel, Autoren, (Inhaltsverzeichnis)

# 1 Einführung

## 1.1 Beschreibung

Im Rahmen unseres Projektes, mit dem Namen "Survey Creator", wollen wir eine Anwendung zur Erstellung von Umfragen erstellen. Registrierte Nutzer sollen die Möglichkeit erhalten Umfragen selbst erstellen zu können und alle, also auch Besucher, sollen die möglichkeit haben Umfragen beantworten zu können. Beim erstellen der Umfrage, wählt man aus einem vordefinierten Pool von Elementen. Der Umfrageersteller kann Elemente aus einem vorgefertigten Pool individuell auswählen und diese der Umfrage hinzufügen, dazu gehören verschiedene Seitenlayouts und unterschiedliche Möglichkeiten Fragen zu beantworten, wie Drop-Down-Antworten, Multiple-Choice-Antworten oder ob Antworten überhaupt erforderlich sind. Nach dem beantworten einer Umfrage werden bei uns die Daten sicher gespeichert und für den ersteller der Umfrage abrufbar gemacht. Künftig kann es möglich sein, eine Analyse der Umfragedaten für den Ersteller durchzuführen.

## 1.2 Ziele
### Anwendungsbereiche, Motivation, Umfang, Marktanforderungen, Alleinstellungsmerkmale

##### Anwendungsbereiche
Die Anwendungsbereiche sind entweder eine Webseite, oder Apps für mobile Betriebssysteme zur Erstellung von individuellen Umfragen. 

##### Motivation
Die Motivation dahinter ist es den Nutzern ein Werkzeug zur Verfügung zu stellen, welches ihnen erlaubt bequem und trotzdem individuell Umfragen zu erstellen, sodass sie sich nur auf die Inhalte konzentrieren können und sich keine Gedanken um die Umsetzung machen brauchen. 

##### Umfang
Die Applikation soll möglichst viele Funktionen, bzw. möglichst die wichtigsten Möglichkeiten für die Beantwortung der Umfragen bieten. So soll gewährleistet werden, dass der Umfrageersteller ein breites Spektrum an Auswahl, des für ihn am besten erscheinenden Werkzeugs zur Beantwortung seiner Frage hat. Ein weiterer Vorteil ergibt sich durch die automatisierte Speicherung in eine Datenbank, wodurch der Organisationsaufwand für den Umfrageersteller sinkt. Es ergeben sich dadurch auch weitere Vorteile wie Analysemöglichkeiten nach bestimmten Kriterien. 

##### Marktanforderungen
Der Markt für Umfragen ist riesig, nahezu jedes Unternehmen führt Umfragen durch z.B. zur Ermittlung der Kundenzufriedenheit, oder zur Höhe der Nachfrage, usw., es gibt aber auch wissenschaftliche Umfragen, sowie staatliche und nicht zuletzt auch private Umfragen. 

##### Alleinstellungsmerkmale
Der Umfrageersteller soll mithilfe unserer Applikation die Möglichkeit erhalten alle seine Vorstellungen umzusetzen und eine Auswertung der erhobenen Daten bekommen.

### Informationen zu Zielbenutzergruppen und deren Merkmale (Bildung, Erfahrung, Sachkenntnis)

Wie bereits zuvor erwähnt ist die Zielgruppe ziemlich breit, von der technisch unerfahrenen Person bis hin zur technisch versierten Person. Aufgrund dessen sollte die Handhabung möglichst einfach sein um den unversierten Nutzer nicht auszuschließen.

### Abgrenzung (Was ist das Softwaresystem _nicht_)

Die Applikation bietet keine templates für Umfragen und ist nicht in der lage selbständig Umfragen zu erstellen, sie ist nur ein Werkzeug dafür sein. Unserer Software ist es nicht möglich Antworten auf richtigkeit zu überprüfen, deshalb ist der Ersteller der Umfrage selbst dafür verantwortlich seine Fragen und Antwortmöglichkeiten so zu gestalten, dass bei der Auswertung der Daten für ihn sinnvolle Ergebnisse zur verfügung stehen.

# 2 Anforderungen

## 2.1 Funktionale Anforderungen
    - Use-Case Diagramme
    - Strukturierung der Diagramme in funktionale Gruppen

## 2.2 Nicht-funktionale Anforderungen

### 2.2.1 Rahmenbedingungen
    - Normen, Standards, Protokolle, Hardware, externe Vorgaben

### 2.2.2 Betriebsbedingungen
    - Vorgaben des Kunden (z.B. Web Browser / Betriebssystem Versionen, Programmiersprache)

### 2.2.3 Qualitätsmerkmale
    - Externe Qualitätsanforderungen (z.B. Performance, Sicherheit, Zuverlässigkeit, Benutzerfreundlichkeit)

## 2.3 Graphische Benutzerschnittstelle

##### GUI-Mockups



##### Zustandsdiagramm

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/state.png)

## 2.4 Anforderungen im Detail
    - User Stories mit Akzeptanzkritierien
    - Optional: Name (oder ID) und Priorität ("Must", "Should", "Could", "Won't")
    - Strukturierung der User Stories in funktionale Gruppen

### Schablone für User Stories

| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Wer | Was | Warum | Wann akzeptiert |

### Beispiel 1

| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Benutzer | bei Fehleingabe die Lösung angezeigt bekommen | ich lernen kann | Lösung wird angezeigt |

### Beispiel 2

| **Name**| **In meiner Rolle als**...|   ...**möchte ich**...   | ..., **so dass**... | **Erfüllt, wenn**... | **Priorität**   |
|:-----|:----------:|:-------------------|:-------------|:---------|:----------------|
| Lernen  |Benutzer| bei Fehleingabe die Lösung angezeigt bekommen|ich lernen kann| Lösung wird angezeigt | Muss |


# 3 Technische Beschreibung

## 3.1 Systemübersicht
    - Systemarchitekturdiagramm ("Box-And-Arrow" Diagramm)
    - Schnittstellenbeschreibung
    - Kommunikationsprotokolle, Datenformate

## 3.2 Softwarearchitektur
    - Darstellung von Softwarebausteinen (Module, Schichten, Komponenten)

## 3.3 Datenmodell
    - Konzeptionelles Analyseklassendiagramm

## 3.4 Abläufe
    - Aktivitätsdiagramme für relevante Use Cases
    - Aktivitätsdiagramm für den Ablauf sämtlicher Use Cases

## 3.5 Entwurf
    - Detaillierte UML-Diagramme für relevante Softwarebausteine

# 4 Projektorganisation

## 4.1 Annahmen
    - Nicht durch den Kunden definierte spezifische Annahmen, Anforderungen und Abhängigkeiten
    - Verwendete Technologien (Programmiersprache, Frameworks, etc.)
    - Einschränkungen, Betriebsbedingungen und Faktoren, die die Entwicklung beeinflussen (Betriebssysteme, Entwicklungsumgebung)
    - Interne Qualitätsanforderungen (z.B. Softwarequalitätsmerkmale wie z.B. Erweiterbarkeit)

## 4.2 Verantwortlichkeiten
    - Zuordnung von Personen zu Softwarebausteinen aus Kapitel 3.1 und 3.2
    - Rollendefinition und Zuordnung

## 4.3 Grober Projektplan
    - Meilensteine

# 5 Anhänge

## 5.1 Glossar
    - Definitionen, Abkürzungen, Begriffe

## 5.2 Referenzen
    - Handbücher, Gesetze

## 5.3 Index
