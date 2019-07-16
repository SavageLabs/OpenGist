import axios from "axios";

export function savePaste(language, content)  {
    return axios.post("/api/add", { language, content})
}
export function fetchPaste(id) {
    return axios.get(`/api/fetch/${id}`)
}