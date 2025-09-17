import React, { useRef } from "react";
import { Icon } from "../commons/Icons";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useSelectedServices } from "../../hooks/useSelectedService";
import classNames from "classnames";

const AddService = ({ category, service, description, className }) => {
  const { services, addService, removeService } = useSelectedServices();

  // Ahora comprobamos si ya existe por nombre
  const isAdded = services[category]?.some((s) => s.name === service) || false;

  const mainButtonIconName = isAdded
    ? { name: "trash-can", color: "text-danger" }
    : { name: "circle-plus", color: "text-muted" };

  const addServiceButtonClasses = classNames("add-service-button", className, {
    added: isAdded,
  });

  const iconRef = useRef(null);

  const toggleService = () => {
    if (isAdded) {
      removeService(category, service); // ✅ ahora solo pasamos name
    } else {
      addService(category, service, description);
    }
  };

  return (
    <span className={addServiceButtonClasses} onClick={toggleService}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={mainButtonIconName.name}
          timeout={150}
          nodeRef={iconRef}
          classNames="add-service-fade"
        >
          <Icon
            ref={iconRef}
            dataName={mainButtonIconName.name}
            name={mainButtonIconName.name}
            className={`add-service-icon ${mainButtonIconName.color}`}
          />
        </CSSTransition>
      </SwitchTransition>
    </span>
  );
};

export default AddService;
