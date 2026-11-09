/*
 * Glow Blinds Card
 * Een Home Assistant dashboardkaart voor rolgordijnen: verticale ramen,
 * slepen om te positioneren, stopknop, live positie en een lucht die
 * het huidige weer en het dagdeel volgt.
 *
 * https://github.com/stijnleroy/glow-blinds-card
 * Licentie: MIT
 */

const GBC_VERSION = '1.1.0';

const GBC_PALETTE = ['#FFB899', '#B9A8FF', '#8FE3B8', '#8EC5FF', '#FFE08A', '#FF9FBF'];

const GBC_WEATHER = {
  'sunny': 'helder',
  'clear-night': 'helder',
  'partlycloudy': 'halfbewolkt',
  'windy': 'halfbewolkt',
  'windy-variant': 'bewolkt',
  'cloudy': 'bewolkt',
  'exceptional': 'bewolkt',
  'fog': 'mist',
  'rainy': 'regen',
  'pouring': 'regen',
  'lightning': 'onweer',
  'lightning-rainy': 'onweer',
  'snowy': 'sneeuw',
  'snowy-rainy': 'sneeuw',
  'hail': 'sneeuw',
};

/* ------------------------------------------------------------------ */
/*  Vertalingen                                                        */
/* ------------------------------------------------------------------ */

const GBC_LANG_NAMES = {
  nl: 'Nederlands', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español', it: 'Italiano',
};

const GBC_I18N = {
  nl: {
    title: 'Rolgordijnen', open_all: 'Alles open', close_all: 'Alles dicht',
    hint: 'Sleep in een raam om het gordijn te verplaatsen', stop: 'Stop',
    n_open_one: '{n} open', n_open: '{n} open',
    dag: 'dag', schemer: 'schemer', nacht: 'nacht',
    helder: 'Helder', halfbewolkt: 'Halfbewolkt', bewolkt: 'Bewolkt', regen: 'Regen', onweer: 'Onweer', sneeuw: 'Sneeuw', mist: 'Mist',
    to: 'naar {p}%', opening: 'gaat open…', closing: 'gaat dicht…', stopped: 'gestopt', moving: 'beweegt…',
    open: 'Open', closed: 'Dicht', half: 'Half open',
    unavailable: 'Niet beschikbaar', not_found: 'Entiteit niet gevonden',
    aria_unavailable: '{name}, niet beschikbaar', aria_pos: '{name}, {p} procent open', aria_stop: 'Stop {name}',
    err_no_blinds: 'Voeg minstens één rolgordijn toe onder "blinds".', err_no_entity: 'Rolgordijn {n} heeft geen "entity".',
    description: 'Rolgordijnen als verticale ramen: slepen, stop, live positie en een lucht die het weer volgt.',
    l_title: 'Titel', l_weather: 'Weer-entiteit (voor de lucht)', l_sun: 'Zon-entiteit (dag/schemer/nacht)',
    l_glow: 'Sterkte van de gloed', l_columns: 'Kolommen (leeg = automatisch)', l_height: 'Hoogte van de ramen in px (leeg = automatisch)',
    l_background: 'Achtergrond', l_show_all_buttons: 'Knoppen "alles open/dicht" tonen', l_show_hint: 'Uitleg onderaan tonen',
    l_sky: 'Lucht met weer tonen', l_language: 'Taal', l_entity: 'Rolgordijn', l_name: 'Naam (optioneel)',
    l_invert: 'Positie omkeren (0 = open)', l_travel_time: 'Looptijd van open tot dicht (seconden)', l_fabric: 'Soort stof',
    bg_dark: 'Donker met gloed', bg_theme: 'Thema van je dashboard',
    fab_dimout: 'Deels verduisterend', fab_blackout: 'Volledig verduisterend',
    lang_auto: 'Automatisch (taal van Home Assistant)',
    ed_blind: 'Gordijn {n}', ed_up: 'Omhoog', ed_down: 'Omlaag', ed_delete: 'Verwijderen', ed_color: 'Eigen kleur', ed_add: '+ Rolgordijn toevoegen',
  },
  en: {
    title: 'Blinds', open_all: 'Open all', close_all: 'Close all',
    hint: 'Drag inside a window to move the blind', stop: 'Stop',
    n_open_one: '{n} open', n_open: '{n} open',
    dag: 'day', schemer: 'twilight', nacht: 'night',
    helder: 'Clear', halfbewolkt: 'Partly cloudy', bewolkt: 'Cloudy', regen: 'Rain', onweer: 'Thunderstorm', sneeuw: 'Snow', mist: 'Fog',
    to: 'to {p}%', opening: 'opening…', closing: 'closing…', stopped: 'stopped', moving: 'moving…',
    open: 'Open', closed: 'Closed', half: 'Partly open',
    unavailable: 'Unavailable', not_found: 'Entity not found',
    aria_unavailable: '{name}, unavailable', aria_pos: '{name}, {p} percent open', aria_stop: 'Stop {name}',
    err_no_blinds: 'Add at least one blind under "blinds".', err_no_entity: 'Blind {n} has no "entity".',
    description: 'Roller blinds as vertical windows: drag, stop, live position and a sky that follows the weather.',
    l_title: 'Title', l_weather: 'Weather entity (for the sky)', l_sun: 'Sun entity (day/twilight/night)',
    l_glow: 'Glow strength', l_columns: 'Columns (empty = automatic)', l_height: 'Window height in px (empty = automatic)',
    l_background: 'Background', l_show_all_buttons: 'Show "open/close all" buttons', l_show_hint: 'Show hint at the bottom',
    l_sky: 'Show sky with weather', l_language: 'Language', l_entity: 'Blind', l_name: 'Name (optional)',
    l_invert: 'Invert position (0 = open)', l_travel_time: 'Travel time from open to closed (seconds)', l_fabric: 'Fabric type',
    bg_dark: 'Dark with glow', bg_theme: 'Dashboard theme',
    fab_dimout: 'Dimout (partly darkening)', fab_blackout: 'Blackout (fully darkening)',
    lang_auto: 'Automatic (Home Assistant language)',
    ed_blind: 'Blind {n}', ed_up: 'Move up', ed_down: 'Move down', ed_delete: 'Remove', ed_color: 'Custom color', ed_add: '+ Add blind',
  },
  fr: {
    title: 'Stores', open_all: 'Tout ouvrir', close_all: 'Tout fermer',
    hint: 'Faites glisser dans une fenêtre pour déplacer le store', stop: 'Stop',
    n_open_one: '{n} ouvert', n_open: '{n} ouverts',
    dag: 'jour', schemer: 'crépuscule', nacht: 'nuit',
    helder: 'Dégagé', halfbewolkt: 'Partiellement nuageux', bewolkt: 'Nuageux', regen: 'Pluie', onweer: 'Orage', sneeuw: 'Neige', mist: 'Brouillard',
    to: 'vers {p}%', opening: 'ouverture…', closing: 'fermeture…', stopped: 'arrêté', moving: 'en mouvement…',
    open: 'Ouvert', closed: 'Fermé', half: 'Entrouvert',
    unavailable: 'Indisponible', not_found: 'Entité introuvable',
    aria_unavailable: '{name}, indisponible', aria_pos: '{name}, ouvert à {p} pour cent', aria_stop: 'Arrêter {name}',
    err_no_blinds: 'Ajoutez au moins un store sous "blinds".', err_no_entity: 'Le store {n} n\'a pas d\'"entity".',
    description: 'Des stores en fenêtres verticales : glisser, arrêter, position en direct et un ciel qui suit la météo.',
    l_title: 'Titre', l_weather: 'Entité météo (pour le ciel)', l_sun: 'Entité soleil (jour/crépuscule/nuit)',
    l_glow: 'Intensité de la lueur', l_columns: 'Colonnes (vide = automatique)', l_height: 'Hauteur des fenêtres en px (vide = automatique)',
    l_background: 'Arrière-plan', l_show_all_buttons: 'Afficher les boutons « tout ouvrir/fermer »', l_show_hint: 'Afficher l\'aide en bas',
    l_sky: 'Afficher le ciel avec la météo', l_language: 'Langue', l_entity: 'Store', l_name: 'Nom (facultatif)',
    l_invert: 'Inverser la position (0 = ouvert)', l_travel_time: 'Durée de l\'ouverture à la fermeture (secondes)', l_fabric: 'Type de tissu',
    bg_dark: 'Sombre avec lueur', bg_theme: 'Thème du tableau de bord',
    fab_dimout: 'Tamisant (partiellement occultant)', fab_blackout: 'Occultant (totalement)',
    lang_auto: 'Automatique (langue de Home Assistant)',
    ed_blind: 'Store {n}', ed_up: 'Monter', ed_down: 'Descendre', ed_delete: 'Supprimer', ed_color: 'Couleur personnalisée', ed_add: '+ Ajouter un store',
  },
  de: {
    title: 'Rollos', open_all: 'Alle öffnen', close_all: 'Alle schließen',
    hint: 'Im Fenster ziehen, um das Rollo zu bewegen', stop: 'Stopp',
    n_open_one: '{n} offen', n_open: '{n} offen',
    dag: 'Tag', schemer: 'Dämmerung', nacht: 'Nacht',
    helder: 'Klar', halfbewolkt: 'Teilweise bewölkt', bewolkt: 'Bewölkt', regen: 'Regen', onweer: 'Gewitter', sneeuw: 'Schnee', mist: 'Nebel',
    to: 'auf {p}%', opening: 'öffnet…', closing: 'schließt…', stopped: 'gestoppt', moving: 'bewegt sich…',
    open: 'Offen', closed: 'Geschlossen', half: 'Teilweise offen',
    unavailable: 'Nicht verfügbar', not_found: 'Entität nicht gefunden',
    aria_unavailable: '{name}, nicht verfügbar', aria_pos: '{name}, {p} Prozent offen', aria_stop: '{name} stoppen',
    err_no_blinds: 'Füge unter "blinds" mindestens ein Rollo hinzu.', err_no_entity: 'Rollo {n} hat keine "entity".',
    description: 'Rollos als senkrechte Fenster: ziehen, stoppen, Live-Position und ein Himmel, der dem Wetter folgt.',
    l_title: 'Titel', l_weather: 'Wetter-Entität (für den Himmel)', l_sun: 'Sonnen-Entität (Tag/Dämmerung/Nacht)',
    l_glow: 'Leuchtstärke', l_columns: 'Spalten (leer = automatisch)', l_height: 'Fensterhöhe in px (leer = automatisch)',
    l_background: 'Hintergrund', l_show_all_buttons: 'Schaltflächen „Alle öffnen/schließen“ anzeigen', l_show_hint: 'Hinweis unten anzeigen',
    l_sky: 'Himmel mit Wetter anzeigen', l_language: 'Sprache', l_entity: 'Rollo', l_name: 'Name (optional)',
    l_invert: 'Position umkehren (0 = offen)', l_travel_time: 'Laufzeit von offen bis geschlossen (Sekunden)', l_fabric: 'Stoffart',
    bg_dark: 'Dunkel mit Leuchten', bg_theme: 'Dashboard-Design',
    fab_dimout: 'Teilweise verdunkelnd', fab_blackout: 'Vollständig verdunkelnd',
    lang_auto: 'Automatisch (Sprache von Home Assistant)',
    ed_blind: 'Rollo {n}', ed_up: 'Nach oben', ed_down: 'Nach unten', ed_delete: 'Entfernen', ed_color: 'Eigene Farbe', ed_add: '+ Rollo hinzufügen',
  },
  es: {
    title: 'Estores', open_all: 'Abrir todo', close_all: 'Cerrar todo',
    hint: 'Arrastra dentro de una ventana para mover el estor', stop: 'Parar',
    n_open_one: '{n} abierto', n_open: '{n} abiertos',
    dag: 'día', schemer: 'crepúsculo', nacht: 'noche',
    helder: 'Despejado', halfbewolkt: 'Parcialmente nublado', bewolkt: 'Nublado', regen: 'Lluvia', onweer: 'Tormenta', sneeuw: 'Nieve', mist: 'Niebla',
    to: 'a {p}%', opening: 'abriendo…', closing: 'cerrando…', stopped: 'detenido', moving: 'en movimiento…',
    open: 'Abierto', closed: 'Cerrado', half: 'Entreabierto',
    unavailable: 'No disponible', not_found: 'Entidad no encontrada',
    aria_unavailable: '{name}, no disponible', aria_pos: '{name}, abierto al {p} por ciento', aria_stop: 'Parar {name}',
    err_no_blinds: 'Añade al menos un estor en "blinds".', err_no_entity: 'El estor {n} no tiene "entity".',
    description: 'Estores como ventanas verticales: arrastrar, parar, posición en directo y un cielo que sigue el tiempo.',
    l_title: 'Título', l_weather: 'Entidad del tiempo (para el cielo)', l_sun: 'Entidad del sol (día/crepúsculo/noche)',
    l_glow: 'Intensidad del brillo', l_columns: 'Columnas (vacío = automático)', l_height: 'Altura de las ventanas en px (vacío = automático)',
    l_background: 'Fondo', l_show_all_buttons: 'Mostrar botones «abrir/cerrar todo»', l_show_hint: 'Mostrar ayuda abajo',
    l_sky: 'Mostrar cielo con el tiempo', l_language: 'Idioma', l_entity: 'Estor', l_name: 'Nombre (opcional)',
    l_invert: 'Invertir posición (0 = abierto)', l_travel_time: 'Tiempo de recorrido de abierto a cerrado (segundos)', l_fabric: 'Tipo de tejido',
    bg_dark: 'Oscuro con brillo', bg_theme: 'Tema del panel',
    fab_dimout: 'Traslúcido (oscurece en parte)', fab_blackout: 'Opaco (oscurece por completo)',
    lang_auto: 'Automático (idioma de Home Assistant)',
    ed_blind: 'Estor {n}', ed_up: 'Subir', ed_down: 'Bajar', ed_delete: 'Eliminar', ed_color: 'Color personalizado', ed_add: '+ Añadir estor',
  },
  it: {
    title: 'Tende', open_all: 'Apri tutto', close_all: 'Chiudi tutto',
    hint: 'Trascina in una finestra per spostare la tenda', stop: 'Stop',
    n_open_one: '{n} aperta', n_open: '{n} aperte',
    dag: 'giorno', schemer: 'crepuscolo', nacht: 'notte',
    helder: 'Sereno', halfbewolkt: 'Parzialmente nuvoloso', bewolkt: 'Nuvoloso', regen: 'Pioggia', onweer: 'Temporale', sneeuw: 'Neve', mist: 'Nebbia',
    to: 'a {p}%', opening: 'in apertura…', closing: 'in chiusura…', stopped: 'fermata', moving: 'in movimento…',
    open: 'Aperta', closed: 'Chiusa', half: 'Socchiusa',
    unavailable: 'Non disponibile', not_found: 'Entità non trovata',
    aria_unavailable: '{name}, non disponibile', aria_pos: '{name}, aperta al {p} per cento', aria_stop: 'Ferma {name}',
    err_no_blinds: 'Aggiungi almeno una tenda in "blinds".', err_no_entity: 'La tenda {n} non ha "entity".',
    description: 'Tende come finestre verticali: trascina, ferma, posizione in tempo reale e un cielo che segue il meteo.',
    l_title: 'Titolo', l_weather: 'Entità meteo (per il cielo)', l_sun: 'Entità sole (giorno/crepuscolo/notte)',
    l_glow: 'Intensità del bagliore', l_columns: 'Colonne (vuoto = automatico)', l_height: 'Altezza delle finestre in px (vuoto = automatico)',
    l_background: 'Sfondo', l_show_all_buttons: 'Mostra i pulsanti «apri/chiudi tutto»', l_show_hint: 'Mostra suggerimento in basso',
    l_sky: 'Mostra il cielo con il meteo', l_language: 'Lingua', l_entity: 'Tenda', l_name: 'Nome (opzionale)',
    l_invert: 'Inverti posizione (0 = aperta)', l_travel_time: 'Tempo di corsa da aperta a chiusa (secondi)', l_fabric: 'Tipo di tessuto',
    bg_dark: 'Scuro con bagliore', bg_theme: 'Tema della dashboard',
    fab_dimout: 'Filtrante (oscura in parte)', fab_blackout: 'Oscurante (oscura completamente)',
    lang_auto: 'Automatico (lingua di Home Assistant)',
    ed_blind: 'Tenda {n}', ed_up: 'Su', ed_down: 'Giù', ed_delete: 'Rimuovi', ed_color: 'Colore personalizzato', ed_add: '+ Aggiungi tenda',
  },
};

function gbcLang(hass, wanted) {
  let l = wanted && wanted !== 'auto'
    ? wanted
    : ((hass && ((hass.locale && hass.locale.language) || hass.language)) || (typeof navigator !== 'undefined' && navigator.language) || 'en');
  l = String(l).toLowerCase().split(/[-_]/)[0];
  return GBC_I18N[l] ? l : 'en';
}

function gbcT(lang, key, vars) {
  let s = (GBC_I18N[lang] && GBC_I18N[lang][key]) || GBC_I18N.en[key] || key;
  if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}

// cover supported_features bits
const GBC_SET_POSITION = 4;
const GBC_STOP = 8;

function gbcRgb(hex) {
  let h = String(hex || '').replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const v = parseInt(h.slice(0, 6), 16);
  if (isNaN(v)) return '185, 168, 255';
  return ((v >> 16) & 255) + ', ' + ((v >> 8) & 255) + ', ' + (v & 255);
}

function gbcClamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

/* ------------------------------------------------------------------ */
/*  Lucht (weer + dagdeel)                                             */
/* ------------------------------------------------------------------ */

// idx = nummer van het raam, zodat elk raam een ander stukje van dezelfde lucht toont.
// showOrb = alleen in één raam een zon of maan.
function gbcSkyHtml(weer, phase, idx = 0, showOrb = true) {
  const clear = weer === 'helder' || weer === 'halfbewolkt';
  const grim = weer === 'regen' || weer === 'onweer';
  const bgs = {
    dag: clear ? ['#5FB3F0', '#CDE9FB'] : grim ? ['#6B7B8E', '#A7B3C0'] : weer === 'sneeuw' ? ['#B4C2D0', '#E8EEF4'] : weer === 'mist' ? ['#BFC6CD', '#E4E7EA'] : ['#93A5B8', '#CCD5DE'],
    schemer: clear ? ['#5B4F9E', '#F6A578'] : ['#5E5872', '#B99A92'],
    nacht: clear ? ['#070D24', '#1E2A58'] : ['#141824', '#2C3346'],
  };
  const g = bgs[phase] || bgs.nacht;
  let html = '<div class="sky-bg" style="background:linear-gradient(180deg,' + g[0] + ',' + g[1] + ')"></div>';

  // sterren
  const starPts = [[12, 60], [30, 36], [22, 120], [52, 90], [74, 50], [86, 140], [42, 170]];
  const nStars = phase === 'nacht' ? (weer === 'helder' ? 7 : weer === 'halfbewolkt' ? 4 : 0) : 0;
  starPts.slice(0, nStars).forEach((p, k) => {
    const s = k % 2 ? 2 : 3;
    html += '<span class="star" style="left:' + ((p[0] + idx * 29) % 92) + '%;top:' + p[1] + 'px;width:' + s + 'px;height:' + s + 'px;opacity:' + (0.5 + (k % 3) * 0.15) + '"></span>';
  });

  // zon / maan
  if (clear && showOrb) {
    if (phase === 'dag') html += '<span class="orb sun"></span>';
    else if (phase === 'schemer') html += '<span class="orb sunset"></span>';
    else html += '<span class="orb moon"></span>';
  }

  // wolken: [top px, left %, breedte %]
  const sets = {
    helder: [],
    halfbewolkt: [[44, -6, 55], [118, 45, 42]],
    bewolkt: [[22, -15, 65], [64, 35, 60], [122, -8, 56], [172, 48, 52]],
    regen: [[18, -15, 68], [58, 33, 64], [110, -10, 58]],
    onweer: [[18, -15, 68], [58, 33, 64], [110, -10, 58]],
    sneeuw: [[18, -15, 65], [60, 35, 60]],
    mist: [[40, 20, 58]],
  };
  const fill = phase === 'nacht' ? '#3A4358' : phase === 'schemer' ? '#E7C3C0' : weer === 'onweer' ? '#6B7587' : weer === 'regen' ? '#97A3B2' : weer === 'bewolkt' ? '#E4E9EE' : '#FFFFFF';
  (sets[weer] || []).forEach((c, k) => {
    const left = idx ? ((c[1] + 15 + idx * 43) % 100) - 15 : c[1];
    html += '<span class="cloud" style="top:' + c[0] + 'px;left:' + left + '%;width:' + c[2] + '%;animation-duration:' + (6 + k) + 's">' +
      '<svg viewBox="0 0 62 44"><path d="M48 42H16a13 13 0 1 1 3-25.6A16 16 0 0 1 49 18a12 12 0 0 1-1 24z" fill="' + fill + '"/></svg></span>';
  });

  if (weer === 'mist') {
    [70, 130, 190].forEach((t) => { html += '<span class="mist" style="top:' + t + 'px"></span>'; });
  }
  if (grim) {
    for (let k = 0; k < 16; k++) {
      html += '<span class="drop" style="left:' + ((k * 37 + idx * 13) % 100) + '%;animation-delay:-' + ((k * 0.17) % 0.8).toFixed(2) + 's"></span>';
    }
  }
  if (weer === 'sneeuw') {
    for (let k = 0; k < 14; k++) {
      html += '<span class="flake" style="left:' + ((k * 41) % 100) + '%;animation-duration:' + (3.5 + (k % 3)) + 's;animation-delay:-' + ((k * 0.6) % 4).toFixed(1) + 's"></span>';
    }
  }
  if (weer === 'onweer') html += '<span class="flash"></span>';
  return html;
}

const GBC_STYLE = `
  :host { display: block; }
  ha-card {
    display: block;
    position: relative;
    overflow: hidden;
    border-radius: var(--gbc-radius, 28px);
    padding: 18px;
    color: #F3F1FA;
    background: #15121F;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-sizing: border-box;
  }
  ha-card.theme-bg { background: var(--ha-card-background, var(--card-background-color)); color: var(--primary-text-color); }
  ha-card.theme-bg .blob { display: none; }
  .blob { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; }
  .blob.a { left: -90px; top: -90px; width: 260px; height: 260px; background: #B9A8FF; opacity: 0.28; }
  .blob.b { right: -100px; bottom: -110px; width: 280px; height: 280px; background: #FFB899; opacity: 0.22; }
  .wrap { position: relative; display: flex; flex-direction: column; gap: 16px; }

  .head { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
  .head .titles { display: flex; flex-direction: column; min-width: 0; }
  .head h2 { margin: 0; font-size: 21px; font-weight: 800; line-height: 1.2; }
  .head .summary { font-size: 13px; font-weight: 600; opacity: 0.75; }
  .head .btns { display: flex; gap: 8px; flex-shrink: 0; }
  .round {
    width: 44px; height: 44px; border-radius: 22px; padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.07);
    color: inherit; display: flex; align-items: center; justify-content: center; cursor: pointer;
  }
  .round:active { transform: scale(0.95); }
  .round svg { width: 18px; height: 18px; }

  .grid { display: grid; gap: 14px; }
  .blind { display: flex; flex-direction: column; gap: 8px; min-width: 0; --c: #B9A8FF; --rgb: 185, 168, 255; }

  .win {
    position: relative; padding: 0; overflow: hidden;
    border-radius: 16px; border: 5px solid #2A2740; background: #0F1A33;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
    touch-action: none; cursor: ns-resize; user-select: none; -webkit-user-select: none;
    outline: none; box-sizing: border-box;
    --closed: 0; --gclosed: 0;
  }
  .win:focus-visible { box-shadow: 0 0 0 3px var(--c); }
  .win.unavailable { cursor: not-allowed; opacity: 0.5; }
  .sky { position: absolute; inset: 0; pointer-events: none; }
  .sky-bg { position: absolute; inset: 0; }
  .star { position: absolute; border-radius: 50%; background: #fff; }
  .orb { position: absolute; border-radius: 50%; }
  .orb.sun { right: 12%; top: 28px; width: 30px; height: 30px; background: #FFE58A; box-shadow: 0 0 30px 10px rgba(255, 229, 138, 0.6); }
  .orb.sunset { left: 14%; top: 62%; width: 34px; height: 34px; background: #FFB46B; box-shadow: 0 0 34px 12px rgba(255, 180, 107, 0.55); }
  .orb.moon { right: 12%; top: 28px; width: 22px; height: 22px; background: #FFF4D6; box-shadow: 0 0 22px 5px rgba(255, 244, 214, 0.45); }
  .cloud { position: absolute; opacity: 0.95; animation: gbc-drift 6s ease-in-out infinite alternate; }
  .cloud svg { display: block; width: 100%; height: auto; }
  .mist { position: absolute; left: -20%; right: -20%; height: 24px; border-radius: 12px; background: rgba(255, 255, 255, 0.45); filter: blur(5px); animation: gbc-drift 7s ease-in-out infinite alternate; }
  .drop { position: absolute; top: 0; width: 2px; height: 13px; border-radius: 1px; background: rgba(210, 228, 255, 0.75); animation: gbc-fall 0.8s linear infinite; }
  .flake { position: absolute; top: 0; width: 5px; height: 5px; border-radius: 50%; background: #fff; animation: gbc-snow 4s linear infinite; }
  .flash { position: absolute; inset: 0; background: rgba(255, 255, 240, 0.85); opacity: 0; animation: gbc-flash 6s linear infinite; }
  @keyframes gbc-fall { from { transform: translateY(-20px); } to { transform: translateY(520px); } }
  @keyframes gbc-snow { from { transform: translate(0, -20px); } to { transform: translate(12px, 520px); } }
  @keyframes gbc-drift { from { transform: translateX(-8px); } to { transform: translateX(8px); } }
  @keyframes gbc-flash { 0%, 90%, 100% { opacity: 0; } 92% { opacity: 1; } 93% { opacity: 0.2; } 95% { opacity: 0.9; } }

  .bar { position: absolute; left: 0; right: 0; top: 50%; height: 4px; background: #2A2740; pointer-events: none; }
  .fabric, .ghost {
    position: absolute; left: 0; right: 0; top: 0; pointer-events: none;
  }
  .fabric {
    height: calc(14px + (100% - 14px) * var(--closed));
    background-color: var(--c);
    background-image: repeating-linear-gradient(180deg, rgba(255,255,255,0.16) 0 2px, rgba(0,0,0,0) 2px 16px);
    opacity: 0.72;
    transition: height 0.3s linear;
  }
  /* volledig verduisterend: dichte stof, geen lucht zichtbaar */
  .blind.blackout .fabric {
    opacity: 1;
    background-image:
      linear-gradient(rgba(0,0,0,0.18), rgba(0,0,0,0.18)),
      repeating-linear-gradient(180deg, rgba(255,255,255,0.08) 0 2px, rgba(0,0,0,0) 2px 16px);
  }
  .rail {
    position: absolute; left: 5px; right: 5px; height: 7px; border-radius: 4px; pointer-events: none;
    top: calc(14px + (100% - 14px) * var(--closed) - 6px);
    background: #fff;
    box-shadow: 0 0 var(--gbc-glow, 22px) 4px rgba(var(--rgb), 0.85);
    transition: top 0.3s linear;
  }
  .ghost { height: calc(14px + (100% - 14px) * var(--gclosed)); background: rgba(var(--rgb), 0.22); display: none; }
  .gline {
    position: absolute; left: 4px; right: 4px; height: 0; pointer-events: none; display: none;
    top: calc(14px + (100% - 14px) * var(--gclosed) - 1px);
    border-top: 2px dashed rgba(255, 255, 255, 0.9);
  }
  .win.has-target .ghost, .win.has-target .gline { display: block; }
  .win.dragging .fabric, .win.dragging .rail { transition: none; }
  .cassette { position: absolute; left: 0; right: 0; top: 0; height: 14px; background: #3A3654; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35); pointer-events: none; }
  .bubble {
    position: absolute; left: 50%; transform: translateX(-50%);
    top: calc(14px + (100% - 14px) * var(--gclosed) - 40px);
    padding: 4px 10px; border-radius: 12px; font-size: 15px; font-weight: 800; color: #1C1730;
    background: var(--c); box-shadow: 0 0 var(--gbc-glow, 22px) rgba(var(--rgb), 0.8);
    white-space: nowrap; pointer-events: none; display: none;
  }
  .win.dragging .bubble { display: block; }

  .info { display: flex; flex-direction: column; align-items: center; text-align: center; min-width: 0; }
  .pct {
    font-size: 26px; font-weight: 800; line-height: 1.1; font-variant-numeric: tabular-nums;
    color: var(--c); text-shadow: 0 0 calc(var(--gbc-glow, 22px) * 0.8) rgba(var(--rgb), 0.6);
  }
  .name { font-size: 13px; font-weight: 800; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
  .status { font-size: 12px; font-weight: 600; opacity: 0.7; }

  .stop {
    height: 46px; border-radius: 16px; font: inherit; font-size: 15px; font-weight: 800;
    display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.12); color: inherit; background: rgba(255, 255, 255, 0.07);
    transition: background 0.12s, box-shadow 0.12s, color 0.12s, transform 0.08s;
    touch-action: manipulation; -webkit-tap-highlight-color: transparent; user-select: none;
  }
  .stop:active, .stop.pressed { transform: scale(0.95); }
  .round { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
  .stop svg { width: 14px; height: 14px; fill: currentColor; }
  .stop.active { border-color: transparent; color: #1C1730; background: var(--c); box-shadow: 0 0 var(--gbc-glow, 22px) rgba(var(--rgb), 0.7); }
  .stop[hidden] { display: none; }
  .hint { margin: 0; font-size: 12px; font-weight: 600; opacity: 0.6; text-align: center; }
  .err { padding: 8px; color: #FF9FBF; font-size: 13px; }
`;

const ICON_UP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>';
const ICON_DOWN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
const ICON_STOP = '<svg viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="3"/></svg>';

/* ------------------------------------------------------------------ */
/*  De kaart                                                           */
/* ------------------------------------------------------------------ */

class GlowBlindsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._targets = {};
    this._drag = null;
    this._skyKey = null;
    this._built = false;
    this._keyTimers = {};
    this._moves = {};      // bewegingen gestart via de kaart
    this._last = {};       // laatst geziene positie + tijdstip van laatste verandering
    this._stoppedAt = {};  // tijdstip van laatste druk op stop
    this._disp = {};       // getoonde positie per gordijn
    this._tick = null;
  }

  connectedCallback() {
    if (this._hass && this._built) this._update();
  }

  disconnectedCallback() {
    clearInterval(this._tick);
    this._tick = null;
  }

  static getConfigElement() {
    return document.createElement('glow-blinds-card-editor');
  }

  static getStubConfig(hass) {
    const ids = Object.keys((hass && hass.states) || {});
    const covers = ids.filter((e) => e.startsWith('cover.')).slice(0, 2);
    const weather = ids.find((e) => e.startsWith('weather.'));
    const cfg = {
      blinds: (covers.length ? covers : ['cover.voorbeeld']).map((e, i) => ({ entity: e, color: GBC_PALETTE[i % GBC_PALETTE.length] })),
    };
    if (weather) cfg.weather = weather;
    return cfg;
  }

  setConfig(config) {
    const lang = gbcLang(this._hass, config && config.language);
    if (!config || !Array.isArray(config.blinds) || config.blinds.length === 0) {
      throw new Error(gbcT(lang, 'err_no_blinds'));
    }
    const blinds = config.blinds.map((b, i) => {
      const o = typeof b === 'string' ? { entity: b } : { ...b };
      if (!o.entity) throw new Error(gbcT(lang, 'err_no_entity', { n: i + 1 }));
      if (!o.color) o.color = GBC_PALETTE[i % GBC_PALETTE.length];
      return o;
    });
    this._config = {
      sun: 'sun.sun',
      glow: 22,
      show_all_buttons: true,
      show_hint: true,
      sky: true,
      background: 'dark',
      ...config,
      blinds,
    };
    this._targets = {};
    this._moves = {};
    this._last = {};
    this._stoppedAt = {};
    this._disp = {};
    this._built = false;
    this._skyKey = null;
    if (this._hass) {
      this._build();
      this._update();
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    if (this._built && this._builtLang !== this._lang()) this._built = false;
    if (!this._built) this._build();
    this._update();
  }

  get hass() {
    return this._hass;
  }

  getCardSize() {
    const n = this._config ? this._config.blinds.length : 2;
    return Math.ceil(n / this._cols()) * 6 + 1;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 'auto' };
  }

  _lang() {
    return gbcLang(this._hass, this._config && this._config.language);
  }

  _t(key, vars) {
    return gbcT(this._lang(), key, vars);
  }

  _cols() {
    const n = this._config.blinds.length;
    if (this._config.columns) return gbcClamp(parseInt(this._config.columns, 10) || 1, 1, 8);
    if (n <= 3) return n;
    if (n === 4) return 2;
    return 3;
  }

  _winHeight() {
    if (this._config.height) return parseInt(this._config.height, 10) || 270;
    const rows = Math.ceil(this._config.blinds.length / this._cols());
    return rows > 1 ? 170 : 270;
  }

  _build() {
    const c = this._config;
    const cols = this._cols();
    const t = (k, v) => this._t(k, v);
    this._builtLang = this._lang();
    const title = c.title === undefined || c.title === null ? t('title') : c.title;
    const blindsHtml = c.blinds.map((b, i) => `
      <div class="blind${(b.fabric || c.fabric) === 'blackout' ? ' blackout' : ''}" data-i="${i}" style="--c:${b.color};--rgb:${gbcRgb(b.color)}">
        <div class="win" data-i="${i}" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="100" style="height:${this._winHeight()}px">
          <div class="sky"></div>
          <div class="bar"></div>
          <div class="ghost"></div>
          <div class="fabric"></div>
          <div class="rail"></div>
          <div class="gline"></div>
          <div class="cassette"></div>
          <div class="bubble"></div>
        </div>
        <div class="info">
          <span class="pct">–</span>
          <span class="name"></span>
          <span class="status"></span>
        </div>
        <button class="stop" type="button" data-i="${i}">${ICON_STOP}<span>${t('stop')}</span></button>
      </div>`).join('');

    this.shadowRoot.innerHTML = `
      <style>${GBC_STYLE}</style>
      <ha-card class="${c.background === 'theme' ? 'theme-bg' : ''}" style="--gbc-glow:${parseInt(c.glow, 10) || 0}px">
        <div class="blob a"></div><div class="blob b"></div>
        <div class="wrap">
          <div class="head">
            <div class="titles">
              ${title ? `<h2></h2>` : ''}
              <span class="summary"></span>
            </div>
            ${c.show_all_buttons ? `
            <div class="btns">
              <button class="round all-open" type="button" aria-label="${t('open_all')}" title="${t('open_all')}">${ICON_UP}</button>
              <button class="round all-close" type="button" aria-label="${t('close_all')}" title="${t('close_all')}">${ICON_DOWN}</button>
            </div>` : ''}
          </div>
          <div class="grid" style="grid-template-columns:repeat(${cols}, minmax(0, 1fr))">${blindsHtml}</div>
          ${c.show_hint ? '<p class="hint">' + t('hint') + '</p>' : ''}
        </div>
      </ha-card>`;

    const h2 = this.shadowRoot.querySelector('h2');
    if (h2) h2.textContent = title;

    this.shadowRoot.querySelectorAll('.win').forEach((win) => this._bindWindow(win));
    this.shadowRoot.querySelectorAll('.stop').forEach((btn) => {
      const i = parseInt(btn.dataset.i, 10);
      // meteen reageren bij aanraken, niet pas bij loslaten
      btn.addEventListener('pointerdown', (e) => {
        if (e.button !== undefined && e.button !== 0) return;
        btn._firedAt = Date.now();
        this._stop(i);
      });
      // toetsenbord / fallback, zonder dubbel te versturen
      btn.addEventListener('click', () => {
        if (btn._firedAt && Date.now() - btn._firedAt < 800) return;
        this._stop(i);
      });
    });
    const ao = this.shadowRoot.querySelector('.all-open');
    const ac = this.shadowRoot.querySelector('.all-close');
    if (ao) ao.addEventListener('click', () => this._all('open_cover'));
    if (ac) ac.addEventListener('click', () => this._all('close_cover'));
    this._built = true;
    this._skyKey = null;
  }

  _bindWindow(win) {
    const i = parseInt(win.dataset.i, 10);
    const posFrom = (e) => {
      const r = win.getBoundingClientRect();
      const inner = Math.max(1, r.height - 14);
      const frac = gbcClamp((e.clientY - r.top - 14) / inner, 0, 1);
      return Math.round(100 - frac * 100);
    };
    win.addEventListener('pointerdown', (e) => {
      if (this._isUnavailable(i)) return;
      if (e.button !== undefined && e.button !== 0) return;
      try { win.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      this._drag = { i, pos: posFrom(e) };
      this._updateBlind(i);
      e.preventDefault();
    });
    win.addEventListener('pointermove', (e) => {
      if (!this._drag || this._drag.i !== i) return;
      this._drag.pos = posFrom(e);
      this._updateBlind(i);
    });
    const finish = (e, apply) => {
      if (!this._drag || this._drag.i !== i) return;
      const pos = apply ? posFrom(e) : null;
      this._drag = null;
      try { win.releasePointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      if (apply) this._setPos(i, pos);
      else this._updateBlind(i);
    };
    win.addEventListener('pointerup', (e) => finish(e, true));
    win.addEventListener('pointercancel', (e) => finish(e, false));
    win.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Home' && e.key !== 'End') return;
      e.preventDefault();
      const cur = this._targets[i] ? this._targets[i].pos : (this._getPos(i) ?? 0);
      let next = cur;
      if (e.key === 'ArrowUp') next = cur + 10;
      if (e.key === 'ArrowDown') next = cur - 10;
      if (e.key === 'Home') next = 100;
      if (e.key === 'End') next = 0;
      next = gbcClamp(next, 0, 100);
      this._targets[i] = { pos: next, t: Date.now() };
      this._updateBlind(i);
      clearTimeout(this._keyTimers[i]);
      this._keyTimers[i] = setTimeout(() => this._setPos(i, next), 500);
    });
  }

  _state(i) {
    const b = this._config.blinds[i];
    return this._hass && this._hass.states[b.entity];
  }

  _isUnavailable(i) {
    const st = this._state(i);
    return !st || st.state === 'unavailable' || st.state === 'unknown';
  }

  _getPos(i) {
    const st = this._state(i);
    if (!st) return null;
    let p = st.attributes.current_position;
    if (p === undefined || p === null) {
      if (st.state === 'closed') p = 0;
      else if (st.state === 'open') p = 100;
      else if (st.state === 'opening' || st.state === 'closing') p = 50;
      else return null;
    }
    p = gbcClamp(Number(p), 0, 100);
    if (this._config.blinds[i].invert) p = 100 - p;
    return p;
  }

  _call(service, data) {
    if (!this._hass) return;
    this._hass.callService('cover', service, data);
  }

  _setPos(i, pos) {
    const b = this._config.blinds[i];
    const st = this._state(i);
    if (!st) return;
    const feat = st.attributes.supported_features || 0;
    this._targets[i] = { pos, t: Date.now() };
    if (feat & GBC_SET_POSITION) {
      const real = b.invert ? 100 - pos : pos;
      this._call('set_cover_position', { entity_id: b.entity, position: real });
    } else {
      this._targets[i].pos = pos >= 50 ? 100 : 0;
      this._call(pos >= 50 ? 'open_cover' : 'close_cover', { entity_id: b.entity });
    }
    this._startMove(i, this._targets[i].pos);
    this._updateBlind(i);
  }

  // Onthoud dat er een beweging loopt. Veel motoren (o.a. Zigbee) melden geen
  // "opening/closing" of geven de eindpositie meteen door; daarom schatten we
  // hoelang de beweging duurt op basis van de looptijd van het gordijn.
  _startMove(i, target) {
    const b = this._config.blinds[i];
    const raw = this._getPos(i) ?? 0;
    const from = this._disp[i] !== undefined ? this._disp[i] : raw;
    const travel = Number(b.travel_time || this._config.travel_time || 30);
    const dur = Math.max(1000, (travel * 1000 * Math.abs(target - from)) / 100);
    const now = Date.now();
    this._moves[i] = { start: now, until: now + Math.max(3000, dur + 1500), dur, from, target, sawMotion: false, trusted: false };
    delete this._stoppedAt[i];
    this._ensureTick();
  }

  _stop(i) {
    const b = this._config.blinds[i];
    delete this._targets[i];
    delete this._moves[i];
    this._stoppedAt[i] = Date.now();
    const btn = this.shadowRoot.querySelector('.stop[data-i="' + i + '"]');
    if (btn) {
      btn.classList.add('pressed');
      setTimeout(() => btn.classList.remove('pressed'), 150);
    }
    this._updateBlind(i);
    this._call('stop_cover', { entity_id: b.entity });
    this._ensureTick();
  }

  // Ververst de kaart regelmatig zolang er iets beweegt, ook als Home
  // Assistant even geen nieuwe status doorstuurt.
  _ensureTick() {
    if (this._tick) return;
    this._tick = setInterval(() => {
      if (!this._hass || !this._built) return;
      const now = Date.now();
      const busy = Object.keys(this._moves).length > 0 ||
        Object.values(this._last).some((l) => now - l.at < 3000) ||
        Object.values(this._stoppedAt).some((t) => now - t < 3000);
      this._config.blinds.forEach((_, i) => this._updateBlind(i));
      if (!busy) {
        clearInterval(this._tick);
        this._tick = null;
      }
    }, 300);
  }

  _all(service) {
    const ids = this._config.blinds.map((b) => b.entity).filter((e) => this._hass && this._hass.states[e]);
    if (!ids.length) return;
    const pos = service === 'open_cover' ? 100 : 0;
    this._config.blinds.forEach((b, i) => {
      // bij "invert" is open/dicht omgekeerd voor de motor
      if (b.invert) {
        this._call(service === 'open_cover' ? 'close_cover' : 'open_cover', { entity_id: b.entity });
      }
      this._targets[i] = { pos, t: Date.now() };
      this._startMove(i, pos);
    });
    const normal = this._config.blinds.filter((b) => !b.invert).map((b) => b.entity);
    if (normal.length) this._call(service, { entity_id: normal });
    this._update();
  }

  _phase() {
    const sun = this._config.sun && this._hass.states[this._config.sun];
    if (sun) {
      const el = sun.attributes.elevation;
      if (typeof el === 'number') {
        if (el > 6) return 'dag';
        if (el > -6) return 'schemer';
        return 'nacht';
      }
      return sun.state === 'above_horizon' ? 'dag' : 'nacht';
    }
    const h = new Date().getHours();
    if (h >= 9 && h < 17) return 'dag';
    if (h >= 7 && h < 9) return 'schemer';
    if (h >= 17 && h < 19) return 'schemer';
    return 'nacht';
  }

  _weather() {
    const w = this._config.weather && this._hass.states[this._config.weather];
    if (!w) return 'helder';
    return GBC_WEATHER[w.state] || 'bewolkt';
  }

  _update() {
    if (!this._hass || !this._built) return;
    const c = this._config;

    const phase = this._phase();
    const weer = this._weather();
    const key = c.sky === false ? 'off|' + phase : weer + '|' + phase;
    if (key !== this._skyKey) {
      this._skyKey = key;
      // zon/maan maar één keer: in het meest rechtse raam van de bovenste rij
      const orbIdx = Math.min(this._cols(), c.blinds.length) - 1;
      this.shadowRoot.querySelectorAll('.sky').forEach((s, i) => {
        s.innerHTML = c.sky === false
          ? gbcSkyHtml('helder', 'nacht').split('<span')[0]
          : gbcSkyHtml(weer, phase, i, i === orbIdx);
      });
    }

    let open = 0;
    c.blinds.forEach((b, i) => {
      const p = this._getPos(i);
      if (p !== null && p > 0) open++;
      this._updateBlind(i);
    });

    const summary = this.shadowRoot.querySelector('.summary');
    if (summary) {
      const one = open === 1 || (open === 0 && this._lang() === 'fr');
      const parts = [this._t(one ? 'n_open_one' : 'n_open', { n: open })];
      if (c.sky !== false && c.weather) parts.push(this._t(weer));
      if (c.sky !== false) parts.push(this._t(phase));
      summary.textContent = parts.join(' · ');
    }
  }

  _updateBlind(i) {
    const root = this.shadowRoot.querySelector('.blind[data-i="' + i + '"]');
    if (!root) return;
    const b = this._config.blinds[i];
    const st = this._state(i);
    const win = root.querySelector('.win');
    const pctEl = root.querySelector('.pct');
    const nameEl = root.querySelector('.name');
    const statusEl = root.querySelector('.status');
    const stopEl = root.querySelector('.stop');
    const bubble = root.querySelector('.bubble');

    const name = b.name || (st && st.attributes.friendly_name) || b.entity;
    nameEl.textContent = name;

    if (!st || this._isUnavailable(i)) {
      win.classList.add('unavailable');
      win.classList.remove('dragging', 'has-target');
      pctEl.textContent = '–';
      statusEl.textContent = this._t(st ? 'unavailable' : 'not_found');
      stopEl.classList.remove('active');
      win.setAttribute('aria-label', this._t('aria_unavailable', { name }));
      return;
    }
    win.classList.remove('unavailable');

    const raw = this._getPos(i) ?? 0;
    const feat = st.attributes.supported_features || 0;

    const now = Date.now();
    const motorState = st.state === 'opening' || st.state === 'closing';

    // positieveranderingen bijhouden: een veranderende positie = beweging,
    // ook als de motor geen "opening/closing" meldt
    let last = this._last[i];
    if (!last) {
      last = this._last[i] = { pos: raw, at: 0 };
    } else if (last.pos !== raw) {
      last.pos = raw;
      last.at = now;
      this._ensureTick();
    }
    if (motorState) this._ensureTick();

    // beweging die via de kaart gestart is
    // Sommige integraties zetten de positie meteen op de gekozen waarde
    // (optimistisch) en melden pas daarna de echte posities. Dan zou het
    // gordijn op de kaart eerst naar het doel springen, terug naar de
    // beginpositie gaan en pas dan live bewegen. Zolang we geen echte
    // tussenwaarde gezien hebben, tonen we daarom een geschatte positie.
    const mv = this._moves[i];
    let pos = raw;
    if (mv) {
      if (motorState) mv.sawMotion = true;
      if (!mv.trusted && raw !== mv.from && raw !== mv.target) mv.trusted = true;
      if (!mv.trusted && raw === mv.target && mv.target !== mv.from) {
        const f = gbcClamp((now - mv.start - 1200) / mv.dur, 0, 1);
        pos = Math.round(mv.from + (mv.target - mv.from) * f);
      }
      const reached = mv.trusted && Math.abs(mv.target - raw) <= 1 && now - last.at > 1500;
      const motorDone = mv.sawMotion && !motorState && now - last.at > 1000;
      if (now > mv.until || reached || motorDone) {
        delete this._moves[i];
        pos = raw;
      }
    }
    this._disp[i] = pos;

    // doel (stippellijn) opruimen als het bereikt is of de beweging voorbij is
    const tgt = this._targets[i];
    if (tgt) {
      const age = now - tgt.t;
      if (Math.abs(tgt.pos - pos) <= 1 || age > 180000 || (!this._moves[i] && !motorState && age > 2000)) {
        delete this._targets[i];
      }
    }

    const dragging = this._drag && this._drag.i === i;
    const target = dragging ? this._drag.pos : (this._targets[i] ? this._targets[i].pos : null);
    const justStopped = this._stoppedAt[i] && now - this._stoppedAt[i] < 2500;
    const moving = !dragging && !justStopped && (motorState || now - last.at < 2500 || !!this._moves[i]);

    win.style.setProperty('--closed', String((100 - pos) / 100));
    if (target !== null) win.style.setProperty('--gclosed', String((100 - target) / 100));
    win.classList.toggle('dragging', !!dragging);
    win.classList.toggle('has-target', target !== null);
    bubble.textContent = (target ?? pos) + '%';

    pctEl.textContent = pos + '%';

    let status;
    if (dragging) status = this._t('to', { p: target });
    else if (st.state === 'opening') status = this._t('opening');
    else if (st.state === 'closing') status = this._t('closing');
    else if (justStopped) status = this._t('stopped');
    else if (target !== null) status = this._t('to', { p: target });
    else if (moving) status = this._t('moving');
    else if (pos >= 100) status = this._t('open');
    else if (pos <= 0) status = this._t('closed');
    else status = this._t('half');
    statusEl.textContent = status;

    stopEl.hidden = !(feat & GBC_STOP) && feat !== 0;
    stopEl.classList.toggle('active', moving);
    stopEl.setAttribute('aria-label', this._t('aria_stop', { name }));

    win.setAttribute('aria-valuenow', String(pos));
    win.setAttribute('aria-label', this._t('aria_pos', { name, p: pos }));
  }
}

/* ------------------------------------------------------------------ */
/*  Visuele editor                                                     */
/* ------------------------------------------------------------------ */

function gbcMainSchema(lang) {
  const t = (k) => gbcT(lang, k);
  return [
  { name: 'title', selector: { text: {} } },
  { name: 'weather', selector: { entity: { domain: 'weather' } } },
  { name: 'sun', selector: { entity: { domain: 'sun' } } },
  { name: 'glow', selector: { number: { min: 0, max: 60, step: 2, mode: 'slider', unit_of_measurement: 'px' } } },
  {
    type: 'grid', name: '', schema: [
      { name: 'columns', selector: { number: { min: 1, max: 8, mode: 'box' } } },
      { name: 'height', selector: { number: { min: 100, max: 600, step: 10, mode: 'box', unit_of_measurement: 'px' } } },
    ],
  },
  {
    name: 'background', selector: {
      select: {
        mode: 'dropdown', options: [
          { value: 'dark', label: t('bg_dark') },
          { value: 'theme', label: t('bg_theme') },
        ],
      },
    },
  },
  {
    type: 'grid', name: '', schema: [
      { name: 'sky', selector: { boolean: {} } },
      { name: 'show_all_buttons', selector: { boolean: {} } },
      { name: 'show_hint', selector: { boolean: {} } },
    ],
  },
  {
    name: 'language', selector: {
      select: {
        mode: 'dropdown', options: [{ value: 'auto', label: t('lang_auto') }]
          .concat(Object.keys(GBC_LANG_NAMES).map((k) => ({ value: k, label: GBC_LANG_NAMES[k] }))),
      },
    },
  },
];
}

function gbcBlindSchema(lang) {
  const t = (k) => gbcT(lang, k);
  return [
  { name: 'entity', selector: { entity: { domain: 'cover' } } },
  { name: 'name', selector: { text: {} } },
  { name: 'travel_time', selector: { number: { min: 3, max: 300, mode: 'box', unit_of_measurement: 's' } } },
  {
    name: 'fabric', selector: {
      select: {
        mode: 'dropdown', options: [
          { value: 'dimout', label: t('fab_dimout') },
          { value: 'blackout', label: t('fab_blackout') },
        ],
      },
    },
  },
  { name: 'invert', selector: { boolean: {} } },
];
}

const GBC_EDITOR_STYLE = `
  .main { margin-bottom: 16px; }
  h3 { margin: 20px 0 8px; font-size: 16px; font-weight: 600; }
  .blind {
    border: 1px solid var(--divider-color, rgba(127,127,127,0.3));
    border-radius: 12px; padding: 12px; margin-bottom: 12px;
    border-left: 6px solid var(--c);
  }
  .row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
  .row .label { font-weight: 600; flex: 1; }
  .row input[type=color] { width: 44px; height: 32px; border: none; padding: 0; background: none; cursor: pointer; }
  .row button, .add {
    font: inherit; cursor: pointer; border-radius: 8px; padding: 6px 10px;
    border: 1px solid var(--divider-color, rgba(127,127,127,0.4));
    background: var(--secondary-background-color, transparent); color: var(--primary-text-color);
  }
  .swatches { display: flex; gap: 6px; }
  .sw { width: 22px; height: 22px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; padding: 0; }
  .sw.on { border-color: var(--primary-text-color); }
  .add { width: 100%; padding: 10px; font-weight: 600; }
`;

class GlowBlindsCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._sig = null;
  }

  setConfig(config) {
    this._config = { ...config, blinds: (config.blinds || []).map((b) => (typeof b === 'string' ? { entity: b } : { ...b })) };
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._config && gbcLang(hass, this._config.language) !== this._lang) {
      this._sig = null;
      this._render();
      return;
    }
    this.shadowRoot.querySelectorAll('ha-form').forEach((f) => { f.hass = hass; });
  }

  _emit(config) {
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }));
  }

  _render() {
    if (!this._config) return;
    const c = this._config;
    const lang = gbcLang(this._hass, c.language);
    this._lang = lang;
    const t = (k, v) => gbcT(lang, k, v);
    const label = (s) => gbcT(lang, 'l_' + s.name);
    const sig = lang + '|' + c.blinds.length + '|' + c.blinds.map((b) => b.color).join(',');

    if (sig === this._sig) {
      // alleen data bijwerken, zodat de focus in tekstvelden blijft
      const main = this.shadowRoot.querySelector('ha-form.main');
      if (main) main.data = this._mainData();
      this.shadowRoot.querySelectorAll('ha-form.bf').forEach((f) => {
        f.data = c.blinds[parseInt(f.dataset.i, 10)];
      });
      return;
    }
    this._sig = sig;

    this.shadowRoot.innerHTML = `<style>${GBC_EDITOR_STYLE}</style>`;

    const main = document.createElement('ha-form');
    main.className = 'main';
    main.hass = this._hass;
    main.schema = gbcMainSchema(lang);
    main.data = this._mainData();
    main.computeLabel = label;
    main.addEventListener('value-changed', (e) => {
      const v = { ...e.detail.value };
      ['columns', 'height'].forEach((k) => { if (v[k] === '' || v[k] === null || v[k] === undefined) delete v[k]; });
      ['weather'].forEach((k) => { if (!v[k]) delete v[k]; });
      if (!v.language || v.language === 'auto') delete v.language;
      this._emit({ ...this._config, ...v, blinds: this._config.blinds });
    });
    this.shadowRoot.appendChild(main);

    const h3 = document.createElement('h3');
    h3.textContent = t('title');
    this.shadowRoot.appendChild(h3);

    c.blinds.forEach((b, i) => {
      const color = b.color || GBC_PALETTE[i % GBC_PALETTE.length];
      const box = document.createElement('div');
      box.className = 'blind';
      box.style.setProperty('--c', color);

      const row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = `<span class="label">${t('ed_blind', { n: i + 1 })}</span>
        <span class="swatches">${GBC_PALETTE.map((p) => `<button type="button" class="sw${p.toLowerCase() === color.toLowerCase() ? ' on' : ''}" style="background:${p}" data-col="${p}" title="${p}"></button>`).join('')}</span>
        <input type="color" value="${/^#[0-9a-f]{6}$/i.test(color) ? color : '#b9a8ff'}" title="${t('ed_color')}">
        <button type="button" class="up" title="${t('ed_up')}" ${i === 0 ? 'disabled' : ''}>↑</button>
        <button type="button" class="down" title="${t('ed_down')}" ${i === c.blinds.length - 1 ? 'disabled' : ''}>↓</button>
        <button type="button" class="del" title="${t('ed_delete')}">${t('ed_delete')}</button>`;
      box.appendChild(row);

      row.querySelectorAll('.sw').forEach((sw) => sw.addEventListener('click', () => this._patch(i, { color: sw.dataset.col })));
      row.querySelector('input[type=color]').addEventListener('change', (e) => this._patch(i, { color: e.target.value.toUpperCase() }));
      row.querySelector('.up').addEventListener('click', () => this._move(i, -1));
      row.querySelector('.down').addEventListener('click', () => this._move(i, 1));
      row.querySelector('.del').addEventListener('click', () => {
        const blinds = this._config.blinds.filter((_, k) => k !== i);
        this._emit({ ...this._config, blinds });
        this._render();
      });

      const f = document.createElement('ha-form');
      f.className = 'bf';
      f.dataset.i = String(i);
      f.hass = this._hass;
      f.schema = gbcBlindSchema(lang);
      f.data = b;
      f.computeLabel = label;
      f.addEventListener('value-changed', (e) => {
        const v = { ...e.detail.value };
        if (!v.name) delete v.name;
        if (!v.invert) delete v.invert;
        if (!v.travel_time) delete v.travel_time;
        const blinds = this._config.blinds.slice();
        blinds[i] = { ...v, color: blinds[i].color };
        this._emit({ ...this._config, blinds });
      });
      box.appendChild(f);
      this.shadowRoot.appendChild(box);
    });

    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'add';
    add.textContent = t('ed_add');
    add.addEventListener('click', () => {
      const used = new Set(this._config.blinds.map((b) => b.entity));
      const free = Object.keys((this._hass && this._hass.states) || {}).find((e) => e.startsWith('cover.') && !used.has(e));
      const n = this._config.blinds.length;
      const blinds = this._config.blinds.concat([{ entity: free || '', color: GBC_PALETTE[n % GBC_PALETTE.length] }]);
      this._emit({ ...this._config, blinds });
      this._render();
    });
    this.shadowRoot.appendChild(add);
  }

  _mainData() {
    const c = this._config;
    return {
      title: c.title ?? gbcT(this._lang || 'en', 'title'),
      language: c.language ?? 'auto',
      weather: c.weather,
      sun: c.sun ?? 'sun.sun',
      glow: c.glow ?? 22,
      columns: c.columns,
      height: c.height,
      background: c.background ?? 'dark',
      sky: c.sky !== false,
      show_all_buttons: c.show_all_buttons !== false,
      show_hint: c.show_hint !== false,
    };
  }

  _patch(i, p) {
    const blinds = this._config.blinds.slice();
    blinds[i] = { ...blinds[i], ...p };
    this._emit({ ...this._config, blinds });
    this._render();
  }

  _move(i, d) {
    const j = i + d;
    const blinds = this._config.blinds.slice();
    if (j < 0 || j >= blinds.length) return;
    [blinds[i], blinds[j]] = [blinds[j], blinds[i]];
    this._emit({ ...this._config, blinds });
    this._sig = null;
    this._render();
  }
}

if (!customElements.get('glow-blinds-card')) {
  customElements.define('glow-blinds-card', GlowBlindsCard);
}
if (!customElements.get('glow-blinds-card-editor')) {
  customElements.define('glow-blinds-card-editor', GlowBlindsCardEditor);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === 'glow-blinds-card')) {
  window.customCards.push({
    type: 'glow-blinds-card',
    name: 'Glow Blinds Card',
    description: gbcT(gbcLang(null), 'description'),
    preview: true,
    documentationURL: 'https://github.com/stijnleroy/glow-blinds-card',
  });
}

console.info(
  '%c GLOW-BLINDS-CARD %c v' + GBC_VERSION + ' ',
  'color:#1C1730;background:#B9A8FF;font-weight:700;border-radius:4px 0 0 4px;padding:2px 4px',
  'color:#B9A8FF;background:#1C1730;font-weight:700;border-radius:0 4px 4px 0;padding:2px 4px'
);
