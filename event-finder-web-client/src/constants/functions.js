import { geoCoordinatesValues } from "../constants";

export const validate = (name, value, setFormErrors, formErrors, formValues, update) =>{

    if(value === "" && name != "placeSchema" && ((update && name != 'categories') || !update)) 
        setFormErrors({ ...formErrors, [name]: `This field is required!` });
    else 
        setFormErrors({ ...formErrors, [name]: "" });

    if(name === "startTime"){
        var startDate = new Date(value);
        var endDate = new Date(formValues.endTime);
        if(startDate > endDate) setFormErrors({ ...formErrors, [name]: `The start of event should be earlier than the end!` });
        else if (value != "") setFormErrors({ ...formErrors, [name]: "", ["endTime"]: "" });
    }
    if(name === "endTime"){
        var startDate = new Date(formValues.startTime);
        var endDate = new Date(value);
        if(startDate > endDate) setFormErrors({ ...formErrors, [name]: `The end of event should be later than the beginning!` });
        else if (value != "") setFormErrors({ ...formErrors, [name]: "",  ["startTime"]: "" });
    }
    if(name === "placeSchema"){
        var format = value.split('.').pop();
        if(format != 'jpg' && format != 'png' && format != 'gif' && format != ''){
            setFormErrors({ ...formErrors, [name]: `Incorrect file format! Should be .jpg, .png or .gif.` });
        }else setFormErrors({ ...formErrors, [name]: "",  ["placeSchema"]: "" });
    }

    geoCoordinatesValues.map((coordinate) => {
        if(name === coordinate.id){
            let coordinateValue = Number(value);
            if(coordinateValue < coordinate.min || coordinateValue > coordinate.max){
                setFormErrors({ ...formErrors, [name]: `${coordinate.name} should be greater than ${coordinate.min} and less than ${coordinate.max}`})
            }
            else if (value != ""){
                setFormErrors({ ...formErrors, [name]: "" });
            }
        }
    })

}

const eventFields = ['title', 'startTime', 'endTime', 'categories', 'description', 'freePlaces',  'placeSchema', 'latitude', 'longitude']

export const validateAll = (setFormErrors, formErrors, formValues, update) => {
    const errors = {
        title: "", freePlaces: "", startTime: "", 
        endTime: "", categories: "", description: "", 
        placeSchema: "", latitude: "", longitude: ""
    }
    eventFields.forEach(name => {
        if (formValues[name] === "" && name != "placeSchema" && ((update && name != 'categories') || !update)){
            errors[name] = `This field is required!`;
        }
    })
    setFormErrors(errors)
}

export const toBase64 = file => new Promise((resolve, reject) => {
    if(!file) resolve("");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const checkEventDataCorrectness = (formErrors) => {
    for(var i = 0; i < eventFields.length; ++i)
    {
        var name = eventFields[i]
        if(formErrors[name] != ""){
            document.getElementById(name).scrollIntoView();
            return false;
        }
    }
    return true;
}

export const checkDataCompletion = (formValues) => {
    for(var i = 0; i < eventFields.length; ++i)
    {
        var name = eventFields[i]
        if(name != 'placeSchema' && formValues[name] === "") {
            document.getElementById(name).scrollIntoView();
            return false;
        }
    }
    return true;
}

const eventFieldsWithoutCategories = ['title', 'startTime', 'endTime', 'description', 'maxPlaces',  'placeSchema', 'latitude', 'longitude']
export const checkDataCompletionWithoutCategories = (formValues) => {
    for(var i = 0; i < eventFieldsWithoutCategories.length; ++i)
    {
        var name = eventFieldsWithoutCategories[i]
        if(name != 'placeSchema' && formValues[name] === "") {
            document.getElementById(name).scrollIntoView();
            return false;
        }
    }
    return true;
}

export const checkEventDataCorrectnesWithoutCategories = (formErrors) => {
    for(var i = 0; i < eventFieldsWithoutCategories.length; ++i)
    {
        var name = eventFieldsWithoutCategories[i]
        if(formErrors[name] != ""){
            document.getElementById(name).scrollIntoView();
            return false;
        }
    }
    return true;
}

export const validateAllUpdate = (setFormErrors, formErrors, formValues, update) => {
    const errors = {
        title: "", freePlaces: "", startTime: "", 
        endTime: "", categories: "", description: "", 
        placeSchema: "", latitude: "", longitude: ""
    }
    eventFieldsWithoutCategories.forEach(name => {
        if (formValues[name] === "" && name != "placeSchema" && ((update && name != 'categories') || !update)){
            errors[name] = `This field is required!`;
        }
    })
    setFormErrors(errors)
}
