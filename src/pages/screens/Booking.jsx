import { useState, useEffect } from "react";
import { useLang } from "../../i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Stepper, StepsContent, Step } from "../../components/layout/Stepper";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useSelectedServices } from "../../hooks/useSelectedService";
import { Input, PhoneNumber } from "../../components/forms/Input";
import { USD, formatDate, formatTime } from "../../utils/utils";
import axios from "axios";

const Booking = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const { servicesWithInfo, totalServices, totalPrice, clearServices, isLoaded } = useSelectedServices();
  const [formData, setFormData] = useState({
    nombre: "",
    phone: "",
    prefix: "",
    email: "",
    notes: "", // opcional
    date: "",
    time: "",
    mensaje: "" // generado automáticamente con servicios
  });


 useEffect(() => {
  if (isLoaded && totalServices <= 0) {
    navigate("/empty");
  }
}, [isLoaded, totalServices, navigate]);

  // Definir fecha mínima (mañana)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  minDate.setHours(0, 0, 0, 0);

  // Fecha máxima (opcional)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6); // hasta 6 meses desde hoy


  const [formErrors, setFormErrors] = useState({});

  const hasServices = totalServices > 0; // true si hay servicios seleccionados

  // Prellenar textarea con servicios seleccionados
  useEffect(() => {
    if (hasServices) {
      let message = `<p>Hola equipo de Calma, me gustaría agendar los siguientes servicios:</p>`;
      Object.entries(servicesWithInfo).forEach(([categoryId, items]) => {
        if (items.length > 0) {
          message += `<p><strong>${items[0].categoryName}:</strong></p><ul>`;
          items.forEach((s) => {
            message += `<li>${s.subCategoryName} → ${s.serviceName} (~${s.servicePrice})</li>`;
          });
          message += `</ul>`;
        }
      });
      setFormData(prev => ({ ...prev, mensaje: message }));
    }
  }, [servicesWithInfo]);

  {/* Manejo del envío del formulario */ }
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const handleSubmit = async () => {
    const errors = {};
    if (!formData.nombre) errors.nombre = "Nombre obligatorio";
    if (!formData.phone) errors.phone = "Teléfono obligatorio";
    if (!formData.date) errors.date = "Fecha obligatoria";
    if (!formData.time) errors.time = "Hora obligatoria";
    if (!formData.mensaje) errors.mensaje = "Mensaje obligatorio";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true); // comienza carga
      try {
        const payload = {
          nombre: formData.nombre,
          prefix: formData.prefix,
          phone: formData.phone,
          email: formData.email,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
          mensaje: formData.mensaje
        };

        const res = await axios.post("http://localhost:3001/api/send-mail", payload, {
          headers: { "Content-Type": "application/json" }
        })


        if (res.data.ok) {
          setIsSuccess(true);
          setFormData({
            nombre: "",
            prefix: "",
            phone: "",
            email: "",
            date: "",
            time: "",
            notes: "",
            mensaje: ""
          });

          setTimeout(() => {
              navigate("/success", { state: { success: true} });
          }, 500); // Espera 3 segundos antes de redirigir


        } else {
          alert(res.data.message || "Error al enviar la reserva");
        }
      } catch (err) {
        console.log(err)
        alert("Error al enviar la reserva, inténtalo de nuevo");
      } finally {
        setIsLoading(false); // termina carga
      }
    }
  };

  return (
    <>
      <Header />
      <section className="bg-white py-5">
        <div className="container d-flex justify-content-center">
          {
            hasServices ? (
              <Stepper
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                onSubmit={handleSubmit}
                isSubmitting={isLoading}
                isCompleted={isSuccess}
              >
                <StepsContent>
                  {/* Paso 1: Bienvenida + Resumen de servicios */}
                  <Step stepKey="welcome">
                    {() => (
                      <div className="d-flex flex-direction-column align-items-center justify-content-center">

                        {/* Encabezado */}
                        <div className="d-flex align-items-center flex-direction-column justify-content-center mb-5 text-center">
                          <span className="fs-display-2">🎉</span>
                          <p className="fs-h3 my-0">{t("booking.steps.welcome.title")}</p>
                          <p className="fs-medium mt-0 text-muted">{t("booking.steps.welcome.subtitle")}</p>
                        </div>

                        {/* Resumen de servicios */}
                        <div className="d-flex w-100 flex-wrap-wrap gap-2 justify-content-center">
                          {Object.entries(servicesWithInfo).map(([cat, services]) => {
                            const categoryId = cat;
                            const categoryName = services[0]?.categoryName || "Categoría";

                            return (
                              <div
                                key={categoryId}
                                className="rounded border p-3 w-100 max-wx-md-300"
                              >
                                <span className="d-block mb-2 fs-h5">{categoryName}</span>
                                <ul className="list-unstyled d-flex flex-direction-column m-0">
                                  {services.map((s) => (
                                    <li
                                      key={s.id + s.subCategoryId}
                                      className="bg-light-50 rounded-all-sm px-3 py-3 bg-white m-0 d-flex justify-content-space-between"
                                    >
                                      <div className="d-flex flex-direction-column">
                                        <span className="fw-semibold mb-1 fs-h6">{s.subCategoryName}</span>
                                        <span className="text-muted fs-medium">{s.serviceName}</span>
                                      </div>
                                      <span>
                                        <USD amount={s.servicePrice} className="fw-bold" />
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>

                        {/* Total */}
                        <div className="max-wx-lg-700 p-3 mt-5 text-center d-flex flex-direction-column gap-1">
                          <div className="d-flex gap-1 align-items-center">
                            <span className="fs-h4 fw-bold text-dark">{t("header.dropdown.total")}</span>
                            <span className="fs-h4 text-dark fw-bold">~
                              <USD
                                size="large"
                                amount={totalPrice}
                              />
                            </span>
                          </div>
                          <div className='text-muted fw-light'>
                            {`
                      ${totalServices} ${totalServices === 1
                                ? t('header.dropdown.totalSubtitle')
                                : t('header.dropdown.totalSubtitle') + "s"}`
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </Step>

                  {/* Paso 2: Datos personales */}
                  <Step stepKey="personalData" className="d-flex flex-1 justify-content-center mt-3">
                    {({ formData, setFormData, formErrors }) => (
                      <div className="d-flex flex-direction-column justify-content-center gap-2 flex-1 max-wx-500">

                        <div className="d-flex align-items-center flex-direction-column justify-content-center text-center">
                          {/* <span className="fs-display-2 text-primary"><Icon name="address-card" variant="duotones" duotone="regular" /></span> */}
                          <p className="fs-h3 my-0">{t("booking.steps.personalData.title")}</p>
                          <p className="fs-medium mt-0 text-muted">{t("booking.steps.personalData.subtitle")}</p>
                        </div>
                        <Input
                          label="Nombre Completo"
                          placeholder="¿Cómo te llamas?"
                          value={formData.nombre}
                          name="nombre"
                          onChange={(val) => setFormData(prev => ({ ...prev, nombre: val }))}
                          error={formErrors.nombre}
                          required
                          className="w-100"
                        />
                        <Input
                          label="Correo Electrónico"
                          placeholder="¿Cuál es tu correo?"
                          value={formData.email}
                          name="email"
                          onChange={(val) => setFormData(prev => ({ ...prev, email: val }))}
                          error={formErrors.email}
                          required
                          className="w-100"
                        />
                        <PhoneNumber
                          label="Número de teléfono"
                          value={formData.phone}
                          onChange={(valObj) =>
                            setFormData(prev => ({ ...prev, phone: valObj.formatted, prefix: valObj.prefix }))
                          }
                          error={formErrors.phone}
                          required
                        />
                      </div>
                    )}
                  </Step>

                  {/* Paso 3: Agenda */}
                  <Step stepKey="schedule" className={"d-flex flex-1 justify-content-center mt-3"}>
                    {({ formData, setFormData, formErrors }) => (
                      <div className="d-flex flex-direction-column flex-1 gap-2 max-wx-500">
                        <div className="d-flex align-items-center flex-direction-column justify-content-center text-center">
                          {/* <span className="fs-display-2 text-primary"><Icon name="address-card" variant="duotones" duotone="regular" /></span> */}
                          <p className="fs-h3 my-0">{t("booking.steps.schedule.title")}</p>
                          <p className="fs-medium mt-0 text-muted">{t("booking.steps.schedule.subtitle")}</p>
                        </div>
                        <div className="d-flex align-items-flex-start justify-content-space-between gap-1">
                          <Input className="w-100" type="date" label="Fecha" value={formData.date} onChange={(val) => setFormData(prev => ({ ...prev, date: val }))} error={formErrors.date} required />
                          <Input className="w-100" type="time" label="Hora" value={formData.time} onChange={(val) => setFormData(prev => ({ ...prev, time: val }))} error={formErrors.time} required />
                        </div>
                        <div className="border-top"></div>
                        <Input
                          type="textarea"
                          label="Mensaje (opcional)"
                          value={formData.notes}
                          name="notes"
                          placeholder="Escribe aquí cualquier detalle adicional..."
                          onChange={(val) => setFormData(prev => ({ ...prev, notes: val }))}
                        />
                      </div>
                    )}
                  </Step>


                  {/* Paso 4: Resumen */}
                  <Step stepKey="confirmation" className="d-flex flex-1 justify-content-center mt-3">
                    {({ formData }) => {
                      if (isLoading) {
                        return (
                          <div className="d-flex flex-direction-column justify-content-center align-items-center flex-1 text-center max-wx-500 p-3 border rounded shadow-sm">
                            <div className="d-flex flex-direction-column align-items-center justify-content-center">
                              <span className="fs-display-2">⏳</span>
                              <p className="fs-h3 mt-3">Enviando tu reserva...</p>
                            </div>
                          </div>
                        );
                      }
                      // Caso normal: mostrar confirmación antes de enviar
                      return (
                        <div className="d-flex flex-direction-column justify-content-center align-items-center flex-1 text-center max-wx-500 p-3">
                          <div className="d-flex flex-direction-column align-items-center justify-content-center">
                            <span className="fs-display-2">✅</span>
                            <p className="fs-h3 mt-3">{t("booking.steps.confirmation.title")}</p>
                          </div>

                          <div className="text-start">
                            <p className="m-0 fs-lead text-center">{`Tu cita se agendará para el día ${formatDate(formData.date, "long")} a las ${formatTime(formData.time)}`}</p>
                            <p className="text-center text-muted">{t("booking.steps.confirmation.details")}</p>
                            <p className="text-center text-muted fs-small">{`(${formData.prefix} ${formData.phone}) | (${formData.email})`}</p>
                          </div>
                        </div>
                      );
                    }}
                  </Step>


                </StepsContent>

              </Stepper>
            ) : null
          }
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Booking;
