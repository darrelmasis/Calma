import classNames from "classnames";

const ResponsiveImage = ({
  name,
  alt,
  sizes = [400, 800, 1200],
  type = "jpg",
  className,
  basePath = "/images",
}) => {
  // Caso SVG
  if (type === "svg") {
    return (
      <img
        src={`${basePath}/${name}.svg`}
        alt={alt || "Imagen vectorial de Calma Spa & Salón"}
        className={classNames("responsive-img", className)}
        loading="lazy"
        draggable="false"
      />
    );
  }

  // Caso JPG/PNG/WebP
  const srcSetWebP = sizes
    .map((size) => `${basePath}/webp/${name}-${size}.webp ${size}w`)
    .join(", ");

  const srcSetFallback = sizes
    .map((size) => `${basePath}/${type}/${name}-${size}.${type} ${size}w`)
    .join(", ");

  const largest = sizes[sizes.length - 1];

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={srcSetWebP}
        sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
      />
      <img
        src={`${basePath}/${type}/${name}-${largest}.${type}`}
        srcSet={srcSetFallback}
        sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
        alt={alt || "Servicio de bienestar y cuidado personal en Calma Spa & Salón"}
        loading="lazy"
        className={classNames("responsive-img", className)}
        draggable="false"
      />
    </picture>
  );
};

export { ResponsiveImage };
