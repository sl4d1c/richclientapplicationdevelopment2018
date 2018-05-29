# Anforderungs- und Entwurfsspezifikation ("Pflichtenheft")

Survey Tool, A. Kul'Bashny & S. Dick

# 1 Einführung

## 1.1 Beschreibung

Im Rahmen unseres Projektes, mit dem Namen "Survey Creator", wollen wir eine Anwendung zur Erstellung von Umfragen erstellen. Registrierte Nutzer sollen die Möglichkeit erhalten Umfragen selbst erstellen zu können und alle, also auch Besucher, sollen die möglichkeit haben Umfragen beantworten zu können. Beim erstellen der Umfrage, wählt man aus einem vordefinierten Pool von Elementen. Der Umfrageersteller kann Elemente aus einem vorgefertigten Pool individuell auswählen und diese der Umfrage hinzufügen, dazu gehören verschiedene Seitenlayouts und unterschiedliche Möglichkeiten Fragen zu beantworten, wie Drop-Down-Antworten, Multiple-Choice-Antworten oder ob Antworten überhaupt erforderlich sind. Nach dem beantworten einer Umfrage werden bei uns die Daten sicher gespeichert und für den ersteller der Umfrage abrufbar gemacht. Künftig kann es möglich sein, eine Analyse der Umfragedaten für den Ersteller durchzuführen.

## 1.2 Ziele
### Anwendungsbereiche, Motivation, Umfang, Marktanforderungen, Alleinstellungsmerkmale

##### Anwendungsbereiche
Die Anwendungsbereiche sind Unternehmen, welche Umfragen zu Marktforschungszwecken durchführen, aber auch wissenschaftliche Umfragen für Forschungszwecke und private Umfragen unter Kollegen wo die nächste Weihnachtsfeier stattfindet

##### Motivation
Die Motivation dahinter ist es den Nutzern ein Werkzeug zur Verfügung zu stellen, welches ihnen erlaubt bequem und trotzdem individuell Umfragen zu erstellen, sodass sie sich nur auf die Inhalte konzentrieren können und sich keine Gedanken um die Umsetzung machen brauchen.

##### Umfang
Die Applikation soll möglichst viele Funktionen, bzw. möglichst die wichtigsten Möglichkeiten für die Beantwortung der Umfragen bieten. So soll gewährleistet werden, dass der Umfrageersteller ein breites Spektrum an Auswahl, des für ihn am besten erscheinenden Werkzeugs zur Beantwortung seiner Frage hat. Ein weiterer Vorteil ergibt sich durch die automatisierte Speicherung in eine Datenbank, wodurch der Organisationsaufwand für den Umfrageersteller sinkt. Es ergeben sich dadurch auch weitere Vorteile wie Analysemöglichkeiten nach bestimmten Kriterien.

##### Marktanforderungen
Der Markt für Umfragen ist riesig, nahezu jedes Unternehmen führt Umfragen durch z.B. zur Ermittlung der Kundenzufriedenheit, oder zur Höhe der Nachfrage, usw., es gibt aber auch wissenschaftliche Umfragen, sowie staatliche und nicht zuletzt auch private Umfragen.
Die Software muss allen Ansprüchen genügen.

##### Alleinstellungsmerkmale
Der Umfrageersteller soll mithilfe unserer Applikation die Möglichkeit erhalten alle seine Vorstellungen umzusetzen und eine Auswertung der erhobenen Daten bekommen.

### Informationen zu Zielbenutzergruppen und deren Merkmale (Bildung, Erfahrung, Sachkenntnis)
Wie bereits zuvor erwähnt ist die Zielgruppe ziemlich breit, von der technisch unerfahrenen Person bis hin zur technisch versierten Person. Aufgrund dessen sollte die Handhabung möglichst einfach sein um den unversierten Nutzer nicht auszuschließen.

### Abgrenzung (Was ist das Softwaresystem _nicht_)
Die Applikation bietet keine templates für Umfragen und ist nicht in der Lage selbständig Umfragen zu erstellen, sie ist nur ein Werkzeug dafür sein. Unserer Software ist es nicht möglich Antworten auf richtigkeit zu überprüfen, deshalb ist der Ersteller der Umfrage selbst dafür verantwortlich seine Fragen und Antwortmöglichkeiten so zu gestalten, dass bei der Auswertung der Daten für ihn sinnvolle Ergebnisse zur verfügung stehen.

# 2 Anforderungen

## 2.1 Funktionale Anforderungen

##### Registrieren

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/register.png)

##### Einloggen

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/login.png)

##### Umfragen

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/survey.png)

## 2.2 Nicht-funktionale Anforderungen

### 2.2.1 Rahmenbedingungen
Die aktuellen Webstandarts wie HTML5, javascript und nodeJS sind zu beachten. Es soll auch
auf gute Verschlüsselung geachtet werden, z.B. durch https, Authentifizierung und die
Datenbank calls sollen gekappselt über eine API erreichbar sein um direkte Zugriffe clientseitig
zu vermeiden. Bei der Hardware gibt es keine besonderen Komplikationenen, sie muss nur einen
aktuellen Browser ausführen können.

### 2.2.2 Betriebsbedingungen
Das Softwaresystem soll auf aktuellen Browsern laufen (Firefox ab v52, chrome ab v66.0.3359.181). Die Software
soll in mit React erstellt werden und auf dem Server soll nodeJS laufen mit einer ANbindung zu einer MongoDB.

### 2.2.3 Qualitätsmerkmale
Die Software soll schnell reagieren auf Benutzereingaben, Reaktionen sollen nicht länger als eine Sekunde
dauern. Es ist wichtig, dass die Daten geschüzt werden, da mitunter sensible Nutzerdaten erfasst werden.
Es soll ein ansprechendes und einfaches Design verwendet werden, um besonders benutzerfreundlich zu sein.

## 2.3 Graphische Benutzerschnittstelle

#### GUI-Mockups

##### Start

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/Main%20frame.png)

##### Registration

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/Register.png)

##### Login

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/Login.png)

##### Home

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/Main%20frame%20after%20Login.png)

##### Reset Password

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/Reset%20Mail.png)

##### Send reset Mail

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/Send%20Reset%20Mail.png)


##### Settings

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/Settings.png)

##### My Surveys

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/My%20Surveys.png)

##### Answer survey

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/Answer%20Survey.png)

##### After survey answering

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/Answering%20Thanks.png)

##### Create Survey

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/Create%20Survey.png)

##### After Create Survey

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/After%20Survey%20Creation.png)

##### Survey Result

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/Survey%20Results.png)

##### Zustandsdiagramm

![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/state.png)

## 2.4 Anforderungen im Detail - User Stories

#### Besucher

| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Besucher | die Möglichkeit haben mich zu registrieren | ich Umfragen selbst erstellen kann | Registrierung möglich |
| Besucher | die Möglichkeit haben Umfragen beantworten zu können | Umfragenersteller die Informationen bekommen nach denen sie suchen | Umfragen beantworten möglich |
| Besucher | eine Bestätigung bekommen das die Umfrage fertig beantwortet ist | ich weiß das die Umfrage abgeschlossen ist  | Weiterleitung auf After Survey Answering |

#### Registrierte Nutzer

| **Als** | **möchte ich** | **so dass** | **Akzeptanz** |
| :------ | :----- | :------ | :-------- |
| Nutzer | mich einloggen können | ich Umfragen erstellen und verwalten kann | Einloggen möglich |
| Nutzer | mein vergessenes Passwort ändern können | ich mich wieder einloggen kann | Passwort zurücksetzen möglich |
| Nutzer | Umfragen erstellen können | ich die Informationen von den Beantwortern der Umfrage erhalte | Umfragen erstellen möglich |
| Nutzer | eine Bestätigung beim Erfolgreichen erstellen meiner Umfrage erhalten | ich weiß, dass die Umfrage auch von anderen beantwortet werden kann | Weiterleiten auf die Seite after create survey |
| Nutzer | Umfragenergebnisse einsehen | ich die Informationen von den Beantwortern der Umfrage erhalte | Ergebnisse fertiger Umfragen anschauen |
| Nutzer | eine Seite haben in der ich alle meine Umfragen überblicken kann | ich bequem auf Ergebnisse oder Links zu den Umfragen zugreifen kann | Übersicht aller von dem Nutzer erstellten Umfragen vorhanden |
| Nutzer | anderen Menschen einen Link zu meinen Umfragen senden können | diese meine Umfrage beantworten können | Erstellen eines individuellen Link zu jeder Umfrage |
| Nutzer | die Möglichkeit haben Umfragen beantworten zu können | Umfragenersteller die Informationen bekommen nach denen sie suchen | Umfragen beantworten möglich |
| Nutzer | eine Bestätigung bekommen das die Umfrage fertig beantwortet ist | ich weiß das die Umfrage abgeschlossen ist  | Weiterleitung auf After Survey Answering |

# 3 Technische Beschreibung

## 3.1 Systemübersicht
##### Systemarchitekturdiagramm ("Box-And-Arrow" Diagramm)
![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/box-arrow.png)

##### Schnittstellenbeschreibung
Die einzelnen Komponenten sind Client, Server und Datenbank. Der Client hat nur eine https-Schnittstelle zum Server, der Server hat eine Anbinbung zur Datenbank und verarbeitet dann die Anfragen des Clients.

##### Kommunikationsprotokolle, Datenformate
Zur Kommunikation zwischen Client und Server wird das https Protokoll verwendet, da es zusätzliche Sicherheit bietet. Die Umfragedaten werden dann in einem Json Format in der MongoDB gespeichert.

## 3.2 Softwarearchitektur
![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/software-architektur.png)

## 3.3 Datenmodell
    - Konzeptionelles Analyseklassendiagramm

## 3.4 Abläufe
![file not found](https://github.com/sl4d1c/richclientapplicationdevelopment2018/blob/master/pictures/aktivitätsdiagramm.png)
    - Aktivitätsdiagramm für den Ablauf sämtlicher Use Cases

## 3.5 Entwurf
    - Detaillierte UML-Diagramme für relevante Softwarebausteine

# 4 Projektorganisation

## 4.1 Annahmen
    - Nicht durch den Kunden definierte spezifische Annahmen, Anforderungen und Abhängigkeiten

    - Verwendete Technologien (Programmiersprache, Frameworks, etc.)
    javascript, nodeJS, React parse-communtiy server, MongoDB

    - Einschränkungen, Betriebsbedingungen und Faktoren, die die Entwicklung beeinflussen (Betriebssysteme, Entwicklungsumgebung)
    Einarbeitung in eine unbekannte Technologie, neue Technologie => wenige Beispiele

    - Interne Qualitätsanforderungen (z.B. Softwarequalitätsmerkmale wie z.B. Erweiterbarkeit)

## 4.2 Verantwortlichkeiten
    - Zuordnung von Personen zu Softwarebausteinen aus Kapitel 3.1 und 3.2
    - Rollendefinition und Zuordnung

## 4.3 Grober Projektplan
    - Meilensteine
    Infrastruktur 15.6
    Clientimplementierung 29.6
    Abgabe Juli

# 5 Anhänge

## 5.1 Glossar
    - Definitionen, Abkürzungen, Begriffe

## 5.2 Referenzen
    - Handbücher, Gesetze

## 5.3 Index
