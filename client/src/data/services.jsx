import { manicure01, pedicure01, manicure02, extras01, cejas01, waxing01, hair01, hair02, spa01, spa02, addons01, pediKids01, maniKids01 } from '../assets/assets'

export const ServicesData = {
  manicure: {
    id: "manicure",
    image: manicure01,
    prices: {
      regular: 237,
      spa: 401,
      vip: 546,
      gel: 566,
      spaGel: 730,
      vipGel: 876
    }
  },
  pedicure: {
    id: "pedicure",
    image: pedicure01,
    prices: {
      regular: 310,
      spa: 511,
      vip: 584,
      gel: 584,
      spaGel: 767,
      vipGel: 912
    }
  },
  acrilicas: {
    id: "acrilicas",
    image: manicure02,
    prices: {
      naturales: 548,
      almond: 657,
      coffin: 620,
      esculturales: 657,
      refill: 475,
      banoAcrilico: 511,
      rubber: 511,
      poly: 803
    }
  },
  extras: {
    id: "extras",
    image: extras01,
    prices: {
      limpieza: 73,
      decoracion: 18,
      gelCalcio: 110,
      extensionCalcio: 548,
      gelFrio: 182,
      topGelFrio: 110,
      parafina: 256,
      botasTermicas: 110,
      guantesHidratantes: 146,
      esmalteRegular: 146,
      esmalteGel: 365,
      reparacionUñas: 73,
      uñasExtraAcrilico: 110,
      retiroGel: 110,
      retiroAcrilico: 292
    }
  },
  cejasPestanas: {
    id: "cejasPestanas",
    image: cejas01,
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
    image: waxing01,
    prices: {
      cejas: 182,
      bigote: 110,
      axilas: 365,
      bikini: 438,
      fullBikini: 730,
      brazos: 365,
      mediaPierna: 546,
      piernaCompleta: 730,
      espalda: 546,
      gluteos: 365
    }
  },
  lavado: {
    id: "lavado",
    image: hair01,
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
  estilismo: {
    id: "estilismo",
    image: hair02,
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
  spa: {
    id: "spa",
    image: spa01,
    prices: {
      maderoterapia: 1278,
      masajeRelajante: 921,
      masajeProfundo: 912
    }
  },
  facial: {
    id: "facial",
    image: spa02,
    prices: {
      detoxGlow: 1278,
      guaSha: 1278,
      hydrafacial: 1460,
      facialRefrescante: 1278,
      detoxEspalda: 1278
    }
  },
  maquillaje: {
    id: "maquillaje",
    image: addons01,
    prices: {
      profesional: 1095,
      pestanas: 182
    }
  },
  manicureNinos: {
    id: "manicure-ninos",
    image: maniKids01,
    prices: {
      regular: 146,
      gel: 292
    }
  },
  pedicureNinos: {
    id: "pedicure-ninos",
    image: pediKids01,
    prices: {
      regular: 219,
      gel: 401
    }
  }
};
