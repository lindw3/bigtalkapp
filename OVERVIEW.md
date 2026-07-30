
# BigTalk App

## Syfte

Detta är en webbapp byggd med React som är avsedd för mobilanvändning, och vars syfte är att skapa samtalsunderlag för att ha djupa samtal människor emellan.

## Översikt

Appen innehåller en huvudsida (components/QuestionList.jsx) som autogenererar frågor utifrån en lista, och där man kan klicka på "Ny fråga" för att få en ny fråga.

Det finns även en "Lägg till fråga"-sida (components/AddQuestion.jsx) där man kan lägga till egna frågor.

På den tredje sidan för inställningar (components/Settings.jsx) kan man välja språk (svenska eller engelska) samt vilka kategorier man önskar inkludera frågor från på huvudsidan. När man lägger till egna frågor blir även det en kategori som man kan välja på.

## Teknisk översikt

- Appens övergripande funktioner styrs via App.jsx
- Appens övergripande CSS styrs via App.module.css och index.css
- CSS och layout för de specifika modulerna sköts via .jsx och .css-filerna i src/components.
- Enhetens local storage används för att komma ihåg inställningar och tillagda frågor. Detta styrs via src/components/hooks/useLocalStorage.js
- Allt innehåll är anpassat för att man ska kunna byta språk mellan svenska och engelska. Detta styrs via src/components och mapparna locale och locales.
- Frågorna som genereras finns i data/defaultQuestions.js