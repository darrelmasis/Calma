import { useState } from "react";
import classNames from "classnames";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";

const ReadMore = ({ text, maxLength = 20, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const readMoreClasses = classNames("read-more fs-small text-muted", { "is-expanded": isExpanded }, className);

  // Si el texto es más corto que maxLength, no hacemos nada especial
  if (text.length <= maxLength) {
    return <p className={readMoreClasses}>{text}</p>;
  }


  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };


  return (
    <p className={readMoreClasses}>
      <span>
        {isExpanded ? text : text.substring(0, maxLength) + "..."}{" "}
      </span>
      <span onClick={handleToggle} className="read-more-toggle fw-semibold">
        {isExpanded ? "Ver menos" : "Ver más"}
      </span>
    </p>
  );
};

const TruncateText = ({ text, maxLength = 20, className, ...rest }) => {

  const { title } = rest.popover;

  const isTextLong = text.length > maxLength;

  return (
    <>
      <p className={className}>
        {
          isTextLong ? text.substring(0, maxLength) + "..." : text
        }
      </p>
      {
        isTextLong && (
          <Popover triggerMode="click">
            <PopoverTrigger>
              {(isPopoverOpen, props) => (
                <p
                  {...props}
                  className="popover-view-more ms-2 fs-small text-muted fw-semibold p-0 m-0"
                >
                  {isPopoverOpen ? "Ocultar" : "Ver Más"}
                </p>
              )}
            </PopoverTrigger>

            <PopoverContent className="p-3 border rounded-all-sm bg-white shadow">
              <h6 className="m-0 text-primary">{`${title}`}</h6>
              <p className="mb-0 fs-small text-muted">{text}</p>
            </PopoverContent>
          </Popover>
        )
      }
    </>
  );
};

export { ReadMore, TruncateText };
