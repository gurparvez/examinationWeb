import getdata from "../../API/getdata"
import { api } from "../../constants"

const examloader = () => {
    const [isForm, loading, error] = getdata(api.formLive)
    return isForm
}

export default examloader