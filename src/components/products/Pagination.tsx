const Pagination = () => {
    return (
        <div className="flex justify-center items-center gap-2 mt-10">

            <button
                className="w-10 h-10 border rounded-lg hover:bg-gray-100"
            >
                &lt;
            </button>

            <button
                className="w-10 h-10 rounded-lg bg-green-700 text-white"
            >
                1
            </button>

            <button
                className="w-10 h-10 border rounded-lg hover:bg-gray-100"
            >
                2
            </button>

            <button
                className="w-10 h-10 border rounded-lg hover:bg-gray-100"
            >
                3
            </button>

            <button
                className="w-10 h-10 border rounded-lg hover:bg-gray-100"
            >
                &gt;
            </button>

        </div>
    );
};

export default Pagination;