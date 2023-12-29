import propTypes from "prop-types";

export default function Button({ title, logo, handleSubmit }) {
  return (
    <>
      <div className="flex justify-center ">
        <button
          onClick={handleSubmit}
          className="font-semibold text-sm bg-gradient-to-r from-yellow-500 via-amber-600 to-amber-700  w-[85vw] text-white rounded-lg px-20 py-3.5"
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
