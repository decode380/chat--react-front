import { useEffect, useState } from "react";

export const useFormErrorText = (error) => {
    const [errorState, setErrorState] = useState(null);

    useEffect(() => {
        switch (error?.type) {
            case "required":
                setErrorState('Requerido');
                break;
            case "minLength":
            case "maxLength":
                setErrorState("Debe tener entre 4 y 18 caracteres");
                break;
            default:
                setErrorState(null);
                break;
        }
    }, [error]);

    return errorState;
}