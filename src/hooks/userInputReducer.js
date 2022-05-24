import { useReducer } from 'react';

const initialInputState = {
    value: '',
    isTouched: false
}

const inputStateReducer = (state,action) => {

    switch (action.type) {
        case 'INPUT':
            return {
                value: action.value,
                isTouched: state.isTouched
            }
            break;

        case 'BLUR':
            return {
                value: state.value,
                isTouched: true
            }
            
            break;

        case 'RESET':
            return initialInputState
            break;
    
        default:
            return initialInputState;
            break;
    }
}

function useInputReducer(validateValue) {

    const [inputState,dispatchInput] = useReducer(inputStateReducer,initialInputState);

    const validation =  validateValue(inputState.value);
    
    const valueIsValid = validation.isValid;
    const hasError = !valueIsValid && inputState.isTouched;
    const valueChangedHandler = event => dispatchInput({type:'INPUT',value:event.target.value});
    

    const inputBlurHandler = () => dispatchInput({type:'BLUR'});

    const reset = () => {
        dispatchInput({type:'RESET'})
    }

    return {
        value: inputState.value,
        error:validation.error,
        hasError,
        valueChangedHandler,
        inputBlurHandler,
        reset
    }


}

export default useInputReducer;