import throttle from "lodash.throttle";

const formOfInputEl = document.querySelector('.feedback-form');

const KEY_OF_INPUT_LS = "feedback-form-state";

const save = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
  
  const load = key => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  };
  
  const remove = key => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log('Remove item error: ', error.message);
    }
  };

  const fillContactFormFildes = form => {
    
    const { elements: contactFormElements } = form;
  
    const formDataFromLS = load(KEY_OF_INPUT_LS);
  
    if (!formDataFromLS) {
      return;
    }
  
    const keys = Object.keys(formDataFromLS);
  
    for (const key of keys) {
      contactFormElements[key].value = formDataFromLS[key];
    }
  };


formOfInputEl.addEventListener("input", throttle((addDataInLocalStrg), 500));
formOfInputEl.addEventListener('submit', cleanFormAndLocalStrg);

function addDataInLocalStrg (event) {
   const  {target} = event;
const inputName = target.name;
const inputValue =target.value;


const formDataFromLS =load(KEY_OF_INPUT_LS) || {};

  formDataFromLS[inputName] = inputValue;

  save(KEY_OF_INPUT_LS, formDataFromLS);
};


function cleanFormAndLocalStrg (event){
    event.preventDefault();

    event.target.reset();
  
    remove(KEY_OF_INPUT_LS);
}

fillContactFormFildes(formOfInputEl);
