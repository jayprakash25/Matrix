import propTypes from "prop-types";

export default function Button({ title, logo, handleSubmit }) {
  return (
    <>
      <div className="flex justify-center ">
        <button
          onClick={handleSubmit}
          className="font-semibold text-sm  bg-[#1d9bf0]
 w-[85vw] text-white rounded-full px-20 py-3.5"
        >
          <div className="flex items-center justify-center space-x-2">
            {logo}
            <p> {title}</p>
          </div>
        </button>
      </div>
    </>
  );
}

Button.propTypes = {
  title: propTypes.string.isRequired,
  logo: propTypes.object,
  handleSubmit: propTypes.func.isRequired,
};
