import { generateId } from '../utils/generateId';

const defaultQuestions = [
  {
    id: generateId(),
    question: "Vilken inre barriär håller dig tillbaka mest?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Vad innebär det att \"vara sig själv\"?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Vad är ett \"bra liv\" för dig?",
    category: "Värderingar & Prioriteringar"
  },
  {
    id: generateId(),
    question: "Vilket råd skulle du ge till ditt yngre jag?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Hur reagerar du när du blir arg?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Vad prioriterar många för högt i sina liv?",
    category: "Värderingar & Prioriteringar"
  },
  {
    id: generateId(),
    question: "Vilken egenskap ser de flesta som negativ, fast att den egentligen är positiv?",
    category: "Värderingar & Prioriteringar"
  },
  {
    id: generateId(),
    question: "Nämn en förändring du gjort den senaste tiden som hade en betydande positiv påverkan på ditt liv",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Vilken egenskap ser de flesta som positiv, fast att den egentligen är negativ?",
    category: "Intressen & Drivkrafter"
  },
  {
    id: generateId(),
    question: "Om du skulle lära dig någonting helt nytt, vad skulle det vara?",
    category: "Intressen & Drivkrafter"
  },
  {
    id: generateId(),
    question: "På vilket sätt har du förändrats mest de senaste fem åren?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Vilken är din största drivkraft?",
    category: "Intressen & Drivkrafter"
  },
  {
    id: generateId(),
    question: "Vilken vardagsrutin värdesätter du högst?",
    category: "Intressen & Drivkrafter"
  },
  {
    id: generateId(),
    question: "Hur hanterar du självtvivel, ångest och/eller oro?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "När känner du som mest att du hamnar i ett \"flow\"?",
    category: "Intressen & Drivkrafter"
  },
  {
    id: generateId(),
    question: "Vad är det viktigaste för att du ska känna att du haft en bra dag?",
    category: "Värderingar & Prioriteringar"
  },
  {
    id: generateId(),
    question: "Vad är viktigast: att vara ärlig eller att vara snäll?",
    category: "Värderingar & Prioriteringar"
  },
  {
    id: generateId(),
    question: "Hur gör du för att vara mer närvarande i nuet?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Vad tror du människor ofta missförstår om dig?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Vilket ämne kan du prata om i timmar utan att tröttna?",
    category: "Intressen & Drivkrafter"
  },
  {
    id: generateId(),
    question: "Vilka egenskaper uppskattar du mest hos andra?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Vilken är den bästa feedback (beröm eller kritik) du har fått?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Hur definierar du personlig framgång?",
    category: "Intressen & Drivkrafter"
  },
  {
    id: generateId(),
    question: "Vilken typ av människor har du svårast att förstå dig på?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Vad är en livsläxa som alla skulle må bra av att lära sig?",
    category: "Värderingar & Prioriteringar"
  },
  {
    id: generateId(),
    question: "Vilket beteende hos dig själv vill du förändra?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "I vilka situationer känner du dig mest osäker?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Vad har du lärt dig om dig själv under den senaste tiden?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Vad tenderar att styra de flesta av dina beslut?",
    category: "Värderingar & Prioriteringar"
  },
  {
    id: generateId(),
    question: "Vad är du nyfiken på just nu?",
    category: "Intressen & Drivkrafter"
  },
  {
    id: generateId(),
    question: "Vad ger dig energi?",
    category: "Intressen & Drivkrafter"
  },
  {
    id: generateId(),
    question: "Om du fick obegränsad tid, vad skulle du ägna dig åt?",
    category: "Intressen & Drivkrafter"
  },
  {
    id: generateId(),
    question: "Vad gör en relation meningsfull för dig?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Hur hanterar du konflikter med andra människor?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Hur får man ditt förtroende?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Vilken är din sämsta vana?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Har du någon hjärtefråga?",
    category: "Värderingar & Prioriteringar"
  },
  {
    id: generateId(),
    question: "Hur vårdar man bäst en vänskap?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Är du mest introvert eller extrovert?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Vad särskiljer dig från andra?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "När känner du dig som mest utanför?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Vad vill du att andra ska ha för intryck av dig?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Hur skulle du agera om en vän ställer in i sista minuten flera gånger?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Vad gör du om någon i din närhet alltid avbryter dig i samtal?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Vad gör du om du märker att en vän börjar dra sig undan utan att förklara varför?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Hur mycket bryr du dig om hur du uppfattas av andra?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Vad är viktigast för att man ska ha en bra diskussion?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Hur hanterar du misslyckanden?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Vad är viktigast för dig: att jobba mot långsiktiga mål eller att njuta i nuet?",
    category: "Värderingar & Prioriteringar"
  },
  {
    id: generateId(),
    question: "Vems intressen tenderar du att sätta först: dina eller andras?",
    category: "Värderingar & Prioriteringar"
  },
  {
    id: generateId(),
    question: "Vad är du helst: Expert på få saker eller bra på flera saker?",
    category: "Intressen & Drivkrafter"
  },
  {
    id: generateId(),
    question: "Vad gör du om du hamnar i en konflikt mellan två nära vänner?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Vad gör du om du märker att en vän ljuger för dig?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Hur hanterar du om en vän alltid pratar om sig själv och aldrig lyssnar?",
    category: "Sociala relationer"
  },
  {
    id: generateId(),
    question: "Hur hanterar du om du får kritik som känns orättvis?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Hur mycket jämför du dig med andra?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Vad gör du om du känner att du inte utvecklas i ditt arbete?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Hur öppen är du för att prova saker utanför din komfortzon?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Hur svårt är det för dig att bestämma dig för saker och ta beslut?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    id: generateId(),
    question: "Hur viktigt är status för dig?",
    category: "Värderingar & Prioriteringar"
  },
  {
    id: generateId(),
    question: "Hur ser du på balansen mellan ditt arbete och din fritid?",
    category: "Värderingar & Prioriteringar"
  },
  {
    id: generateId(),
    question: "Vad tenderar du att följa: hjärtat eller hjärnan?",
    category: "Värderingar & Prioriteringar"
  }
];

export default defaultQuestions;

