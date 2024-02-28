import { useParams } from 'react-router-dom';
import useApi from "../../API/useApi.js";

const YourFormComponent = () => {
    const { formId } = useParams();
    const {apiData, response, isLoading, progress, error} = useApi('get')

    return (
        <div>
            <h2>Form Details</h2>
            <p>Form ID: {formId}</p>
            {/* Display other form details here */}
        </div>
    );
};

export default YourFormComponent;