const defaultQuestions = [
  {
    question: "Vilken inre barriär håller dig tillbaka mest?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Vad innebär det att \"vara sig själv\"?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Vad är ett \"bra liv\" för dig?",
    category: "Värderingar & Prioriteringar"
  },
  {
    question: "Vilket råd skulle du ge till ditt yngre jag?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Hur reagerar du när du blir arg?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Vad prioriterar många för högt i sina liv?",
    category: "Värderingar & Prioriteringar"
  },
  {
    question: "Vilken egenskap ser de flesta som negativ, fast att den egentligen är positiv?",
    category: "Värderingar & Prioriteringar"
  },
  {
    question: "Nämn en förändring du gjort den senaste tiden som hade en betydande positiv påverkan på ditt liv",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Vilken egenskap ser de flesta som positiv, fast att den egentligen är negativ?",
    category: "Intressen & Drivkrafter"
  },
  {
    question: "Om du skulle lära dig någonting helt nytt, vad skulle det vara?",
    category: "Intressen & Drivkrafter"
  },
  {
    question: "På vilket sätt har du förändrats mest de senaste fem åren?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Vilken är din största drivkraft?",
    category: "Intressen & Drivkrafter"
  },
  {
    question: "Vilken vardagsrutin värdesätter du högst?",
    category: "Intressen & Drivkrafter"
  },
  {
    question: "Hur hanterar du självtvivel, ångest och/eller oro?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "När känner du som mest att du hamnar i ett \"flow\"?",
    category: "Intressen & Drivkrafter"
  },
  {
    question: "Vad är det viktigaste för att du ska känna att du haft en bra dag?",
    category: "Värderingar & Prioriteringar"
  },
  {
    question: "Vad är viktigast: att vara ärlig eller att vara snäll?",
    category: "Värderingar & Prioriteringar"
  },
  {
    question: "Hur gör du för att vara mer närvarande i nuet?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Vad tror du människor ofta missförstår om dig?",
    category: "Sociala relationer"
  },
  {
    question: "Vilket ämne kan du prata om i timmar utan att tröttna?",
    category: "Intressen & Drivkrafter"
  },
  {
    question: "Vilka egenskaper uppskattar du mest hos andra?",
    category: "Sociala relationer"
  },
  {
    question: "Vilken är den bästa feedback (beröm eller kritik) du har fått?",
    category: "Sociala relationer"
  },
  {
    question: "Hur definierar du personlig framgång?",
    category: "Intressen & Drivkrafter"
  },
  {
    question: "Vilken typ av människor har du svårast att förstå dig på?",
    category: "Sociala relationer"
  },
  {
    question: "Vad är en livsläxa som alla skulle må bra av att lära sig?",
    category: "Värderingar & Prioriteringar"
  },
  {
    question: "Vilket beteende hos dig själv vill du förändra?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "I vilka situationer känner du dig mest osäker?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Vad har du lärt dig om dig själv under den senaste tiden?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Vad tenderar att styra de flesta av dina beslut?",
    category: "Värderingar & Prioriteringar"
  },
  {
    question: "Vad är du nyfiken på just nu?",
    category: "Intressen & Drivkrafter"
  },
  {
    question: "Vad ger dig energi?",
    category: "Intressen & Drivkrafter"
  },
  {
    question: "Om du fick obegränsad tid, vad skulle du ägna dig åt?",
    category: "Intressen & Drivkrafter"
  },
  {
    question: "Vad gör en relation meningsfull för dig?",
    category: "Sociala relationer"
  },
  {
    question: "Hur hanterar du konflikter med andra människor?",
    category: "Sociala relationer"
  },
  {
    question: "Hur får man ditt förtroende?",
    category: "Sociala relationer"
  },
  {
    question: "Vilken är din sämsta vana?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Har du någon hjärtefråga?",
    category: "Värderingar & Prioriteringar"
  },
  {
    question: "Hur vårdar man bäst en vänskap?",
    category: "Sociala relationer"
  },
  {
    question: "Är du mest introvert eller extrovert?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Vad särskiljer dig från andra?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "När känner du dig som mest utanför?",
    category: "Sociala relationer"
  },
  {
    question: "Vad vill du att andra ska ha för intryck av dig?",
    category: "Sociala relationer"
  },
  {
    question: "Hur skulle du agera om en vän ställer in i sista minuten flera gånger?",
    category: "Sociala relationer"
  },
  {
    question: "Vad gör du om någon i din närhet alltid avbryter dig i samtal?",
    category: "Sociala relationer"
  },
  {
    question: "Vad gör du om du märker att en vän börjar dra sig undan utan att förklara varför?",
    category: "Sociala relationer"
  },
  {
    question: "Hur mycket bryr du dig om hur du uppfattas av andra?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Vad är viktigast för att man ska ha en bra diskussion?",
    category: "Sociala relationer"
  },
  {
    question: "Hur hanterar du misslyckanden?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Vad är viktigast för dig: att jobba mot långsiktiga mål eller att njuta i nuet?",
    category: "Värderingar & Prioriteringar"
  },
  {
    question: "Vems intressen tenderar du att sätta först: dina eller andras?",
    category: "Värderingar & Prioriteringar"
  },
  {
    question: "Vad är du helst: Expert på få saker eller bra på flera saker?",
    category: "Intressen & Drivkrafter"
  },
  {
    question: "Vad gör du om du hamnar i en konflikt mellan två nära vänner?",
    category: "Sociala relationer"
  },
  {
    question: "Vad gör du om du märker att en vän ljuger för dig?",
    category: "Sociala relationer"
  },
  {
    question: "Hur hanterar du om en vän alltid pratar om sig själv och aldrig lyssnar?",
    category: "Sociala relationer"
  },
  {
    question: "Hur hanterar du om du får kritik som känns orättvis?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Hur mycket jämför du dig med andra?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Vad gör du om du känner att du inte utvecklas i ditt arbete?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Hur öppen är du för att pröva saker utanför din komfortzon?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Hur svårt är det för dig att bestämma dig för saker och ta beslut?",
    category: "Självinsikt & Personlig utveckling"
  },
  {
    question: "Hur viktigt är status för dig?",
    category: "Värderingar & Prioriteringar"
  },
  {
    question: "Hur ser du på balansen mellan ditt arbete och din fritid?",
    category: "Värderingar & Prioriteringar"
  },
  {
    question: "Vad tenderar du att följa: hjärtat eller hjärnan?",
    category: "Värderingar & Prioriteringar"
  }
];

export default defaultQuestions;

