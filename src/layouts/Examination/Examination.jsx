import {Card, CardAdd} from '../../components'
import {useSelector} from "react-redux";

const Examination = () => {
    const response = useSelector(state => state.form.formsData)

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(); // Adjust the format as per your preference
    };

    return (
        <>
            <div className='w-full flex justify-center border'>
                <div className='w-full max-w-7xl border px-3 py-8 bg-gray-100'>
                    <div className='w-[95%]'>
                        <div>
                            <h1 className='text-2xl font-semibold font-jost'>Examination Forms</h1>
                            <p>All the examination forms you filled will appear here</p>
                        </div>
                        <div className='flex flex-col *:my-5 md:flex-row md:*:mx-5 mt-7 mx-4'>
                            <CardAdd href='/home/page1'/>
                            {response && response.map((form) => (
                                <Card
                                    id={form._id}
                                    href={`/home/${form._id}`}
                                    heading={form.regular ? "Regular" : "Re-appear"}
                                    date={formatDate(form.createdAt)}
                                    submittedAt={formatDate(form.updatedAt)} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Examination