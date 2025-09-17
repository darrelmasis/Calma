import { Icon } from "../components/commons/Icons";

export const ServicesData = {
  manicure: {
    id: "manicure",
    image: "manicure-01",
    Icon: "hand-sparkles",
    prices: {
      regular: 6.5,
      spa: 11,
      vip: 15,
      gel: 15.5,
      spaGel: 20,
      vipGel: 24
    }
  },
  pedicure: {
    id: "pedicure",
    image: "pedicure-01",
    Icon: "sparkles",
    prices: {
      regular: 8.5,
      spa: 14,
      vip: 16,
      gel: 16,
      spaGel: 21,
      vipGel: 25
    }
  },
  acrilicas: {
    id: "acrilicas",
    image: "manicure-02",
    Icon: "paintbrush-fine",
    prices: {
      naturales: 15,
      almond: 18,
      coffin: 17,
      esculturales: { from: 18 },
      refill: 13,
      banoAcrilico: 14,
      rubber: 14,
      poly: 22
    }
  },
  extras: {
    id: "extras",
    image: "extras-01",
    Icon: "gift",
    prices: {
      limpieza: { from: 2 },
      decoracion: { from: 0.5 },
      gelCalcio: { from: 3 },
      extensionCalcio: { from: 15 },
      gelFrio: 5,
      topGelFrio: 3,
      parafina: 7,
      botasTermicas: 3,
      guantesHidratantes: 4,
      esmalteRegular: 4,
      esmalteGel: 10,
      reparacionUñas: { from: 2 },
      uñasExtraAcrilico: { from: 3 },
      retiroGel: { from: 3 },
      retiroAcrilico: { from: 8 }
    }
  },
  cejasPestanas: {
    id: "cejasPestanas",
    image: "cejas-01",
    Icon: "sparkles",
    prices: {
      laminacionCejas: 16,
      laminacionDiseno: 20,
      laminacionTinte: 24,
      tinteCejas: 8,
      levantamientoPestanas: 20,
      extensionPestanas: 25
    }
  },
  depilacion: {
    id: "depilacion",
    image: "waxing-01",
    Icon: "sparkles",
    prices: {
      cejas: { from: 5 },
      bigote: 3,
      axilas: 10,
      bikini: { from: 13 },
      fullBikini: { from: 10 },
      brazos: { from: 10 },
      mediaPierna: { from: 15 },
      piernaCompleta: { from: 20 },
      espalda: { from: 15 },
      gluteos: { from: 10 }
    }
  },
  lavado: {
    id: "lavado",
    image: "hair-01",
    Icon: "shower",
    prices: {
      lavadoExpress: 4,
      lavadoProfundo: 8,
      lavadoMascarilla: 18,
      lavadoAmpolla: 15,
      relajanteExpress: 20,
      cabelloTratado: 35,
      aplicacionTinta: { from: 12 }
    }
  },
  estilismo: {
    id: "estilismo",
    image: "hair-02",
    Icon: "sparkles",
    prices: {
      secado: { from: 10 },
      planchado: { from: 10 },
      ondas: { from: 15 },
      peinadoSencillo: { from: 18 },
      peinadoElaborado: { from: 23 },
      trenzas: { from: 8 },
      cortePuntas: { from: 6 },
      corteEstilo: { from: 10 }
    }
  },
  spa: {
    id: "spa",
    image: "spa-01",
    Icon: "spa",
    prices: {
      maderoterapia: 35,
      masajeRelajante: 25,
      masajeProfundo: 25
    }
  },
  facial: {
    id: "facial",
    image: "spa-02",
    Icon: "face-smile-relaxed",
    prices: {
      detoxGlow: 35,
      guaSha: 35,
      hydrafacial: 40,
      facialRefrescante: 35,
      detoxEspalda: 35
    }
  },
  maquillaje: {
    id: "maquillaje",
    image: "addons-01",
    Icon: "paintbrush-pencil",
    prices: {
      profesional: { from: 30 },
      pestanas: 5
    }
  },
  manicureNinos: {
    id: "manicure-ninos",
    image: "maniKids-01",
    Icon: "child-reaching",
    prices: {
      regular: 4,
      gel: 8
    }
  },
  pedicureNinos: {
    id: "pedicure-ninos",
    image: "pediKids-01",
    Icon: "child-reaching",
    prices: {
      regular: 6,
      gel: 11
    }
  }
};
