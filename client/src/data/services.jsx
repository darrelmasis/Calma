export const ServicesData = {
  manicure: {
    id: "manicure",
    image: "manicure-01",
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
  cejasPestanas: {// FALTA PRECIO EN DOLARES
    id: "cejasPestanas",
    image: "cejas-01",
    prices: {
      laminacionCejas: 584,
      laminacionDiseno: 730,
      laminacionTinte: 876,
      tinteCejas: 292,
      levantamientoPestanas: 730,
      extensionPestanas: 912
    }
  },
  depilacion: {
    id: "depilacion",
    image: "waxing-01",
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
  lavado: {// FALTA PRECIO EN DOLARES
    id: "lavado",
    image: "hair-01",
    prices: {
      lavadoExpress: 146,
      lavadoProfundo: 292,
      lavadoMascarilla: 657,
      lavadoAmpolla: 546,
      relajanteExpress: 730,
      cabelloTratado: 1278,
      aplicacionTinta: 438
    }
  },
  estilismo: {// FALTA PRECIO EN DOLARES
    id: "estilismo",
    image: "hair-02",
    prices: {
      secado: 365,
      planchado: 365,
      ondas: 546,
      peinadoSencillo: 657,
      peinadoElaborado: 840,
      trenzas: 292,
      cortePuntas: 219,
      corteEstilo: 365
    }
  },
  spa: {// FALTA PRECIO EN DOLARES
    id: "spa",
    image: "spa-01",
    prices: {
      maderoterapia: 1278,
      masajeRelajante: 921,
      masajeProfundo: 912
    }
  },
  facial: {// FALTA PRECIO EN DOLARES
    id: "facial",
    image: "spa-02",
    prices: {
      detoxGlow: 1278,
      guaSha: 1278,
      hydrafacial: 1460,
      facialRefrescante: 1278,
      detoxEspalda: 1278
    }
  },
  maquillaje: {// FALTA PRECIO EN DOLARES
    id: "maquillaje",
    image: "addons-01",
    prices: {
      profesional: 1095,
      pestanas: 182
    }
  },
  manicureNinos: {
    id: "manicure-ninos",
    image: "maniKids-01",
    prices: {
      regular: 4,
      gel: 8
    }
  },
  pedicureNinos: {
    id: "pedicure-ninos",
    image: "pediKids-01",
    prices: {
      regular: 6,
      gel: 11
    }
  }
};
