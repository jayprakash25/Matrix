import PropTypes from "prop-types";

function PopUp({ setFillForm, text }) {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black bg-opacity-75 backdrop-blur-md ">
        <div className="relative bg-[#161616] rounded-lg max-w-md w-full m-4 ">
          <div className="p-4 md:p-5 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {text}
            </h3>
            <button
              onClick={() => {
                setFillForm(false);
              }}
              className="text-white  focus:ring-4 bg-[#1d9bf0] focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              OK
            </button>
            {/* <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

PopUp.propTypes = {
  setFillForm: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default PopUp;
