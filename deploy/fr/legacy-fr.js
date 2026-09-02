// Legacy FR hero image + immediate re-translate.
//
// The page swaps copy once per render pass, but a few sections re-render during
// their entrance animation and come back in English. A MutationObserver
// re-applies the copy in the same frame those nodes are recreated, so nothing
// flickers: (a) from the cache the page itself computed, for every language,
// and (b) from the lists below.
(function () {
  var SRC = (window.__legacyFrHero || 'imageFRsummer.webp');
  var FR = {
    "Register": "S’inscrire",
    "Money back when you shop: That's cashback!": "Récupère de l’argent en faisant tes achats : c’est ça, le cashback !",
    "Whether it's snacks, sneakers, or city breaks – collect cashback at Germany's most popular shops. Your extra perk, simply earned.": "Que ce soit pour des snacks, des baskets ou des escapades en ville, récupère du cashback chez les enseignes les plus populaires. Un petit plus, tout simplement.",
    "Sign up now!": "Inscris-toi maintenant !",
    "Always free": "Toujours gratuit",
    "Buy with Noma": "Achète avec Noma",
    "Millions of users trust us": "Des millions d’utilisateurs nous font confiance",
    "Get your cashback now and receive money back on every purchase!": "Active ton cashback dès maintenant et récupère de l’argent sur chaque achat !",
    "More than 1,000,000": "Plus de 1 000 000",
    "satisfied users": "utilisateurs satisfaits",
    "More than 10,000,000": "Plus de 10 000 000",
    "Millions of euros paid out to Noma members": "Des millions d’euros versés aux membres Noma",
    "Partner shops": "Boutiques partenaires",
    "Choose from over 1,500 partners and watch your savings grow!": "Choisis parmi plus de 1 500 boutiques partenaires et fais grandir tes économies !",
    "Purchase after purchase: Save an average of €120 per year": "Achat après achat : économise en moyenne 120 € par an",
    "Popular shops": "Boutiques populaires",
    "Living & Lifestyle": "Maison & Lifestyle",
    "Fashion & Accessories": "Mode & Accessoires",
    "Our top picks": "Nos meilleures offres",
    "The best cashback deals and voucher codes – handpicked by us so you don't have to scroll.": "Les meilleures offres de cashback et codes promo, sélectionnés pour toi.",
    "Selected": "Sélectionné",
    "Until September 12, 2026": "Jusqu’au 12 septembre 2026",
    "Discover instant cashback": "Découvre le cashback instantané",
    "Show all": "Tout afficher",
    "Buy vouchers and receive instant cashback.": "Achète des cartes cadeaux et reçois du cashback instantanément.",
    "Online and offline": "En ligne et en magasin",
    "Noma Play is here!": "Noma Play est là !",
    "Choose a game, complete simple tasks and collect cashback with Noma Play.": "Choisis un jeu, réalise des tâches simples et cumule du cashback avec Noma Play.",
    "What our users say": "Ce que nos utilisateurs en pensent",
    "4.1 out of 5 based on 41182 reviews": "4,1 sur 5 basé sur 41 182 avis",
    "Show all reviews": "Voir tous les avis",
    "Everything's great!": "Tout est parfait !",
    "I've already received over €200 in cashback. Keep it up!": "J’ai déjà reçu plus de 200 € de cashback. Continuez comme ça !",
    "Recording and crediting always works…": "L’enregistrement et le versement fonctionnent toujours…",
    "Data entry and crediting always work very quickly, nothing to complain about.": "L’enregistrement et le versement sont toujours très rapides, rien à redire.",
    "With the Noma app you can earn cashback anytime, anywhere – download it now and get started!": "Avec l’application Noma, gagne du cashback à tout moment et où que tu sois – télécharge-la dès maintenant et commence à en profiter !",
    "Cashback at your favorite shops. Fast, easy, and always with you.": "Du cashback chez tes boutiques préférées. Simple, rapide et toujours avec toi.",
    "Frequently Asked Questions": "Questions fréquentes",
    "How does Noma work?": "Comment fonctionne Noma ?",
    "Sign up for free, start your purchase at Noma and shop as usual. We share the commission the shop pays us back with you as cashback.": "Inscris-toi gratuitement, commence ton achat sur Noma et achète comme d’habitude. Nous te reversons une partie de la commission que la boutique nous verse sous forme de cashback.",
    "Which shops does Noma have?": "Quelles boutiques sont disponibles sur Noma ?",
    "Over 1,500 partner shops across fashion, living, travel, electronics, food and more.": "Plus de 1 500 boutiques partenaires dans les domaines de la mode, de la maison, du voyage, de l’électronique, de l’alimentation et bien plus encore.",
    "Is Noma free?": "Noma est-il gratuit ?",
    "Yes. Noma is always free — there is no membership fee and no subscription.": "Oui. Noma est toujours gratuit : il n’y a ni frais d’adhésion ni abonnement.",
    "How does cashback work?": "Comment fonctionne le cashback ?",
    "For every purchase you make through Noma, the shop pays us a commission. We pass a share of it on to you.": "Pour chaque achat effectué via Noma, la boutique nous verse une commission. Nous t’en reversons une partie sous forme de cashback.",
    "When will you receive your cashback?": "Quand reçois-tu ton cashback ?",
    "Your cashback is recorded shortly after the purchase and released once the shop has confirmed the order.": "Ton cashback est enregistré peu après ton achat et versé une fois que la boutique a confirmé la commande.",
    "How safe is cashback?": "Le cashback est-il sécurisé ?",
    "More than 1,000,000 users collect cashback with Noma, and over 10,000,000 euros have already been paid out to members.": "Plus de 1 000 000 d’utilisateurs gagnent du cashback avec Noma, et plus de 10 000 000 d’euros ont déjà été versés aux membres.",
    "Cashback that truly pays off. With every purchase, every time.": "Un cashback qui fait vraiment la différence. À chaque achat, à chaque fois.",
    "Terms and Conditions": "Conditions générales",
    "Data protection": "Protection des données",
    "Cookie Policy": "Politique relative aux cookies",
    "Cancellation of the contract": "Résiliation du contrat",
    "All rights reserved.": "Tous droits réservés.",
    "imprint": "Mentions légales",
    "Manage cookies": "Gérer les cookies",
    "Up to 15% cashback": "Jusqu’à 15 % de cashback",
    "Up to 15% Cashback": "Jusqu’à 15 % de cashback",
    "Buy with iGraal": "Achète avec Noma",
    "© 2026 Noma. All rights reserved.": "© 2026 Noma. Tous droits réservés.",
    "Sign up now": "Inscris-toi maintenant",
    "million": "",
    ".000+ users": ".000 utilisateurs",
    "€10": "10 M€"
  };
  var DE = {
    "450": "+450",
    "Sign up now": "Jetzt registrieren",
    "€10": "10 Mio. €",
    "million": "",
    "+120": "Weltweit +120",
    "Millionen\nweltweit": " Millionen",
    ".000+ users": ".000 User",
    "Millionen weltweit": " Millionen",
    "Deine ersten \n€5 gehen auf uns": "Deine ersten\n5 € gehen auf uns",
    "Deine ersten €5 gehen auf uns": "Deine ersten 5 € gehen auf uns",
    "Weltweit\n+120Millionen": "Weltweit +120 Millionen",
    "Weltweit +120Millionen": "Weltweit +120 Millionen",
    "+120Millionen weltweit": "Weltweit +120 Millionen",
    "+120Millionen\nweltweit": "Weltweit +120 Millionen"
  };

  function lang() { try { return localStorage.getItem('igraal-lang') || 'en'; } catch (e) { return 'en'; } }

  function fix(root) {
    var l = lang();
    if (l === 'en' || !root) return;
    var legacy = !!document.querySelector('.sq-pad, .sl-pad');
    var map = l === 'fr' ? FR : (l === 'de' && !legacy ? DE : null);
    var num = (l === 'de' && !legacy);
    var frNum = (l === 'fr' && !legacy);
    var list = [];
    if (root.nodeType === 3) list.push(root);
    else {
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
      while ((n = w.nextNode())) list.push(n);
    }
    for (var i = 0; i < list.length; i++) {
      var node = list[i], cur = node.nodeValue;
      if (!cur || !cur.trim()) continue;
      if (node.parentElement && node.parentElement.closest && node.parentElement.closest('[data-usertest-urls]')) continue;
      // Already handled: the app re-rendered this node in English, put our
      // result back and stop (no further rewriting, so no mutation loop).
      if (node.__en && node.__out && cur.trim() === node.__en.trim()) {
        if (cur !== node.__out) node.nodeValue = node.__out;
        continue;
      }
      var out = cur;
      // Translate FIRST: number formatting must never run before the lookup, or
      // the key stops matching and the app and this pass rewrite each other.
      var hit = map ? map[out.trim()] : undefined;
      if (hit !== undefined) out = hit === '' ? '' : out.replace(out.trim(), hit);
      // iGraal FR New shows the € after the amount, with no space.
      if (frNum && out.indexOf('\u20ac') > -1) out = out.replace(/\u20ac\s*(\d[\d.,]*)/g, '$1\u20ac');
      // German number formatting (Shoop Homepage 2.0 only): space before the €/%
      // symbol and a decimal comma. The 3-digit guard keeps 41.158 intact.
      if (num) {
        out = out
          .replace(/(\d)\.(\d{1,2})(?!\d)/g, '$1,$2')
          .replace(/(\d)\s*\u20ac/g, '$1\u00a0\u20ac')
          .replace(/(\d)\s*%/g, '$1\u00a0%');
      }
      if (out === cur) continue;
      node.__en = cur;
      node.nodeValue = out;
      node.__out = out;
    }
  }

  var obs = new MutationObserver(function (recs) {
    for (var i = 0; i < recs.length; i++) {
      var r = recs[i];
      if (r.type === 'characterData') fix(r.target);
      else for (var j = 0; j < r.addedNodes.length; j++) fix(r.addedNodes[j]);
    }
  });

  var armed = false;
  setInterval(function () {
    var phone = document.querySelector('.phone');
    if (phone && !armed) {
      armed = true;
      obs.observe(phone, { childList: true, subtree: true, characterData: true });
    }
    if (phone) fix(phone);

    if (lang() !== 'fr') return;
    var pad = document.querySelector('.sq-pad');
    if (!pad) return;
    if (pad.getAttribute('data-fr-summer')) return;
    var img = pad.querySelector('img[src^="data:image/webp"]');
    if (!img) return;
    pad.setAttribute('data-fr-summer', '1');
    img.src = SRC;
  }, 500);
})();
