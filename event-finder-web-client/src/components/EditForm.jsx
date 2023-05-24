import { React, useState, useEffect } from "react";
import styles from "../style";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faFileCircleXmark, faXmark, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { cancelledIcon, doneIcon, inFutureIcon, pendingIcon } from "../constants/index.js";

import { api, numberOfReservationsError } from "../constants";
import { validate, toBase64, checkDataCompletionWithoutCategories, checkEventDataCorrectnesWithoutCategories, validateAllUpdate } from "../constants/functions";


const EditForm = () => {
    const location = useLocation();
    const event = location.state;
    const initialValues = {
        title: "", maxPlaces: 0, startTime: "", 
        endTime: "", categories: "", description: "", 
        placeSchema: "", latitude: "", longitude: "", freePlace: 0, places: []
    }
    const initialErrors = {
        title: "", maxPlaces: "", startTime: "",
        endTime: "", categories: "", description: "",
        placeSchema: "", latitude: "", longitude: ""
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialErrors);
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, logout } = useAuth();
    const [occupied, setOccupied] = useState(0)
    const [base64, setBase64] = useState("");
    const [photos, setPhotos] = useState([]);

    // get actual data
    const [eventDetails, setEventDetails] = useState(initialValues);
    const [categories, setCategories] = useState([]);
    var event_url = api.base + `/events/${event.id}`;
    var cat_url = api.base + `/categories`;
    useEffect(() => {
        fetch(event_url, {
            method: 'GET',
        })
            .then((response) =>
            {
                if(response.status===403) logout();
                return response.json()
            })
            .then((responseJson) => {
                setEventDetails(responseJson)
                setOccupied(responseJson.maxPlace - responseJson.freePlace);
                setFormValues({...formValues, 
                    ['title']: responseJson.title,
                    ['description']: responseJson.name,
                    ['maxPlaces']: responseJson.maxPlace,
                    ['freePlace']: responseJson.freePlace,
                    ['startTime']: new Date(responseJson.startTime * 1000).toISOString().substring(0, 16),
                    ['endTime']: new Date(responseJson.endTime * 1000).toISOString().substring(0, 16),
                    ['latitude']: responseJson.latitude,
                    ['longitude']: responseJson.longitude,
                    ['status']: responseJson.status,
                    ['placeSchema']: responseJson.placeSchema
                })
                setCheckedCategories(responseJson.categories);
            }).catch(error => console.log(error));

        fetch(cat_url, {
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

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        
        if (name == 'maxPlaces') {
            var freePlace = value - occupied;
            setFormValues({ ...formValues, [name]: value, ['freePlace']: freePlace > 0 ? freePlace : 0 });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
        if (name == 'placeSchema') {
            var file = document.querySelector('#placeSchema').files[0];
            toBase64(file)
                .then(base64 => {
                    setBase64(base64)
                })
        }
        validate(name, value, setFormErrors, formErrors, formValues, true);
    };

    const addCategory = () => {
        var categoriesTable = formValues.categories.split(",");
        for (var i = 0; i < categoriesTable.length; ++i) {
            categoriesTable[i] = categoriesTable[i].trim().toLowerCase();
        }
        categoriesTable = categoriesTable.filter(e => String(e).trim());

        const categoriesPromises = [];
        const founds = []
        for (var i = 0; i < categoriesTable.length; ++i) {
            var found_checked = checkedCategories.find((cat) => cat.name === categoriesTable[i]);
            if (found_checked != undefined) continue;
            var found = categories.find((cat) => cat.name === categoriesTable[i]);
            if (found != undefined) {
                founds.push(found)
            } else {

                var url = api.base + `/categories`;
                var token = `${user.sessionToken}`;
                
                categoriesPromises.push(fetch(url, {
                    method: 'POST',
                    headers: {
                        'sessionToken': token,
                        'Accept': 'application/json',
                        'categoryName': categoriesTable[i]
                    },
                }))
            }
        }

        Promise.all(categoriesPromises)
            .then((responses) =>
                Promise.all(responses.map(response =>
                {
                    if(response.status===403) logout();
                    return response.json()
                })))
            .then((newCategories) => {
                setCheckedCategories(checkedCategories => [...checkedCategories, ...newCategories, ...founds])
            })
        setFormValues({ ...formValues, categories: "" });
    }

    const removeCategory = (id) => {
        var newCategories = [];
        checkedCategories.forEach(cat => {
            if (cat.id != id) newCategories.push(cat);
        })
        setCheckedCategories(newCategories)
    }

    const addPhoto = (e) => {
        const value = e.target.files[0];
        const url = URL.createObjectURL(value);
        setPhotos([...photos, {id: value.name, value: value, url: url}])
        console.log(photos)
        e.target.value = "";
    }

    const removePhoto = (id) => {
        var newPhotos = [];
        photos.forEach(photo => {
            if (photo.id != id) newPhotos.push(photo);
        })
        setPhotos(newPhotos)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!checkEventDataCorrectnesWithoutCategories(formErrors)) return;
        if (!checkDataCompletionWithoutCategories(formValues)) {
            validateAllUpdate(setFormErrors, formErrors, formValues, false);
            return;
        }

        var titleVal = formValues.title;
        var nameVal = formValues.description;
        var maxPlaceVal = formValues.maxPlaces;
        var startTimeVal = new Date(formValues.startTime).getTime() / 1000;
        var endTimeVal = new Date(formValues.endTime).getTime() / 1000;
        var latitudeVal = formValues.latitude;
        var longitudeVal = formValues.longitude;
        var categoriesVal = [];
        checkedCategories.forEach(c => categoriesVal.push(c.id))
        var placeSchemaVal = base64 != "" ? base64 : eventDetails.placeSchema;

        setLoading(true);

        var url = api.base + `/events/${event.id}`;
        var token = `${user.sessionToken}`;
        var bodyData = JSON.stringify({
            title: titleVal,
            name: nameVal,
            startTime: startTimeVal,
            endTime: endTimeVal,
            latitude: latitudeVal,
            longitude: longitudeVal,
            placeSchema: placeSchemaVal === "" ? "NULL" : placeSchemaVal,
            maxPlace: maxPlaceVal,
            categoriesIds: categoriesVal
        })
        console.log(bodyData)
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'sessionToken': token,
            },
            body: bodyData
            })
            .then((response) =>
            {
                if(response.status===403) logout();
                window.location.reload()
            })
            .catch(error => console.log(error));
    }

    return (
        <section className={`${styles.flexCenter} flex-row flex-wrap space-x-20 my-6`}>
            <div className={`bg-black-gradient md:w-8/12 w-11/12 rounded-3xl font-poppins items-center text-white`}>
                <form className="md:p-10 p-4">

                    <div className="text-center py-9 md:text-5xl text-2xl title-shadow font-bold text-white">
                        Edit event
                    </div>

                    <div className="mt-10 md:mx-8 md:mx-0">
                        <div className="w-full mx-auto py-5">
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
                                <p className="text-red-400 left-5"><FontAwesomeIcon icon={faCircleXmark} /> {formErrors.title}</p> : null}
                        </div>
                    </div>

                    <div className={`${styles.flexCenter} flex-row flex-wrap md:space-x-20 lg:space-x-5 mt-10 md:m-8 m-0`}>
                        <div className={`${styles.flexCenter} items-center`}>
                            <div className="w-full mx-auto py-5">
                                <input
                                    id="maxPlaces"
                                    name="maxPlaces"
                                    type="number"
                                    placeholder="Number of places . . ."
                                    className="text-white p-4 m-1 rounded-3xl w-full input-text-effect form-input input-border"
                                    value={formValues.maxPlaces}
                                    onChange={handleChange}
                                    required
                                >
                                </input>
                                <label className="relative text-sm placeholder rounded-full py-0 bg-black px-3">
                                    Max places
                                </label>
                                {occupied > formValues.maxPlaces ?
                                    <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark} /> {numberOfReservationsError} </p> : null}
                                {formErrors.maxPlaces != "" ?
                                    <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark} /> {formErrors.maxPlaces}</p> : null}
                            </div>
                        </div>
                        <div className={`${styles.flexCenter} items-center w-40 h-40 bg-blue-red-gradient rounded-full border-solid border-8 
                            ${Math.round((occupied / formValues.maxPlaces) * 100) < 20 ? "border-white" :
                                Math.round((occupied / formValues.maxPlaces) * 100) < 30 ? "border-yellow-200" :
                                    Math.round((occupied / formValues.maxPlaces) * 100) < 40 ? "border-yellow-300" :
                                        Math.round((occupied / formValues.maxPlaces) * 100) < 50 ? "border-yellow-400" :
                                            Math.round((occupied / formValues.maxPlaces) * 100) < 60 ? "border-green-300" :
                                                Math.round((occupied / formValues.maxPlaces) * 100) < 70 ? "border-green-400" :
                                                    Math.round((occupied / formValues.maxPlaces) * 100) < 80 ? "border-green-500" :
                                                        Math.round((occupied / formValues.maxPlaces) * 100) < 90 ? "border-green-600" :
                                                            Math.round((occupied / formValues.maxPlaces) * 100) < 100 ? "border-green-700" :
                                                                "border-red-700"}`}>
                            <div className="text-center my-auto mx-auto">
                                <div className="text-white percent-shadow text-3xl font-bold">
                                    {Math.round((occupied / formValues.maxPlaces) * 100) != Infinity &&
                                        Math.round((occupied / formValues.maxPlaces) * 100) > 0 ?
                                        Math.round((occupied / formValues.maxPlaces) * 100) : 0} %
                                </div>
                                <div className="text-blue-800 font-semibold text-sm">
                                    {occupied} / {formValues.maxPlaces ? formValues.maxPlaces : 0}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.flexCenter} flex-row flex-wrap md:space-x-20 lg:space-x-5 mt-10 m-8`}>
                        <div className={`${styles.flexCenter} items-center`}>
                            <div className="md:w-60 w-40 mx-auto py-5">
                                <div className="text-white p-4 m-1 rounded-3xl w-full input-text-effect form-input input-border">
                                    {formValues.freePlace}
                                </div>
                                <label className="relative text-sm placeholder rounded-full py-0 bg-black px-3">
                                    Free places
                                </label>
                            </div>
                        </div>
                        <div className={`${styles.flexCenter} items-center`}>
                            <div className="md:w-60 w-40 mx-auto py-5">
                                <div className="text-white p-4 m-1 rounded-3xl w-full input-text-effect form-input input-border">
                                    {eventDetails.status === "cancelled" ?
                                        <span><FontAwesomeIcon icon={cancelledIcon} className="text-red-800 text-xl"
                                            fade></FontAwesomeIcon>&nbsp; Cancelled</span> : null}
                                    {eventDetails.status === "pending" ?
                                        <span><FontAwesomeIcon icon={pendingIcon} className="text-green-800 text-xl"
                                            fade></FontAwesomeIcon>&nbsp; Pending</span> : null}
                                    {eventDetails.status === "inFuture" ?
                                        <span><FontAwesomeIcon icon={inFutureIcon} className="text-blue-800 text-xl"
                                            fade></FontAwesomeIcon>&nbsp; In future</span> : null}
                                    {eventDetails.status === "done" ?
                                        <span><FontAwesomeIcon icon={doneIcon} className="text-green-800 text-xl"
                                            fade></FontAwesomeIcon>&nbsp; Done</span> : null}
                                </div>
                                <label className="relative text-sm placeholder rounded-full py-0 bg-black px-3">
                                    Status
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 md:mx-8 md:mx-0">
                        <div className="w-full mx-auto py-5">
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
                                <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark} /> {formErrors.description}</p> : null}
                        </div>
                    </div>

                    <div className="mt-10 md:mx-8 md:mx-0">
                        <div className="w-full mx-auto py-5">
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
                                <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark} /> {formErrors.startTime}</p> : null}
                        </div>
                    </div>

                    <div className="md:mx-8 md:mx-0">
                        <div className="w-full mx-auto py-5">
                            <input
                                id="endTime"
                                name="endTime"
                                type="datetime-local"
                                placeholder="End time"
                                className="text-gray-400 p-4 rounded-3xl w-full input-text-effect form-input input-border"
                                value={formValues.endTime}
                                onChange={handleChange}
                                required
                            >
                            </input>
                            <label className="relative text-sm placeholder rounded-full py-0 bg-black px-3">
                                End time
                            </label>
                            {formErrors.endTime != "" ?
                                <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark} /> {formErrors.endTime}</p> : null}
                        </div>
                    </div>

                    <div className="mt-10 md:mx-8 md:mx-0">
                        <div className="w-full mx-auto py-5">
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
                                <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark} /> {formErrors.latitude}</p> : null}
                        </div>
                    </div>

                    <div className="md:mx-8 md:mx-0">
                        <div className="w-full mx-auto py-5">
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
                                <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark} /> {formErrors.longitude}</p> : null}
                        </div>
                    </div>

                    <div className="mt-10">
                        {eventDetails != null && eventDetails.placeSchema != "NULL" ?
                            <img alt="Place schema" className="mx-auto" src={eventDetails.placeSchema}></img>
                            :
                            <div className="text-center text-white">
                                <FontAwesomeIcon icon={faFileCircleXmark} /> No place scheme file attached.
                            </div>
                        }
                    </div>

                    <div className="md:mx-8 md:mx-0">
                        <div className="w-full mx-auto py-5">
                            <input
                                id="placeSchema"
                                name="placeSchema"
                                type="file"
                                placeholder="Provide places scheme . . ."
                                className="text-white p-4 m-1 rounded-3xl w-full input-text-effect form-input input-border"
                                onChange={handleChange}
                                accept="image/*"
                            >
                            </input>
                            <label className="relative text-sm placeholder-fileinput rounded-full py-0 bg-black px-3">
                                Update places scheme
                            </label>
                            {formErrors.placeSchema != "" ?
                                <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark} /> {formErrors.placeSchema}</p> : null}
                        </div>
                    </div>

                    <div className="mt-10 md:mx-8 md:mx-0">
                        <div className="w-full mx-auto py-5">
                            <input
                                id="categories"
                                name="categories"
                                type="text"
                                placeholder="Add new category . . ."
                                className="text-white p-4 m-1 rounded-3xl w-full input-text-effect form-input input-border"
                                value={formValues.categories}
                                onChange={handleChange}
                            >

                            </input>
                            <label className="relative text-sm placeholder rounded-full py-0 bg-black px-3">
                                Categories
                            </label>
                            <label className="relative text-sm float-right add-category-button p-3 m-4 mx-6">
                                <FontAwesomeIcon icon={faSquarePlus} className="text-4xl hover:text-green-400 cursor-pointer"
                                    onClick={function () { addCategory() }} />
                            </label>
                            {formErrors.categories != "" ?
                                <p className="text-red-400"><FontAwesomeIcon icon={faCircleXmark} /> {formErrors.categories}</p> : null}
                        </div>
                    </div>


                    <div className="mb-12">
                        <div className={`${styles.flexCenter} flex-row flex-wrap w-full`}>
                            {checkedCategories.map((c) => (
                                <span key={c.id} className="px-5 bg-gray-400 rounded-xl my-3 mx-3">
                                    {c.name}<FontAwesomeIcon icon={faXmark} className="text-black cursor-pointer hover:text-red-500 pl-2"
                                        onClick={function () { removeCategory(c.id) }}></FontAwesomeIcon>
                                </span>
                            ))}
                        </div>
                    </div>


                    <div className="md:mx-8 md:mx-0">
                        <div className="w-full mx-auto py-5">
                            <input
                                id="photos"
                                name="photos"
                                type="file"
                                className="text-white p-4 m-1 rounded-3xl w-full input-text-effect form-input input-border"
                                onChange={addPhoto}
                                accept="image/*"
                            >
                            </input>
                            <label className="relative text-sm placeholder-fileinput rounded-full py-0 bg-black px-3">
                                Event photos
                            </label>
                        </div>
                    </div>


                    <div className="mb-12">
                        <div className={`${styles.flexCenter} flex-row flex-wrap w-full`}>
                            {photos.map((photo) => (
                                <div key={photo.id} className="md:w-2/5 w-full p-2 md:hover:w-3/5 to-show-parent">
                                    <div className="text-white cursor-pointer hover:text-red-500 relative delete-photo-mark float-right 
                                    to-show text-xl" onClick={function () { removePhoto(photo.id) }}>
                                        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                                    </div>
                                    <img src={photo.url} alt={photo.id}></img>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="text-center mt-10 float-right">
                        {
                            loading
                                ?
                                <button id="submit" className="link-effect text-lg md:text-3xl font-semibold cursor-pointer border-2 border-solid p-3 rounded-lg
                                shadow-md shadow-slate-100">
                                    Saving <div className="inline-flex w-5 h-5 ml-5 border-l-2 border-t-2 border-white-900 rounded-full animate-spin" />
                                </button>
                                :
                                <button id="submit" className="link-effect text-lg md:text-3xl font-semibold cursor-pointer border-2 border-solid p-3 rounded-lg
                                shadow-md shadow-slate-100" onClick={handleSubmit}>
                                    Update
                                </button>
                        }
                    </div>

                </form>
            </div>
        </section>
    )
}
export default EditForm;