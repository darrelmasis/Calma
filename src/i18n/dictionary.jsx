const currentYear = new Date().getFullYear()
const copyrightName = import.meta.env.VITE_CALMA_NAME
const authors = import.meta.env.VITE_CALMA_AUTHOR

const copyrightEs = `© ${currentYear} • ${copyrightName}`
const copyrightEn = `© ${currentYear} • ${copyrightName}`

const authorsEs = `Con Mucho Cariño, ${authors}`
const authorsEn = `Much Love, ${authors.replace(/y/g, '&')}`

export const dictionary = {
  es: {
    header: {
      links: {
        home: 'Inicio',
        history: 'Historia',
        services: 'Servicios',
        packages: 'Paquetes',
        logoTooltip: 'Ir a la página de inicio'
      },
      headerButton: {
        book: 'Reservar'
      },
      dropdown: {
        text: 'Mi Bolsa',
        title: 'Servicios agregados',
        empty: 'Tu bolsa está vacía',
        emptySubtitle: 'Agrega servicios para reservar tu cita',
        total: 'Total estimado',
        totalSubtitle: 'servicio',
        clear: 'Limpiar',
        book: 'Agendar ahora!',
        exploreServices: 'Explorar Servicios',
        keepExploring: 'Seguir explorando',
        clearTooltip: 'Eliminar todos los servicios seleccionados',
        fullBag: '¡Tu bolsa está llena!',
        addedService: 'servicio agregado',
        addedServices: 'servicios agregados'
      },
      mobileNavbar: {
        title: 'Navegación',
        installButtonText: 'Instalar App'
      }
    },
    footer: {
      cta: {
        title: '¡Agenda tu cita hoy!',
        description:
          'Reserva con nuestros especialistas en bienestar cuando y donde quieras',
        button: '¡Reserva ahora!'
      },
      columns: {
        contact: {
          title: 'Contacto',
          address: 'Iglesia La Merced, 1C N, 10v O, Granada',
          addressTooltip: 'Ver ubicación en Google Maps'
        },
        nav: {
          title: 'Navegación',
          book: 'Agendar Cita',
          services: 'Servicios',
          history: 'Historia',
          packages: 'Paquetes'
        },
        about: {
          title: 'Conócenos',
          who: '¿Quiénes somos?',
          team: 'Nuestro equipo',
          blog: 'Blog'
        },
        social: {
          title: 'Social',
          facebook: 'Facebook',
          facebookTooltip: 'Síguenos en Facebook',
          instagram: 'Instagram',
          instagramTooltip: 'Síguenos en Instagram'
        }
      },
      help: {
        title: '¿Necesitas ayuda con tu reserva?',
        contact: 'Contáctanos:',
        subtitle: 'Estamos aquí para ayudarte con tu reserva'
      },
      legal: {
        copyright: copyrightEs,
        subtitle: authorsEs
      }
    },
    home: {
      pageTitle: 'Inicio',
      heroSection: {
        title_1:
          'Encuentra tu <span className="text-primary">Calma</span> interior',
        description:
          'Descubre un espacio diseñado para tu bienestar y tranquilidad, donde cada servicio está pensado para restaurar tu equilibrio',
        button_1: 'Descubrir servicios',
        button_2: 'Paquetes disponibles'
      },
      section_2: {
        title: '¿Por qué elegir Calma?',
        description: 'Nuestro enfoque holístico nos distingue',
        points: {
          p1: {
            title: 'Atención personalizada',
            description:
              'Cada cliente recibe un tratamiento único adaptado a sus necesidades'
          },
          p2: {
            title: 'Ambiente Seguro',
            description:
              'Creamos un entorno acogedor y seguro para que te sientas cómodo'
          },
          p3: {
            title: 'Personal Experto',
            description:
              'Nuestro equipo cuenta con amplia experiencia y formación especializada'
          }
        }
      },
      section_3: {
        title: 'Comienza tu camino hacia la tranquilidad',
        description:
          'Descubre nuestros servicios y encuentra el que mejor se adapte a tus necesidades',
        button: 'Descubrir Servicios'
      }
    },
    history: {
      pageTitle: 'Nuestra Historia',
      heroSection: {
        title: 'Equilibrio interior, brillo exterior',
        subtitle: 'Un viaje de bienestar y dedicación'
      },
      section_1: {
        title: 'Nuestra Historia',
        history_p1:
          'Comenzamos este camino en 2016, comprometidas no solo con ofrecer servicios, sino también una experiencia que deleitara los sentidos y nutriera el cuerpo y el alma. Calma nació del deseo de crear un espacio de renovación y tranquilidad en medio de lo cotidiano, inspirado por la intención de preservar ese equilibrio interior del que todos dependemos. De ahí surge nuestro nombre: el estado o la cualidad de estar en paz.',
        history_p2:
          'Desde el inicio, nuestro enfoque ha sido conectar con lo esencial: tratamientos que combinan técnicas tradicionales con un enfoque moderno. Esto da lugar a una experiencia transformadora en un ambiente cuidadosamente diseñado, para que cada visita sea un verdadero momento de pausa. Creemos que el bienestar no es un lujo, sino una necesidad, y por eso cada servicio ha sido pensado con el descanso y la belleza en mente.',
        history_p3:
          'Hoy, Calma es reconocida por su compromiso con el bienestar y su dedicación. Cada rincón refleja nuestra atención al detalle y el profundo respeto por quienes nos visitan. Nuestro propósito es seguir creciendo con la intención de expandir los servicios sin perder la esencia que nos define. Calma es más que un espacio físico; es una invitación a reconectar contigo, respirar profundo y encontrar tu equilibrio.',
        end_tag: 'Con Mucho Cariño,',
        owners: authors,
        imageAlt: 'Imagen representativa de nuestra historia'
      },
      section_2: {
        title: '¿Quiénes Somos?',
        visionTitle: 'Nuestra Visión',
        visionDescription:
          'Crear experiencias de bienestar que nutran el cuerpo y la mente a través de servicios personalizados, en un entorno pensado para la relajación y la renovación interior.',
        missionTitle: 'Nuestra Misión',
        missionDescription:
          'Ofrecer un espacio donde cada persona pueda reconectar con su calma interior mediante tratamientos y un servicio excepcional, siempre enfocados en el bienestar integral.'
      }
    },
    packages: {
      pageTitle: 'Nuestros Paquetes',
      section_1: {
        title: 'Nuestros Paquetes',
        description:
          'Descubre nuestros paquetes diseñados para ofrecer una experiencia de bienestar y relajación. Cada uno combina servicios para brindarte un momento único de renovación.',
        include_text: 'El Paquete Incluye',
        group_optionaly_text:
          'Todos nuestros paquetes tienen opciones de grupo',
        from_price_text: 'Desde',

        paquetes: [
          {
            icono: 'sparkles',
            nombre_original: 'Calma',
            precio: '150',
            featured: false,
            featured_text: '',
            descripcion_corta:
              'Renovación integral cuerpo y mente, ideal para cumpleaños o cualquier ocasión especial',
            servicios_incluidos: [
              'Manicure SPA (Gel o regular)',
              'Pedicure SPA (Gel o regular)',
              'Mascarilla capilar',
              'Lavado línea SPA',
              'Secado + Estilizado',
              'Facial o masaje a elección'
            ]
          },
          {
            icono: 'champagne-glasses',
            nombre_original: 'The Day',
            precio: '170',
            featured: true,
            featured_text: 'Más Popular',
            descripcion_corta: 'Prepárate para tu evento especial con Calma',
            servicios_incluidos: [
              'Lavado línea SPA',
              'Secado profesional',
              'Peinado elegante',
              'Preparación de piel VIP',
              'Maquillaje completo',
              'Mini botella de champagne'
            ]
          },
          {
            icono: 'rings-wedding',
            nombre_original: 'Bridal Glow-Up',
            precio: '250',
            featured: false,
            featured_text: '',
            descripcion_corta: 'Experiencia de belleza completa para novias',
            servicios_incluidos: [
              'Manicure VIP SPA (Gel o regular)',
              'Pedicure VIP SPA (Gel o regular)',
              'Facial Detox Glow',
              'Masaje relajante',
              'Tratamiento de cabello con mascarilla',
              'Depilación (facial o corporal)',
              'Botella de champagne'
            ]
          }
        ]
      },
      section_2: {
        faq: {
          title: 'Preguntas Frecuentes',
          items: [
            {
              question: '¿Puedo personalizar un paquete?',
              answer:
                'Cada paquete puede ser personalizado a la necesidad del cliente o grupo. Contáctanos para adaptar el paquete a tu necesidad.'
            },
            {
              question: '¿Debo reservar con anticipación?',
              answer:
                'Sí, recomendamos reservar con anticipación para garantizar disponibilidad y coordinar fechas y horarios.'
            },
            {
              question: '¿Qué duración tiene cada paquete?',
              answer:
                'Los paquetes son personalizados, ya depende la necesidad del cliente se ajusta el tiempo necesario.'
            }
          ]
        }
      }
    },
    services: {
      pageTitle: 'Nuestros Servicios',
      fromBadge: 'Desde',
      cardFooter: {
        expandable: {
          expanded: '¡Eso es todo por ahora!',
          collapsed: '¡Descubre todos los servicios!'
        },
        static: '¡Ya viste todo!',
        minimal: '¡Pocos pero especiales!'
      },
      section_1: {
        title: 'Servicios Disponibles',
        description:
          'Explora nuestra variedad de servicios diseñados para tu bienestar, belleza y relajación, cada experiencia ha sido cuidadosamente pensada para armonizar cuerpo y mente',
        booking_button_text: 'Reservar ahora',
        view_all: 'Ver todos',
        tabsHeader: 'Categorías',
        category: {
          unas: {
            name: 'Uñas',
            subCategory: {
              manicure: {
                name: 'Manicure',
                services: {
                  regular: {
                    name: 'Regular',
                    description: 'Limpieza, esmalte regular'
                  },
                  spa: {
                    name: 'SPA',
                    description:
                      'Limpieza, masaje, guantes hidratantes, esmalte regular'
                  },
                  vip: {
                    name: 'VIP',
                    description:
                      'Limpieza, sal epsom, toallas calientes, masaje, parafina, esmalte regular'
                  },
                  gel: { name: 'Gel', description: 'Limpieza, esmalte gel' },
                  spaGel: {
                    name: 'SPA Gel',
                    description:
                      'Limpieza, masajes, guantes, hidratantes, esmalte gel'
                  },
                  vipGel: {
                    name: 'VIP Gel',
                    description:
                      'Limpieza, sal epsom, toallas calientes, masaje, parafina, esmalte gel'
                  }
                }
              },
              pedicure: {
                name: 'Pedicure',
                services: {
                  regular: {
                    name: 'Regular',
                    description: 'Limpieza, esmalte regular'
                  },
                  spa: {
                    name: 'SPA',
                    description:
                      'Limpieza profunda, Salt scrub, masaje, Mascarilla hidratante o toallas calientes y esmalte regular'
                  },
                  vip: {
                    name: 'VIP',
                    description:
                      'Limpieza profunda, baño jelly, masaje y esmalte regular'
                  },
                  gel: { name: 'Gel', description: 'Limpieza, esmalte gel' },
                  spaGel: {
                    name: 'SPA Gel',
                    description:
                      'Limpieza profunda, Salt scrub, masaje, Mascarilla hidratante o toallas calientes y esmalte gel'
                  },
                  vipGel: {
                    name: 'VIP Gel',
                    description:
                      'Limpieza profunda, baño jelly, masaje y esmalte gel'
                  }
                }
              },
              acrilicas: {
                name: 'Acrílicas',
                services: {
                  naturales: {
                    name: 'Naturales',
                    description: 'Uñas acrílicas naturales'
                  },
                  almond: {
                    name: 'Almond',
                    description: 'Uñas acrílicas forma almendra'
                  },
                  coffin: {
                    name: 'Coffin',
                    description: 'Uñas acrílicas forma coffin'
                  },
                  esculturales: {
                    name: 'Esculturales',
                    description: 'Uñas esculturales'
                  },
                  refill: {
                    name: 'Refill',
                    description: 'Relleno de uñas acrílicas'
                  },
                  banoAcrilico: {
                    name: 'Baño Acrílico',
                    description: 'Aplicación de baño acrílico'
                  },
                  rubber: {
                    name: 'Rubber',
                    description: 'Aplicación de rubber'
                  },
                  poly: { name: 'Poly', description: 'Aplicación de poly gel' }
                }
              },
              extras: {
                name: 'Extras',
                services: {
                  limpieza: {
                    name: 'Limpieza',
                    description: 'Limpieza básica de uñas'
                  },
                  decoracion: {
                    name: 'Decoración',
                    description: 'Decoración personalizada de uñas'
                  },
                  gelCalcio: {
                    name: 'Gel Calcio',
                    description: 'Aplicación de gel calcio'
                  },
                  extensionCalcio: {
                    name: 'Extensión Calcio',
                    description: 'Extensión de uñas con gel calcio'
                  },
                  gelFrio: {
                    name: 'Gel Frío',
                    description: 'Aplicación de gel frío'
                  },
                  topGelFrio: {
                    name: 'Top Gel Frío',
                    description: 'Capa superior de gel frío'
                  },
                  parafina: {
                    name: 'Parafina',
                    description: 'Tratamiento de parafina'
                  },
                  botasTermicas: {
                    name: 'Botas Térmicas',
                    description: 'Tratamiento con botas térmicas'
                  },
                  guantesHidratantes: {
                    name: 'Guantes Hidratantes',
                    description: 'Hidratación con guantes'
                  },
                  esmalteRegular: {
                    name: 'Esmalte Regular',
                    description: 'Aplicación de esmalte regular'
                  },
                  esmalteGel: {
                    name: 'Esmalte Gel',
                    description: 'Aplicación de esmalte gel'
                  },
                  reparacionUñas: {
                    name: 'Reparación',
                    description: 'Reparación de uñas'
                  },
                  uñasExtraAcrilico: {
                    name: 'Uñas Extra Acrílico',
                    description: 'Uñas adicionales con acrílico'
                  },
                  retiroGel: {
                    name: 'Retiro Gel',
                    description: 'Retiro de esmalte gel'
                  },
                  retiroAcrilico: {
                    name: 'Retiro Acrílico',
                    description: 'Retiro de uñas acrílicas'
                  }
                }
              }
            }
          },
          depilacion: {
            name: 'Depilación',
            subCategory: {
              cejasPestanas: {
                name: 'Cejas y Pestañas',
                services: {
                  laminacionCejas: {
                    name: 'Laminación Cejas',
                    description: 'Tratamiento de laminación de cejas'
                  },
                  laminacionDiseno: {
                    name: 'Laminación y Diseño',
                    description: 'Laminación + diseño de cejas'
                  },
                  laminacionTinte: {
                    name: 'Laminación y Tinte',
                    description: 'Laminación + tinte de cejas'
                  },
                  tinteCejas: {
                    name: 'Tinte de Cejas',
                    description: 'Aplicación de tinte en cejas'
                  },
                  levantamientoPestanas: {
                    name: 'Levantamiento de Pestañas',
                    description: 'Levantamiento de pestañas natural'
                  },
                  extensionPestanas: {
                    name: 'Extensión de Pestañas',
                    description: 'Aplicación de extensión de pestañas'
                  }
                }
              },
              depilacion: {
                name: 'Depilación',
                services: {
                  cejas: { name: 'Cejas', description: 'Depilación de cejas' },
                  bigote: {
                    name: 'Bigote',
                    description: 'Depilación de bigote'
                  },
                  axilas: {
                    name: 'Axilas',
                    description: 'Depilación de axilas'
                  },
                  bikini: { name: 'Bikini', description: 'Depilación bikini' },
                  fullBikini: {
                    name: 'Full Bikini',
                    description: 'Depilación completa de bikini'
                  },
                  brazos: {
                    name: 'Brazos',
                    description: 'Depilación de brazos'
                  },
                  mediaPierna: {
                    name: '1/2 Pierna',
                    description: 'Depilación media pierna'
                  },
                  piernaCompleta: {
                    name: 'Pierna Completa',
                    description: 'Depilación pierna completa'
                  },
                  espalda: {
                    name: 'Espalda',
                    description: 'Depilación de espalda'
                  },
                  gluteos: {
                    name: 'Glúteos',
                    description: 'Depilación de glúteos'
                  }
                }
              }
            }
          },
          cabello: {
            name: 'Cabello',
            subCategory: {
              lavado: {
                name: 'Lavado y Tratamientos',
                services: {
                  lavadoExpress: {
                    name: 'Lavado Express',
                    description: 'Lavado rápido (1 aplicación de champú)'
                  },
                  lavadoProfundo: {
                    name: 'Lavado Profundo',
                    description: 'Lavado profundo (2 aplicaciones de champú)'
                  },
                  lavadoMascarilla: {
                    name: 'Lavado + Mascarilla',
                    description:
                      'Lavado profundo (2 aplicaciones de champú) + mascarilla'
                  },
                  lavadoAmpolla: {
                    name: 'Lavado + Ampolla Tratamiento ',
                    description:
                      'Lavado profundo (2 aplicaciones de champú) + ampolla tratamiento '
                  },
                  relajanteExpress: {
                    name: 'Relajante Express',
                    description:
                      'Lavado profundo + ampolla tratamiento + masaje cuero cabelludo'
                  },
                  cabelloTratado: {
                    name: 'Cabello Tratado',
                    description:
                      'lavado profundo (2 aplicaciones de champú) + mascarilla hidratante + ampolla tratamiento'
                  },
                  aplicacionTinta: {
                    name: 'Aplicación de Tinte',
                    description: 'Aplicación de tinte'
                  }
                }
              },
              estilismo: {
                name: 'Estilismo',
                services: {
                  secado: { name: 'Secado', description: 'Secado de cabello' },
                  planchado: {
                    name: 'Planchado',
                    description: 'Planchado de cabello'
                  },
                  ondas: { name: 'Ondas', description: 'Ondas estilizadas' },
                  peinadoSencillo: {
                    name: 'Peinado Sencillo',
                    description: 'Peinado básico'
                  },
                  peinadoElaborado: {
                    name: 'Peinado Elaborado',
                    description: 'Peinado elaborado'
                  },
                  trenzas: {
                    name: 'Trenzas',
                    description: 'Trenzas o trenzado'
                  },
                  cortePuntas: {
                    name: 'Corte Puntas',
                    description: 'Corte de puntas'
                  },
                  corteEstilo: {
                    name: 'Corte Estilo',
                    description: 'Corte con estilo personalizado'
                  }
                }
              }
            }
          },
          spa: {
            name: 'SPA',
            subCategory: {
              spa: {
                name: 'SPA',
                services: {
                  maderoterapia: {
                    name: 'Maderoterapia',
                    description: 'Drenaje linfático'
                  },
                  masajeRelajante: {
                    name: 'Masaje Relajante',
                    description:
                      'Estimulación relajante, reducción de tensión muscular'
                  },
                  masajeProfundo: {
                    name: 'Masaje Profundo',
                    description:
                      'Masaje profundo terapéutico / Toallas calientes'
                  }
                }
              },
              facial: {
                name: 'Facial',
                services: {
                  detoxGlow: {
                    name: 'Detox Glow',
                    description: 'Tratamiento facial desintoxicante'
                  },
                  guaSha: {
                    name: 'Gua Sha',
                    description:
                      'Tratamiento de drenaje y desinflamación facial'
                  },
                  hydrafacial: {
                    name: 'Hydrafacial',
                    description: 'Hidratación facial profunda y piel radiante'
                  },
                  facialRefrescante: {
                    name: 'Facial Refrescante',
                    description: 'Tratamiento facial tonificante y escultural'
                  },
                  detoxEspalda: {
                    name: 'Detox Espalda',
                    description: 'Tratamiento desintoxicante de espalda'
                  }
                }
              }
            }
          },
          complementos: {
            name: 'Complementos',
            subCategory: {
              maquillaje: {
                name: 'Maquillaje',
                services: {
                  profesional: {
                    name: 'Profesional',
                    description:
                      'Maquillaje profesional completo, personalizado para cualquier ocasión'
                  },
                  pestanas: {
                    name: 'Pestañas',
                    description: 'Aplicación de pestañas'
                  }
                }
              }
            }
          },
          ninos: {
            name: 'Niños',
            subCategory: {
              manicureNinos: {
                name: 'Niños',
                services: {
                  regular: {
                    name: 'Mani Regular',
                    description: 'Limpieza y esmaltado básico'
                  },
                  gel: {
                    name: 'Mani Gel',
                    description: 'Aplicación de gel para niños'
                  },
                  regularPedi: {
                    name: 'Pedi Regular',
                    description: 'Limpieza básica de pies'
                  },
                  gelPedi: {
                    name: 'Pedi Gel',
                    description: 'Aplicación de gel en pies'
                  }
                }
              }
            }
          }
        }
      }
    },
    booking: {
      pageTitle: 'Citas',
      emptyBagTitle: 'Bolsa Vacía',
      nextButtonText: 'Siguiente',
      prevButtonText: 'Atrás',
      confirmButtonText: 'Confirmar',
      successMessage:
        '¡Gracias por reservar con nosotros! Te contactaremos pronto para confirmar los detalles de tu cita.',
      errorMessage:
        'Hubo un error al enviar tu reserva. Por favor, inténtalo de nuevo más tarde.',
      emptyBagMessage: '¡Aún no has seleccionado ningún servicio!',
      emptyBagMessageAlt:
        'Para agendar una cita, primero debes elegir los servicios que deseas.',
      emptyBagCta: 'Explorar servicios',
      emptyBagLinktext: 'Solo quiero ponerme en contacto',
      wantToExplore: 'Quiero seguir explorando',
      steps: {
        welcome: {
          title: '¡Genial! Veamos lo que elegiste',
          subtitle: 'Antes de agendar, revisa tus servicios seleccionados'
        },
        personalData: {
          title: 'Tus datos para contactarte',
          subtitle: 'Necesitamos algunos datos para agendar tus servicios',
          nameInput: {
            label: 'Nombre Completo',
            placeholder: '¿Cómo te llamas?',
            errors: {
              required: 'Nombre Obligatorio',
              tooShort: 'Nombre muy corto'
            }
          },
          emailInput: {
            label: 'Correo Electrónico',
            placeholder: '¿Cuál es tu correo?',
            errors: {
              required: 'Correo Electrónico Obligatorio',
              invalid: 'Correo Electrónico Inválido'
            }
          },
          phoneInput: {
            label: 'Número de Teléfono',
            placeholder: '¿Cuál es tu número?',
            errors: {
              required: 'Número de Teléfono Obligatorio',
              invalidUSA: 'Número Inválido en EE.UU.',
              invalidNic: 'Número Inválido en Nicaragua',
              invalid: 'Número Inválido'
            }
          }
        },
        schedule: {
          title: 'Escoge fecha y hora',
          subtitle:
            'Elige la fecha y hora que mejor te convenga y, si quieres, deja un mensaje extra para personalizar tu servicio',
          dateInput: {
            label: 'Fecha',
            placeholder: 'Selecciona una fecha',
            errors: {
              required: 'Fecha Obligatoria',
              pastDate: 'No puedes elegir una fecha pasada',
              weekend: 'No trabajamos fines de semana'
            }
          },
          timeInput: {
            label: 'Hora',
            placeholder: 'Selecciona una hora',
            errors: {
              required: 'Hora Obligatoria',
              invalid: 'Hora Inválida',
              pastTime: 'No puedes elegir una hora pasada',
              requiredAnticipation:
                'Se requiere al menos 1 hora de anticipación',
              available: 'Horario no disponible (8:00 AM - 6:00 PM)'
            }
          },
          messageInput: {
            label: 'Mensaje Adicional (Opcional)',
            placeholder: '¿Alguna indicación especial?'
          }
        },
        confirmation: {
          loadingText: 'Enviando tu reserva...',
          success: {
            title: '¡Reserva enviada con éxito!',
            details:
              'Nos pondremos en contacto contigo pronto para confirmar los detalles de tu cita.'
          },
          error: {
            title: 'Error al enviar la reserva',
            details:
              'Hubo un problema al enviar tu reserva. Por favor, inténtalo de nuevo más tarde.'
          }
        },
        final: {
          title: '¡Casi terminamos!',
          confirmtext: 'Tu cita se agendará para el día',
          confirmtext2: 'a las',
          details:
            'Espera un mensaje de confirmación en tu correo electrónico o WhatsApp.'
        },
        noServices: {
          title: '¡Oops! No seleccionaste ningún servicio',
          subtitle: 'Parece que todavía no agregaste servicios a tu bolsa.'
        }
      },
      success: {
        title: 'Reserva Exitosa',
        subtitle: '¡Tu reserva se ha realizado con éxito!',
        message:
          '¡Gracias por reservar con nosotros! Te contactaremos pronto para confirmar los detalles de tu cita.',
        buttonText: 'Volver al inicio'
      },
      failed: {
        title: 'Error en la Reserva',
        subtitle: 'Hubo un error al enviar tu reserva',
        message:
          'Hubo un problema al enviar tu reserva. Por favor, inténtalo de nuevo más tarde.',
        buttonText: 'Volver al inicio'
      }
    },
    floatingButton: {
      whatsappButtonText: 'Escríbenos por WhatsApp',
      bookingButtonText: 'Agendar Cita',
      emailButtonText: 'Escríbenos un correo'
    },
    team: {
      pageTitle: 'Nuestro Equipo',
      section_1: {
        title: '¡Nuestro Equipo está aquí!',
        description:
          'Conoce a los profesionales que hacen posible nuestra misión'
      },
      section_2: {
        profiles: {
          agazo: {
            name: 'Auxiliadora Gazo',
            role: 'Estilista de cabello, Especialista en depilación, Manicurista, Pedicurista',
            imageAlt: 'Foto de Auxiliadora Gazo',
            photo: 'agazo',
            order: 4
          },
          jbermudez: {
            name: 'Joseling Bermúdez',
            role: 'Manicurista, Especialista en acrílico, Especialista en rubber polygel, Estilista de cabello, Especialista en depilación',
            imageAlt: 'Foto de Joseling Bermúdez',
            photo: 'jbermudez',
            order: 6
          },
          sguadamuz: {
            name: 'Saida Guadamúz',
            role: 'Manicurista, Especialista en rubber, Pedicurista, Especialista en extracción',
            imageAlt: 'Foto de Saida Guadamúz',
            photo: 'sguadamuz',
            order: 5
          },
          hrosales: {
            name: 'Haslly Rosales',
            role: 'Manicurista, Especialista en acrílico, Especialista en rubber, Pedicurista',
            imageAlt: 'Foto de Haslly Rosales',
            photo: 'hrosales',
            order: 1
          },
          mduarte: {
            name: 'María Duarte',
            role: 'Administradora, Maquillista, Lashista, Especialista en estética facial',
            imageAlt: 'Foto de María Duarte',
            photo: 'mduarte',
            order: 2
          },
          nguadamuz: {
            name: 'Nubia Guadamúz',
            role: 'Masajista, Tratamientos corporales',
            imageAlt: 'Foto de Nubia Guadamúz',
            photo: 'nguadamuz',
            order: 3
          }
        }
      }
    },
    notifications: {
      clearedServices: {
        title: 'Servicios eliminados'
      }
    },
    notFound: {
      title: '404',
      subtitle: 'Parece que la página que buscas no está disponible',
      buttonText: 'Volver al inicio'
    }
  },
  en: {
    header: {
      links: {
        home: 'Home',
        history: 'Our Story', // Más común para "Historia" en webs
        services: 'Services',
        packages: 'Packages',
        logoTooltip: 'Go to homepage'
      },
      headerButton: {
        book: 'Book' // Mayúscula para consistencia en botones
      },
      dropdown: {
        text: 'My Bag',
        title: 'Added Services',
        empty: 'Your bag is empty',
        emptySubtitle: 'Add services to book your appointment',
        total: 'Estimated total',
        totalSubtitle: 'service',
        clear: 'Clear bag',
        book: 'Book Now!',
        keepExploring: 'Keep Exploring',
        exploreServices: 'Explore Services',
        clearTooltip: 'Remove all selected services',
        fullBag: 'Your bag is full!',
        addedService: 'Service added',
        addedServices: 'Services added'
      },
      mobileNavbar: {
        title: 'Navigation',
        installButtonText: 'Install App'
      }
    },
    footer: {
      cta: {
        title: 'Book Your Appointment Today!',
        description:
          'Schedule your session with our wellness specialists anytime, anywhere',
        button: 'Book Now!'
      },
      columns: {
        contact: {
          title: 'Contact',
          address: 'Iglesia La Merced, 1C N, 10v O, Granada',
          addressTooltip: 'View location on Google Maps'
        },
        nav: {
          title: 'Navigation',
          book: 'Book Appointment',
          services: 'Services',
          history: 'Our Story',
          packages: 'Packages'
        },
        about: {
          title: 'About Us',
          who: 'Who We Are',
          team: 'Our Team',
          blog: 'Blog'
        },
        social: {
          title: 'Social',
          facebook: 'Facebook',
          facebookTooltip: 'Follow us on Facebook',
          instagram: 'Instagram',
          instagramTooltip: 'Follow us on Instagram'
        }
      },
      help: {
        title: 'Need help with your booking?',
        contact: 'Contact us:',
        subtitle: 'We are here to assist you with your booking'
      },
      legal: {
        copyright: copyrightEn,
        subtitle: authorsEn
      }
    },
    home: {
      pageTitle: 'Home',
      heroSection: {
        title_1: 'Find Your <span className="text-primary">Inner Calm</span>',
        description:
          'Discover a space designed for your wellness and peace, where every service is crafted to restore your balance',
        button_1: 'Explore Services',
        button_2: 'View Packages'
      },
      section_2: {
        title: 'Why Choose Calma?',
        description: 'Our holistic approach sets us apart',
        points: {
          p1: {
            title: 'Personalized Care',
            description:
              'Each client receives a unique treatment tailored to their needs'
          },
          p2: {
            title: 'Safe Environment',
            description:
              'We create a welcoming, safe space so you feel comfortable'
          },
          p3: {
            title: 'Experienced staff',
            description:
              'Our team has extensive experience and specialized training'
          }
        }
      },
      section_3: {
        title: 'Start Your Journey to Tranquility',
        description:
          'Explore our services and find the perfect fit for your needs',
        button: 'Explore Services'
      }
    },
    history: {
      pageTitle: 'Our Story',
      section_1: {
        title: 'Our Story',
        history_p1:
          'We began this journey in 2016, committed to offering services as well as an experience that aimed to please ascetics but also nurture body and soul. Calma was born from the desire to create a space of renewal and tranquility amid the day to day. Inspired to insure that inner balance we all thrive upon. Hence the origin of our name the state or quality of being at peace.',
        history_p2:
          'From the beginning, our focus has been on connecting with the essentials: treatments that combine traditional techniques with a modern approach. This creates a transformative experience in a carefully designed environment, where each visit becomes a true moment of pause. We believe that wellness is not a luxury, but a necessity, and that is why every service has been designed with rest and beauty in mind.',
        history_p3:
          'Today, Calma is recognized for its commitment to wellness and dedication. Every corner reflects our attention to detail and our deep respect for those who visit us. Our purpose is to continue growing with the intention of expanding our services without losing the essence that defines us. Calma is more than a physical space; it is an invitation to reconnect with yourself, breathe deeply, and find your balance.',
        end_tag: 'Much Love,',
        owners: authors.replace(/y/g, '&'),
        imageAlt: 'Representative image of our story'
      },
      section_2: {
        title: 'Who We Are?',
        visionTitle: 'Our Vision',
        visionDescription:
          'We hope to achieve a wellness experience that nurture the body, and mind through personalized services, within a environment designed for relaxation and inner renewal',
        missionTitle: 'Our Mission',
        missionDescription:
          'To offer a space where our clients can find their inner calm through treatments and exceptional service that prioritize wellness'
      }
    },
    packages: {
      pageTitle: 'Our Packages',
      section_1: {
        title: 'Our Packages',
        description:
          'Discover our packages designed to provide a complete wellness and relaxation experience. Each combine different services to offer you a unique moment of renewal',
        include_text: 'The Service Includes',
        group_optionaly_text: 'All our packages offer group options',
        from_price_text: 'From',

        paquetes: [
          {
            icono: 'sparkles',
            nombre_original: 'Calma',
            precio: '150',
            featured: false,
            featured_text: '',
            descripcion_corta:
              'Complete body and mind renewal, ideal for birthdays or special occasions.',
            servicios_incluidos: [
              'SPA Manicure (Gel or regular)',
              'SPA Pedicure (Gel or regular)',
              'Hair mask',
              'SPA shampoo & wash',
              'Blow-dry & styling',
              'Facial or massage of choice'
            ]
          },
          {
            icono: 'champagne-glasses',
            nombre_original: 'The Day',
            precio: '170',
            featured: true,
            featured_text: 'Most Popular',
            descripcion_corta:
              'Prepare for your special event with confidence and relaxation.',
            servicios_incluidos: [
              'SPA shampoo & wash',
              'Professional blow-dry',
              'Elegant hairstyle',
              'VIP skin prep',
              'Full makeup',
              'Mini bottle of champagne'
            ]
          },
          {
            icono: 'rings-wedding',
            nombre_original: 'Bridal Glow-Up',
            precio: '250',
            featured: false,
            featured_text: '',
            descripcion_corta: 'Complete beauty experience for brides.',
            servicios_incluidos: [
              'VIP SPA Manicure (Gel or regular)',
              'VIP SPA Pedicure (Gel or regular)',
              'Detox Glow Facial',
              'Relaxing massage',
              'Hair treatment with mask',
              'Waxing (face or body)',
              'Bottle of champagne'
            ]
          }
        ]
      },
      section_2: {
        faq: {
          title: 'Frequently Asked Questions',
          items: [
            {
              question: 'Can I customize a package?',
              answer:
                'Each package can be customized to accommodate the need of every client or group. Contact us to tailor the package to your needs.'
            },
            {
              question: 'Should I book in advanced?',
              answer:
                'Yes, you should book in advanced to coordinate dates and times.'
            },
            {
              question: 'How long does each package last?',
              answer:
                'Packages are personalized to meet the need of each client which makes the times adjustable.'
            }
          ]
        }
      }
    },
    services: {
      pageTitle: 'Our Services',
      fromBadge: 'From',
      cardFooter: {
        expandable: {
          expanded: 'That’s all for now!',
          collapsed: 'Discover all services!'
        },
        static: 'You’ve seen it all!',
        minimal: 'Small but unique!'
      },
      section_1: {
        title: 'Available Services',
        description:
          'Explore our variety of services designed for your well-being, beauty, and relaxation. Each experience has been carefully crafted to harmonize body and mind',
        booking_button_text: 'Book Now',
        view_all: 'View All',
        tabsHeader: 'Categories',
        category: {
          unas: {
            name: 'Nails',
            subCategory: {
              manicure: {
                name: 'Manicure',
                services: {
                  regular: {
                    name: 'Regular',
                    description: 'Cleaning, Regular polish'
                  },
                  spa: {
                    name: 'SPA',
                    description:
                      'Cleaning, massage, Moisturizing gloves, regular polish'
                  },
                  vip: {
                    name: 'VIP',
                    description:
                      'Cleaning, Epsom salt, hot towels + massage, paraffin, regular polish'
                  },
                  gel: { name: 'Gel', description: 'Cleaning + gel polish' },
                  spaGel: {
                    name: 'SPA Gel',
                    description:
                      'Cleaning, massage, Moisturizing gloves + gel polish'
                  },
                  vipGel: {
                    name: 'VIP Gel',
                    description:
                      'Cleaning, Epsom salt, hot towels + massage, paraffin, gel polish'
                  }
                }
              },
              pedicure: {
                name: 'Pedicure',
                services: {
                  regular: {
                    name: 'Regular',
                    description: 'Cleaning, Regular polish'
                  },
                  spa: {
                    name: 'SPA',
                    description:
                      'Deep cleansing, salt scrub, massage, hydrating mask or hot towels, and regular polish'
                  },
                  vip: {
                    name: 'VIP',
                    description:
                      'Deep cleansing, jelly bath, massage, and regular polish'
                  },
                  gel: { name: 'Gel', description: 'Cleaning + gel polish' },
                  spaGel: {
                    name: 'SPA Gel',
                    description:
                      'Deep cleaning, salt scrub, massage, moisturizing mask or hot towels, gel polish'
                  },
                  vipGel: {
                    name: 'VIP Gel',
                    description:
                      'Deep cleaning, jelly bath, massage, gel polish'
                  }
                }
              },
              acrilicas: {
                name: 'Acrylics',
                services: {
                  naturales: {
                    name: 'Natural',
                    description: 'Natural acrylic nails'
                  },
                  almond: {
                    name: 'Almond',
                    description: 'Almond-shaped acrylic nails'
                  },
                  coffin: {
                    name: 'Coffin',
                    description: 'Coffin-shaped acrylic nails'
                  },
                  esculturales: {
                    name: 'Sculpted',
                    description: 'Sculpted acrylic nails'
                  },
                  refill: { name: 'Refill', description: 'Acrylic refill' },
                  banoAcrilico: {
                    name: 'Base Coat',
                    description: 'Base application'
                  },
                  rubber: { name: 'Rubber', description: 'Rubber application' },
                  poly: {
                    name: 'Poly Gel',
                    description: 'Poly Gel application'
                  }
                }
              },
              extras: {
                name: 'Extras',
                services: {
                  limpieza: { name: 'Cleaning', description: 'Nail cleaning' },
                  decoracion: {
                    name: 'Decoration',
                    description: 'Nail decoration'
                  },
                  gelCalcio: {
                    name: 'Calcium Gel',
                    description: 'Calcium gel application'
                  },
                  extensionCalcio: {
                    name: 'Calcium Extension',
                    description: 'Calcium gel extension'
                  },
                  gelFrio: {
                    name: 'Cold Gel',
                    description: 'Cold gel application'
                  },
                  topGelFrio: {
                    name: 'Cold Gel Top',
                    description: 'Cold gel topcoat'
                  },
                  parafina: {
                    name: 'Paraffin',
                    description: 'Paraffin treatment'
                  },
                  botasTermicas: {
                    name: 'Thermal Boots',
                    description: 'Thermal boot treatment'
                  },
                  guantesHidratantes: {
                    name: 'Moisturizing Gloves',
                    description: 'Hydrating glove treatment'
                  },
                  esmalteRegular: {
                    name: 'Regular Polish',
                    description: 'Regular nail polish application'
                  },
                  esmalteGel: {
                    name: 'Gel Polish',
                    description: 'Gel polish application'
                  },
                  reparacionUñas: {
                    name: 'Nail Repair',
                    description: 'Nail repair'
                  },
                  uñasExtraAcrilico: {
                    name: 'Extra Acrylic Nails',
                    description: 'Additional acrylic nails'
                  },
                  retiroGel: {
                    name: 'Gel Removal',
                    description: 'Gel polish removal'
                  },
                  retiroAcrilico: {
                    name: 'Acrylic Removal',
                    description: 'Acrylic nail removal'
                  }
                }
              }
            }
          },
          depilacion: {
            name: 'Waxing',
            subCategory: {
              cejasPestanas: {
                name: 'Eyebrows & Lashes',
                services: {
                  laminacionCejas: {
                    name: 'Brow Lamination',
                    description: 'Eyebrow lamination treatment'
                  },
                  laminacionDiseno: {
                    name: 'Design Lamination',
                    description: 'Eyebrow design  + lamination'
                  },
                  laminacionTinte: {
                    name: 'Tint Lamination',
                    description: 'Eyebrow lamination + tint'
                  },
                  tinteCejas: {
                    name: 'Eyebrow Tint',
                    description: 'Eyebrow tinting'
                  },
                  levantamientoPestanas: {
                    name: 'Lash Lift',
                    description: 'Eyelash lifting'
                  },
                  extensionPestanas: {
                    name: 'Lash Extensions',
                    description: 'Eyelash extensions'
                  }
                }
              },
              depilacion: {
                name: 'Wax',
                services: {
                  cejas: { name: 'Eyebrows', description: 'Eyebrow waxing' },
                  bigote: {
                    name: 'Upper Lip',
                    description: 'Upper lip waxing'
                  },
                  axilas: { name: 'Armpits', description: 'Armpit waxing' },
                  bikini: { name: 'Bikini', description: 'Bikini waxing' },
                  fullBikini: {
                    name: 'Full Bikini',
                    description: 'Full bikini waxing'
                  },
                  brazos: { name: 'Arms', description: 'Arm waxing' },
                  mediaPierna: {
                    name: '1/2 Leg',
                    description: 'Half leg waxing'
                  },
                  piernaCompleta: {
                    name: 'Full Leg',
                    description: 'Full leg waxing'
                  },
                  espalda: { name: 'Back', description: 'Back waxing' },
                  gluteos: { name: 'Buttocks', description: 'Buttocks waxing' }
                }
              }
            }
          },
          cabello: {
            name: 'Hair',
            subCategory: {
              lavado: {
                name: 'Wash & Treatments',
                services: {
                  lavadoExpress: {
                    name: 'Express Wash',
                    description: 'Quick hair wash (1 shampoo application)'
                  },
                  lavadoProfundo: {
                    name: 'Deep Wash',
                    description:
                      'Deep cleansing hair wash (2 shampoo applications)'
                  },
                  lavadoMascarilla: {
                    name: 'Wash + Mask',
                    description:
                      'Hair wash + hydrating mask treatment (2 shampoo applications + mask)'
                  },
                  lavadoAmpolla: {
                    name: 'Wash serum capsule',
                    description:
                      'Hair wash + serum capsule treatment (2 shampoo applications + ampoule)'
                  },
                  relajanteExpress: {
                    name: 'Relaxing Express',
                    description: 'Deep hair wash/serum capsule/scalp massage'
                  },
                  cabelloTratado: {
                    name: 'Treated Hair',
                    description:
                      'Deep hair wash/hydrating hair mask/serum capsule treatment'
                  },
                  aplicacionTinta: {
                    name: 'Dye Application',
                    description: 'Hair dye application'
                  }
                }
              },
              estilismo: {
                name: 'Styling',
                services: {
                  secado: { name: 'Blow Dry', description: 'Hair blow dry' },
                  planchado: {
                    name: 'Iron',
                    description: 'Hair straightening with iron'
                  },
                  ondas: { name: 'Waves', description: 'Styling waves' },
                  peinadoSencillo: {
                    name: 'Simple Style',
                    description: 'Simple hairstyle'
                  },
                  peinadoElaborado: {
                    name: 'Elaborate Style',
                    description: 'Complex hairstyle'
                  },
                  trenzas: { name: 'Braids', description: 'Braiding hair' },
                  cortePuntas: { name: 'Trim', description: 'Hair trimming' },
                  corteEstilo: {
                    name: 'Style Cut',
                    description: 'Complex haircut with styling'
                  }
                }
              }
            }
          },
          spa: {
            name: 'SPA',
            subCategory: {
              spa: {
                name: 'SPA',
                services: {
                  maderoterapia: {
                    name: 'Wood Therapy',
                    description: 'Sculpting / Lymphatic drainage massage'
                  },
                  masajeRelajante: {
                    name: 'Relaxing Massage',
                    description:
                      'Gentle stroke treatment to reduce muscle tension'
                  },
                  masajeProfundo: {
                    name: 'Deep Massage',
                    description: 'Deep therapeutic massage / Hot towels'
                  }
                }
              },
              facial: {
                name: 'Facial',
                services: {
                  detoxGlow: {
                    name: 'Detox Glow',
                    description: 'Detoxifying facial treatment'
                  },
                  guaSha: {
                    name: 'Gua Sha',
                    description: 'Reduction of facial inflammation treatment'
                  },
                  hydrafacial: {
                    name: 'Hydrafacial',
                    description: 'Hydrating radiant skin treatment'
                  },
                  facialRefrescante: {
                    name: 'Refreshing Facial',
                    description: 'Sculpting/tonifying facial treatment'
                  },
                  detoxEspalda: {
                    name: 'Back Detox',
                    description: 'Deep back detoxification treatment'
                  }
                }
              }
            }
          },
          complementos: {
            name: 'Add-ons',
            subCategory: {
              maquillaje: {
                name: 'Makeup',
                services: {
                  profesional: {
                    name: 'Professional',
                    description:
                      'Professional makeup application for any occasion'
                  },
                  pestanas: { name: 'Lashes', description: 'Lash application' }
                }
              }
            }
          },
          ninos: {
            name: 'Kids',
            subCategory: {
              manicureNinos: {
                name: 'Kids Manicure',
                services: {
                  regular: {
                    name: 'Regular Mani',
                    description: 'General cleaning, regular polish'
                  },
                  gel: {
                    name: 'Gel Mani',
                    description: 'Cleaning + gel polish'
                  },
                  regularPedi: {
                    name: 'Regular Pedi',
                    description: 'General cleaning, regular polish'
                  },
                  gelPedi: {
                    name: 'Gel Pedi',
                    description: 'Cleaning + gel polish'
                  }
                }
              }
            }
          }
        }
      }
    },
    booking: {
      pageTitle: 'Appointments',
      emptyBagTitle: 'Empty Bag',
      nextButtonText: 'Next',
      prevButtonText: 'Back',
      confirmButtonText: 'Confirm',
      successMessage:
        'Thank you for booking with us! We will contact you soon to confirm the details of your appointment.',
      errorMessage:
        'There was an error submitting your booking. Please try again later.',
      emptyBagMessage: 'You haven’t selected any services yet!',
      emptyBagMessageAlt:
        'To book an appointment, please choose your desired services first.',
      emptyBagCta: 'Browse Services',
      emptyBagLinktext: 'I just want to get in touch',
      wantToExplore: 'I want to keep exploring',
      steps: {
        welcome: {
          title: 'Great! Let’s review what you’ve selected',
          subtitle: 'Before booking, please review your chosen services'
        },
        personalData: {
          title: 'Your contact information',
          subtitle: 'We need some details to schedule your services',
          nameInput: {
            label: 'Full Name',
            placeholder: "What's your name?",
            errors: {
              required: 'Name is required',
              tooShort: 'Name is too short'
            }
          },
          emailInput: {
            label: 'Email Address',
            placeholder: "What's your email?",
            errors: {
              required: 'Email is required',
              invalid: 'Invalid email address'
            }
          },
          phoneInput: {
            label: 'Phone Number',
            placeholder: "What's your number?",
            errors: {
              required: 'Phone number is required',
              invalidUSA: 'Invalid number in the USA',
              invalidNic: 'Invalid number in Nicaragua',
              invalid: 'Invalid number'
            }
          }
        },
        schedule: {
          title: 'Choose date and time',
          subtitle:
            'Pick the date and time that works best for you and, if you want, leave an extra message to personalize your service',
          dateInput: {
            label: 'Date',
            placeholder: 'Select a date',
            errors: {
              required: 'Date is required',
              pastDate: "You can't choose a past date",
              weekend: "We don't work on weekends"
            }
          },
          timeInput: {
            label: 'Time',
            placeholder: 'Select a time',
            errors: {
              required: 'Time is required',
              invalid: 'Invalid time',
              pastTime: "You can't choose a past time",
              requiredAnticipation: 'At least 1 hour notice is required',
              available: 'Time not available (8:00 AM - 6:00 PM)'
            }
          },
          messageInput: {
            label: 'Additional Message (Optional)',
            placeholder: 'Any special instructions?'
          }
        },

        confirmation: {
          loadingText: 'Submitting your booking...',
          success: {
            title: 'Booking sent successfully!',
            details:
              'We will contact you shortly to confirm your appointment details.'
          },
          error: {
            title: 'Error sending booking',
            details:
              'There was a problem submitting your booking. Please try again later.'
          }
        },
        final: {
          title: 'Almost done!',
          confirmtext: 'your appointment is scheduled for',
          confirmtext2: 'at',
          details: 'Expect a confirmation message via email or WhatsApp.'
        },
        noServices: {
          title: 'Oops! You didn’t select any services',
          subtitle:
            'It looks like you haven’t added any services to your bag yet.'
        }
      },
      success: {
        title: 'Booking Successful',
        subtitle: 'Your booking was completed successfully!',
        message:
          'Thank you for booking with us! We will contact you soon to confirm the details of your appointment.',
        buttonText: 'Back to Home'
      },
      failed: {
        title: 'Booking Error',
        subtitle: 'There was an error with your booking',
        message:
          'There was a problem submitting your booking. Please try again later.',
        buttonText: 'Back to Home'
      }
    },
    floatingButton: {
      whatsappButtonText: 'Write to us on WhatsApp',
      bookingButtonText: 'Book appointment',
      emailButtonText: 'Write to us via email'
    },
    team: {
      pageTitle: 'Our Team',
      section_1: {
        title: 'Our team of experts is here',
        description: 'Meet the professionals who make our mission possible'
      },
      section_2: {
        profiles: {
          agazo: {
            name: 'Auxiliadora Gazo',
            role: 'Hair Stylist, Waxing Specialist, Nail Technician, Pedicurist',
            imageAlt: 'Photo of Auxiliadora Gazo',
            photo: 'agazo',
            order: 4
          },
          jbermudez: {
            name: 'Joseling Bermúdez',
            role: 'Nail Technician, Acrylic Specialist, Rubber Polygel Specialist, Hair Stylist, Waxing Specialist',
            imageAlt: 'Photo of Joseling Bermúdez',
            photo: 'jbermudez',
            order: 6
          },
          sguadamuz: {
            name: 'Saida Guadamúz',
            role: 'Nail Technician, Rubber Specialist, Pedicurist, Extraction Specialist',
            imageAlt: 'Photo of Saida Guadamúz',
            photo: 'sguadamuz',
            order: 5
          },
          hrosales: {
            name: 'Haslly Rosales',
            role: 'Nail Technician, Acrylic Specialist, Rubber Specialist, Pedicurist',
            imageAlt: 'Photo of Haslly Rosales',
            photo: 'hrosales',
            order: 1
          },
          mduarte: {
            name: 'María Duarte',
            role: 'Manager, Makeup Artist, Lash Technician, Facial Aesthetics Specialist',
            imageAlt: 'Photo of María Duarte',
            photo: 'mduarte',
            order: 2
          },
          nguadamuz: {
            name: 'Nubia Guadamúz',
            role: 'Massage Therapist, Body Treatments',
            imageAlt: 'Photo of Nubia Guadamúz',
            photo: 'nguadamuz',
            order: 3
          }
        }
      }
    },
    notifications: {
      clearedServices: {
        title: 'Services Removed'
      }
    },
    notFound: {
      title: '404',
      subtitle: 'It seems the page you are looking for is not available',
      buttonText: 'Back to Home'
    }
  }
}
