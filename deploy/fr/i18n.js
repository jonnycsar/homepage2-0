(function () {
  var T = {
    en: {
      t1: 'Read this carefully before proceeding',
      p1: "We'll show you the page next. Take a quick look around, just as you normally would. Go with your first impression and don't spend too much time exploring the details.",
      p2: 'This is a prototype, so please overlook any small mistakes or unfinished details. Focus on the overall impression of the page and how it feels as a first-time experience.',
      cta: 'See page',
      t2: "Time's up!",
      b2: "That's all for this task. Please return to the survey to continue answering the questions.",
      eyebrow: 'Cashback Made Easy'
    },
    de: {
      t1: 'Bevor\u2019s losgeht, lies diesen Text bitte aufmerksam.',
      p1: 'Gleich zeigen wir dir die Seite. Schau sie dir einfach so an, wie du das normalerweise tun w\u00fcrdest, und vertrau auf deinen ersten Eindruck. Du musst dich nicht lange mit Details aufhalten.',
      p2: '\u00dcbrigens: Das ist noch ein Prototyp. Kleinere Fehler oder unfertige Elemente sind also v\u00f6llig normal, diese kannst du einfach ignorieren. Uns interessiert vor allem, wie die Seite auf dich als neuen Nutzer insgesamt wirkt.',
      cta: 'Seite ansehen',
      t2: 'Die Zeit ist um!',
      b2: "Das war's f\u00fcr diese Aufgabe. Bitte kehre zur Umfrage zur\u00fcck, um mit der Beantwortung der Fragen fortzufahren.",
      eyebrow: 'Cashback leicht gemacht'
    },
    fr: {
      t1: 'Lis attentivement avant de continuer',
      p1: 'Nous allons vous montrer la page. Jetez-y un coup d\u2019\u0153il rapide, comme vous le feriez normalement. Fiez-vous \u00e0 votre premi\u00e8re impression et ne passez pas trop de temps \u00e0 explorer les d\u00e9tails.',
      p2: 'Il s\u2019agit d\u2019un prototype : veuillez donc ignorer les petites erreurs ou les \u00e9l\u00e9ments encore inachev\u00e9s. Concentrez-vous sur l\u2019impression g\u00e9n\u00e9rale de la page et sur votre ressenti en tant que nouvel utilisateur.',
      cta: 'Voir la page',
      t2: 'Le temps est \u00e9coul\u00e9 !',
      b2: 'C\u2019est tout pour cette t\u00e2che. Retourne \u00e0 l\u2019enqu\u00eate pour continuer \u00e0 r\u00e9pondre aux questions.',
      eyebrow: 'Cashback simplifi\u00e9'
    }
  };
  function pick() {
    var l = 'en';
    try { l = localStorage.getItem('igraal-lang') || 'en'; } catch (e) {}
    return T[l] || T.en;
  }
  if (typeof window !== 'undefined') { window.USERTEST_I18N = T; window.usertestCopy = pick; }
})();
