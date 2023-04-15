import React, {useState} from "react";
import {api} from "../constants/index.js";

const VerificationForm = ({id, SetSuccess}) => {
    const [token,SetToken] = useState('');
    const [invalid,SetInvalid] = useState(false);
    const [isLoading,SetLoading]= useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(token === "") {
            SetInvalid(true);
            return false;
        }

        SetLoading(true);

        await fetch(api.base + `/organizer/${id}`,{
            method: 'POST',
            headers: {
                'accept': '*/*',
                'code': token
            },
            body:{}
        }).then(response => {
            if(response.ok){
                SetSuccess(3);
            }
        })
            .finally(() => SetLoading(false))
            .catch(err => console.log(err))
    }
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Code"
                value={token}
                onChange={(e) => SetToken(e.target.value)}
                style={invalid?{outlineColor:"red"}:{}}
                className="form-control form-input p-3 rounded-3xl md:w-7/12 w-3/4"
                autoFocus/>
            <div className="message-reg" hidden={!invalid}>Please enter token</div>
            {
                isLoading
                    ?
                    <button disabled
                            className="form-control form-button p-3 rounded-3xl md:w-7/12 w-3/4">
                        Verifying...
                        <div
                            className="inline-flex w-5 h-5 ml-5 border-l-2 border-t-2 border-white-900 rounded-full animate-spin">
                        </div>
                    </button>
                    :
                    <button type="submit" className="form-control form-button p-3 rounded-3xl md:w-7/12 w-3/4">
                        Verify account</button>
            }
        </form>
    )
}
export default VerificationForm;