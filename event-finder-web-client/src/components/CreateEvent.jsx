import React from "react";
import styles from "../style";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import { api } from "../constants";
import { validate, toBase64, checkEventDataCorrectness,checkDataCompletion, validateAll } from "../constants/functions";

const CreateEvent = () => {

    const initialValues = {
        title: "", freePlaces: "", startTime: "", 
        endTime: "", categories: "", description: "", 
        placeSchema: "", latitude: "", longitude: ""
    }
    const initialErrors = {
        title: "", freePlaces: "", startTime: "", 
        endTime: "", categories: "", description: "", 
        placeSchema: "", latitude: "", longitude: ""
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialErrors);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user, logout } = useAuth();
    const [base64, setBase64] = useState("");

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        if (name == 'placeSchema') {
            var file = document.querySelector('#placeSchema').files[0];
            toBase64(file)
                .then(base64 => {
                    setBase64(base64)
                })
        }
        validate(name, value, setFormErrors, formErrors, formValues, false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!checkEventDataCorrectness(formErrors)) return;
        if (!checkDataCompletion(formValues)) {
            validateAll(setFormErrors, formErrors, formValues, false);
            return;
        }

        var titleVal = formValues.title;
        var nameVal = formValues.description;
        var freePlaceVal = formValues.freePlaces;
        var startTimeVal = new Date(formValues.startTime).getTime() / 1000;
        var endTimeVal = new Date(formValues.endTime).getTime() / 1000;
        var latitudeVal = formValues.latitude;
        var longitudeVal = formValues.longitude;
        var categoriesVal = [];
        var placeSchemaVal = base64;

        setLoading(true);
        
        var categoriesTable = formValues.categories.split(",");
        for (var i = 0; i < categoriesTable.length; ++i) {
            categoriesTable[i] = categoriesTable[i].trim();
        }
        categoriesTable = categoriesTable.filter(e => String(e).trim());

        const categoriesPromises = [];
        for (var i = 0; i < categoriesTable.length; ++i) {
            var found = categories.find((cat) => cat.name === categoriesTable[i]);
            if (found != undefined) {
                categoriesVal.push(found.id)
            } else {

                var url = api.base + '/categories';
                var token = `${user.sessionToken}`;

                categoriesPromises.push(fetch(url, {
                    method: 'POST',
                    headers: {
                        'accept':'*/*',
                        'sessionToken': token,
                        'categoryName': categoriesTable[i],
                    },
                }))
            }
        }

        Promise.all(categoriesPromises)
            .then((responses) =>
                Promise.all(responses.map(response => response.json())))
            .then((newCategories) => {
                newCategories.forEach((c) => categoriesVal.push(c.id))

                var url = api.base + '/events';
                var token = `${user.sessionToken}`;
                var bodyData = JSON.stringify({
                    title: titleVal,
                    name: nameVal,
                    startTime: startTimeVal,
                    endTime: endTimeVal,
                    latitude: latitudeVal,
                    longitude: longitudeVal,
                    placeSchema: placeSchemaVal === "" ? "NULL" : placeSchemaVal,
                    maxPlace: freePlaceVal,
                    categoriesIds: categoriesVal
                })
                fetch(url, {
                    method: 'POST',
                    headers: {
                      'accept':'*/*',
                      'sessionToken': token,
                      'Content-Type': 'application/json'
                    },
                    body: bodyData
                })
                    .then((response) =>
                    {
                        if(response.status===403) logout();
                        return response.json()
                    })
                    .then(() => {
                        window.location.reload()
                    })
                    .catch(error => {
                        console.log(error)
                        window.location.reload()
                    })
            }
            )
    }

    const [categories, setCategories] = useState([]);
    var url = api.base + `/categories`;
    useEffect(() => {
        fetch(url, {
            method: 'GET',
        })
        .then((response) =>
        {
            if(response.status===403) logout();
            return response.json()
        })
        .then((responseJson) => {
            setCategories(responseJson)
        }).catch(error => console.log(error));
    }, [])

    return (
        <section className={`${styles.flexCenter} flex-row flex-wrap space-x-20 my-15`}>
            <form id="form" className={`bg-black-gradient p-8 md:w-8/12 w-11/12 rounded-3xl font-poppins ${!toggle ? "hover-effect cursor-pointer" : ""}`}
                onClick={() => {if(!toggle) setToggle(!toggle)}}>

                <div className={`${toggle ? "none" : "hidden"}`}>
                    <FontAwesomeIcon 
                        icon={faArrowRotateLeft}
                        className="md:text-5xl text-3xl text-white cursor-pointer"
                        onClick={() => setToggle(!toggle)}>
                    </FontAwesomeIcon>
                </div>

                <div className={`${!toggle ? "none" : "text-center py-10"} md:text-5xl text-2xl title-shadow font-bold text-white `}>
                    New event
                    <span className={`${!toggle ? "none" : "hidden"} md:text-6xl text-3xl float-right cursor-pointer mr-10`}>
                        <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>
                    </span>
                </div>

                <div className={`${toggle ? "none" : "hidden"} mt-10`}>
                    <div className="md:w-7/12 w-3/4 mx-auto py-5">
                        <input 
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Enter your event title . . ."
                            className="text-white p-4 m-1 rounded-3xl w-full input-text-effect form-input input-border"
                            value={formValues.title}
                            onChange={handleChange}
                            required
                        >
                        </input>
                        <label className="relative text-sm placeholder rounded-full py-0 bg-black px-3">
                            Event title
                        </label>
                        {formErrors.title != "" ? 
                        <p className="text-red-400 left-5"><FontAwesomeIcon icon={faCircleXmark}/> {formErrors.title}</p> : null}
                    </div>
                </div>

                <div className={`${toggle ? "none" : "hidden"}`}>
                    <div className="md:w-7/12 w-3/4 mx-auto py-5">
                        <input 
                            id="startTime"
                            name="startTime"
                            type="datetime-local"
                            placeholder="Start time"
                            className="text-gray-400 p-4 rounded-3xl w-full input-text-effect form-input input-border"
                            value={formValues.startTime}
                            onChange={handleChange}
                            required
                        >
                        </input>
                        <label className="relative text-sm placeholder rounded-full py-0 bg-black px-3">
                            Start time
                        </label>
                        {formErrors.startTime != "" ? 
                        <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark}/> {formErrors.startTime}</p> : null}
                    </div>
                </div>

                <div className={`${toggle ? "none" : "hidden"}`}>
                    <div className="md:w-7/12 w-3/4 mx-auto py-5">
                        <input 
                            id="endTime"
                            name="endTime"
                            type="datetime-local"
                            placeholder="End time"
                            className="text-gray-400 p-4 rounded-3xl w-full input-text-effect form-input input-border"
                            value={formValues.endTime}
                            onChange={handleChange}
                            min={formValues.startTime}
                            max="2030-01-01T00:00"
                            required
                        >
                        </input>
                        <label className="relative text-sm placeholder rounded-full py-0 bg-black px-3">
                            End time
                        </label>
                        {formErrors.endTime != "" ? 
                        <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark}/> {formErrors.endTime}</p> : null}
                    </div>
                </div>

                <div className={`${toggle ? "none" : "hidden"}`}>
                    <div className="md:w-7/12 w-3/4 mx-auto py-5">
                        <input
                            id="categories"
                            name="categories"
                            type="text"
                            list="categoriesList"
                            placeholder="e.g. Sport, Music, Bussines . . ."
                            className="text-white p-4 m-1 rounded-3xl w-full input-text-effect form-input input-border"
                            value={formValues.categories}
                            onChange={handleChange}
                            required
                        >
                            
                        </input>
                        <label className="relative text-sm placeholder rounded-full py-0 bg-black px-3">
                            Categories
                        </label>
                        {formErrors.categories != "" ? 
                        <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark}/> {formErrors.categories}</p> : null}
                    </div>
                </div>

                <div className={`${toggle ? "none" : "hidden"}`}>
                    <div className="md:w-7/12 w-3/4 mx-auto py-5">
                        <textarea
                            id="description"
                            name="description" 
                            type="text"
                            placeholder="Briefly describe your event . . ."
                            className="text-white p-4 rounded-3xl w-full input-text-effect form-input h-60 text-start input-border"
                            maxLength="300"
                            value={formValues.description}
                            onChange={handleChange}
                            required
                        >
                        </textarea>
                        <label className="relative text-sm placeholder-textarea rounded-full py-0 bg-black px-3">
                            Description
                        </label>
                        {formErrors.description != "" ? 
                        <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark}/> {formErrors.description}</p> : null}
                    </div>
                </div>

                <div className={`${toggle ? "none" : "hidden"}`}>
                    <div className="md:w-7/12 w-3/4 mx-auto py-5">
                        <input 
                            id="freePlaces"
                            name="freePlaces"
                            type="number"
                            placeholder="Number of free places . . ."
                            className="text-white p-4 m-1 rounded-3xl w-full input-text-effect form-input input-border"
                            value={formValues.freePlaces}
                            onChange={handleChange}
                            required
                            min="1"
                        >
                        </input>
                        <label className="relative text-sm placeholder rounded-full py-0 bg-black px-3">
                            Free places
                        </label>
                        {formErrors.freePlaces != "" ? 
                        <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark}/> {formErrors.freePlaces}</p> : null}
                    </div>
                </div>

                <div className={`${toggle ? "none" : "hidden"}`}>
                    <div className="md:w-7/12 w-3/4 mx-auto py-5">
                        <input 
                            id="placeSchema"
                            name="placeSchema"
                            type="file"
                            placeholder="Provide places scheme . . ."
                            className="text-white p-4 m-1 rounded-3xl w-full input-text-effect form-input input-border"
                            value={formValues.placeSchema}
                            onChange={handleChange}
                            accept="image/*"
                        >
                        </input>
                        <label className="relative text-sm placeholder-fileinput rounded-full py-0 bg-black px-3">
                            Places scheme
                        </label>
                        {formErrors.placeSchema != "" ? 
                        <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark}/> {formErrors.placeSchema}</p> : null}
                    </div>
                </div>

                <div className={`${toggle ? "none" : "hidden"}`}>
                    <div className="md:w-7/12 w-3/4 mx-auto py-5">
                        <input 
                            id="latitude"
                            name="latitude"
                            type="number"
                            placeholder="Enter the latitude of the event location e.g. 20.5000"
                            className="text-white p-4 m-1 rounded-3xl w-full input-text-effect form-input input-border"
                            value={formValues.latitude}
                            onChange={handleChange}
                            step="any"
                            min="-90"
                            max="90"
                            required
                        >
                        </input>
                        <label className="relative text-sm placeholder rounded-full py-0 bg-black px-3">
                            Latitude
                        </label>
                        {formErrors.latitude != "" ? 
                        <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark}/> {formErrors.latitude}</p> : null}
                    </div>
                </div>

                <div className={`${toggle ? "none" : "hidden"}`}>
                    <div className="md:w-7/12 w-3/4 mx-auto py-5">
                        <input 
                            id="longitude"
                            name="longitude"
                            type="number"
                            placeholder="Enter the longitude of the event location e.g. 20.5000"
                            className="text-white p-4 m-1 rounded-3xl w-full input-text-effect form-input input-border"
                            value={formValues.longitude}
                            onChange={handleChange}
                            step="any"
                            min="-180"
                            max="180"
                            required
                        >
                        </input>
                        <label className="relative text-sm placeholder rounded-full py-0 bg-black px-3">
                            Longitude
                        </label>
                        {formErrors.longitude != "" ? 
                        <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark}/> {formErrors.longitude}</p> : null}
                    </div>
                </div>

                <div className={`${toggle ? " " : "hidden"} text-center my-10 float-right`}>
                    {
                        loading
                        ?
                        <button id="submit" className="link-effect text-lg md:text-3xl font-semibold cursor-pointer border-2 border-solid p-3 rounded-lg
                                shadow-md shadow-slate-100">
                            Saving <div className="inline-flex w-5 h-5 ml-5 border-l-2 border-t-2 border-white-900 rounded-full animate-spin" />
                        </button>
                        :
                        <button id="submit" className="link-effect text-lg md:text-3xl font-semibold cursor-pointer border-2 border-solid p-3 rounded-lg
                                shadow-md shadow-slate-100" onClick={ handleSubmit }>
                            Create
                        </button>
                    }
                </div>

            </form>
        </section>
    );
};

export default CreateEvent;