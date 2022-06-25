import { useReducer } from "react";

interface InitInputProp {
  value: string;
  isTouched: boolean;
}

const initialInputState: InitInputProp = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (
  state: InitInputProp,
  action: any
): InitInputProp => {
  switch (action.type) {
    case "INPUT":
      return {
        value: action.value,
        isTouched: state.isTouched,
      };

    case "BLUR":
      return {
        value: state.value,
        isTouched: true,
      };

    case "RESET":
      return initialInputState;

    default:
      return initialInputState;
  }
};

interface InputProp {
  value: string;
  error: string;
  hasError: boolean;
  valueChangedHandler: (val: any) => void;
  inputBlurHandler: () => void;
  reset: () => void;
}

type EventProp = {
  target: {
    value: string;
  };
};

function useInputReducer(validateValue: (val: string) => any): InputProp {
  const [inputState, dispatchInput] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const validation = validateValue(inputState.value);

  const valueIsValid = validation.isValid;
  const hasError = !valueIsValid && inputState.isTouched;
  const valueChangedHandler = (event: EventProp) =>
    dispatchInput({ type: "INPUT", value: event.target.value });

  const inputBlurHandler = () => dispatchInput({ type: "BLUR" });

  const reset = () => {
    dispatchInput({ type: "RESET" });
  };

  return {
    value: inputState.value,
    error: validation.error,
    hasError,
    valueChangedHandler,
    inputBlurHandler,
    reset,
  };
}

export default useInputReducer;
