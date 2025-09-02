import { Icon } from '../commons/Icons';
import { useLang } from '../../i18n/LanguageContext'

const PackageCard = ({ icono, nombre, precio, descripcion, servicios }) => {
  const { t } = useLang()
  const currencySymbol = <span className='text-white small'>USD</span>;

  return (
    <div className="grid-col-12 grid-col-md-4 package-card d-flex align-items-center justify-content-center">
      <div className="border rounded bg-container w-100 overflow-hidden">
        <div className="package-header p-3 bg-light-600 text-center">
          <Icon name={icono} className="text-white fs-4" />
          <h3 className="text-white">{ t('packages.section_1.from_price_text') } / {currencySymbol } {precio}</h3>
          <h2 className="text-white">{nombre}</h2>
          <span className="text-light-200 package-description ">{descripcion}</span>
        </div>
        <div className="p-3">
          <h3 className='text-primary-700'>{ t('packages.section_1.include_text')}</h3>
          <ul className="list-unstyled">
            {servicios.map((servicio, i) => (
              <li className="mb-2" key={i}>
                <Icon name="check" className="text-primary me-2" />
                {servicio}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
