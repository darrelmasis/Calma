import { Icon } from '../commons/Icons'
import { useLang } from '../../i18n/LanguageContext'

const PackageCard = ({ icono, nombre, precio, descripcion, servicios, isFeatured, featuredText }) => {
  const { t } = useLang()
  const currencySymbol = <span className='text-white fs-lead'>$</span>;

  return (
    <div className="package-card">
      <div className="rounded bg-container w-100">
        <div className="package-card-header p-3 rounded-top-sm position-relative">
          <Icon name={icono} className=" package-icon bg-white" size='lg' />
          <h2 className="text-white fs-lead"><span className='fs-h5 fw-light me-2'>{t('packages.section_1.from_price_text')}</span>{currencySymbol} {precio}</h2>
          <h2 className="text-white fs-h4">{nombre}</h2>
          <span className="text-neutral-50 fw-light package-description fs-medium">{descripcion}</span>
          {
            isFeatured && (
              <div className='most-popular-tag fs-medium rounded-all-sm text-primary-800 py-2 px-3 d-inline position-absolute top-0 right-0 gap-0-5 d-flex'>
                <Icon name="stars" />
                <span>{featuredText}</span>
              </div>
            )
          }
        </div>
        <div className="px-3 pb-3">
          <h3 className='text-muted fw-light fs-h5'>{t('packages.section_1.include_text')}</h3>
          <ul className="list-unstyled d-flex flex-direction-column gap-0-5">
            {servicios.map((servicio, i) => (
              <li className="mb-2 gap-1 fs-lead" key={i}>
                <Icon name="check" className="text-primary-300" />
                <span className='fs-medium'>{servicio}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
