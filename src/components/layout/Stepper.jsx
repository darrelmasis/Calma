import React, {
  useState,
  Children,
  cloneElement,
  useEffect,
  useRef
} from 'react'
import classNames from 'classnames'
import { Icon } from '../commons/Icons'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'
import { useSticky } from '../../hooks/useSticky'
import { useBookingValidation } from '../../hooks/useBookingValidation'
import { useLang } from '../../i18n/LanguageContext'
import { Link } from 'react-router-dom'
import { limitedToast as toast } from '../../utils/toast'

const Stepper = ({
  children,
  formData,
  setFormData,
  onSubmit,
  isSubmitting
}) => {
  const { t } = useLang()
  // Extraer los pasos del contenido
  const stepsContent = Children.toArray(children).find(
    (child) => child.type === StepsContent
  )
  const steps = stepsContent
    ? Children.toArray(stepsContent.props.children)
    : []
  const [activeStep, setActiveStep] = useState(0)

  // CORREGIDO: Usar el hook correctamente
  const { fields, validateStep, getField, validateField, clearField } =
    useBookingValidation()

  const scrollToTop = () =>
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

  useEffect(() => {
    scrollToTop()
  }, [activeStep])

  const nextStep = () => {
    const isValid = validateStep(activeStep, formData)
    !isValid && toast.error(t('booking.steps.personalData.toastError'))
    if (!isValid) return

    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1)
    }
  }

  const isLastStep = activeStep === steps.length - 1

  return (
    <div className='w-100 d-flex flex-direction-column align-items-center justify-content-space-between'>
      <div className='d-flex flex-direction-column align-items-center w-100'>
        {/* Header con indicadores */}
        <div className='stepper-header w-100 max-wx-md-700 mb-4'>
          <div className='d-flex justify-content-stretch w-100'>
            {steps.map((step, index) => {
              const stepClasses = classNames(
                'd-flex align-items-center flex-1',
                {
                  'step-completed': index < activeStep,
                  'step-active': index === activeStep
                }
              )
              const indicatorClasses = classNames(
                'steps-indicator d-flex align-items-center rounded-circle-lg',
                {
                  'bg-primary text-white': index <= activeStep,
                  'bg-primary-50': index > activeStep
                }
              )
              const connectorClasses = classNames('step-conector mx-2', {
                'step-conector-active': index < activeStep,
                'bg-primary-50': index >= activeStep
              })
              const isCompleted = index < activeStep

              return (
                <div
                  key={index}
                  className={`d-flex align-items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                >
                  <div className={stepClasses}>
                    <div className={indicatorClasses}>
                      <AnimatePresence mode='wait'>
                        {isCompleted ? (
                          <motion.div
                            key='check'
                            initial={{ scale: 0, rotate: -90, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, rotate: 90, opacity: 0 }}
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 20
                            }}
                          >
                            <Icon name='check' />
                          </motion.div>
                        ) : (
                          <motion.div
                            key='number'
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 20
                            }}
                          >
                            {index + 1}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={connectorClasses}>
                        <span className='step-conector-progress'></span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contenido del paso */}
        <div className='step-content position-relative w-100 min-vh-80'>
          <AnimatePresence mode='wait'>
            {steps[activeStep] &&
              cloneElement(steps[activeStep], {
                active: true,
                formData,
                setFormData,
                getField,
                validateField,
                clearField
              })}
          </AnimatePresence>
        </div>
      </div>

      <StepperActions
        activeStep={activeStep}
        prevStep={prevStep}
        nextStep={nextStep}
        isLastStep={isLastStep}
        onSubmit={() => {
          if (validateStep(activeStep, formData)) onSubmit(formData)
        }}
        isSubmitting={isSubmitting}
      />

      <Link
        to='/services'
        className='py-2 mt-3 fs-medium text-info text-decoration-none text-decoration-underline-hover'
      >
        {t('booking.wantToExplore')}
      </Link>
    </div>
  )
}

const StepsContent = ({ children }) => <>{children}</>

const StepperActions = ({
  activeStep,
  prevStep,
  nextStep,
  isLastStep,
  onSubmit,
  isSubmitting
}) => {
  const { t } = useLang()
  // const [sentinelRef, isSticky] = useSentinel({ offset: -140 })
  const stickyRef = useRef(null)
  const isSticky = useSticky(stickyRef, 0)

  const stickyPanelClasses = classNames(
    'stepper-actions d-flex max-wx-md-500 justify-content-center gap-3 position-sticky bottom-2 w-100 py-3 px-3',
    {
      'stepper-actions-sticky rounded-all-lg z-index-30 bg-light-100 border':
        isSticky
    }
  )

  return (
    <div className={stickyPanelClasses} ref={stickyRef}>
      <Button
        size='large'
        icon='arrow-left'
        variant='basic2'
        disabled={activeStep === 0 || isSubmitting}
        onClick={prevStep}
        className='flex-1'
      >
        {t('booking.prevButtonText')}
      </Button>
      <Button
        size='large'
        variant='primary'
        icon={{
          name: isSubmitting ? 'spinner' : isLastStep ? 'check' : 'arrow-right',
          position: 'right',
          animation: isSubmitting ? 'spin' : '',
          variant: isSubmitting ? 'solid' : 'regular'
        }}
        className={`flex-1 ${isLastStep ? 'btn btn-success' : 'btn btn-primary'}`}
        onClick={!isSubmitting ? (isLastStep ? onSubmit : nextStep) : null}
        disabled={isSubmitting}
      >
        {isLastStep
          ? t('booking.confirmButtonText')
          : t('booking.nextButtonText')}
      </Button>
    </div>
  )
}

// CORREGIDO: Simplificar las props del Step
const Step = ({
  active,
  children,
  className,
  formData,
  setFormData,
  getField,
  validateField,
  clearField
}) => {
  const stepClasses = classNames('step w-100', className, {
    'step-active': active
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: active ? 1 : 0, x: active ? 0 : 50 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ pointerEvents: active ? 'auto' : 'none', position: 'relative' }}
    >
      <div className={stepClasses}>
        {children({
          formData,
          setFormData,
          getField,
          validateField,
          clearField
        })}
      </div>
    </motion.div>
  )
}

export { Stepper, StepsContent, Step }
