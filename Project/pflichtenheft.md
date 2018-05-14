# Anforderungs- und Entwurfsspezifikation ("Pflichtenheft")

Titel, Autoren, (Inhaltsverzeichnis)

# 1 Einführung

## 1.1 Beschreibung
Survey Creator

Im Rahmen unseres Projektes wollen wir eine Anwendung zur Erstellung von Umfragen erstellen. Benutzer sollen die Möglichkeit erhalten, eine Umfrage zu erstellen oder zu beantworten. Um die Umfrage anzulegen, wählt man aus einem vordefinierten Pool von Elementen. Der Umfrageersteller kann Elemente aus dem Pool individuell auswählen und  diese der Umfrage hinzufügen, wie verschiedene Seitenlayouts und verschiedene Möglichkeiten, die Fragen zu beantworten, wie Drop-Down-Antworten, Multiple-Choice-Antworten oder ob Antworten erforderlich sind. Der Beantworter soll dann in der Lage sein, die Umfrage zu beantworten, und seine Daten sollen dann in einer Datenbank gespeichert werden. Künftig kann es möglich sein, eine Analyse der Umfragedaten für den Ersteller durchzuführen.

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

Unsere Webseite ist für jederman geeignet der 

Wie bereits zuvor erwähnt ist die Zielgruppe ziemlich breit, von der technisch unerfahrenen Person bis hin zur technisch versierten Person. Aufgrund dessen sollte die Handhabung möglichst einfach sein um den unversierten Nutzer nicht auszuschließen.

### Abgrenzung (Was ist das Softwaresystem _nicht_)

Die Applikation soll nicht selbständig Umfragen erstellen sondern nur ein Werkzeug dafür sein. Es gibt keine Garantie dafür, das bei der Auswertung der Daten etwas für den Ersteller sinnvolles oder prägnantes rauskommt.

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
    - GUI-Mockups passend zu User Stories
    - Modellierung der Navigation zwischen den Screens der GUI-Mockups als Zustandsdiagramm

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
