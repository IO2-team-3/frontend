import React from "react";

const EditForm = () => {
    return (
        <div className="con bg-black-gradient rounded-3xl p-5">

            <form>
                <div className="left">
                    <input type="text"
                           className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4">
                    </input>
                    <input type="number"
                           className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4"
                           min="0">
                    </input>
                    <input type="datetime-local"
                           className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4">
                    </input>
                    <input type="datetime-local"
                           className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4">
                    </input>
                    <input type="text"
                           className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4">
                    </input>
                </div>
                <div className="right">
                    <textarea type="text"
                              className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4">
                    </textarea>
                    <textarea type="text"
                              className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4">
                    </textarea>
                    <button style={{marginTop:"50px"}} className="float-right hover-effect text-lg md:text-3xl
                                font-semibold cursor-pointer border-2 border-solid p-3 rounded-lg">
                        Save
                    </button>
                    {/*<button className="form-control form-button p-3 rounded-3xl md:w-7/12 w-3/4">*/}
                    {/*    Save</button>*/}
                </div>
            </form>
        </div>
    )
}
export default EditForm;